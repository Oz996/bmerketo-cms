import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Overview from "./pages/Overview/Overview";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products/Products";
import EditDetails from "./pages/Products/EditDetails";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/Orders/OrderDetails";
import PrivateRoutes from "./utils/PrivateRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";
import StoreHeader from "./components/Header/StoreHeader";
import Details from "./pages/Details/Details";
import Store from "./pages/Store/Store";
import Cart from "./pages/Cart/Cart";
import StoreLogin from "./pages/StoreAuth/StoreLogin";
import StoreRegister from "./pages/StoreAuth/StoreRegister";
import Profile from "./pages/Profile/Profile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:_id" element={<EditDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:_id" element={<OrderDetails />} />
        </Route>
        <Route element={<StoreHeader />}>
          <Route path="/home" element={<Home />} />
          <Route path="/store/:_id" element={<Details />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/store/login" element={<StoreLogin />} />
          <Route path="/store/register" element={<StoreRegister />} />
          <Route path="/store/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer theme="light" autoClose={2000} pauseOnFocusLoss={false} />
    </div>
  );
};

export default App;
