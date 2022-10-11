import React from "react";
import "./IngredientList.css";

export const IngredientList = (props) => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map((ingredient) => (
          <li
            key={ingredient.id}
            onClick={props.removeIngredient.bind(this, ingredient.id)}
          >
            <span>{ingredient.title}</span>
            <span>{ingredient.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
