import "./Products.scss";
import ProductCard from "../../components/Shared/ProductCard/ProductCard.tsx";
import { useProduct } from "../../hooks/useProduct.ts";
import AddProductForm from "../../components/Features/Products/AddProductForm/AddProductForm.tsx";
import { useRef } from "react";

const Products = () => {
  const { products } = useProduct();
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <section className="product-container cms-bg-color">
      <AddProductForm dialogRef={dialogRef} />
      <ProductCard products={products} dialogRef={dialogRef} />
    </section>
  );
};
export default Products;
