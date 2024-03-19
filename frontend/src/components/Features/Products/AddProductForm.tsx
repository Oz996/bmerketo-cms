import "./AddProductForm.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import { useProduct } from "../../../hooks/useProduct";
import { getBaseUrl } from "../../../utils/getBaseUrl";
import Loader from "../../../utils/Loader/Loader";

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
  _id: "",
  name: "",
  category: "",
  price: "",
  description: "",
};

const initStateImages: Images = {
  url: "",
  error: "",
};

const AddProductForm = () => {
  const [formData, setFormData] = useState(initState);
  const [formLoading, setFormLoading] = useState(false);
  const [productImages, setProductImages] = useState([initStateImages]);

  const { setProducts } = useProduct();
  const { token } = useAuth();

  console.log("images", productImages);
  const API = getBaseUrl() + "/api/products";

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

      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataObject),
      });

      if (res.status === 201) {
        toast.success("Product has been added");
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
    <div className="new-product">
      <h1>Create new product</h1>
      <form className="create-form" onSubmit={addProduct}>
        <div className="form-layout">
          <div className="form-group">
            <label className="visually-hidden" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name..."
              value={formData.name}
              onChange={handleChange}
            />

            <label className="visually-hidden" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              placeholder="Category..."
              value={formData.category}
              onChange={handleChange}
            />

            <label className="visually-hidden" htmlFor="price">
              Price
            </label>
            <input
              type="text"
              id="price"
              placeholder="Price..."
              value={formData.price}
              onChange={handleChange}
            />

            {productImages?.map((image, index) => (
              <input
                id="image"
                type="text"
                placeholder="Image..."
                value={image.url}
                onChange={(e) => handleImageChange(e, index)}
              />
            ))}
          </div>
          <label className="visually-hidden" htmlFor="description"></label>
          <textarea
            id="description"
            rows={7}
            placeholder="Description..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="create-button-div">
          <button className="btn btn-primary" disabled={formLoading}>
            {formLoading ? <Loader /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;