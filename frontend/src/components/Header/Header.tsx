import "./Header.scss";
import Logo from "/Logo.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader/Loader";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  console.log(hamburgerMenu);
  const { handleLogout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const navRef = useRef<HTMLUListElement>(null);

  const location = useLocation();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  useEffect(() => {
    setHamburgerMenu(false);
  }, [location]);

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
            {isAuthenticated ? (
              <>
                <NavLink to="/overview">
                  <li> Overview </li>
                </NavLink>
                <NavLink to="/products">
                  <li> Products </li>
                </NavLink>
                <NavLink to="/orders">
                  <li> Orders </li>
                </NavLink>
                <li
                  onClick={() => {
                    handleLogoutClick();
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
