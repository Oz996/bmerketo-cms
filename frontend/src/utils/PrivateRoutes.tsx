import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header/Header";

const PrivateRoutes = () => {
  const { token } = useAuth();

  return (
    <>
      <Header />
      {token ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

export default PrivateRoutes;
