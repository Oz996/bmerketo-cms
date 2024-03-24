import { useEffect, useState } from "react";
import "./Order.scss";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getBaseUrl } from "../../utils/getBaseUrl";
import ProductCard from "../../components/Shared/ProductCard/ProductCard";
import { Order as OrderType } from "../../types/types";
import OrderDetails from "../../components/Features/Order/OrderDetails/OrderDetails";
import Title from "../../components/Shared/Title/Title";

const Order = () => {
  const [order, setOrder] = useState<OrderType | null>(null);
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

  const products = order?.products?.map((product) => product?.product);

  return (
    <>
      <Title>{`Bmerketo CMS Order ${order?._id}`}</Title>
      <section className="order-page cms-bg-color">
        <OrderDetails
          order={order!}
          status={status}
          setOrder={setOrder}
          setStatus={setStatus}
        />
        <ProductCard products={products!} />
      </section>
    </>
  );
};

export default Order;
