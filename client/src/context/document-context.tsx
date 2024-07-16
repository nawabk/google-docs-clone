import React, { createContext, useReducer } from "react";
import { Document } from "../types/document";

type State = {
  documentList: Document[];
  selectedDocument: Document | null;
};

type Action =
  | {
      type: "SET_DOCUMENT_LIST";
      payload: {
        documentList: Document[];
      };
    }
  | {
      type: "SET_SELECTED_DOCUMENT";
      payload: {
        document: Document;
      };
    };

type Dispatch = (action: Action) => void;
const Context = createContext<
  | {
      state: State;
      dispatch: Dispatch;
    }
  | undefined
>(undefined);

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case "SET_DOCUMENT_LIST": {
      return {
        ...state,
        documentList: payload.documentList,
      };
    }
    case "SET_SELECTED_DOCUMENT": {
      return {
        ...state,
        selectedDocument: payload.document,
      };
    }
    default:
      return state;
  }
};
const initialState: State = {
  documentList: [],
  selectedDocument: null,
};
export const DocumentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
