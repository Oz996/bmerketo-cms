import { Product, StoreProps } from "../../../../types/types";
import "./StoreSortSelect.scss";
import Select from "react-select";
interface Category {
  label: string;
  value: string;
}
interface props extends StoreProps {
  sortedProducts: (sortBy: string | null) => Product[];
}

const StoreSortSelect = ({
  products,
  sortedProducts,
  setDisplayList,
}: props) => {
  const handleSortBy = (selected: any) => {
    if (!selected) return setDisplayList(products);
    const sortedList = sortedProducts(selected.value);
    setDisplayList(sortedList);
  };

  const categories: Category[] = [
    { label: "Name", value: "name" },
    { label: "Reviews", value: "reviews" },
    { label: "Price: High - Low", value: "price_high" },
    { label: "Price: Low - High", value: "price_low" },
  ];

  const style = {
    control: (base: any) => ({
      ...base,
      border: 0,
      boxShadow: "none",
    }),
  };
  return (
    <>
      <label htmlFor="Sort" className="visually-hidden">
        Sort product
      </label>
      <Select
        id="sort"
        isClearable
        styles={style}
        placeholder="Sort by..."
        className="react-select-container"
        classNamePrefix="react-select"
        onChange={handleSortBy}
        options={categories}
        isSearchable={false}
      ></Select>
    </>
  );
};

export default StoreSortSelect;
