import React from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Products from "../../commonPages/Products";
import ProfileDropdown from "../../commonPages/profileDropdown";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  // console.log(token);4
  // console.log(user);
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Image */}
        <Link to="/">
          <p className="text-richblack-25">Ecommerce</p>
        </Link>

        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <Link to={link?.path} key={index}>
                <p>{link.title}</p>
              </Link>
            ))}
            { (
              <Link to="/products">
                <p className="text-richblack-25">Products</p>
              </Link>
            )}
            {(
              <Link to="/cart">
                <p className="text-richblack-25">Cart</p>
              </Link>
            )}
          </ul>
        </nav>
        {/* Login/SignUp/Dashboard */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType != "admin" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
              {/* {totalItems > 0 && <span>{totalItems}</span>} */}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
