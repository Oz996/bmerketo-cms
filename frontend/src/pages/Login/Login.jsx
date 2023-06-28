import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import './Login.scss'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {handleLogin} = useAuth()
  
  const navigate = useNavigate()
  

  const loginAdmin = async (e) => {
    e.preventDefault();

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
      handleLogin(token)
      navigate('/overview')
    } else {
      const errorData = await res.json();
    }
  };

  return (
    <section className="login-container">
      <form onSubmit={loginAdmin}>
        <h2>Administrator login</h2>
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
        <button className="btn btn-primary">Login</button>
        <p>Example login:</p>
        <span>bmerketo-admin@mail.com</span>
        <span>test123</span>
      </form>
    </section>
  );
};

export default Login;
