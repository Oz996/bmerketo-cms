import { Link, useNavigate } from "react-router-dom";
import "./StoreAuth.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import StoreLoader from "../../utils/Loader/StoreLoader";
import { useAuth } from "../../hooks/useAuth";
import { getBaseUrl } from "../../utils/getBaseUrl";

const StoreLogin = () => {
  const initalState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initalState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    try {
      setLoading(true);
      e.preventDefault();
      const { email, password } = formData;
      if (!email || !password) {
        return setError("Fill out the required fields");
      }
      const res = await fetch(getBaseUrl() + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(res);
      if (res.status === 200) {
        navigate("/home");
        const data = await res.json();
        handleLogin(data.token, email);
      } else {
        return setError("Email or password is incorrect");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <section className="store-container">
      <div className=" store-auth">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
          <p className="error">{error}</p>
          <button disabled={loading}>
            {loading && <StoreLoader />}
            Login
          </button>
        </form>
        <p>
          Not a user yet? <Link to="/store/register">Sign up here</Link>
        </p>
      </div>
    </section>
  );
};

export default StoreLogin;
