import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header/Header";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();

  const isUserAuthenticated = setTimeout(() => {
    if (isAuthenticated) return true;
    return false;
  }, 100);

  return (
    <>
      <Header />
      {isUserAuthenticated ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

export default PrivateRoutes;
