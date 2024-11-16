import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import RecipesContextProvider from "./contexts/recipesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecipesContextProvider>
      <App />
    </RecipesContextProvider>
  </React.StrictMode>
);
