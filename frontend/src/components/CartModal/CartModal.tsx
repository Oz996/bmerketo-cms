import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import "./CartModal.scss";
import { FaTrash } from "react-icons/fa";
import { BsFillCartXFill } from "react-icons/bs";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { CartItem } from "../../types/types";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface props {
  cartRef: RefObject<HTMLDivElement>;
  setCartModal: Dispatch<SetStateAction<boolean>>;
}

const CartModal = ({ cartRef, setCartModal }: props) => {
  const {
    cart,
    removeCartItem,
    incrementCartItem,
    decrementCartItem,
    emptyCart,
  } = useCart();

  const { removeItem } = useLocalStorage("cart");

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setCartModal(false);
      }
    });
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        ref={cartRef}
        className="cart-modal"
      >
        <div className="content" id="whore">
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
              <ul>
                {cart?.map((product: CartItem) => (
                  <li key={product?._id}>
                    <Link to={`/store/${product._id}`}>
                      <div className="details">
                        <img src={product?.image} alt="" />
                        <div className="text">
                          <p>{product?.name}</p>
                          <p>£{product?.price}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="buttons">
                      <button onClick={() => decrementCartItem(product)}>
                        -
                      </button>
                      <p>{product?.quantity}</p>
                      <button onClick={() => incrementCartItem(product)}>
                        +
                      </button>
                      <FaTrash
                        size={15}
                        onClick={() => {
                          removeCartItem(product);
                          removeItem();
                        }}
                      />
                    </div>
                  </li>
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
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal;
