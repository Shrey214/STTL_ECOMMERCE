import React from "react";

const Home = () => {
  return (
    <div className="text-richblack-25 min-h-[calc(100vh-3.5rem)] flex justify-center items-center bg-richblack-5">
      <div>
        <div className="bg-richblue-300 text-white p-4 rounded-md shadow-md  -tracking-tighter">
          <p className="text-2xl font-extrabold text-center">Welcome To My Ecommerce !!!</p>
        </div>

        <img
          src="https://res.cloudinary.com/dshexnfty/image/upload/v1719057907/ecom-products/mhifzmfchumblmjz89wr.jpg"
          alt=""
          className="object-cover h-[400px] w-full mt-4 shadow-md rounded-md"
        />
      </div>
    </div>
  );
};

export default Home;
