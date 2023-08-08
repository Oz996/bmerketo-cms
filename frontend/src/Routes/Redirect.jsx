import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Redirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? navigate("/overview") : navigate("/login");
};

export default Redirect;
