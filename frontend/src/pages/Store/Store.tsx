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
  const [displayList, setDisplayList] = useState<Product[] | null>(null);

  useEffect(() => {
    setDisplayList(sortedProducts(null));
  }, [products]);

  const sortedProducts = (sortBy: string | null) => {
    const productList = [...products];
    if (sortBy === "name") {
      return productList.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    }
    if (sortBy === "price_high") {
      return productList.sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (sortBy === "price_low") {
      return productList.sort((a, b) => Number(b.price) - Number(a.price));
    }
    if (sortBy === "reviews") {
      return productList.sort((a, b) => b.review!.length - a.review!.length);
    }
    return productList.sort((a, b) => {
      const catA = a.category.toLowerCase();
      const catB = b.category.toLowerCase();
      if (catA < catB) return -1;
      if (catA > catB) return 1;
      return 0;
    });
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
            setDisplayList={setDisplayList}
            sortedProducts={sortedProducts}
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
