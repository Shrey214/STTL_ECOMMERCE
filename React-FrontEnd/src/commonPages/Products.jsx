import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../services/operations/productAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "../components/common/Spinner";
import Product from "../components/common/Product";
const Products = () => {
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  async function fetchData() {
    setLoading(true);
    try {
      // console.log(token,"Tokennn");
      const response = await dispatch(getAllProducts(token));
      toast.success("Products fetched successfully");
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { allProducts } = useSelector((state) => state.product);
  console.log("Type", typeof allProducts);
  console.log("All", allProducts);

  return (
    <div className="">
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid  xs:grid cols-1 sm:grid-cols-2 lg:grid-cols-4  p-2 mx-auto space-y-10 space-x-4 min-h-[80vh] px-12 mb-8">
          {allProducts.length > 0 ? (
            allProducts.map((post) => <Product key={post._id} post={post} />)
          ) : (
            <div className="flex justify-center items-center">
              <p>No Data Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
