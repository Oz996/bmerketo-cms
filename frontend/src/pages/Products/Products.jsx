import React, { useState, useEffect } from "react";
import "./Products.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import { toast } from "react-toastify";
import LoaderDark from "../../utils/Loader/LoaderDark";

const initState = {
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
};

const Product = () => {
  const [formData, setFormData] = useState(initState);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rerenderFetch, setRerenderFetch] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://cms-api-ty0d.onrender.com/api/products"
        );
        const data = await res.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };
    fetchProducts();
  }, [rerenderFetch]);

  const addProduct = async (e) => {
    const { name, image, category, price, description } = formData;
    if (
      name == "" ||
      image == "" ||
      category == "" ||
      price == "" ||
      description == ""
    ) {
      toast.error("Fill out all fields");
    }
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://cms-api-ty0d.onrender.com/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(res);
      if (res.status === 201) {
        toast.info("Product has been added");
        setRerenderFetch(true);
        setFormData(initState);
      }
    } catch (error) {
      console.error(error);
      toast.error("error");
    }
  };

  const handleChange = (e) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <section className="product-container">
      {/* Add product form */}
      <div className="new-product">
        <h1>Add New Product</h1>
        <form onSubmit={addProduct}>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              placeholder="Name..."
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="category">
            <input
              type="text"
              id="category"
              placeholder="Category..."
              value={formData.category}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="image">
            <input
              type="text"
              id="image"
              placeholder="ImageURL..."
              value={formData.image}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            <input
              type="text"
              id="price"
              placeholder="Price..."
              value={formData.price}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            <textarea
              id="description"
              rows="10"
              placeholder="Description..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </label>
          <button className="btn btn-dark">Add </button>
        </form>
      </div>
      <hr style={{ marginTop: "5rem" }} />

      {/* Listing the products  */}
      <div className="product-list">
        {isLoading && <LoaderDark />}
        {products?.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};
export default Product;
