import "./ProductCard.scss";
import { useLocation } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Product } from "../../../types/types";
import { RefObject } from "react";
import { useProduct } from "../../../hooks/useProduct";
import LoaderDark from "../../../utils/Loader/LoaderDark";

interface props {
  products: Product[];
  dialogRef?: RefObject<HTMLDialogElement>;
}

const ProductCard = ({ products, dialogRef }: props) => {
  const location = useLocation();
  const orderPage = location.pathname.includes("/order");

  const { handleAddProductId, isLoading } = useProduct();

  const handleClick = (id: string) => {
    if (!orderPage) {
      handleAddProductId(id);
      dialogRef?.current?.showModal();
    }
  };

  return (
    <div className="product-list">
      {isLoading && <LoaderDark />}
      {products?.map((product) => (
        <article
          key={product?._id}
          className="product"
          onClick={() => handleClick(product?._id)}
        >
          <div className="product-info">
            <img src={product?.images[0]?.image} alt={product?.name} />
            <p>{product?.name}</p>
            {!product?._id && <p>Product has been removed</p>}
            {!orderPage && (
              <p className="order-edit-text">
                <b>Edit</b> <AiOutlineArrowRight className="hover" />
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default ProductCard;
