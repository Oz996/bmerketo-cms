import { Link } from "react-router-dom";
import "./Login.scss";
import { AiOutlineArrowRight } from "react-icons/ai";
import AdminForm from "../../components/Features/Login/AdminForm/AdminForm";
import Title from "../../components/Shared/Title/Title";

const Login = () => {
  return (
    <>
      <Title>Bmerketo Landing</Title>
      <section className="login-section">
        <AdminForm />
        <div className="store-div">
          <h2>Bmerketo Store</h2>
          <p>Want to browse our products? </p>
          <Link to="/home">
            <b>Browse</b> <AiOutlineArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Login;
