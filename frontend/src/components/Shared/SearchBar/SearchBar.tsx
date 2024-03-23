import "./Searchbar.scss";
import { IoClose } from "react-icons/io5";
import { Dispatch, SetStateAction, useState } from "react";
import { useProduct } from "../../../hooks/useProduct";
import StoreCard from "../StoreCard/StoreCard";
import { Product } from "../../../types/types";

interface props {
  setSearchbarOpen: Dispatch<SetStateAction<boolean>>;
}

const Searchbar = ({ setSearchbarOpen }: props) => {
  const [displayList, setDisplayList] = useState<Product[] | null>(null);
  const { products } = useProduct();

  const searchFunction = (search: string) => {
    if (!search) {
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
        onClick={() => setSearchbarOpen(false)}
      />
      <div className="search-overlay animation-fade-in">
        <div className="search-div">
          <input
            className="animation-grow-x"
            type="text"
            placeholder="Search for product..."
            onChange={(e) => searchFunction(e.target.value)}
          />
          <div className="product-card-list">
            {displayList?.map((product) => (
              <StoreCard
                setSearchbarOpen={setSearchbarOpen}
                product={product}
                style={"text-white"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
