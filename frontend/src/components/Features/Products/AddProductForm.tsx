import "./AddProductForm.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import { useProduct } from "../../../hooks/useProduct";
import { getBaseUrl } from "../../../utils/getBaseUrl";
import Loader from "../../../utils/Loader/Loader";

interface Product {
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

interface Errors {
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

interface Images {
  url: string;
}

const initState: Product = {
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
};

const errorState: Errors = {
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
};

const initStateImages: Images = {
  url: "",
};

const AddProductForm = () => {
  const [formData, setFormData] = useState(initState);
  const [formLoading, setFormLoading] = useState(false);
  const [productImages, setProductImages] = useState([initStateImages]);
  const [errors, setErrors] = useState(errorState);

  console.log("errors", errors);

  const { setProducts } = useProduct();
  const { token } = useAuth();

  console.log("images", productImages);
  const API = getBaseUrl() + "/api/products";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emptyFields = Object.entries(formData)
      .filter((item) => item[1].trim() === "")
      .map((item) => item[0]);

    const newErrors = {};
    emptyFields.forEach((field) => {
      newErrors[field] = "This field is required";
    });
    if (emptyFields.length > 0) return setErrors(newErrors);
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
        toast.success("Product has been added");
        const newRres = await fetch(API);
        const newData = await newRres.json();
        setProducts(newData);
        setFormData(initState);
      }
    } catch (error: any) {
      console.error(error.message);
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

    setErrors((prev) => ({
      ...prev,
      [e.target.id]: "",
    }));
  };

  return (
    <div className="new-product">
      <h1>Create new product</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-layout">
          <div className="form-group">
            <div className="form-item">
              <label className="visually-hidden" htmlFor="name">
                Name
              </label>
              <input
                className={errors.name && "form-input-error"}
                type="text"
                id="name"
                placeholder="Name..."
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="form-input-error-text">{errors.name}</p>
              )}
            </div>
            <div className="form-item">
              <label className="visually-hidden" htmlFor="category">
                Category
              </label>
              <input
                className={errors.category && "form-input-error"}
                type="text"
                id="category"
                placeholder="Category..."
                value={formData.category}
                onChange={handleChange}
              />
              {errors.category && (
                <p className="form-input-error-text">{errors.category}</p>
              )}
            </div>

            <div className="form-item">
              <label className="visually-hidden" htmlFor="price">
                Price
              </label>
              <input
                className={errors.price && "form-input-error"}
                type="text"
                id="price"
                placeholder="Price..."
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && (
                <p className="form-input-error-text">{errors.price}</p>
              )}
            </div>

            <div className="form-item">
              <label className="visually-hidden" htmlFor="image">
                Image
              </label>
              <input
                className={errors.image && "form-input-error"}
                id="image"
                type="text"
                placeholder="Image..."
                value={formData.image}
                onChange={handleChange}
              />
              {errors.image && (
                <p className="form-input-error-text">{errors.image}</p>
              )}
            </div>
          </div>
          <div className="form-item">
            <label className="visually-hidden" htmlFor="description"></label>
            <textarea
              className={errors.description && "form-input-error"}
              id="description"
              rows={7}
              placeholder="Description..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {errors.name && (
              <p className="form-input-error-text">{errors.description}</p>
            )}
          </div>
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
