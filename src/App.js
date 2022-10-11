import React, { useContext } from "react";
import { Auth } from "./components/Auth";
import { Ingredients } from "./components/Ingredients/Ingredients";
import { AuthContext } from "./context/auth-context";

export const App = (props) => {
  const { isAuth } = useContext(AuthContext);

  if (isAuth){
    return <Ingredients />
  } else {
    return <Auth />
  }
};
