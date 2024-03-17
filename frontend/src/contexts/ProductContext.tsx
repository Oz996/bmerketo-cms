import { createContext, useEffect, useState, ReactElement } from "react";
import { Product } from "../types/types";

interface ProdcutContextType {
  products: Product[] | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
  isLoading: boolean;
}

export const ProductContext = createContext<ProdcutContextType | null>(null);

export const ProductContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      // const res = await fetch(`https://cms-api-ty0d.onrender.com/api/products`);
      const res = await fetch(`http://localhost:7000/api/products`);
      const data = await res.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};
