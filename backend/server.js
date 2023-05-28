const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("http://localhost:" + PORT));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db");
  } catch (err) {
    console.log(err.message);
  }
};

connect();
