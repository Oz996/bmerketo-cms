import "./Store.scss";
import StoreCard from "../../components/Shared/StoreCard/StoreCard";
import { useProduct } from "../../hooks/useProduct";
import { useState, useEffect } from "react";
import { Product } from "../../types/types";
import StoreSearchInput from "../../components/Features/Store/StoreSearchInput/StoreSearchInput";
import StoreCategorySelect from "../../components/Features/Store/StoreCategorySelect/StoreCategorySelect";
import Title from "../../components/Shared/Title/Title";
import StoreSortSelect from "../../components/Features/Store/StoreSortSelect/StoreSortSelect";

const Store = () => {
  const { products } = useProduct();
  const [displayList, setDisplayList] = useState<Product[]>([]);

  console.log("display", displayList);

  useEffect(() => {
    if (products) setDisplayList(products);
  }, [products]);

  // handling sorting, sorted by category by default inside context. this function is sent to
  // input/select components to reset the sorting to default whenever the filtering is cleared (null)
  const sortedProducts = (sortBy: string | null) => {
    const productList = [...products];
    if (sortBy === "name") {
      return productList.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    }
    if (sortBy === "price_high") {
      return productList.sort((a, b) => Number(b.price) - Number(a.price));
    }
    if (sortBy === "price_low") {
      return productList.sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (sortBy === "reviews") {
      return productList.sort((a, b) => b.review!.length - a.review!.length);
    }
  };

  return (
    <>
      <Title>Bmerketo Products</Title>
      <section className="store-container store">
        <div className="store-filter">
          <StoreSearchInput
            products={products}
            setDisplayList={setDisplayList}
          />
          <StoreCategorySelect
            products={products}
            setDisplayList={setDisplayList}
          />
          <StoreSortSelect
            products={products}
            sortedProducts={sortedProducts}
            setDisplayList={setDisplayList}
          />
        </div>
        <div className="product-card-list">
          {displayList?.length === 0 && <p>No results</p>}
          {displayList?.map((product) => (
            <StoreCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Store;
