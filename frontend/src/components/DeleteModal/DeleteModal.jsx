import React, { useState } from "react";
import "./DeleteModal.scss";
import { useNavigate, useParams } from "react-router-dom";

const DeleteModal = ({ product }) => {
  const [modal, setModal] = useState(false);

  const { productId } = useParams();

  const navigate = useNavigate()

  const handleDeleteClick = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:7001/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toggleModal();
      navigate('/products')
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="modal-delete">
      <button onClick={toggleModal} className="btn-delete">
        Delete
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>Are you sure you want to remove this product?</h2>
            <div>
              <button onClick={handleDeleteClick} className="btn-delete">
                Yes
              </button>
              <button onClick={toggleModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
