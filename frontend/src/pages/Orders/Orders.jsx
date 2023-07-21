import React, { useEffect, useState } from "react";
import "./Orders.scss";
import { Link } from "react-router-dom";
import LoaderDark from "../../utils/Loader/LoaderDark";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const getOrders = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true)
    try {
      const res = await fetch("https://cms-api-ty0d.onrender.com/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      
      // Sort the orders and display them based on order status (pending first and delivered last)
      const sortedOrders = data.sort((a, b) => {
        const orderStatusOrder = {
          pending: 1,
          "in transit": 2,
          delivered: 3,
        };
        return orderStatusOrder[a.status] - orderStatusOrder[b.status];
      });
      setOrders(sortedOrders);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section className="order-list">
    <div className="orders">
      {isLoading && <div className="order-loader"><LoaderDark /></div> }
      {orders.map((order) => (
        <Link to={`/orders/${order._id}`} key={order._id}>
          <div className="order" key={order._id}>
            <h3>{order.user.email}</h3>
            <div className="status-div">
              <p>{`Status: ${order.status}`}</p>
              <div
                className={
                  (order.status === "pending" && "orange") ||
                  (order.status === "in transit" && "yellow") ||
                  (order.status === "delivered" && "green")
                }
              ></div>
            </div>
            <p>{`Products: ${order.products.length}`}</p>
          </div>
        </Link>
      ))}
    </div>
    </section>
  );
};

export default Orders;
