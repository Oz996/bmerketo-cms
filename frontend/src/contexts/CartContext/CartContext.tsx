import { ReactElement, createContext, useEffect, useReducer } from "react";
import { cartReducer } from "./CartReducer";
import { CartItem } from "../../types/types";

const localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");

interface Cart {
  cart: CartItem[];
}

const initialState: Cart = {
  cart: [],
};

export const CartContext = createContext(initialState);
export function CartContextProvider({ children }: { children: ReactElement }) {
  const [cart, dispatch] = useReducer(cartReducer, localStorageCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
