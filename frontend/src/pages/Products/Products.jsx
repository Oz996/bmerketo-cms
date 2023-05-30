import React, { useState, useContext } from "react";
import "./Products.scss";
import "./ProductList.scss";
import { ProductContext } from "../../contexts/ProductContext";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const initState = {
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
};

const Product = () => {
  const [formData, setFormData] = useState(initState);
  const [isAdded, setIsAdded] = useState(false);

  const { products } = useContext(ProductContext);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:7000/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      if (res.ok) {
        setIsAdded(true);
        setTimeout(() => {
          setIsAdded(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <section className="product-container">
      {/* Add product form */}
      <div className="new-product">
        <h1>Add new Product</h1>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            placeholder="Name..."
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category..."
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="ImageURL..."
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price..."
            onChange={handleChange}
          />
          <textarea
            name="description"
            rows="7"
            placeholder="Description..."
            onChange={handleChange}
          ></textarea>
          {isAdded && <p className="added"> Product has been added</p>}
          <button>Add </button>
        </form>
      </div>
      <hr style={{ marginTop: "5rem" }} />

      {/* Listing the products  */}
      <div className="product-list">
        {products?.map((product) => (
          <div key={product._id} className="product">
            <div className="product-info">
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <Link to={`/products/${product._id}`}>
                <p className="order-edit-text">
                  <b>Edit</b> <AiOutlineArrowRight className="hover" />
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Product;
