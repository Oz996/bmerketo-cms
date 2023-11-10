import { ReactElement, createContext, useEffect, useReducer } from "react";
import { cartReducer } from "./CartReducer";

const localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");

export const CartContext = createContext(localStorageCart);
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
