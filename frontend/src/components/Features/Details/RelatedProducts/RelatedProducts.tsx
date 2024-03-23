import { Product } from "../../../../types/types";
import StoreCard from "../../../Shared/StoreCard/StoreCard";
import "./RelatedProducts.scss";

interface props {
  product: Product;
}
const RelatedProducts = ({ product }: props) => {
  return (
    <div className="details-related">
      <hr />
      <h2>Related Products</h2>
      <div className="product-card-list">
        {product?.related?.map((product) => (
          <StoreCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
