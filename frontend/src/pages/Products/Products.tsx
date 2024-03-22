import "./Products.scss";
import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import LoaderDark from "../../utils/Loader/LoaderDark.tsx";
import { useProduct } from "../../hooks/useProduct.ts";
import AddProductForm from "../../components/Features/Products/AddProductForm/AddProductForm.tsx";
import { useState } from "react";

const Products = () => {
  const { products, isLoading } = useProduct();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section className="product-container cms-bg-color">
      <AddProductForm setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} />
      <div className="product-list">
        {isLoading && <LoaderDark />}
        {products?.map((product) => (
          <ProductCard
            setDialogOpen={setDialogOpen}
            product={product}
            key={product._id}
          />
        ))}
      </div>
    </section>
  );
};
export default Products;
