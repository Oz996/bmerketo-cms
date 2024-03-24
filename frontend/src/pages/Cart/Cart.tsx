import { useCart } from "../../hooks/useCart";
import { useEffect } from "react";
import "./Cart.scss";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../types/types";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import CartItemCard from "../../components/Features/Cart/CartItemCard";
import { getBaseUrl } from "../../utils/getBaseUrl";
import { Helmet } from "react-helmet-async";
import Title from "../../components/Shared/Title/Title";

const Cart = () => {
  const { cart, emptyCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/store/login");
      toast.error("Please sign in to place order");
    }
  }, [token, navigate]);

  const subtotal = (product: CartItem) => {
    return product?.quantity * product?.price;
  };

  const total = () => {
    return cart?.reduce(
      (total: number, product: CartItem) => total + subtotal(product),
      0
    );
  };

  const handleOrder = async () => {
    const res = await fetch(getBaseUrl() + `/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        products: cart?.map((product: CartItem) => ({
          product: product?._id,
          quantity: product?.quantity,
        })),
      }),
    });
    console.log(res);
    if (res.status === 201) {
      navigate("/home");
      emptyCart();
      toast.success("Thank you for your order!");
    }
  };

  return (
    <>
      <Title>Bmerketo Cart</Title>
      <section className="store-container cart-page">
        <CartItemCard cart={cart} subtotal={subtotal} />
        <div className="checkout">
          <h2>Total: £{total()}</h2>
          <button disabled={cart?.length === 0} onClick={handleOrder}>
            Complete Purchase
          </button>
        </div>
      </section>
    </>
  );
};

export default Cart;
