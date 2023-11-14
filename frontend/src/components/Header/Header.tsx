import "./Header.scss";
import Logo from "/Logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader/Loader";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  console.log(hamburgerMenu);
  const { handleLogout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const navRef = useRef<HTMLUListElement>(null);

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  const closeNavMenuOnClick = () => {
    setHamburgerMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setHamburgerMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isAdmin === null) {
    return (
      <span className="loader">
        <Loader />
      </span>
    );
  }

  return (
    <header className="header">
      <div className="header-container">
        <nav>
          {!hamburgerMenu ? (
            <RxHamburgerMenu
              size={35}
              className="hamburger"
              onClick={() => setHamburgerMenu(true)}
            />
          ) : (
            <CgClose
              size={35}
              onClick={() => setHamburgerMenu(false)}
              className="hamburger"
            />
          )}
          <div className="logo">
            <Link to="/overview">
              <img src={Logo} alt="logo" />
              <h3>CMS</h3>
            </Link>
          </div>

          <ul className={hamburgerMenu ? "show" : ""} ref={navRef}>
            {/* Display navbar with content if admin is logged in */}
            {isAdmin ? (
              <>
                <NavLink to="/overview">
                  <li onClick={closeNavMenuOnClick}> Overview </li>
                </NavLink>
                <NavLink to="/products">
                  <li onClick={closeNavMenuOnClick}> Products </li>
                </NavLink>
                <NavLink to="/orders">
                  <li onClick={closeNavMenuOnClick}> Orders </li>
                </NavLink>
                <li
                  onClick={() => {
                    handleLogoutClick();
                    closeNavMenuOnClick();
                  }}
                >
                  Log Out
                </li>
              </>
            ) : (
              <Link to="/">
                <li>Login</li>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
