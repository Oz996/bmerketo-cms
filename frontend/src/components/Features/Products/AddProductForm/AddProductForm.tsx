import "./AddProductForm.scss";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../hooks/useAuth";
import { useProduct } from "../../../../hooks/useProduct";
import { getBaseUrl } from "../../../../utils/getBaseUrl";
import Loader from "../../../../utils/Loader/Loader";
import { emptyFields } from "../../../../utils/validateFields";
import { GrClose } from "react-icons/gr";
import { Object, Product } from "../../../../types/types";
import DeleteModal from "../../../DeleteModal/DeleteModal";
import DialogProduct from "../DialogProduct/DialogProduct";

interface Images {
  url: string;
}

const initState: Object = {
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
};

const errorState: Object = {
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
};

const initStateImages: Images = {
  url: "",
};
interface props {
  dialogRef: RefObject<HTMLDialogElement>;
}

const AddProductForm = ({ dialogRef }: props) => {
  const [formData, setFormData] = useState(initState);
  const [formLoading, setFormLoading] = useState(false);
  const [productImages, setProductImages] = useState([initStateImages]);
  const [errors, setErrors] = useState(errorState);
  const [currentProduct, setCurrentProduct] = useState<Product>();

  const {
    products,
    setProducts,
    productId,
    handleRemoveProductId,
    handleAddProductId,
  } = useProduct();
  const { token } = useAuth();

  console.log("currentProduct", currentProduct);
  console.log("formData", formData);

  const dialogOpen = dialogRef.current?.hasAttribute("open");
  console.log("current", dialogOpen);

  // if we clicked on edit a product, fetch the product info through the products id
  // and fill the form with fetched data
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const res = await fetch(getBaseUrl() + `/api/products/${productId}`);
        const data = await res.json();
        setCurrentProduct(data);

        const { name, category, price, images, description } = data;
        setFormData({
          name,
          category,
          price,
          image: images[0].image,
          description,
        });
      };
      fetchProduct();
    } else {
      setFormData(initState);
    }
  }, [productId]);

  useEffect(() => {
    if (productId && dialogOpen) {
      dialogRef.current?.showModal();
      setErrors(initState);
    }
  }, [productId]);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const invalid = emptyFields(formData, setErrors);
    if (invalid) return;

    const dataObject = {
      ...formData,
      images: [{ image: formData.image }],
    };
    try {
      setFormLoading(true);
      const res = await fetch(getBaseUrl() + `/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataObject),
      });

      if (res.status === 201) {
        const data = await res.json();
        console.log("post res", data);

        const { name, category, price, image, description } = formData;
        const newProduct = {
          name,
          category,
          price,
          images: [{ image }],
          description,
          _id: data._id,
        };

        console.log("newProduct", newProduct);

        setProducts((prev) => [...prev, newProduct]);

        toast.success("Product has been added");
        setFormData(initState);
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error("error");
    } finally {
      setFormLoading(false);
    }
  };

  const handlePutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const invalid = emptyFields(formData, setErrors);
    if (invalid) return;

    try {
      setFormLoading(true);

      const res = await fetch(getBaseUrl() + `/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const { name, category, price, image, description } = formData;

        const productIndexToUpdate = products!.findIndex(
          (product) => product._id === productId
        );

        if (productIndexToUpdate !== -1) {
          const updatedProduct = {
            name,
            category,
            price,
            images: [{ image }],
            description,
            _id: productId,
          };

          const updatedProductList = [...products!];
          updatedProductList[productIndexToUpdate] = updatedProduct;

          console.log("updatedProductList", updatedProductList);

          setProducts(updatedProductList);
        }

        setFormData(initState);
        handleRemoveProductId();
        toast.success("Product has been updated");
      }
    } catch (error: any) {
      console.error(error);
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

  const handleCancelEdit = () => {
    handleRemoveProductId();
    setFormData(initState);
  };

  return (
    <div className="new-product">
      <h1>{productId ? "Update product" : "Create product"}</h1>
      <form
        className="create-form"
        onSubmit={productId ? handlePutSubmit : handlePostSubmit}
      >
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
          {productId && (
            <button
              className="btn btn-danger"
              disabled={formLoading}
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
          <button className="btn btn-primary" disabled={formLoading}>
            {formLoading ? <Loader /> : "Submit"}
          </button>
        </div>
      </form>

      <DialogProduct
        dialogRef={dialogRef}
        currentProduct={currentProduct!}
        // setDialogOpen={setDialogOpen}
      />
    </div>
  );
};

export default AddProductForm;
