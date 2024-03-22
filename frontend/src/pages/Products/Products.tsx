import "./Products.scss";
import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import LoaderDark from "../../utils/Loader/LoaderDark.tsx";
import { useProduct } from "../../hooks/useProduct.ts";
import AddProductForm from "../../components/Features/Products/AddProductForm/AddProductForm.tsx";
import { useRef, useState } from "react";

const Products = () => {
  const { products, isLoading } = useProduct();
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <section className="product-container cms-bg-color">
      <AddProductForm dialogRef={dialogRef} />
      <div className="product-list">
        {isLoading && <LoaderDark />}
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            dialogRef={dialogRef}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
export default Products;
