import React, { RefObject } from "react";
import "./DialogProduct.scss";
import { useProduct } from "../../../../hooks/useProduct";
import { GrClose } from "react-icons/gr";
import { Product } from "../../../../types/types";
import DeleteModal from "../DeleteModal/DeleteModal";
import { FaLock } from "react-icons/fa";
import { scrollToTopSmooth } from "../../../../utils/scrolls";

interface props {
  dialogRef: RefObject<HTMLDialogElement>;
  currentProduct: Product;
}

const initState: Object = {
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
};

const DialogProduct = ({ dialogRef, currentProduct }: props) => {
  const { handleRemoveProductId, handleAddProductId } = useProduct();
  const handleClickOutside = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDialogElement;
    if (target.nodeName === "DIALOG") {
      target.close();
      dialogRef.current?.close();
      handleRemoveProductId();
    }
  };

  const handleEditProduct = (id: string) => {
    handleAddProductId(id);
    dialogRef!.current?.close();
    scrollToTopSmooth();
  };

  console.log("current modal", currentProduct);

  const { name, category, price, images, description, _id, locked } =
    currentProduct || {};
  return (
    <dialog
      ref={dialogRef}
      className="product-dialog"
      onClick={handleClickOutside}
    >
      <div className="product-dialog-content">
        <GrClose
          size={12}
          className="dialog-close-icon"
          onClick={() => {
            dialogRef!.current?.close();
          }}
        />
        <div className="dialog-image">
          {images && <img src={images[0]?.image} alt={name} />}
        </div>

        <div className="product-dialog-body">
          <h2>{name}</h2>
          <span>{category}</span>
          <span>£{price}</span>
          <p>{description}</p>
          <span>{_id}</span>
        </div>
        <div className="dialog-buttons-sticky">
          <button
            title={
              locked ? "Cannot edit base product for showcase reasons" : ""
            }
            disabled={locked}
            onClick={() => handleEditProduct(_id)}
            className="btn btn-primary"
          >
            {locked && <FaLock size={12} className="dialog-icon" />}
            Edit
          </button>

          <DeleteModal locked={locked} dialogRef={dialogRef} />
        </div>
      </div>
    </dialog>
  );
};

export default DialogProduct;
