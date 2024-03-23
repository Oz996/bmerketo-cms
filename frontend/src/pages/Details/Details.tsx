import { useEffect, useState } from "react";
import "./Details.scss";
import { useParams } from "react-router-dom";
import { Product, Review } from "../../types/types";
import { FaShoppingBasket } from "react-icons/fa";
import StoreCard from "../../components/Shared/StoreCard/StoreCard";
import Reviews from "./Reviews";
import { useCart } from "../../hooks/useCart";
import { getBaseUrl } from "../../utils/getBaseUrl";
import RelatedProducts from "../../components/Features/Details/RelatedProducts/RelatedProducts";
import InfoTabs from "../../components/Features/Details/InfoTabs/InfoTabs";

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
      const res = await fetch(getBaseUrl() + `/api/products/${_id}`);
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
        <InfoTabs information={information} product={product!} />
        {information === 3 && (
          <Reviews
            rating={rating}
            setRating={setRating}
            reviews={reviews!}
            setReviews={setReviews}
          />
        )}
      </div>
      <RelatedProducts product={product!} />
    </section>
  );
};

export default Details;
