import { createSlice } from "@reduxjs/toolkit";
import { getSingleProduct } from "../services/operations/productAPI";

const initialState = {
  singleProduct:{},
  allProducts: [],
  latestProducts: [],
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },setLoading(state, value) {
      state.loading = value.payload;
    },
    setLatestProducts: (state, action) => {
      state.latestProducts = action.payload;
    },
    setSingleProduct:(state,action) => {
      state.singleProduct = action.payload
    },
    resetProductState: (state) => {
      state.latestProducts = [];
      state.allProducts = [];
    },
  },
});

export const { setAllProducts, setLatestProducts, resetProductState,setLoading,setSingleProduct} =
  productSlice.actions;

export default productSlice.reducer;
