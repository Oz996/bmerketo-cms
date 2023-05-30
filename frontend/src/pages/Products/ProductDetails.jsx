import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import './ProductDetails..scss'

const Details = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

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
        `http://localhost:7000/api/products/${productId}`,
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
        `http://localhost:7000/api/products/${productId}`
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

  return (
    <>
      <img className="product-img" src={product.image} alt={product.name} />
      <section className="product-details">
        <div className="edit-product">
          {isEditing ? (
            <>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
              <label htmlFor="image">ImageURL:</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                rows="15"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              <div className="product-buttons">
                <button onClick={handleSaveClick} className="btn-save">Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
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
                <button onClick={handleEditClick}>Edit</button>
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
