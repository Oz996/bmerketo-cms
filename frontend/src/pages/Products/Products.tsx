import { useState } from "react";
import "./Products.scss";
import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import { toast } from "react-toastify";
import LoaderDark from "../../utils/Loader/LoaderDark.tsx";
import { useProduct } from "../../hooks/useProduct.ts";
import Loader from "../../utils/Loader/Loader.tsx";
import { useAuth } from "../../hooks/useAuth.ts";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  image2: string;
  image3: string;
  image4: string;
  description: string;
}

const initState: Product = {
  _id: crypto.randomUUID(),
  name: "",
  category: "",
  price: "",
  image: "",
  image2: "",
  image3: "",
  image4: "",
  description: "",
};

const Products = () => {
  const [formData, setFormData] = useState(initState);
  const [formLoading, setFormLoading] = useState(false);

  const { products, setProducts, isLoading } = useProduct();
  const { token } = useAuth();

  // const API = "http://localhost:7000/api/products";
  const API = "https://cms-api-ty0d.onrender.com/api/products";

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, image, category, price, description } = formData;
    if (!name || !image || !category || !price || !description) {
      return toast.error("Fill out the required fields");
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
          <div className="form-group">
            <label htmlFor="image2">
              <input
                type="text"
                id="image2"
                placeholder="ImageURL2..."
                value={formData.image2}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="image3">
              <input
                type="text"
                id="image3"
                placeholder="ImageURL3..."
                value={formData.image3}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="image4">
              <input
                type="text"
                id="image4"
                placeholder="ImageURL4..."
                value={formData.image4}
                onChange={handleChange}
              />
            </label>
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
          <button className="btn btn-primary" disabled={formLoading}>
            {formLoading ? <Loader /> : "Add"}
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
