import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header/Header";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      {setTimeout(() => {
        {
          isAuthenticated ? <Outlet /> : <Navigate to="/" />;
        }
      }, 100)}
    </>
  );
};

export default PrivateRoutes;
