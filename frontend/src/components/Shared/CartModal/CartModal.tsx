import { Link } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import "./CartModal.scss";
import { BsFillCartXFill } from "react-icons/bs";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { CartItem } from "../../../types/types";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import CartModalItem from "../CartModalItem/CartModalItem";

interface props {
  cartRef: RefObject<HTMLDivElement>;
  setCartModal: Dispatch<SetStateAction<boolean>>;
}

const CartModal = ({ cartRef, setCartModal }: props) => {
  const { cart, emptyCart } = useCart();

  const { removeItem } = useLocalStorage("cart");

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setCartModal(false);
      }
    });
  });

  console.log(cart);

  return (
    <div ref={cartRef} className="cart-modal animation-slide-up">
      <div className="content">
        {cart?.length === 0 ? (
          <div className="empty">
            <p>Cart is empty</p>
            <BsFillCartXFill size={40} />
          </div>
        ) : (
          <>
            <div className="cart">
              <h2>Cart ({cart?.length})</h2>
              <p
                onClick={() => {
                  emptyCart();
                  removeItem();
                }}
              >
                Remove all
              </p>
            </div>
            <ul className="cart-modal-items">
              {cart?.map((product: CartItem) => (
                <CartModalItem
                  key={product._id}
                  product={product}
                  setCartModal={setCartModal}
                />
              ))}
            </ul>
            <div className="checkout-button">
              <Link to="/cart">
                <button onClick={() => setCartModal(false)}>Checkout</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
