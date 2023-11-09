import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./Profile.scss";
import { Order } from "../../types/types";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { email, token, handleLogout } = useAuth();
  const navigate = useNavigate();
  console.log(orders);

  const getOrders = async () => {
    const res = await fetch("https://cms-api-ty0d.onrender.com/orders/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const userOrders = data.filter(
      (order: Order) => order.user.email === email
    );
    setOrders(userOrders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section className="store-container">
      <div className="profile-section">
        <div className="profile">
          <p>{email}</p>
          <button
            onClick={() => {
              handleLogout();
              navigate("/home");
            }}
          >
            Logout
          </button>
        </div>
        <div>
          <h2>Your orders:</h2>
          <ul>
            {orders.map((order) => (
              <li key={order?._id}>
                <p>
                  <b>Date:</b> {order?.createdAt.slice(0, 10)}
                </p>
                {order?.products.map((product) => (
                  <p>{product?.product?.name}</p>
                ))}
                <p>
                  <b>Status:</b> {order?.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Profile;
