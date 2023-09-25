import { useState, useEffect } from "react";
import "./Products.scss";
import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import { toast } from "react-toastify";
import LoaderDark from "../../utils/Loader/LoaderDark.tsx";
import { Product } from "../../types/Product.ts";

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
  const [products, setProducts] = useState<Product[] | null>(null);
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

  const addProduct = async (e: React.FormEvent) => {
    const { name, image, category, price, description } = formData;
    if (
      name == "" ||
      image == "" ||
      category == "" ||
      price == "" ||
      description == ""
    ) {
      toast.error("Fill out all the fields");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          <button className="btn btn-primary">Add </button>
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
