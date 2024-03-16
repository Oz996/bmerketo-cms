import { SetStateAction } from "react";
import Select from "react-select";
import { Product } from "../../../../types/types";
import "./StoreCategorySelect.scss";

interface props {
  setDisplayList: React.Dispatch<SetStateAction<Product[] | null>>;
  products: Product[];
}

interface Category {
  label: string;
  value: string;
}

const StoreCategorySelect = ({ setDisplayList, products }: props) => {
  const categories: Category[] = [
    { label: "Office Chairs", value: "chair" },
    { label: "Armchairs", value: "armchair" },
    { label: "Desks", value: "desk" },
  ];

  const filterProducts = (categories: any[]) => {
    if (categories.length === 0) {
      setDisplayList(products);
      return;
    }
    const filteredProducts = products?.filter((product) =>
      categories.includes(product.category)
    );
    setDisplayList(filteredProducts!);
  };

  const handleCategoryChange = (selected: any) => {
    const selectedValues = selected.map((category: any) => category.value);
    filterProducts(selectedValues);
  };

  return (
    <Select
      isMulti
      placeholder="Category"
      className="react-select-container"
      classNamePrefix="react-select"
      onChange={handleCategoryChange}
      options={categories}
    ></Select>
  );
};

export default StoreCategorySelect;
