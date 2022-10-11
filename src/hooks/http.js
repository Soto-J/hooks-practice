import { useReducer, useCallback } from "react";

const initialState = {
  isLoading: false,
  errorMsg: null,
  data: null,
  reqExtra: null,
  identifier: null,
};

const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return {
        isLoading: true,
        errorMsg: null,
        data: null,
        reqExtra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...state,
        isLoading: false,
        data: action.data,
        reqExtra: action.reqExtra,
      };
    case "ERROR":
      return { isLoading: false, errorMsg: action.errorMsg };
    case "CLEAR":
      return initialState;

    default:
      throw new Error("Should not get here");
  }
};

export const useFetch = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

  const sendRequest = useCallback(
    async (url, method, body, reqExtra, identifier) => {
      try {
        dispatchHttp({ type: "SEND", identifier });

        const response = await fetch(url, {
          method: method,
          body: body,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("DATA:", data.name);

        dispatchHttp({
          type: "RESPONSE",
          data,
          reqExtra,
        });
      } catch (error) {
        dispatchHttp({
          type: "ERROR",
          errorMsg:
            identifier === "REMOVE_INGREDIENT"
              ? "Failed to delete!"
              : "Failed to add!",
        });
      }
    },
    [dispatchHttp]
  );

  return {
    ...httpState,
    sendRequest,
    clear,
  };
};
