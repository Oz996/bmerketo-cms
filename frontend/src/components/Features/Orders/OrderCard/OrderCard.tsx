import { Link } from "react-router-dom";
import { Order } from "../../../../types/types";
import LoaderDark from "../../../../utils/Loader/LoaderDark";
import "./OrderCard.scss";

interface props {
  orders: Order[];
  isLoading: boolean;
}
const OrderCard = ({ orders, isLoading }: props) => {
  return (
    <div className="orders">
      {isLoading && (
        <div className="order-loader">
          <LoaderDark />
        </div>
      )}
      {orders
        ? orders.map((order) => (
            <Link to={`/order/${order._id}`} key={order._id}>
              <div
                className={`order ${
                  (order.status === "pending" && "orange") ||
                  (order.status === "in transit" && "yellow") ||
                  (order.status === "delivered" && "green")
                }`}
                key={order._id}
              >
                <h3>{order.user.email}</h3>
                <div className="status-div">
                  <p>{`Status: ${order.status}`}</p>
                </div>
                <p>{`Products: ${order.products.length}`}</p>
              </div>
            </Link>
          ))
        : null}
    </div>
  );
};

export default OrderCard;
