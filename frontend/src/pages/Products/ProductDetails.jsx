import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import "./ProductDetails..scss";

const Details = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

  const handleChange = (e) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://cms-api-ty0d.onrender.com/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `https://cms-api-ty0d.onrender.com/api/products/${productId}`
      );
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // If you return to the page of a deleted product it will display a text and a link back to the product page
  if (!product) {
    return (
      <>
        <h2 className="removed">Product has been removed</h2>
        <Link to="/products">
          <p className="removed-link">Back</p>
        </Link>
      </>
    );
  }

  return (
    <>
      <img className="product-img" src={product.image} alt={product.name} />
      <section className="product-details">
        <div className="edit-product">
          {isEditing ? (
            <>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
              <label>ImageURL:</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
              <label>Description:</label>
              <textarea
                name="description"
                rows="15"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              <div className="product-buttons">
                <button className="btn btn-primary" onClick={handleSaveClick}>
                  Save
                </button>
                <button className="btn btn-danger" onClick={handleCancelClick}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p>
                <b>Name: </b>
                {product.name}
              </p>
              <p>
                <b>Price: </b> {product.price}
              </p>
              <p>
                <b>Category: </b>
                {product.category}
              </p>
              <p>
                <b>Description: </b>
                {product.description}
              </p>
              <div className="product-buttons">
                <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
                <DeleteModal product={product} />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Details;
