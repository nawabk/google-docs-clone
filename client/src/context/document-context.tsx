import React, { createContext, useContext, useReducer } from "react";
import { Document } from "../types/document";

type State = {
  documentList: Document[];
  selectedDocument: Document | null;
  isDocumentPageActive: boolean;
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
    }
  | {
      type: "UPDATE_SELECTED_DOCUMENT";
      payload: {
        updatedDocument: Partial<Document>;
      };
    }
  | {
      type: "SET_DOCUMENT_PAGE_ACTIVE";
      payload: {
        isActive: boolean;
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
    case "UPDATE_SELECTED_DOCUMENT": {
      return {
        ...state,
        ...(state.selectedDocument && {
          selectedDocument: {
            ...state.selectedDocument,
            ...payload.updatedDocument,
          },
        }),
      };
    }
    case "SET_DOCUMENT_PAGE_ACTIVE": {
      return {
        ...state,
        isDocumentPageActive: payload.isActive,
      };
    }
    default:
      return state;
  }
};
const initialState: State = {
  documentList: [],
  selectedDocument: null,
  isDocumentPageActive: false,
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

export const useDocumentContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(
      "useDocumentContext should be used inside DocumentContextProvider"
    );
  }
  return context;
};
