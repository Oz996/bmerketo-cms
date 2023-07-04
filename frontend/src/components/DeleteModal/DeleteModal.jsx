import React, { useState } from "react";
import "./DeleteModal.scss";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteModal = ({ product }) => {
  const [modal, setModal] = useState(false);

  const { productId } = useParams();

  const navigate = useNavigate()

  const handleDeleteClick = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://cms-api-ty0d.onrender.com/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.info("Product has been removed")
      toggleModal();
      navigate('/products')
    } catch (error) {
      console.error(error);
    }
  };

  // Function that toggles modal display
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="modal-delete">
      <button onClick={toggleModal} className="btn btn-danger">
        Delete
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>Are you sure you want to remove this product?</h2>
            <div>
              <button className="btn btn-danger" onClick={handleDeleteClick}>
                Remove
              </button>
              <button className="btn btn-dark" onClick={toggleModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
