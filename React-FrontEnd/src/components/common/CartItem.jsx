
import {FcDeleteDatabase} from "react-icons/fc"
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../slices/cartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({item, itemIndex}) => {
  const dispatch = useDispatch();

  const remove = () => {
    dispatch(removeFromCart(item._id));
    toast.success("Item Removed");
  }

  return (
    <div className="">

      <div>

        <div>
          <img src={item.photo} height={"150px"} width={"200px"}/>
        </div>
        <div className="">
          <h1 className="text-richblack-900">{item.title}</h1>
          <h1 className="text-richblack-900">{item.description}</h1>
          <div>
            <p className="text-richblack-900">{item.price}</p>
            <div
            onClick={remove}>
              <FcDeleteDatabase/>
            </div>
          </div>

        </div>


      </div>

    </div>
  );
};

export default CartItem;
