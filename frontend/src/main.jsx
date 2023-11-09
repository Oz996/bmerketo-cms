import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { AuthContextProvider } from "../../frontend/src/contexts/AuthContext";
import { ProductContextProvider } from "../../frontend/src/contexts/ProductContext";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./contexts/CartContext/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductContextProvider>
      <AuthContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartContextProvider>
      </AuthContextProvider>
    </ProductContextProvider>
  </React.StrictMode>
);
