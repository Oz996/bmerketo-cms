import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Shared/Header/Header";

const PrivateRoutes = () => {
  const { token } = useAuth();

  const isAuthenticated = !!token;

  return (
    <>
      <Header />
      {isAuthenticated ? <Outlet /> : <Navigate to="/" replace />}
    </>
  );
};

export default PrivateRoutes;
