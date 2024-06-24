import { createSlice } from "@reduxjs/toolkit";
import { setUser } from "./profileSlice";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setUserId(state,value){
      state.userId = value.payload
    }
  },
});

export const { setSignupData, setLoading, setToken,setUserId } = authSlice.actions;

export default authSlice.reducer;