import React from "react";
import "./Overview.scss";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const AdminNavigation = () => {
  return (
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
  );
};

export default AdminNavigation;
