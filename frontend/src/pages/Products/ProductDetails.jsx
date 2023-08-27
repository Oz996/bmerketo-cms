import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsLockFill } from "react-icons/bs";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import "./ProductDetails..scss";
import { toast } from "react-toastify";

const Details = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

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

  const editProduct = async () => {
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
      if (res.ok) {
        toast.info("Product has been updated");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveClick = () => {
    editProduct();
    navigate("/products");
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
      console.log(data)
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
      <figure className="img-figure">
        <img className="product-img" src={product.image} alt={product.name} />
      </figure>
      <section className="product-details">
        <div className="edit-product">
          {isEditing ? (
            <form>
              <div className="form-div">
                <div className="form-group">
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Price:
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Category:
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    ImageURL:
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className="form-bottom">
                <label>
                  Description:
                  <textarea
                    name="description"
                    rows="15"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </label>
              </div>
              <div className="product-buttons">
                <button className="btn btn-primary" onClick={handleSaveClick}>
                  Save
                </button>
                <button className="btn btn-danger" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </form>
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
                {product.locked ? (
                  <>
                    <button
                      className="btn btn-primary"
                      disabled
                      title="Cannot edit base products for showcase reasons"
                    >
                      <BsLockFill /> Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      disabled
                      title="Cannot delete base products for showcase reasons"
                    >
                      <BsLockFill /> Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                    <DeleteModal product={product} />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Details;
