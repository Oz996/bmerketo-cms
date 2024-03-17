import { useEffect, useState } from "react";
import "./Details.scss";
import { useParams } from "react-router-dom";
import { Product, Review } from "../../types/types";
import { FaShoppingBasket } from "react-icons/fa";
import StoreCard from "../../components/StoreCard/StoreCard";
import Reviews from "./Reviews";
import { useCart } from "../../hooks/useCart";

const Details = () => {
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [information, setInformation] = useState(1);
  const [rating, setRating] = useState(0);

  const [reviews, setReviews] = useState<Review[] | undefined>(product?.review);
  const [displayImage, setDisplayImage] = useState<string | undefined>(
    undefined
  );
  const { addToCart } = useCart();
  const { _id } = useParams();

  const getProduct = async () => {
    try {
      // const res = await fetch(
      //   `https://cms-api-ty0d.onrender.com/api/products/${_id}`
      // );
      const res = await fetch(`http://localhost:7000/api/products/${_id}`);
      const data = await res.json();
      console.log("data", data);
      setProduct(data);
      setDisplayImage(data?.images[0]?.image);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
    setInformation(1);
  }, [_id]);

  useEffect(() => {
    if (product) {
      setReviews(product.review || []);
    }
  }, [product]);

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const imagesTodisplay = product?.images?.map((image) => image.image);
  console.log("imagesTodisplay", imagesTodisplay);

  return (
    <section className="store-container">
      <div className="details-main">
        <div className="details-images">
          <img src={displayImage} alt="Image of product" />
          <div className="thumbnail-images">
            {product?.images.map((image) => (
              <img
                key={image?._id}
                src={image?.image}
                alt=""
                onClick={() => setDisplayImage(image?.image)}
              />
            ))}
          </div>
        </div>
        <div className="details-details">
          <h1>{product?.name}</h1>
          <p className="details-p">{product?.description}</p>
          <hr />
          <p className="details-price">£{product?.price}</p>
          <div className="details-options">
            <div className="buttons">
              <button onClick={decrementQuantity}>-</button>
              <p>{quantity}</p>
              <button onClick={() => setQuantity((current) => current + 1)}>
                +
              </button>
            </div>
            <div className="add-to-cart">
              <button
                onClick={() => {
                  addToCart(product!, quantity);
                  setQuantity(1);
                }}
              >
                Add to Cart <FaShoppingBasket size={17} />
              </button>
            </div>
          </div>
          <p className="details-category">Category: {product?.category}</p>
        </div>
      </div>
      <div className="details-info">
        <div className="details-tabs">
          <button
            style={{
              backgroundColor: information === 1 ? "black" : "white",
              color: information === 1 ? "white" : "black",
            }}
            onClick={() => setInformation(1)}
          >
            description
          </button>
          <button
            style={{
              backgroundColor: information === 2 ? "black" : "white",
              color: information === 2 ? "white" : "black",
            }}
            onClick={() => setInformation(2)}
          >
            additional info
          </button>
          <button
            style={{
              backgroundColor: information === 3 ? "black" : "white",
              color: information === 3 ? "white" : "black",
            }}
            onClick={() => setInformation(3)}
          >
            reviews ({reviews?.length})
          </button>
          <button
            style={{
              backgroundColor: information === 4 ? "black" : "white",
              color: information === 4 ? "white" : "black",
            }}
            onClick={() => setInformation(4)}
          >
            shipping & delivery
          </button>
        </div>
        {information === 1 && (
          <>
            <h2>
              Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie.
            </h2>
            <div className="details-description">
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et cusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata santus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor.
                  <br />
                  <br />
                  accusantium laborum pretium hic excepturi harum repellat
                  facilisis convallis potenti, adipiscing lectus aliqua.
                  Asperiores repudiandae ipsam error erat, accusamus, cum taciti
                  unde?
                  <br />
                  <br />
                  Praesentium, pariatur, tempora consequuntur purus sapiente,
                  iaculis vitae consequatur, rhoncus earum eleifend, hendrerit
                  ipsum rhoncus ex error, impedit! Alias laboris sequi curae
                  aptent? Eu sagittis eu, distinctio tortor? Dapibus delectus!
                  Consequuntur luctus.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et cusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata santus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor.
                </p>
              </div>
              <div>
                <img src={product?.images[0]?.image} alt="Image of product" />
              </div>
            </div>
          </>
        )}
        {information === 2 && (
          <div className="details-list">
            <ul>
              <li> Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</li>
              <li>
                Alias laboris sequi curae aptent? Eu sagittis eu, distinctio
                tortor?
              </li>
              <li>At vero eos et cusam et justo duo dolores et ea rebum.</li>
              <li>
                Stet clita kasd gubergren, no sea takimata santus est Lorem
                ipsum dolor sit amet.
              </li>
              <li>
                Asperiores repudiandae ipsam error erat, accusamus, cum taciti
                unde?
              </li>
            </ul>
          </div>
        )}
        {information === 3 && (
          <Reviews
            rating={rating}
            setRating={setRating}
            reviews={reviews!}
            setReviews={setReviews}
          />
        )}
      </div>
      <div className="details-related">
        <hr />
        <h2>Related Products</h2>
        <div className="product-card-list">
          {product?.related.map((product) => (
            <StoreCard key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Details;
