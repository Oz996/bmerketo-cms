import { Link } from "react-router-dom";
import "./StoreCard.scss";
import { Product } from "../../../types/types";
import { MdAddShoppingCart } from "react-icons/md";
import { scrollToTopSmooth } from "../../../utils/scrolls";
import { useCart } from "../../../hooks/useCart";
import { Dispatch, SetStateAction } from "react";
import { AiFillStar } from "react-icons/ai";

interface props {
  product: Product;
  style?: string;
  setSearchbarOpen?: Dispatch<SetStateAction<boolean>>;
}

const StoreCard = ({ product, style, setSearchbarOpen }: props) => {
  const { name, price, images, sale, review } = product;

  const { addToCart } = useCart();

  const handleIconClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleClickProduct = () => {
    if (setSearchbarOpen) setSearchbarOpen(false);
    scrollToTopSmooth();
  };
  return (
    <Link to={`/store/${product?._id}`} onClick={handleClickProduct}>
      <article className="product-card" title={name}>
        {/* displaying second image on hover, if only one image we display it only */}
        <img src={images[0]?.image} alt={name} className="first-image" />
        {images[1] ? (
          <img src={images[1]?.image} alt={name} className="second-image" />
        ) : (
          <img src={images[0]?.image} alt={name} className="second-image" />
        )}
        <div className="product-name-div">
          <p className={style && `${style}`}>{name}</p>
          {review && review.length > 0 && (
            <div>
              <AiFillStar size={19} className="star" />
              <span>({review!.length})</span>
            </div>
          )}
        </div>
        <div className="product-price-div">
          <div>
            {!sale ? (
              <p className={style && `${style}`}>€{price}</p>
            ) : (
              <>
                <p className="on-sale">€{price}</p>
                <p className={style && `${style}`}>€{sale}</p>
              </>
            )}
          </div>
          <MdAddShoppingCart
            onClick={handleIconClick}
            size={20}
            className="icon"
          />
        </div>
      </article>
    </Link>
  );
};

export default StoreCard;
