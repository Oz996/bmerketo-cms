import Flickity from "react-flickity-component";
import "./Carousel.scss";
import { Product } from "../../../../types/types";
import { Link } from "react-router-dom";

interface props {
  chairs: Product[];
}

const Carousel = ({ chairs }: props) => {
  const flickityOptions = {
    wrapAround: true,
    autoPlay: 4000,
    draggable: false,
  };

  return (
    <Flickity options={flickityOptions}>
      {chairs?.map((chair) => (
        <article key={chair?._id} className="carousel-content">
          <div>
            <h2>Welcome to bmerketo shop</h2>
            <p>{chair?.name}</p>
            <Link to="/store">
              <button>shop now</button>
            </Link>
          </div>
          <div>
            <img src={chair?.images[0]?.image} alt="image of product" />
          </div>
        </article>
      ))}
    </Flickity>
  );
};

export default Carousel;
