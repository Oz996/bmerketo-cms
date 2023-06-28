import "./ProductCard.scss";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const ProductCard = ({ product }) => {
  if (!product) {
    return <p>Product removed from database</p>;
  }
  return (
      <div className="product">
        <div className="product-info">
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <Link to={`/products/${product._id}`}>
            <p className="order-edit-text">
              <b>Edit</b> <AiOutlineArrowRight className="hover" />
            </p>
          </Link>
        </div>
      </div>
  );
};

export default ProductCard;
