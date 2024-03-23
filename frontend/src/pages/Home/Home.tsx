import { useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import { Product } from "../../types/types";
import { Link } from "react-router-dom";
import "flickity/css/flickity.css";
import "./Home.scss";
import StoreCard from "../../components/Shared/StoreCard/StoreCard";
import StoreLoader from "../../utils/Loader/StoreLoader";
import Carousel from "../../components/Features/Home/Carousel/Carousel";

const Home = () => {
  const [chairs, setChairs] = useState<Product[] | undefined>([]);
  const [sale, setSale] = useState<Product[] | undefined>([]);
  const [best, setBest] = useState<Product[] | undefined>([]);
  const { products, isLoading } = useProduct();

  useEffect(() => {
    const chairsFilter = products?.filter((item) => item.category === "chair");
    const bestFilter = products?.filter((item) => item.best);
    const saleFilter = products?.filter((item) => item.sale);
    setChairs(chairsFilter);
    setSale(saleFilter);
    setBest(bestFilter);
  }, [products]);

  return (
    <section className="home poppins">
      {isLoading && (
        <div className="loading">
          <StoreLoader /> <p>Loading please be patient</p>
        </div>
      )}
      <Carousel chairs={chairs!} />
      <section className="collection store-container">
        <h1>Best Collection</h1>
        <ul>
          <li>
            <Link to="/store">All</Link>
          </li>
          /
          <li>
            <Link to="/store">Chairs</Link>
          </li>
          /
          <li>
            <Link to="/store">Furniture</Link>
          </li>
          /
        </ul>
        <div className="product-card-list">
          {best?.map((product) => (
            <StoreCard key={product._id} product={product} />
          ))}
        </div>
        <div className="browse-button-div">
          <Link to="/store">
            <button>Browse</button>
          </Link>
        </div>
      </section>
      <section className="collection store-container deals">
        <h2>Deals of the week</h2>
        <div className="product-card-list">
          {sale?.map((product) => (
            <StoreCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Home;
