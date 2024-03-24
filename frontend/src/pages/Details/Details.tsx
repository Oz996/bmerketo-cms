import { useEffect, useState } from "react";
import "./Details.scss";
import { useParams } from "react-router-dom";
import { Product, Review } from "../../types/types";
import Reviews from "../../components/Features/Details/Reviews/Reviews";
import { getBaseUrl } from "../../utils/getBaseUrl";
import RelatedProducts from "../../components/Features/Details/RelatedProducts/RelatedProducts";
import InfoContent from "../../components/Features/Details/InfoContent/InfoContent";
import ProductDetails from "../../components/Features/Details/ProductDetails/ProductDetails";
import InfoTabs from "../../components/Features/Details/InfoTabs/InfoTabs";
import Title from "../../components/Shared/Title/Title";

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

  return (
    <>
      <Title>{product?.name}</Title>
      <section className="store-container">
        <ProductDetails
          product={product!}
          displayImage={displayImage!}
          setDisplayImage={setDisplayImage}
        />
        <div className="details-info">
          <InfoTabs
            information={information}
            reviews={reviews!}
            setInformation={setInformation}
          />
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
    </>
  );
};

export default Details;
