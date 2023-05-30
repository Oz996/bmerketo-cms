const User = require("../schemas/userSchema");
const Admin = require("../schemas/adminSchema");

const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ email, password: hashedPassword });

  user
    .save()
    .then(() => {
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        secretKey
      );
      res.status(201).json({ message: "User created", token });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: "Could not create user" });
    });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((data) => {
    if (!data || !bcrypt.compareSync(password, data.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ email: data.email, userId: data._id }, secretKey);
    res.json({ message: "User logged in", token });
  });
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // check if the user is admin
  const isAdmin = await Admin.findOne({ adminId: user.id });

  if (!isAdmin) {
    return res.status(401).json({
      message: "You need to be an admin to login",
    });
  }

  // check password
  const correctPassword = bcrypt.compareSync(password, user.password);

  if (!correctPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  } else {
    const token = jwt.sign({ email: user.email, userId: user._id }, secretKey);
    res.json({ message: "User logged in", token });
  }
};

exports.addAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist, create an account on ecommerce website",
      });
    }

    const admin = await Admin.create({ adminId: user._id });

    if (!admin) {
      return res.status(500).json({ message: "Something went wrong " });
    }

    res
      .status(201)
      .json({ message: "Admin added, you need to login again for it to work" });
  } catch (err) {
    if (err.code == 11000) {
      return res.status(400).json({ message: "This admin already exists" });
    }
  }
};

exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not get users" });
    });
};
