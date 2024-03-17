import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./Details.scss";
import { useState, ChangeEvent, FormEvent } from "react";
import { Review } from "../../types/types";
import { useParams } from "react-router-dom";
import StoreLoader from "../../utils/Loader/StoreLoader";
import { getBaseUrl } from "../../utils/getBaseUrl";

interface props {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  setReviews: React.Dispatch<React.SetStateAction<Review[] | undefined>>;
  reviews: Review[];
}

const Reviews = ({ rating, setRating, reviews, setReviews }: props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const initalState: Review = {
    _id: "",
    rating,
    name: "",
    email: "",
    review: "",
  };
  const [formData, setFormData] = useState(initalState);

  const { _id } = useParams();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { review, name, email } = formData;
      if (!review || !name || !email || rating === 0) {
        setError("Please select a rating and fill out the fields");
        return;
      }
      setLoading(true);
      const res = await fetch(getBaseUrl() + `/api/products/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, review, name, email }),
      });
      const data = await res.json();
      if (res.status === 201) {
        setReviews([...reviews, data]);
        setFormData(initalState);
        setRating(0);
      }
    } catch (error) {
      setError("");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="details-review">
        <div>
          <h2>Add Review</h2>
          <p>
            Your email address will not be published. Required fields are marked
            *
          </p>
          <div className="rating-div">
            <p>Your rating: </p>
            {rating === 0 && (
              <>
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(1)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(2)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(3)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(4)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(5)}
                />
              </>
            )}
            {rating === 1 && (
              <>
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(1)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(2)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(3)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(4)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(5)}
                />
              </>
            )}
            {rating === 2 && (
              <>
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(1)}
                />
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(2)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(3)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(4)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(5)}
                />
              </>
            )}
            {rating === 3 && (
              <>
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(1)}
                />
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(2)}
                />
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(3)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(4)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(5)}
                />
              </>
            )}
            {rating === 4 && (
              <>
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(1)}
                />
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(2)}
                />
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(3)}
                />
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(4)}
                />
                <AiOutlineStar
                  size={19}
                  className="star"
                  onClick={() => setRating(5)}
                />
              </>
            )}
            {rating === 5 && (
              <>
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(1)}
                />
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(2)}
                />
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(3)}
                />
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(4)}
                />
                <AiFillStar
                  size={19}
                  className="star"
                  onClick={() => setRating(5)}
                />
              </>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={error.length > 0 ? "error-border" : ""}
            />
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={error.length > 0 ? "error-border" : ""}
            />
            <label htmlFor="review">Your review</label>
            <textarea
              rows={10}
              id="review"
              value={formData.review}
              onChange={handleChange}
              className={error.length > 0 ? "error-border" : ""}
            />
            <p>{error}</p>
            <button disabled={loading} type="submit">
              {loading && <StoreLoader />} Submit
            </button>
          </form>
        </div>
        <div className={`review-div ${reviews?.length === 0 && "short"}`}>
          {reviews?.length === 0 && (
            <div>
              <h2 className="reaview-header">No reviews yet</h2>
              <p>Be the first to review this product!</p>
            </div>
          )}
          <div className="reviews">
            {reviews?.map((review: Review) => (
              <div key={review._id} className="review">
                {review.rating === 1 && (
                  <>
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(1)}
                    />
                    <AiOutlineStar
                      size={19}
                      className="star"
                      onClick={() => setRating(2)}
                    />
                    <AiOutlineStar
                      size={19}
                      className="star"
                      onClick={() => setRating(3)}
                    />
                    <AiOutlineStar
                      size={19}
                      className="star"
                      onClick={() => setRating(4)}
                    />
                    <AiOutlineStar
                      size={19}
                      className="star"
                      onClick={() => setRating(5)}
                    />
                  </>
                )}
                {review.rating === 2 && (
                  <>
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(1)}
                    />
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(2)}
                    />
                    <AiOutlineStar
                      size={19}
                      className="star"
                      onClick={() => setRating(3)}
                    />
                    <AiOutlineStar
                      size={19}
                      className="star"
                      onClick={() => setRating(4)}
                    />
                    <AiOutlineStar
                      size={19}
                      className="star"
                      onClick={() => setRating(5)}
                    />
                  </>
                )}
                {review.rating === 3 && (
                  <>
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(1)}
                    />
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(2)}
                    />
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(3)}
                    />
                    <AiOutlineStar
                      size={19}
                      className="star"
                      onClick={() => setRating(4)}
                    />
                    <AiOutlineStar
                      size={19}
                      className="star"
                      onClick={() => setRating(5)}
                    />
                  </>
                )}
                {review.rating === 4 && (
                  <>
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(1)}
                    />
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(2)}
                    />
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(3)}
                    />
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(4)}
                    />
                    <AiOutlineStar
                      size={19}
                      className="star"
                      onClick={() => setRating(5)}
                    />
                  </>
                )}
                {review.rating === 5 && (
                  <>
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(1)}
                    />
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(2)}
                    />
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(3)}
                    />
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(4)}
                    />
                    <AiFillStar
                      size={19}
                      className="star"
                      onClick={() => setRating(5)}
                    />
                  </>
                )}
                <p className="review-name">{review.name}</p>
                <p>{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
