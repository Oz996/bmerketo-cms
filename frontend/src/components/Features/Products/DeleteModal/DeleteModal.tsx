import { RefObject, useEffect, useRef, useState } from "react";
import "./DeleteModal.scss";
import { toast } from "react-toastify";
import { useProduct } from "../../../../hooks/useProduct";
import { useAuth } from "../../../../hooks/useAuth";
import { getBaseUrl } from "../../../../utils/getBaseUrl";
import { BiError } from "react-icons/bi";
import { FaLock } from "react-icons/fa";

interface props {
  dialogRef: RefObject<HTMLDialogElement>;
  locked?: boolean;
}

const DeleteModal = ({ dialogRef, locked }: props) => {
  const [modal, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { token } = useAuth();
  const { setProducts, products, productId, handleRemoveProductId } =
    useProduct();

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
        handleRemoveProductId();
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
      <button
        disabled={locked}
        title={locked ? "Cannot delete base product for showcase reasons" : ""}
        onClick={toggleModal}
        className="btn btn-danger"
      >
        {locked && <FaLock size={12} className="dialog-icon" />}
        Delete
      </button>
      <div className="modal-delete">
        {modal && (
          <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content" ref={modalRef}>
              <div className="modal-delete-title">
                <BiError size={20} style={{ color: "red" }} />
                <h2>Confirm Deletion</h2>
              </div>
              <p>
                This will delete this product permanently. You cannot undo this
                action.
              </p>
              <div className="modal-delete-buttons">
                <button className="btn btn-primary" onClick={toggleModal}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDeleteClick}>
                  Delete
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
