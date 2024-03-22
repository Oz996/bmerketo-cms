import { useEffect, useRef, useState } from "react";
import "./DeleteModal.scss";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useProduct } from "../../hooks/useProduct";
import { useAuth } from "../../hooks/useAuth";
import { getBaseUrl } from "../../utils/getBaseUrl";

interface props {
  dialogRef: React.RefObject<HTMLDialogElement>;
}

const DeleteModal = ({ dialogRef }: props) => {
  const [modal, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { _id } = useParams();
  const { token } = useAuth();
  const { setProducts, products, productId } = useProduct();

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
    try {
      const res = await fetch(getBaseUrl() + `/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 410) {
        toast.success("Product has been removed");
        toggleModal();
        dialogRef.current?.close();

        // removing the product from the product list after deletion
        const productsList = [...products!];
        const newProductList = productsList.filter(
          (product) => product._id !== productId
        );
        setProducts(newProductList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={toggleModal} className="btn btn-danger">
        Delete
      </button>
      <div className="modal-delete">
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
    </>
  );
};

export default DeleteModal;
