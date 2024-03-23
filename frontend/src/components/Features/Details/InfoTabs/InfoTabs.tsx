import { Dispatch, SetStateAction } from "react";
import "./InfoTabs.scss";
import { Review } from "../../../../types/types";

interface props {
  information: number;
  reviews: Review[];
  setInformation: Dispatch<SetStateAction<number>>;
}

const InfoTabs = ({ information, reviews, setInformation }: props) => {
  return (
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
  );
};

export default InfoTabs;
