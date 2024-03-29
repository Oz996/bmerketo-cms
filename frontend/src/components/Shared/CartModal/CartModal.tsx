import { Link } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import "./CartModal.scss";
import { BsFillCartXFill } from "react-icons/bs";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import CartModalItem from "../CartModalItem/CartModalItem";
import { scrollToTop } from "../../../utils/scrolls";

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

  const handleEmptyCart = () => {
    emptyCart();
    removeItem();
  };

  console.log(cart);

  return (
    <div ref={cartRef} className="cart-modal animation-slide-up-fade">
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
              <p onClick={handleEmptyCart}>Remove all</p>
            </div>
            <CartModalItem cart={cart} setCartModal={setCartModal} />
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
