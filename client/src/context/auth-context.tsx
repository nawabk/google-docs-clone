import { createContext, useContext, useReducer } from "react";

type State = {
  isAuthenticated: boolean;
  username: string;
  email: string;
};

type Action = {
  type: "SET_USER";
  payload: {
    username: string;
    email: string;
  };
};

type Dispatch = (action: Action) => void;
const AuthContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER": {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};

const initialState: State = {
  isAuthenticated: false,
  username: "",
  email: "",
};
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "AuthContext can be used only inside the AuthContextProvider"
    );
  }

  return context;
};

export default AuthContextProvider;
