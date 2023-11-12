import { ReactElement, createContext, useEffect, useReducer } from "react";
import { Actions, cartReducer } from "./CartReducer";
import { CartItem } from "../../types/types";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const CartContext = createContext<
  { cart: CartItem[]; dispatch: React.Dispatch<Actions> } | undefined
>(undefined);
export function CartContextProvider({ children }: { children: ReactElement }) {
  const { getItem, setItem } = useLocalStorage("cart");
  const initialCartState = getItem() || { cart: [] };
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    setItem(cart);
  }, [cart, setItem]);

  return (
    <CartContext.Provider value={{ cart: cart.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
