const mongoose = require("mongoose");
const validator = require("validator");

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      unique: [true, "Email already Exist"],
      required: [true, "Please enter Name"],
      validate: validator.default.isEmail,
    },
    // Define the password field with type String and required
    password: {
      type: String,
      required: true,
    },
    // Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
    accountType: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    // cart: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Cart",
    //   },
    // ],
    token: {
      type: String,
    },
    image: {
      type: String,
      required: [true, "Please add Photo"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", schema);