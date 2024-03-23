import { Link, Outlet } from "react-router-dom";
import "./StoreHeader.scss";
import { BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { AiOutlineMenu } from "react-icons/ai";
import CartModal from "../CartModal/CartModal";
import { useCart } from "../../../hooks/useCart";
import { useAuth } from "../../../hooks/useAuth";
import Searchbar from "../Searchbar/Searchbar";

const StoreHeader = () => {
  const [cartModal, setCartModal] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const { token } = useAuth();
  const { cart } = useCart();
  console.log(cart);

  const cartRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => {
    setHamburgerMenu(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setHamburgerMenu(false);
      }
    });
  });

  console.log("open", searchbar);

  return (
    <>
      <header className="store-header">
        <div className="mobile-header">
          {!hamburgerMenu ? (
            <AiOutlineMenu
              size={28}
              className="hamburger-icon"
              onClick={() => setHamburgerMenu(true)}
            />
          ) : (
            <GrClose
              size={28}
              className="hamburger-icon"
              onClick={() => setHamburgerMenu(false)}
            />
          )}
          <Link to="/home">
            <img src="/StoreLogo.svg" alt="" />
          </Link>
        </div>
        <nav ref={navRef} className={hamburgerMenu ? "show-nav" : ""}>
          <div className="container header-flex">
            <div className="store-logo">
              <Link to="/home">
                <img src="/StoreLogo.svg" alt="" />
              </Link>
            </div>

            <ul onClick={closeMenu}>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/store">Products</Link>
              </li>
            </ul>

            <div onClick={closeMenu} className="store-header-end">
              <BsSearch
                size={15}
                onClick={() => setSearchbar(true)}
                className="search-icon"
              />
              <span>
                {!token ? (
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
              <div className="red">{cart?.length > 0 && cart.length}</div>
            </div>
          </div>
        </nav>
        {cartModal && (
          <CartModal cartRef={cartRef} setCartModal={setCartModal} />
        )}
      </header>
      {searchbar && <Searchbar setSearchbar={setSearchbar} />}
      <Outlet />
    </>
  );
};

export default StoreHeader;
