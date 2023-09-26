import { useEffect, useRef, useState } from "react";
import "./DeleteModal.scss";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useProduct } from "../../hooks/useProduct";

const DeleteModal = () => {
  const [modal, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { productId } = useParams();
  const { setProducts } = useProduct();

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        setModal(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function that toggles modal display
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDeleteClick = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch(
        `https://cms-api-ty0d.onrender.com/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.info("Product has been removed");
      toggleModal();
      const newRes = await fetch(
        "https://cms-api-ty0d.onrender.com/api/products"
      );
      const newData = await newRes.json();
      setProducts(newData);
      navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-delete">
      <button onClick={toggleModal} className="btn btn-danger">
        Delete
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content" ref={modalRef}>
            <h2>Are you sure you want to remove this product?</h2>
            <div>
              <button className="btn btn-danger" onClick={handleDeleteClick}>
                Remove
              </button>
              <button className="btn btn-primary" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
