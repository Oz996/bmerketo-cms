import "./SearchBar.scss";
import { IoClose } from "react-icons/io5";
import { Dispatch, SetStateAction, useState } from "react";
import { useProduct } from "../../../hooks/useProduct";
import StoreCard from "../StoreCard/StoreCard";
import { Product } from "../../../types/types";

interface props {
  setSearchBar: Dispatch<SetStateAction<boolean>>;
}

const SearchBar = ({ setSearchBar }: props) => {
  const [displayList, setDisplayList] = useState<Product[] | null>(null);
  const { products } = useProduct();

  const searchFunction = (search: string) => {
    if (search === "") {
      setDisplayList(null);
      return;
    }
    const searchProducts = products?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setDisplayList(searchProducts!);
  };

  return (
    <div className="search-bar">
      <IoClose
        size={60}
        className="search-close animation-grow"
        onClick={() => setSearchBar(false)}
      />
      <div className="search-overlay animation-fade-in">
        <input
          className="animation-grow-x"
          type="text"
          placeholder="Search for product..."
          onChange={(e) => searchFunction(e.target.value)}
        />
        <div className="product-card-list">
          {displayList?.map((product) => (
            <StoreCard product={product} style={"text-white"} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
