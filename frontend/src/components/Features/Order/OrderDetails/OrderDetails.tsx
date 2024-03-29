import { Dispatch, SetStateAction } from "react";
import { Order } from "../../../../types/types";
import "./OrderDetails.scss";
import { getBaseUrl } from "../../../../utils/getBaseUrl";
import { useAuth } from "../../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface props {
  order: Order;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  setOrder: Dispatch<SetStateAction<Order | null>>;
}
const OrderDetails = ({ order, status, setStatus, setOrder }: props) => {
  const { token } = useAuth();
  const { _id } = useParams();

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
        toast.success("Status has been changed");
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
      <div className="order-card" key={order?._id}>
        <p>
          <b>Order ID:</b> {order?._id}
        </p>
        <p>
          <b>User ID:</b> {order?.user._id}
        </p>
        <p>
          <b>Email:</b> {order?.user.email}
        </p>
        <p>
          <b>Date:</b> {order?.createdAt.slice(0, 10)}
        </p>
        <div className="status-div">
          <p className="status">{order?.status}</p>
          <div
            className={
              (order?.status === "pending" ? "orange" : "") ||
              (order?.status === "in transit" ? "yellow" : "") ||
              (order?.status === "delivered" ? "green" : "")
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
            disabled={order?.status === status}
            className="btn btn-primary"
            onClick={handleUpdateStatus}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
