import { StoreProps } from "@/src/types/types";
import "./StoreSearchInput.scss";

const StoreSearchInput = ({ setDisplayList, products }: StoreProps) => {
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
