import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Redirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/overview");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return null;
};

export default Redirect;
