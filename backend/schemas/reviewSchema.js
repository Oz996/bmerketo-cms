const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  name: { type: String },
  email: { type: String, required: true },
  review: { type: String },
});

module.exports = mongoose.model("Review", reviewSchema)
