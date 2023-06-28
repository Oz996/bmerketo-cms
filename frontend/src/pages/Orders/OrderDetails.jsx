import React, { useEffect, useState } from "react";
import './OrderDetails.scss'
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  const { _id } = useParams();

  const getOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`https://cms-api-ty0d.onrender.com/orders/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setOrder(data);
      setStatus(data.status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleUpdateStatus = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`https://cms-api-ty0d.onrender.com/orders/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="order-details">
      {order && (
        <div className="order-card" key={order._id}>
          <p>
            {" "}
            <b>Order ID:</b> {order._id}
          </p>
          <p>
            {" "}
            <b>User ID:</b> {order.user._id}
          </p>
          <p>
            {" "}
            <b>Email:</b> {order.user.email}
          </p>
          <div className="status-div">
            <p className="status">{order.status}</p>
            <div
              className={
                (order.status === "pending" && "orange") ||
                (order.status === "in transit" && "yellow") ||
                (order.status === "delivered" && "green")
              }
            ></div>
          </div>

          <div className="order-status">
            <select value={status} onChange={handleStatusChange}>
              <option value="pending">Pending</option>
              <option value="in transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
            <button className="btn btn-primary" onClick={handleUpdateStatus}>Update</button>
          </div>
          {order?.products.map((product) => (
            <div key={product._id}>
              <div>
                <img src={product.product.image} alt={product.product.name} />
                <p>{product.product.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
