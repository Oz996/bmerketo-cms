const router = require("express").Router();
const productModel = require("../models/productModel");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", productModel.getAllProducts);

router.get("/:id", productModel.getProductById);

router.post("/", productModel.addProduct);

router.post("/:id", productModel.addReview);

router.put("/:id", authMiddleware, productModel.updateProduct);

router.delete("/:id", authMiddleware, productModel.deleteProduct);

module.exports = router;
