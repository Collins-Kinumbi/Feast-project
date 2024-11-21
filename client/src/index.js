import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import RecipesContextProvider from "./contexts/Recipes/recipesContext";
import AuthContextProvider from "./contexts/Auth/authContext";
import ModalContextProvider from "./contexts/Modal/modalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ModalContextProvider>
      <AuthContextProvider>
        <RecipesContextProvider>
          <App />
        </RecipesContextProvider>
      </AuthContextProvider>
    </ModalContextProvider>
  </React.StrictMode>
);
