import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import Loader from "../../utils/Loader/Loader";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { AiOutlineArrowRight } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { handleAdminLogin } = useAuth();

  const navigate = useNavigate();

  const loginAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email && !password) return toast.error("Fill out all the fields");

    try {
      setIsLoading(true);
      const res = await fetch("https://cms-api-ty0d.onrender.com/login/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        const token = data.token;
        handleAdminLogin(token);
        navigate("/overview");
      } else {
        toast.error("Unable to login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="admin-div">
          <form onSubmit={loginAdmin}>
            <h2>Administrator login</h2>
            <p className="admin-text">
              Add, delete or edit products and orders as an admin
            </p>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isLoading ? (
              <button
                disabled
                style={{ opacity: ".5", pointerEvents: "not-allowed" }}
                className="btn btn-primary"
              >
                <Loader />
              </button>
            ) : (
              <button className="btn btn-primary">Login</button>
            )}

            <p>
              <b>Example login:</b>
            </p>
            <p>bmerketo-admin@mail.com</p>
            <p>test123</p>
          </form>
        </div>
        {/* <div className="line"/> */}
        <div className="store-div">
          <h2>Bmerketo Store</h2>
          <p>Want to browse our products? </p>
          <Link to="/home">
            <b>Browse</b> <AiOutlineArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
