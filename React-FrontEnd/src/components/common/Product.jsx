import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { addCart, removeFromCart } from "../../slices/cartSlice";
import ProductDetailsPage from "./ProductDetailsPage";
import { Link, NavLink } from "react-router-dom";
import { addToCart } from "../../services/operations/cartAPI";
const Product = ({ post }) => {
  console.log(post)
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const add = () => {
    if(token)
      {
        let items = post;
        dispatch(addToCart(token,items));
      }
    else{
      dispatch(addCart(post));
    }
  };

  // const remove = () => {
  //   dispatch(removeFromCart(post._id));
  //   toast.error("Item removed from Cart");
  // };

  return (
    <div className="flex flex-col rounded-lg shadow-md bg-white overflow-hidden max-w-sm mt-10 h-[520px]">
      <Link to={`/product/details/${post._id}`}>
        <img
          className="w-full  h-80  object-cover"
          src={post.photo}
          alt={post.name}
        />
      </Link>

      <div className="flex flex-col">
        <div className="flex bg-richblack-50  items-center p-4">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 w-full">
            {post.name}
          </h5>
          <FaRegHeart className="text-xl font-bold" />
        </div>
        <div className="flex justify-between items-center bg-richblack-200 text-base p-4">
          <strike className="text-richblack-600 font-bold text-lg">
            ₹ {post.price + (post.price * 20) / 100}
          </strike>
          <p className="text-lg font-extrabold">₹ {post.price}</p>
          <h1 className="text-lg font-bold bg-richblack-50 px-2 py-1 rounded-md text-yellow-200">
            20% OFF!
          </h1>
        </div>

        {/* <button
          onClick={remove}
          className="border shadow w-full px-3 py-2  text-xl justify-center items-center bg-richblue-400 "
        >
          Remove
        </button> */}
        <br />
        <button
          onClick={add}
          className="border shadow w-full flex justify-center items-center px-3 py-2 text-xl bg-richblue-200 "
        >
          Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
