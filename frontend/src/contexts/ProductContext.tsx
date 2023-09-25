import { createContext, useEffect, useState, ReactElement } from "react";

export const ProductContext = createContext(null);

export const ProductContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`https://cms-api-ty0d.onrender.com/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
