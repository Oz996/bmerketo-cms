import { useCart } from "../../../hooks/useCart";
import { CartItem } from "../../../types/types";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./CartItemCard.scss";

interface props {
  cart: CartItem[];
  subtotal: (product: CartItem) => number;
}

const CartItemCard = ({ cart, subtotal }: props) => {
  const { decrementCartItem, incrementCartItem, removeCartItem } = useCart();

  return (
    <ul className="cart-list">
      {cart?.map((product: CartItem) => (
        <li>
          <div className="first">
            <Link to={`/store/${product?._id}`}>
              <img src={product?.images[0]?.image} alt={product?.name} />
            </Link>
            <Link to={`/store/${product?._id}`}>
              <div>
                <p>{product?.name}</p>
                <p>£{product?.price}</p>
              </div>
            </Link>
          </div>
          <div className="buttons">
            <button onClick={() => decrementCartItem(product)}>-</button>
            <p>{product?.quantity}</p>
            <button onClick={() => incrementCartItem(product)}>+</button>
            <FaTrash size={15} onClick={() => removeCartItem(product)} />
          </div>
          <div className="subtotal">
            <p>Subtotal:</p>
            <p> £{subtotal(product)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartItemCard;
