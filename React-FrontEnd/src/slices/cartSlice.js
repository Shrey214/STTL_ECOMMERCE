import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  subtotal: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const product = action.payload;
      // console.log("Add", product);

      const index = state.cart.findIndex((item) => item._id === product._id);

      if (index >= 0) {
        // If the course is already in the cart, do not modify the quantity
        console.log("Repeating");
        toast.error("Product already in cart");
        return;
      }
      // If the course is not in the cart, add it to the cart
      state.cart.push(product);
      // Update the total quantity and price
      state.totalItems++;
      state.total += product.price;
      // Update to localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      // show toast
      toast.success("Product added to LocalStoragee");
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      console.log(productId);
      const index = state.cart.findIndex((item) => item._id === productId);

      if (index >= 0) {
        // If the course is found in the cart, remove it
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);
        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        // show toast
        toast.success("Product removed from cart");
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      // Update to localstorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
    setCartData: (state, action) => {
      console.log("Action",action.payload);
      state.cart = action.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const {
  addCart,
  removeFromCart,
  resetCart,
  setLoading,
  setCartData,
  getCartData,
} = cartSlice.actions;

export default cartSlice.reducer;
