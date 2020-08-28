const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    alias: String,
    icon: String,
    email: String,
    googleId: String,
    isAdmin: {type: Boolean, default: false}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);