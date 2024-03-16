import "./Store.scss";
import StoreCard from "../../components/StoreCard/StoreCard";
import { useProduct } from "../../hooks/useProduct";
import { useState, useEffect } from "react";
import { Product } from "../../types/types";
import StoreSearchInput from "./StoreSearchInput";
import StoreCategorySelect from "./StoreCategorySelect";

const Store = () => {
  const { products } = useProduct();
  const [displayList, setDisplayList] = useState<Product[] | null>(null);

  useEffect(() => {
    setDisplayList(products);
  }, [products]);

  return (
    <section className="store-container store">
      <div className="store-filter">
        <StoreSearchInput
          products={products!}
          setDisplayList={setDisplayList}
        />
        <StoreCategorySelect
          products={products!}
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
  );
};

export default Store;
