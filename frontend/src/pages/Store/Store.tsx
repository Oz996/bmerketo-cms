import "./Store.scss";
import StoreCard from "../../components/Shared/StoreCard/StoreCard";
import { useProduct } from "../../hooks/useProduct";
import { useState, useEffect } from "react";
import { Product } from "../../types/types";
import StoreSearchInput from "../../components/Features/Store/StoreSearchInput/StoreSearchInput";
import StoreCategorySelect from "../../components/Features/Store/StoreCategorySelect/StoreCategorySelect";
import Title from "../../components/Shared/Title/Title";

const Store = () => {
  const { products } = useProduct();
  const [displayList, setDisplayList] = useState<Product[] | null>(null);

  useEffect(() => {
    setDisplayList(sortedProducts);
  }, [products]);

  const sortedProducts = products.sort((a, b) => {
    const catA = a.category.toLowerCase();
    const catB = b.category.toLowerCase();
    if (catA < catB) return -1;
    if (catA > catB) return 1;
    return 0;
  });

  return (
    <>
      <Title>Bmerketo Products</Title>
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
    </>
  );
};

export default Store;
