import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import productReducer from "../slices/productSlice";
import cartReducer from '../slices/cartSlice';
const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    product:productReducer,
    cart: cartReducer
})

export default rootReducer