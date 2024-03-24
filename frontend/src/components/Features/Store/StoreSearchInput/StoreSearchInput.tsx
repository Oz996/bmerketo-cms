import { StoreProps } from "../../../../types/types";
import "./StoreSearchInput.scss";

const StoreSearchInput = ({
  sortedProducts,
  setDisplayList,
  products,
}: StoreProps) => {
  const searchFunction = (search: string) => {
    if (!search) return setDisplayList(sortedProducts(null));

    const searchProducts = products?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log("search");
    setDisplayList(searchProducts!);
  };

  return (
    <>
      <label htmlFor="search" className="visually-hidden">
        Search for product name
      </label>
      <input
        className="search-input"
        type="text"
        id="search"
        placeholder="Search for product..."
        onChange={(e) => {
          searchFunction(e.target.value);
        }}
      />
    </>
  );
};
export default StoreSearchInput;
