const Order = require("../schemas/orderSchema");
const User = require("../schemas/userSchema");

exports.createOrder = (req, res) => {
  const { products } = req.body;
  const userId = req.user.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }

      const order = new Order({
        user: userId,
        products: products,
      });

      return order.save();
    })
    .then((savedOrder) => {
      res.status(201).json(savedOrder);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Could not create order" });
    });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", ["email"])
    .populate("products.product")
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not retrieve orders" });
    });
};

exports.getOrderById = (req, res) => {
  Order.findById(req.params.id)
    .populate("user", ["email"])
    .populate("products.product")
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not retrieve order" });
    });
};

exports.getAllOrdersForUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const orders = await Order.find({ user: userId })
      .populate("user", ["email"])
      .populate("products.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  // status: "pending", "in transit", "delivered"
  const { status } = req.body;
  try {
    const newOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    )
      .populate("user", ["email"])
      .populate("products.product");
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Could not update order" });
  }
};
