import { createContext, useEffect, useReducer } from "react";
import { cartReducer } from "./CartReducer";

const initialState = {
  cart: [],
};

export const CartContext = createContext(initialState);
export function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    
  },[])
  console.log(cart);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
