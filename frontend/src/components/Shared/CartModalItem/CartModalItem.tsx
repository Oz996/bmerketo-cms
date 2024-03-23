import { Link } from "react-router-dom";
import { CartItem } from "../../../types/types";
import "./CartModalItem.scss";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../../hooks/useCart";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Dispatch, SetStateAction } from "react";

interface props {
  product: CartItem;
  setCartModal: Dispatch<SetStateAction<boolean>>;
}
const CartModalItem = ({ product, setCartModal }: props) => {
  const { removeCartItem, incrementCartItem, decrementCartItem } = useCart();

  const { removeItem } = useLocalStorage("cart");
  return (
    <li key={product?._id}>
      <Link to={`/store/${product._id}`} onClick={() => setCartModal(false)}>
        <div className="details">
          <img src={product?.images[0]?.image} alt="" />
          <div className="text">
            <p>{product?.name}</p>
            <p>£{product?.price}</p>
          </div>
        </div>
      </Link>
      <div className="buttons">
        <button onClick={() => decrementCartItem(product)}>-</button>
        <p>{product?.quantity}</p>
        <button onClick={() => incrementCartItem(product)}>+</button>
        <div>
          <FaTrash
            size={15}
            onClick={() => {
              removeCartItem(product);
              removeItem();
            }}
          />
        </div>
      </div>
    </li>
  );
};

export default CartModalItem;
