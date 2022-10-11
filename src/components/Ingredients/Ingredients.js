import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import { IngredientForm } from "./IngredientForm";
import { IngredientList } from "./IngredientList";
import { ErrorModal } from "../UI/ErrorModal";
import { Search } from "./Search";
import { useFetch } from "../../hooks/http";

const ingredientsReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.loadedIngredients;
    case "ADD":
      return [...state, action.ingredient];
    case "DELETE":
      return state.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get here");
  }
};

export const Ingredients = () => {
  const [ingredientsState, dispatchIngredient] = useReducer(
    ingredientsReducer,
    []
  );
  const {
    isLoading,
    errorMsg,
    data,
    sendRequest,
    reqExtra,
    identifier,
    clear,
  } = useFetch();

  useEffect(() => {
    if (!isLoading && !errorMsg && identifier === "REMOVE_INGREDIENT") {
      dispatchIngredient({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !errorMsg && identifier === "ADD_INGREDIENT") {
      console.log("ID = ", data.name);
      dispatchIngredient({
        type: "ADD",
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, identifier, sendRequest, isLoading, errorMsg]);

  const filteredIngredientsHandler = useCallback(
    (loadedIngredients) => {
      dispatchIngredient({ type: "SET", loadedIngredients });
    },
    [dispatchIngredient]
  );

  const addIngredient = useCallback(
    (ingredient) => {
      sendRequest(
        `https://react-hooks-practice-d10b5-default-rtdb.firebaseio.com/ingredient.json`,
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGREDIENT"
      )
    },
    [sendRequest]
  );

  const removeIngredient = useCallback(
    (id) => {
      console.log("id=", id);
      sendRequest(
        `https://react-hooks-practice-d10b5-default-rtdb.firebaseio.com/ingredient/${id}.json`,
        "DELETE",
        null,
        id,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const ingredientForm = useMemo(() => {
    return (
      <IngredientForm addIngredient={addIngredient} isLoading={isLoading} />
    );
  }, [addIngredient, isLoading]);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredientsState}
        removeIngredient={removeIngredient}
      />
    );
  }, [ingredientsState, removeIngredient]);

  console.log(ingredientsState);
  return (
    <div className="App">
      {errorMsg && <ErrorModal onClose={clear}>{errorMsg}</ErrorModal>}
      {ingredientForm}
      <section>
        <Search
          onLoadIngredient={filteredIngredientsHandler}
          isLoading={isLoading}
        />
        {ingredientList}
      </section>
    </div>
  );
};
