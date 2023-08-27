import "./Header.scss";
import Logo from "../../images/Logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../../utils/Loader/Loader";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const { handleLogout } = useAuth();
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const navRef = useRef<HTMLUListElement>(null);

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  const closeNavMenuOnClick = () => {
    setHamburgerMenu(false);
  };
  console.log(isAuthenticated);
  if (isAuthenticated === null) {
    return (
      <span className="loader">
        <Loader />
      </span>
    );
  }

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

  return (
    <header>
      <div className="header-container">
        <RxHamburgerMenu
          size={35}
          className="hamburger"
          onClick={() => setHamburgerMenu((prev) => !prev)}
        />
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
            <h3>CMS</h3>
          </Link>
        </div>
        <nav>
          <ul className={hamburgerMenu ? "show" : ""} ref={navRef}>
            {/* Display navbar with content if admin is logged in */}
            {isAuthenticated ? (
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
                  {" "}
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
