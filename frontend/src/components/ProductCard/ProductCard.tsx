import "./ProductCard.scss";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Product } from "../../types/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <article>
      <Link to={`/products/${product?._id}`}>
        <div className="product">
          <div className="product-info">
            <img src={product?.images[0]?.image} alt={product?.name} />
            <p>{product?.name}</p>
            <p className="order-edit-text">
              <b>Edit</b> <AiOutlineArrowRight className="hover" />
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
