import { useEffect, useState } from "react";
import "./Orders.scss";
import { Link } from "react-router-dom";
import LoaderDark from "../../utils/Loader/LoaderDark";
import { Order } from "../../types/Order";

const Orders = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const res = await fetch("https://cms-api-ty0d.onrender.com/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: Order[] = await res.json();

      const orderStatusOrder: Record<string, number> = {
        pending: 1,
        "in transit": 2,
        delivered: 3,
      };

      // Sort the orders and display them based on order status (pending first and delivered last)
      const sortedOrders = data.sort((a, b) => {
        return orderStatusOrder[a.status] - orderStatusOrder[b.status];
      });
      setOrders(sortedOrders);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section className="order-list">
      <div className="orders">
        {isLoading && (
          <div className="order-loader">
            <LoaderDark />
          </div>
        )}
        {orders ? (
          orders.map((order) => (
            <Link to={`/orders/${order._id}`} key={order._id}>
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
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </section>
  );
};

export default Orders;
