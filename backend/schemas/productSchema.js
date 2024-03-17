const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  image: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  images: [imageSchema],
  related: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  // locked: { type: Boolean, default: true },
});

// chatgpt solution - adds products to related array
productSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const relatedProducts = await this.constructor
        .find({
          category: this.category,
          _id: { $ne: this._id },
        })
        .limit(4);

      this.related = relatedProducts.map((product) => product._id);
    } catch (error) {
      next(error);
    }
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
