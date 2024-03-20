import "./Products.scss";
import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import LoaderDark from "../../utils/Loader/LoaderDark.tsx";
import { useProduct } from "../../hooks/useProduct.ts";
import AddProductForm from "../../components/Features/Products/AddProductForm.tsx";

const Products = () => {
  const { products, isLoading } = useProduct();

  return (
    <section className="product-container cms-bg-color">
      <AddProductForm />
      <div className="product-list">
        {isLoading && <LoaderDark />}
        {products?.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};
export default Products;
