// Import the required modules
const express = require("express");
const app = express.Router();

// Import the required controllers and middleware functions
const {
  newProduct,
  getlatestProducts,
  getSingleProduct,
  getAllCategories,
  deleteProduct,
  getAllProducts,
  updateProduct
} = require("../controllers/Product");
const { isAdmin, auth } = require("../middlewares/auth");
const { deleteOne } = require("../models/Product");
// Route for user login
app.post("/create", auth, isAdmin, newProduct);
app.get("/latest-products", getlatestProducts);
app.get('/categories',getAllCategories)
app.get("/all",getAllProducts);
app.get("/:id", getSingleProduct); // Route for GET requests to /:id
app.delete("/:id",auth,isAdmin, deleteProduct); // Route for DELETE requests to /:id
app.put("/:id",updateProduct);
module.exports = app;
