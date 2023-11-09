import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) throw new Error("Failed to use ProductContext");

  return context;
};
