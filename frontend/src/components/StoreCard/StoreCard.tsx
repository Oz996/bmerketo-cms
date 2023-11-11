import { Link } from "react-router-dom";
import "./StoreCard.scss";
import { Product } from "../../types/types";
import { MdAddShoppingCart } from "react-icons/md";
import { scrollToTopSmooth } from "../../utils/scrolls";

const StoreCard = ({ product }: { product: Product }) => {

  return (
    <article>
      <Link to={`/store/${product?._id}`} onClick={scrollToTopSmooth}>
        <div className="product-card">
          <img
            src={product?.image}
            alt={product?.name}
            className="first-image"
          />
          <img
            src={product?.image2}
            alt={product?.name}
            className="second-image"
          />
          <p>{product?.name}</p>
          <div>
            <div>
              {!product?.sale ? (
                <p>€{product?.price}</p>
              ) : (
                <>
                  <p className="on-sale">€{product?.price}</p>
                  <p>€{product?.sale}</p>
                </>
              )}
            </div>
            <MdAddShoppingCart
              size={20}
              className="icon"
            />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default StoreCard;
