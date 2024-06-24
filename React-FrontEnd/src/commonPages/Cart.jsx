import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/common/CartItem";
import { useNavigate } from "react-router-dom";
import { getCartProducts } from "../services/operations/cartAPI";
import { useDispatch } from "react-redux";
const Cart = () => {
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  async function fetchData() {
    setLoading(true);
    try {
      const response = await dispatch(getCartProducts(token));
      toast.success("Cart fetched successfully");
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  }

  const { cart } = useSelector((state) => state.cart);
  // console.log("Printing Cart");
  // console.log(cart);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
    fetchData();
  }, []);

  return (
    <div className="bg-richblack-5 flex min-h-[calc(100vh-3.5rem)] overflow-x-hidden justify-center items-center">
      {cart.length > 0 ? (
        <div>
          <div>
            {cart.map((item, index) => {
              console.log(item,index)
              return <CartItem key={item._id} item={item} itemIndex={index} />;
            })}
          </div>

          <div>
            <div>
              <div>Your Cart</div>
              <div>Summary</div>
              <p>
                <span>Total Items: {cart.length}</span>
              </p>
            </div>

            <div>
              <p>Total Amount: ${totalAmount}</p>
              <button>CheckOut Now</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Cart Empty</h1>
          <Link to={"/"}>
            <button>Shop Now</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
