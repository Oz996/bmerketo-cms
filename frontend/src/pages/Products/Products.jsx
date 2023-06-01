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

  const addProduct = async (e) => {
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
      if (res.ok) {
        setIsAdded(true);
        setTimeout(() => {
          setIsAdded(false);
        }, 3000);
        setFormData(initState)
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
        <form onSubmit={addProduct}>
          <input
            type="text"
            name="name"
            placeholder="Name..."
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category..."
            value={formData.category}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="ImageURL..."
            value={formData.image}
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price..."
            value={formData.price}
            onChange={handleChange}
          />
          <textarea
            name="description"
            rows="7"
            placeholder="Description..."
            value={formData.description}
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
