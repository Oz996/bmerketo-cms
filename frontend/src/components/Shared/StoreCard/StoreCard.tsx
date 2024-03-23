import { Link } from "react-router-dom";
import "./StoreCard.scss";
import { Product } from "../../../types/types";
import { MdAddShoppingCart } from "react-icons/md";
import { scrollToTopSmooth } from "../../../utils/scrolls";

interface props {
  product: Product;
  style?: string;
}

const StoreCard = ({ product, style }: props) => {
  return (
    <article>
      <Link to={`/store/${product?._id}`} onClick={scrollToTopSmooth}>
        <div className="product-card">
          <img
            src={product?.images[0]?.image}
            alt={product?.name}
            className="first-image"
          />
          <img
            src={product?.images[1]?.image}
            alt={product?.name}
            className="second-image"
          />
          <p className={style && `${style}`}>{product?.name}</p>
          <div>
            <div>
              {!product?.sale ? (
                <p className={style && `${style}`}>€{product?.price}</p>
              ) : (
                <>
                  <p className="on-sale">€{product?.price}</p>
                  <p className={style && `${style}`}>€{product?.sale}</p>
                </>
              )}
            </div>
            <MdAddShoppingCart size={20} className="icon" />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default StoreCard;
