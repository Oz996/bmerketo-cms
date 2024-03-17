const Product = require("../schemas/productSchema");
const Review = require("../schemas/reviewSchema");

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
    .populate("related")
    .populate("review")
    .then((data) => res.status(200).json(data))
    .catch(() =>
      res.status(500).json({ message: "Could not retrieve products" })
    );
};

// Add a product

exports.addProduct = (req, res) => {
  const { name, price, images, category, description } = req.body;

  if (!name || !price || !category || !description) {
    res.status(400).json({ message: "Product incomplete" });
    return;
  }
  console.log("backend images", images);
  Product.create({
    name,
    price,
    images,
    category,
    description,
  })
    .then((data) => res.status(201).json(data))
    .catch(() => res.status(500).json({ message: "Could not add product" }));
};

exports.addReview = async (req, res) => {
  try {
    const { rating, name, email, review } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    console.log(productId);
    console.log(product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newReview = new Review({
      rating,
      name,
      email,
      review,
    });

    await newReview.save();

    product.review.push(newReview);
    await product.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Could not add the review" });
  }
};

// Find a product by ID and update

exports.updateProduct = (req, res) => {
  const { name, price, images, category, description } = req.body;

  Product.findByIdAndUpdate(req.params.id).then((data) => {
    if (!data) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name,
          price,
          images,
          category,
          description,
        },
      }
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
