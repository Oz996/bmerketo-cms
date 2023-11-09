import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsLockFill } from "react-icons/bs";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import "./EditDetails.scss";
import { toast } from "react-toastify";
import { Product } from "../../types/types";
import { FormData } from "../../types/types";
import { useProduct } from "../../hooks/useProduct";
import { useAuth } from "../../hooks/useAuth";

const ProductDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    _id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    image2: "",
    image3: "",
    image4: "",
  });
  const { _id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { setProducts } = useProduct();

  useEffect(() => {
    if (product) {
      setFormData({
        _id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        image2: product.image2!,
        image3: product.image3!,
        image4: product.image4!,
      });
    }
  }, [product]);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `https://cms-api-ty0d.onrender.com/api/products/${_id}`
      );
      const data = await res.json();
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  const editProduct = async () => {
    setIsEditing(false);
    try {
      const res = await fetch(
        `https://cms-api-ty0d.onrender.com/api/products/${_id}`,
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
        const newRes = await fetch(
          "https://cms-api-ty0d.onrender.com/api/products"
        );
        const newData = await newRes.json();
        setProducts(newData);
        toast.info("Product has been updated");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    editProduct();
    navigate("/products");
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <figure className="img-figure">
        <img className="product-img" src={product?.image} alt={product?.name} />
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
              <label>
                ImageURL2:
                <input
                  type="text"
                  name="image"
                  value={formData.image2}
                  onChange={handleChange}
                />
              </label>
              <label>
                ImageURL3:
                <input
                  type="text"
                  name="image"
                  value={formData.image3}
                  onChange={handleChange}
                />
              </label>
              <label>
                ImageURL4:
                <input
                  type="text"
                  name="image"
                  value={formData.image4}
                  onChange={handleChange}
                />
              </label>
              <div className="form-bottom">
                <label>
                  Description:
                  <textarea
                    name="description"
                    rows={15}
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
                <b>Id: </b>
                {product?._id}
              </p>
              <p>
                <b>Name: </b>
                {product?.name}
              </p>
              <p>
                <b>Price: </b> {product?.price}
              </p>
              <p>
                <b>Category: </b>
                {product?.category}
              </p>
              <p>
                <b>Description: </b>
                {product?.description}
              </p>
              <div className="product-buttons">
                {product?.locked ? (
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
                    <DeleteModal />
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

export default ProductDetails;