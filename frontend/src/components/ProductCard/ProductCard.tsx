import "./ProductCard.scss";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Product } from "../../types/types";
import React from "react";
import { useProduct } from "../../hooks/useProduct";

interface props {
  product: Product;
  setDialogOpen: any;
}

const ProductCard = ({ product, setDialogOpen }: props) => {
  const location = useLocation();
  const orderPage = location.pathname.includes("/orders");

  const { handleAddProductId } = useProduct();

  const handleClick = (id: string) => {
    handleAddProductId(id);
    setDialogOpen(true);
  };

  return (
    // <Link to={`/products/${product?._id}`}>
    <article className="product" onClick={() => handleClick(product?._id)}>
      <div className="product-info">
        <img src={product?.images[0]?.image} alt={product?.name} />
        <p>{product?.name}</p>
        {!orderPage && (
          <p className="order-edit-text">
            <b>Edit</b> <AiOutlineArrowRight className="hover" />
          </p>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
