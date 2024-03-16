import React, { SetStateAction } from "react";
import { Product } from "../../../../types/types";
import "./StoreSearchInput.scss";

interface props {
  setDisplayList: React.Dispatch<SetStateAction<Product[] | null>>;
  products: Product[];
}

const StoreSearchInput = ({ setDisplayList, products }: props) => {
  const searchFunction = (search: string) => {
    if (!search) {
      setDisplayList(products);
      return;
    }
    const searchProducts = products?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log("search");
    setDisplayList(searchProducts!);
  };

  return (
    <input
      className="search-input"
      type="text"
      id="search"
      placeholder="Search..."
      onChange={(e) => {
        searchFunction(e.target.value);
      }}
    />
  );
};
export default StoreSearchInput;
