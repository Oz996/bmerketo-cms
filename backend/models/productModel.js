const Product = require("../schemas/productSchema");

// Get all products

exports.getAllProducts = (req, res) => {
  Product.find()
    .then((data) => res.status(200).json(data))
    .catch(() =>
      res.status(500).json({ message: "Could not retrieve products" })
    );
};

exports.getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch(() =>
      res.status(500).json({ message: "Could not retrieve products" })
    );
};

// Add a product

exports.addProduct = (req, res) => {
  const { name, price, image, image2, image3, image4, category, description } =
    req.body;

  if (!name || !price || !category || !description) {
    res.status(400).json({ message: "Product incomplete" });
    return;
  }

  Product.create({
    name,
    price,
    image,
    image2,
    image3,
    image4,
    category,
    description,
  })
    .then((data) => res.status(201).json(data))
    .catch(() => res.status(500).json({ message: "Could not add product" }));
};

// Find a product by ID and update

exports.updateProduct = (req, res) => {
  const { name, price, image, image2, image3, image4, category, description } = req.body;

  Product.findByIdAndUpdate(req.params.id).then((data) => {
    if (!data) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    Product.updateOne(
      { _id: req.params.id },
      { $set: { name, price, image, category, image2, image3, image4, description } }
    )
      .then(() => {
        res.status(200).json({ message: "Product updated" });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  });
};

// Remove a product

exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id).then((data) => {
    if (!data) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(410).json({ message: "Product deleted" });
  });
};
