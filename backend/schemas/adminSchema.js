const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  adminId: { type: Schema.Types.ObjectId, unique: true },
});

module.exports = mongoose.model("Admin", adminSchema);
