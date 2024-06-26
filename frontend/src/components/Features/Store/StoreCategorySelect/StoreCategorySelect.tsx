import Select from "react-select";
import { StoreProps } from "../../../../types/types";
import "./StoreCategorySelect.scss";

interface Category {
  label: string;
  value: string;
}

const StoreCategorySelect = ({ setDisplayList, products }: StoreProps) => {
  const categories: Category[] = [
    { label: "Office Chairs", value: "chair" },
    { label: "Armchairs", value: "armchair" },
    { label: "Desks", value: "desk" },
  ];

  const filterProducts = (categories: any[]) => {
    if (categories.length === 0) return setDisplayList(products);
    const filteredProducts = products?.filter((product) =>
      categories.includes(product.category)
    );
    setDisplayList(filteredProducts);
  };

  const handleCategoryChange = (selected: any) => {
    const selectedValues = selected.map((category: Category) => category.value);
    filterProducts(selectedValues);
  };

  const style = {
    control: (base: any) => ({
      ...base,
      border: 0,
      boxShadow: "none",
    }),
  };
  return (
    <>
      <label htmlFor="category" className="visually-hidden">
        Filter by category
      </label>
      <Select
        id="category"
        isMulti
        styles={style}
        placeholder="Category"
        className="react-select-container"
        classNamePrefix="react-select"
        onChange={handleCategoryChange}
        options={categories}
        isSearchable={false}
      ></Select>
    </>
  );
};

export default StoreCategorySelect;
