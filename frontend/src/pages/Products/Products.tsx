import "./Products.scss";
import ProductCard from "../../components/Shared/ProductCard/ProductCard.tsx";
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
      <ProductCard products={products} dialogRef={dialogRef} />
    </section>
  );
};
export default Products;
