const router = require("express").Router();
const orderModel = require("../models/orderModel");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/user", authMiddleware, orderModel.getAllOrdersForUser);

router.post("/", authMiddleware, orderModel.createOrder);

router.get("/", authMiddleware, orderModel.getAllOrders);

router.get("/:id", authMiddleware, orderModel.getOrderById);

router.patch("/:id", authMiddleware, orderModel.updateStatus);

module.exports = router;
