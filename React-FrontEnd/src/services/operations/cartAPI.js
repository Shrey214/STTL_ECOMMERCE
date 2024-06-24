import { toast } from "react-hot-toast";
import { addCart, setCartData, setLoading } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { cartEndpoints } from "../apis";

const { GET_CART_PRODUCTS, ADD_TO_CART } = cartEndpoints;

export function getCartProducts(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_CART_PRODUCTS, null, {
        Authorization: `Bearer ${token}`,
      });
      //   console.log("GET_CART_API_RESPONSE............", response.data.usersCart.items);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const cartProducts = response.data.usersCart.items;
      dispatch(setCartData([...response.data.usersCart.items]));
    } catch (error) {
      console.log("get card...");
      // console.log("GET_CART_DATA API ERROR............", error);
      // toast.error("Could Not CART Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function addToCart(token, items) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    // console.log("PRoduct",items);
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", ADD_TO_CART, items, {
        Authorization: `Bearer ${token}`,
      });

      //   console.log("ADD TO CART API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      //   dispatch(addToCart(product));
      toast.success("Added to cart");
      // navigate('/cart')
    } catch (error) {
      console.log("add to cart...");
      // console.log("Add to cart error............", error);
      // toast.error("Failed to add item to cart");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
