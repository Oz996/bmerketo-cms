import {
  ReactElement,
  createContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { Actions, cartReducer } from "./CartReducer";
import { CartItem, Product } from "../../types/types";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface CartContextType {
  cart: CartItem[];
  addToCart: (payload: Product, quantity: number) => void;
  incrementCartItem: (payload: Product) => void;
  decrementCartItem: (payload: Product) => void;
  removeCartItem: (payload: Product) => void;
  emptyCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);
export function CartContextProvider({ children }: { children: ReactElement }) {
  const { getItem, setItem } = useLocalStorage("cart");
  const initialCartState = getItem() || { cart: [] };
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    setItem(cart);
  }, [cart, setItem]);

  const addToCart = useCallback((payload: Product, quantity: number) => {
    dispatch({ type: "ADD", payload, quantity });
  }, []);

  const incrementCartItem = useCallback((payload: Product) => {
    dispatch({ type: "INCREMENT", payload });
  }, []);

  const decrementCartItem = useCallback((payload: Product) => {
    dispatch({ type: "DECREMENT", payload });
  }, []);

  const removeCartItem = useCallback((payload: Product) => {
    dispatch({ type: "REMOVE", payload });
  }, []);

  const emptyCart = useCallback(() => {
    dispatch({ type: "EMPTY" });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart: cart?.cart,
        addToCart,
        incrementCartItem,
        decrementCartItem,
        removeCartItem,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
