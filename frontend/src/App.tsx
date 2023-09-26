import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Overview from "./pages/Overview/Overview";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products/Products";
import Details from "./pages/Products/ProductDetails";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/Orders/OrderDetails";
import PrivateRoutes from "./Routes/PrivateRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<Details />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:_id" element={<OrderDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        theme="colored"
        autoClose={2000}
        pauseOnFocusLoss={false}
      />
    </div>
  );
};

export default App;
