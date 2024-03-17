import "./ProductCard.scss";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Product } from "../../types/types";

const ProductCard = ({ product }: { product: Product }) => {
  const location = useLocation();
  console.log("location", location);

  const orderPage = location.pathname.includes("/orders");
  return (
    <article>
      <Link to={`/products/${product?._id}`}>
        <div className="product">
          <div className="product-info">
            <img src={product?.images[0]?.image} alt={product?.name} />
            <p>{product?.name}</p>
            {!orderPage && (
              <p className="order-edit-text">
                <b>Edit</b> <AiOutlineArrowRight className="hover" />
              </p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
