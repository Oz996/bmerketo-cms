import "./Header.scss";
import Logo from "../../images/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const {isAuthenticated, handleLogout}= useAuth();
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    handleLogout()
    navigate('/')
  }

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        <h3>CMS</h3>
        </Link>
      </div>
      <nav>
        <ul>
          {/* Display navbar with content if admin is logged in */}
          {isAuthenticated ? (
            <>
             <NavLink to="/overview"> <li> Overview </li></NavLink>
             <NavLink to="/products"> <li> Products </li></NavLink>
             <NavLink to="/orders"> <li> Orders </li></NavLink>
             <li onClick={handleLogoutClick}> Log Out</li>
            </>
          ) : (
            <Link
           
             to="/">
              <li>Login</li>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
