import { ReactElement, createContext, useEffect, useReducer } from "react";
import { cartReducer } from "./CartReducer";
import { CartItem } from "../../types/types";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface Cart {
  cart: CartItem[];
}

const { getItem, setItem } = useLocalStorage("cart");

export const CartContext = createContext<Cart | undefined>(undefined);
export function CartContextProvider({ children }: { children: ReactElement }) {
  const initialCartState = getItem() || { cart: [] };
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    setItem(cart);
  }, [cart, setItem]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
