import { Dispatch, SetStateAction, useState } from "react";
import { Product } from "../../../../types/types";
import "./ProductDetails.scss";
import { useCart } from "../../../../hooks/useCart";
import { FaShoppingBasket } from "react-icons/fa";

interface props {
  product: Product;
  displayImage: string;
  setDisplayImage: Dispatch<SetStateAction<string | undefined>>;
}

const ProductDetails = ({ displayImage, product, setDisplayImage }: props) => {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="details-main">
      <div className="details-images">
        <img src={displayImage} alt="Image of product" />
        <div className="thumbnail-images">
          {product?.images.map((image) => (
            <img
              key={image?._id}
              src={image?.image}
              alt=""
              onClick={() => setDisplayImage(image?.image)}
            />
          ))}
        </div>
      </div>
      <div className="details-details">
        <h1>{product?.name}</h1>
        <p className="details-p">{product?.description}</p>
        <hr />
        {product?.sale ? (
          <div className="details-sale-div">
            <p className="details-price-sale">£{product.sale}</p>
            <p className="details-price">£{product.price}</p>
          </div>
        ) : (
          <p className="details-price">£{product?.price}</p>
        )}
        <div className="details-options">
          <div className="buttons">
            <button onClick={decrementQuantity}>-</button>
            <p>{quantity}</p>
            <button onClick={() => setQuantity((current) => current + 1)}>
              +
            </button>
          </div>
          <div className="add-to-cart">
            <button
              onClick={() => {
                addToCart(product!, quantity);
                setQuantity(1);
              }}
            >
              Add to Cart <FaShoppingBasket size={17} />
            </button>
          </div>
        </div>
        <p className="details-category">Category: {product?.category}</p>
      </div>
    </div>
  );
};
export default ProductDetails;
