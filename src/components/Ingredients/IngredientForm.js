import React, { useState, useRef } from "react";
import { Card } from "../UI/Card";
import { LoadingIndicator } from "../UI/LoadingIndicator";
import "./IngredientForm.css";

export const IngredientForm = (props) => {
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
  });
  // console.log("RENDERING INGREDIENT FORM!");
  const nameInputRef = useRef();
  const nameInputHandler = (event) => {
    setInputState((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  const amountInputHandler = (event) => {
    setInputState((prev) => {
      return { ...prev, amount: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.addIngredient(inputState);
    setInputState({ title: "", amount: "" });
    nameInputRef.current.focus();
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              ref={nameInputRef}
              type="text"
              id="title"
              onChange={nameInputHandler}
              value={inputState.title}
              autoFocus
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              onChange={amountInputHandler}
              value={inputState.amount}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.isLoading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
};
