import "./Store.scss";
import StoreCard from "../../components/StoreCard/StoreCard";
import { useProduct } from "../../hooks/useProduct";
import { useState, useEffect } from "react";
import { Product } from "../../types/types";
import Select from "react-select";

const Store = () => {
  const { products } = useProduct();
  const [displayList, setDisplayList] = useState<Product[] | null>(null);

  const categories = [
    { label: "Category", value: "" },
    { label: "Office Chairs", value: "chair" },
    { label: "Armchairs", value: "armchair" },
    { label: "Desks", value: "desk" },
  ];

  const filterCategory = (category: string) => {
    if (!category) {
      setDisplayList(products);
      return;
    }
    const filter = products?.filter((product) => product.category === category);
    setDisplayList(filter!);
  };

  const searchFunction = (search: string) => {
    if (search === "") {
      setDisplayList(products);
      return;
    }
    const searchProducts = products?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log("search");
    setDisplayList(searchProducts!);
  };

  useEffect(() => {
    setDisplayList(products);
  }, [products]);

  const selectStyles = {
    control: (styles: React.CSSProperties) => ({
      ...styles,
      fontSize: "1.6rem",
      paddingLeft: "1rem",
    }),
    option: (styles: React.CSSProperties) => ({
      ...styles,
      fontSize: "1.6rem",
    }),
  };

  return (
    <section className="store-container store">
      <div className="store-filter">
        <input
          type="text"
          id="search"
          placeholder="Search..."
          onChange={(e) => searchFunction(e.target.value)}
        />
        {/* <select id="category" onChange={(e) => filterCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category.label} value={category.value}>
              {category.label}
            </option>
          ))}
        </select> */}
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          styles={selectStyles}
          onChange={(category) => {
            filterCategory(category!.value);
          }}
          options={categories}
        ></Select>
        {/* <select id="price">
          <option value="">Price</option>
        </select> */}
      </div>
      <div className="product-card-list">
        {displayList?.length === 0 && <p>No results</p>}
        {displayList?.map((product) => (
          <StoreCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Store;
