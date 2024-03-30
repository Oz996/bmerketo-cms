import {
  createContext,
  useEffect,
  useState,
  ReactElement,
  SetStateAction,
} from "react";
import { Product } from "../types/types";
import { getBaseUrl } from "../utils/getBaseUrl";

interface ProdcutContextType {
  products: Product[];
  isLoading: boolean;
  productId: string;
  setProducts: React.Dispatch<SetStateAction<Product[]>>;
  handleAddProductId: (id: string) => void;
  handleRemoveProductId: () => void;
}

export const ProductContext = createContext<ProdcutContextType | null>(null);

export const ProductContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState("");

  console.log("id", productId);
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(getBaseUrl() + `/api/products`);
      const data = (await res.json()) as Product[];
      // sorting by category by default
      const sortedProducts = data.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
      setProducts(sortedProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProductId = (id: string) => {
    setProductId(id);
    sessionStorage.setItem("id", id);
  };

  const handleRemoveProductId = () => {
    setProductId("");
    sessionStorage.removeItem("id");
  };
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) setProductId(id);
  }, [productId]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        isLoading,
        productId,
        handleAddProductId,
        handleRemoveProductId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
