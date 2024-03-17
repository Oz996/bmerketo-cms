import { useCart } from "../../../hooks/useCart";
import { CartItem } from "@/src/types/types";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

interface props {
  product: CartItem;
}

const CartItemCard = ({ product }: props) => {
  const { decrementCartItem, incrementCartItem, removeCartItem } = useCart();

  const subtotal = (product: CartItem) => {
    return product?.quantity * product?.price;
  };

  return (
    <li>
      <div className="first">
        <Link to={`/store/${product?._id}`}>
          <img src={product?.image} alt={product?.name} />
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
  );
};

export default CartItemCard;
