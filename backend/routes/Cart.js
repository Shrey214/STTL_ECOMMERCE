const express = require("express");
const { createCart, getCartForUser } = require("../controllers/Cart");
const { auth } = require("../middlewares/auth");

const app = express.Router();

/**
 * @Request : POST
 * @Route : /api/v1/cart/create
 */
app.post("/cart/create", auth,createCart);

/**
 * @Request : GET
 * @Route : /api/v1/cart
 */
app.get("/cart",auth,getCartForUser)
module.exports = app;