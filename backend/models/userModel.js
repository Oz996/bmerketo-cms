const User = require("../schemas/userSchema");

const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
// User can also registered as an admin by sending a isAdmin: true along with email and password.

exports.registerUser = (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ email, password: hashedPassword });

  user
    .save()
    .then(() => {
      const token = jwt.sign(
        { email: user.email, userId: user._id, isAdmin: user.isAdmin },
        secretKey
      );
      res.status(201).json({ message: "User created", token });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: "Could not create user" });
    });
};

// Log in

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((data) => {
    if (!data || !bcrypt.compareSync(password, data.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ email: data.email, userId: data._id }, secretKey);
    res.json({ message: "User logged in", token });
  });
};

// Log in as admin

exports.loginAdmin = async (req, res) => {
  const { email, password } = await req.body;
  try {
    const admin = await User.findOne({ email: email, isAdmin: true });

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: admin.email, userId: admin._id },
      secretKey
    );
    res.json({ message: "Welcome admin", token });
  } catch {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error logging in as admin", error: error });
  }
};

// Create admin from existing user (promote)

exports.createAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isAdmin) {
      return res.status(400).json({ message: "User is already an admin" });
    }

    user.isAdmin = true;
    await user.save();

    res.status(200).json({ message: "User is now admin" });
  } catch {
    res.status(500).json({ message: "Failed to create admin" });
  }
};

// Get users

exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not get users" });
    });
};
