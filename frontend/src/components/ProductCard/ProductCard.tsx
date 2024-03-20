import "./ProductCard.scss";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Product } from "../../types/types";

const ProductCard = ({ product }: { product: Product }) => {
  const location = useLocation();
  const orderPage = location.pathname.includes("/orders");

  return (
    <Link to={`/products/${product?._id}`}>
      <article className="product">
        <div className="product-info">
          <img src={product?.images[0]?.image} alt={product?.name} />
          <p>{product?.name}</p>
          {!orderPage && (
            <p className="order-edit-text">
              <b>Edit</b> <AiOutlineArrowRight className="hover" />
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
