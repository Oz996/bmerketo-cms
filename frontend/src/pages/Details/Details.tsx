import { useEffect, useState } from "react";
import "./Details.scss";
import { useParams } from "react-router-dom";
import { Product, Review } from "../../types/types";
import Reviews from "./Reviews";
import { getBaseUrl } from "../../utils/getBaseUrl";
import RelatedProducts from "../../components/Features/Details/RelatedProducts/RelatedProducts";
import InfoContent from "../../components/Features/Details/InfoContent/InfoContent";
import ProductDetails from "../../components/Features/Details/ProductDetails/ProductDetails";

const Details = () => {
  const [product, setProduct] = useState<Product>();
  const [information, setInformation] = useState(1);
  const [rating, setRating] = useState(0);

  const [reviews, setReviews] = useState<Review[] | undefined>(product?.review);
  const [displayImage, setDisplayImage] = useState<string | undefined>(
    undefined
  );
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

  const imagesTodisplay = product?.images?.map((image) => image.image);
  console.log("imagesTodisplay", imagesTodisplay);

  return (
    <section className="store-container">
      <ProductDetails
        product={product!}
        displayImage={displayImage!}
        setDisplayImage={setDisplayImage}
      />
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
        <InfoContent information={information} product={product!} />
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
