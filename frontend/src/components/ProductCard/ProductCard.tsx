import "./ProductCard.scss";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Product } from "../../types/Product";

const ProductCard = ({ product }: { product: Product }) => {
  if (!product) {
    return <p>Product removed from database</p>;
  }
  return (
    <Link to={`/products/${product._id}`}>
      <div className="product">
        <div className="product-info">
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <p className="order-edit-text">
            <b>Edit</b> <AiOutlineArrowRight className="hover" />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
