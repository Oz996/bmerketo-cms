import { useState } from "react";
import "./Products.scss";
import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import { toast } from "react-toastify";
import LoaderDark from "../../utils/Loader/LoaderDark.tsx";
import { Product } from "../../types/types";
import { useProduct } from "../../hooks/useProduct.tsx";
import Loader from "../../utils/Loader/Loader.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";

const initState: Product = {
  _id: crypto.randomUUID(),
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
};

const Products = () => {
  const [formData, setFormData] = useState(initState);
  const [formLoading, setFormLoading] = useState(false);

  const { products, setProducts, isLoading } = useProduct();
  const { token } = useAuth()

  const API = "https://cms-api-ty0d.onrender.com/api/products";

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, image, category, price, description } = formData;
    if (
      name == "" ||
      image == "" ||
      category == "" ||
      price == "" ||
      description == ""
    ) {
      return toast.error("Fill out all the fields");
    }
    try {
      setFormLoading(true);
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 201) {
        toast.info("Product has been added");
        const newRres = await fetch(API);
        const newData = await newRres.json();
        setProducts(newData);
        setFormData(initState);
      }
    } catch (error) {
      console.error(error);
      toast.error("error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
          <div className="form-div">
            <div className="form-group">
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
            </div>
            <div className="form-group">
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
            </div>
          </div>
          <div className="form-bottom">
            <label htmlFor="description">
              <textarea
                id="description"
                rows={7}
                placeholder="Description..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </label>
          </div>
          <button className="btn btn-primary"
          disabled={formLoading}>
            {formLoading ? <Loader  /> : "Add"}
          </button>
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
export default Products;
