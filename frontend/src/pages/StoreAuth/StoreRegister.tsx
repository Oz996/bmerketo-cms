import { Link, useNavigate } from "react-router-dom";
import "./StoreAuth.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import StoreLoader from "../../utils/Loader/StoreLoader";
import { getBaseUrl } from "../../utils/getBaseUrl";
import { isValidEmail } from "../../utils/isValidEmail";
import Title from "../../components/Shared/Title/Title";

const StoreRegister = () => {
  const initalState = {
    email: "",
    password: "",
    Cpassword: "",
  };
  const [formData, setFormData] = useState(initalState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    try {
      setLoading(true);
      e.preventDefault();
      const { email, password, Cpassword } = formData;
      if (!email || !password) {
        return setError("Fill out the required fields");
      } else if (!isValidEmail(email)) {
        return setError("Please enter a valid email address");
      } else if (password !== Cpassword) {
        return setError("Passwords do not match");
      }
      const res = await fetch(getBaseUrl() + "/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 201) {
        navigate("/store/login");
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
    <>
      <Title>Bmerketo Register</Title>
      <section className="store-container">
        <div className=" store-auth">
          <h1>Sign up</h1>
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
            <label htmlFor="Cpassword">Confirm Password</label>
            <input
              type="password"
              id="Cpassword"
              onChange={handleChange}
              value={formData.Cpassword}
            />
            <p className="error">{error}</p>
            <button disabled={loading}>
              {loading && <StoreLoader />}
              Register
            </button>
          </form>
          <p>
            Already a user yet? <Link to="/store/login">Sign in here</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default StoreRegister;
