import { FaTrash } from "react-icons/fa";
import { useCart } from "../../hooks/useCart";
import { useEffect } from "react";
import "./Cart.scss";
import { Link, useNavigate } from "react-router-dom";
import { CartItem } from "../../types/types";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    cart,
    emptyCart,
    incrementCartItem,
    decrementCartItem,
    removeCartItem,
  } = useCart();
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/store/login");
      toast.error("Please sign in to place order");
    }
  }, [isAuthenticated, navigate]);

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
    const res = await fetch("https://cms-api-ty0d.onrender.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        products: cart?.map((product: CartItem) => {
          return {
            product: product?._id,
            quantity: product?.quantity,
          };
        }),
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
    <section className="store-container cart-page">
      <ul>
        {cart?.map((product: CartItem) => (
          <li key={product?._id}>
            <div className="first">
              <Link to={`/store/${product?._id}`}>
                <img src={product?.image} alt={product?.name} />
              </Link>
              <Link to={`/store/${product?._id}`}>
                <div>
                  <p>{product?.name}</p>
                  <p>£{product?.price}</p>
                </div>
              </Link>
            </div>
            <div className="buttons">
              <button onClick={() => decrementCartItem(product)}>-</button>
              <p>{product?.quantity}</p>
              <button onClick={() => incrementCartItem(product)}>+</button>
              <FaTrash size={15} onClick={() => removeCartItem(product)} />
            </div>
            <div className="subtotal">
              <p>Subtotal:</p>
              <p> £{subtotal(product)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="checkout">
        <h2>Total: £{total()}</h2>
        <button disabled={cart?.length === 0} onClick={handleOrder}>
          Complete Purchase
        </button>
      </div>
    </section>
  );
};

export default Cart;
