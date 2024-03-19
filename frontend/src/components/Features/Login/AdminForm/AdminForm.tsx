import "./AdminForm.scss";
import { useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../../../utils/getBaseUrl";
import { BiError } from "react-icons/bi";
import Loader from "../../../../utils/Loader/Loader";

const AdminForm = () => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  console.log(email.value);

  const loginAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    // form error handling
    if (!email.value && !password.value) {
      setEmail({ value: "", error: "Please enter an email address" });
      setPassword({ value: "", error: "Please enter your password" });
      return;
    }
    if (!email.value && password.value)
      return setEmail({ ...email, error: "Please enter an email address" });
    if (!password.value && email.value)
      return setPassword({ ...password, error: "Please enter your password" });

    if (!/^\S+@\S+$/.test(email.value)) {
      setEmail({ ...email, error: "Please enter a valid email address" });
      return;
    }

    try {
      setIsLoading(true);
      const dataObject = {
        email: email.value,
        password: password.value,
      };
      const res = await fetch(getBaseUrl() + "/api/login/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
      });
      if (res.ok) {
        const data = await res.json();
        const token = data.token;
        handleLogin(token, email.value);
        navigate("/overview");
      } else {
        setEmail({ ...email, error: "Incorrect credentials" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="admin-div">
      <form className="login-form" onSubmit={loginAdmin}>
        <h2>Administrator login</h2>
        <p className="admin-text">
          Add, delete or edit products and orders as an admin
        </p>
        <input
          className={email.error && "login-input-error"}
          type="text"
          placeholder="Email"
          name="email"
          value={email.value}
          onChange={(e) => setEmail({ value: e.target.value, error: "" })}
        />
        {email.error && (
          <div className="login-error-div">
            <BiError size={20} style={{ color: "red" }} />
            <p>{email.error}</p>
          </div>
        )}
        <input
          className={password.error && "login-input-error"}
          type="password"
          placeholder="Password"
          name="password"
          value={password.value}
          onChange={(e) => setPassword({ value: e.target.value, error: "" })}
        />
        {password.error && (
          <div className="login-error-div">
            <BiError size={20} style={{ color: "red" }} />
            <p>{password.error}</p>
          </div>
        )}
        {isLoading ? (
          <button
            disabled
            style={{ opacity: ".5", pointerEvents: "not-allowed" as any }}
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
  );
};

export default AdminForm;
