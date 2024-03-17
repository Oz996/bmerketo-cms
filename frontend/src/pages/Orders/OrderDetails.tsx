import { useEffect, useState } from "react";
import "./OrderDetails.scss";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Order } from "../../types/types";
import { useAuth } from "../../hooks/useAuth";
import { getBaseUrl } from "../../utils/getBaseUrl";

const OrderDetails = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("");

  console.log(order);
  const { token } = useAuth();
  const { _id } = useParams();

  const getOrders = async () => {
    try {
      const res = await fetch(getBaseUrl() + `/api/orders/${_id}`, {
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
    try {
      const res = await fetch(getBaseUrl() + `/api/orders/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.info("Status has been changed");
        setOrder(data);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="order-details">
      {order && (
        <div className="order-card" key={order._id}>
          <p>
            <b>Order ID:</b> {order._id}
          </p>
          <p>
            <b>User ID:</b> {order.user._id}
          </p>
          <p>
            <b>Email:</b> {order.user.email}
          </p>
          <p>
            <b>Date:</b> {order.createdAt.slice(0, 10)}
          </p>
          <div className="status-div">
            <p className="status">{order.status}</p>
            <div
              className={
                (order.status === "pending" ? "orange" : "") ||
                (order.status === "in transit" ? "yellow" : "") ||
                (order.status === "delivered" ? "green" : "")
              }
            ></div>
          </div>

          <div className="order-status">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
            <button
              disabled={order.status === status}
              className="btn btn-primary"
              onClick={handleUpdateStatus}
            >
              Update
            </button>
          </div>
          <div className="product-orders">
            {order?.products?.map((product) => (
              <div key={product?._id}>
                <img
                  src={product?.product?.images[0]?.image}
                  alt={product?.product?.name}
                />
                <p>{product?.product?.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
