import "./Products.scss";
import ProductCard from "../../components/Shared/ProductCard/ProductCard.tsx";
import { useProduct } from "../../hooks/useProduct.ts";
import AddProductForm from "../../components/Features/Products/AddProductForm/AddProductForm.tsx";
import { useRef } from "react";
import Title from "../../components/Shared/Title/Title.tsx";

const Products = () => {
  const { products } = useProduct();
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Title>Bmerketo CMS Products</Title>
      <section className="product-container cms-bg-color">
        <AddProductForm dialogRef={dialogRef} />
        <ProductCard products={products} dialogRef={dialogRef} />
      </section>
    </>
  );
};
export default Products;
