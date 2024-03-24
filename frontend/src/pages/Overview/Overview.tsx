import "./Overview.scss";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Title from "../../components/Shared/Title/Title";

const AdminNavigation = () => {
  return (
    <>
      <Title>Bmerketo CMS Overview</Title>
      <section className="overview">
        <div>
          <Link to="/products">
            Products <AiOutlineArrowRight />
          </Link>
          <Link to="/orders">
            Orders <AiOutlineArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
};

export default AdminNavigation;
