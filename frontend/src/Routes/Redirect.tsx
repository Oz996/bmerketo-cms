import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Redirect = () =>  {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    navigate("/overview")
  } else {
    navigate("/login")
  }

  return null
};

export default Redirect;
