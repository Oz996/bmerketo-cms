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
  description: string;
}

interface Images {
  url: string;
  error: string;
}

const initState: Product = {
  _id: crypto.randomUUID(),
  name: "",
  category: "",
  price: "",
  description: "",
};

const initStateImages: Images = {
  url: "",
  error: "",
};

const Products = () => {
  const [formData, setFormData] = useState(initState);
  const [formLoading, setFormLoading] = useState(false);
  const [productImages, setProductImages] = useState([initStateImages]);

  const { products, setProducts, isLoading } = useProduct();
  const { token } = useAuth();

  console.log("images", productImages);
  const API = "http://localhost:7000/api/products";
  // const API = "https://cms-api-ty0d.onrender.com/api/products";

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, category, price, description } = formData;
    if (!name || !category || !price || !description) {
      return toast.error("Fill out the required fields");
    }
    for (const image of productImages) {
      if (!image.url) return toast.error("Fill out the required fields");
    }
    try {
      setFormLoading(true);
      const dataObject = {
        ...formData,
        images: productImages.map((image) => ({ image: image.url })),
      };
      console.log("payload", dataObject);
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataObject),
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
    setFormData((data) => ({
      ...data,
      [e.target.id]: e.target.value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newUrl = e.target.value;
    const updatedUrl = {
      ...productImages[index],
      url: newUrl,
    };
    const updatedImages = [...productImages];
    updatedImages[index] = updatedUrl;
    setProductImages(updatedImages);
  };

  return (
    <section className="product-container">
      {/* Add product form */}
      <div className="new-product">
        <h1>Add New Product</h1>
        <form onSubmit={addProduct}>
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
            <label htmlFor="price">
              <input
                type="text"
                id="price"
                placeholder="Price..."
                value={formData.price}
                onChange={handleChange}
              />
            </label>
            {productImages?.map((image, index) => (
              <input
                type="text"
                placeholder="Image..."
                value={image.url}
                onChange={(e) => handleImageChange(e, index)}
              />
            ))}
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
