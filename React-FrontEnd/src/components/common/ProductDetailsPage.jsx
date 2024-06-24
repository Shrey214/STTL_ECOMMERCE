import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getSingleProduct } from "../../services/operations/productAPI";
import toast from "react-hot-toast";
const ProductDetailsPage = () => {
  const productId = useLocation().pathname.split("/").at(-1);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoadig] = useState(false);
  async function fetchData() {
    setLoadig(true);
    try {
      console.log("token,pId",token,productId);
      const response = await dispatch(getSingleProduct(token, productId));
      toast.success("Products fetched successfully");
    } catch (error) {
      console.log("Error", error);
    }
    setLoadig(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  const { singleProduct } = useSelector((state) => state.product);
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] justify-center items-center">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
        <img
          className="w-full h-[400px] object-cover shadow-sm"
          src={singleProduct.photo}
          alt="Product Image"
        />
        <div className="">
          <h5 className="text-xl font-bold  tracking-tight text-gray-900  bg-richblack-300 px-5 py-2 capitalize">
            Product Name : {singleProduct.name}
          </h5>
          <p className="text-gray-700  font-bold text-lg bg-richblack-200 px-5 py-1 capitalize">
            Category : {singleProduct.category}
          </p>
          <h3 className="text-justify px-5 py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            possimus facere, pariatur deleniti totam officia!
          </h3>
          <div className="flex items-center justify-around mt-2 shadow-sm bg-richblack-100">
            <p className="text-gray-900 font-bold">
              <span className="line-through text-richblue-700 font-bold">
                ₹{singleProduct.price + (singleProduct.price * 20) / 100}
              </span>{" "}
            </p>
            <p className="text-richblack-800 font-medium">
              {" "}
              ₹{singleProduct.price}
            </p>
            <span className="text-lg font-bold  px-2 py-1 rounded-md text-yellow-200">
              20% OFF!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
