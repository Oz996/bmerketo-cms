import { Link, Outlet } from "react-router-dom";
import "./StoreHeader.scss";
import { BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { useState, useRef } from "react";
import CartModal from "../CartModal/CartModal";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

const StoreHeader = () => {
  const [cartModal, setCartModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const cartData = useCart();
  const cart = cartData ? cartData.cart || [] : [];

  const cartRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <header className="store-header">
        <div className="container header-flex">
          <div>
            <Link to="/home">
              <img src="/StoreLogo.svg" alt="" />
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/store">Products</Link>
              </li>
            </ul>
          </nav>
          <div className="store-header-end">
            <BsSearch size={15} />
            <span>
              {!isAuthenticated ? (
                <Link to="/store/login">Login</Link>
              ) : (
                <Link to="/store/profile">
                  <FaUser size={17} />
                </Link>
                // <p onClick={() => handleLogout()}>Logout</p>
              )}
            </span>
            <IoMdCart
              size={21}
              onClick={() => setCartModal(true)}
              className="cart-icon"
            />
            <div className={cart?.cart?.length > 0 ? "red" : ""}>
              {cart?.cart?.length}
            </div>
          </div>
        </div>
        {cartModal && (
          <CartModal cartRef={cartRef} setCartModal={setCartModal} />
        )}
      </header>
      <Outlet />
    </>
  );
};

export default StoreHeader;
