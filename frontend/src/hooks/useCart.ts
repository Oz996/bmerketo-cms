import { useContext } from "react";
import { CartContext } from "../contexts/CartContext/CartContext";

export const useCart = () => {
  const cart = useContext(CartContext);

  if (!cart) throw new Error("Failed to use CartContext");

  return cart;
};
