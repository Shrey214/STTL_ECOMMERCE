import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { productEndpoints } from "../apis";
import {
  setLoading,
  setAllProducts,
  setLatestProducts,
  setSingleProduct,
} from "../../slices/productSlice";
const {
  GET_ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_LATEST_PRODUCTS,
  GET_SINGLE_PRODUCT,
} = productEndpoints;

export function getAllProducts(token) {
  return async (dispatch) => {
    console.log("Inside details");
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_ALL_PRODUCTS, null, {
        Authorization: `Bearer ${token}`,
      });
      // console.log("GET_USER_DETAILS API RESPONSE............", response.data.products)

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setAllProducts([...response.data.products]));
      // console.log("Response",response);
      // navigate("/products");
    } catch (error) {
      // dispatch(logout(navigate))
      console.log("GET_All_Products_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function getLatestProducts(token) {
  return async (dispatch) => {
    console.log("Inside details");
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_LATEST_PRODUCTS, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log(
        "GET_Latest_Products_DETAILS API RESPONSE............",
        response.data.products
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setAllProducts({ ...response.data.products }));
    } catch (error) {
      // dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function getSingleProduct(token, id) {
  return async (dispatch) => {
    console.log("Inside details");
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "GET",
        GET_SINGLE_PRODUCT + `/product/${id}`,
        id,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(
        "GET_SINGLE_PRODUCT_DETAIL API RESPONSE............",
        response.data.product
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setSingleProduct(response.data.product));
    } catch (error) {
      // dispatch(logout(navigate))
      console.log("GET_Single_Products_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}
