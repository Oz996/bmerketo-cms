import { Link, Outlet } from "react-router-dom";
import "./StoreHeader.scss";
import { BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { useState, useRef } from "react";
import CartModal from "../CartModal/CartModal";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import SearchBar from "../SearchBar/SearchBar";

const StoreHeader = () => {
  const [cartModal, setCartModal] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();
  console.log(cart);

  const cartRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <header className="store-header">
        <nav>
          <div className="container header-flex">
            <div>
              <Link to="/home">
                <img src="/StoreLogo.svg" alt="" />
              </Link>
            </div>

            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/store">Products</Link>
              </li>
            </ul>

            <div className="store-header-end">
              <BsSearch size={15} onClick={() => setSearchBar(true)} />
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
              <div className={cart?.length > 0 ? "red" : ""}>
                {cart?.length}
              </div>
            </div>
          </div>
        </nav>
        {cartModal && (
          <CartModal cartRef={cartRef} setCartModal={setCartModal} />
        )}
      </header>
      {searchBar && <SearchBar setSearchBar={setSearchBar} />}
      <Outlet />
    </>
  );
};

export default StoreHeader;
