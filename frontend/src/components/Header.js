import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCart,
  getUserWishlist,
  logout,
  emptyCart,
} from "../features/user/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "../utils/axiosConfig";

const Header = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userCartState = useSelector((state) => state.auth.getCart);

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 1) {
      try {
        const response = await axios.get(
          `${base_url}product/search?query=${e.target.value}`
        );
        setSuggestions(response.data);
        console.log(setSuggestions(response.data));
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products/search?q=${encodeURIComponent(searchQuery)}`);
    setSuggestions([]);
  };

  useEffect(() => {
    if (authState.user) {
      dispatch(getUserCart());
      dispatch(getUserWishlist());
    }
  }, [dispatch, authState.user]);

  const handleLogout = async () => {
    try {
      await dispatch(emptyCart()).unwrap();
      await dispatch(logout()).unwrap();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="h-16 shadow-sm">
      <div className="header-container h-full container mx-auto flex items-center lg:px-10 justify-between">
        <div className="cursor-pointer pt-2">
          <Link to={"/"}>
            <img src={logo} className="img-fluid logo-img" alt="Logo" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow">
          <form onSubmit={handleSearchSubmit} className="relative flex w-full">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-3 ml-3 outline-none border-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div
              className="text-2xl bg-[#026603] text-white h-9 min-w-[50px] flex justify-center items-center rounded-r-full cursor-pointer"
              onClick={handleSearchSubmit}
            >
              <IoMdSearch />
            </div>
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border rounded-b-md shadow-lg z-10">
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white border rounded-b-md shadow-lg z-10">
                    {suggestions.map((suggestion) => (
                      <Link
                        to={`/product/${suggestion._id}`}
                        key={suggestion._id}
                        className="block p-2 hover:no-underline hover:text-green-900 hover:bg-gray-200 cursor-pointer"
                        onClick={() => setSuggestions([])}
                      >
                        {suggestion.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <Link to={"/cart"}>
              <div className="cart no-underline hover:underline hover:text-black py-2 text-grey-darkest flex mt-[-22px] justify-center items-center">
                <div className="relative">
                  <div className="absolute left-3 mt-3">
                    <div className="flex h-2 w-2 justify-center p-[9px] rounded-full bg-[#026603] text-xs text-white ml-1">
                      <p className="-mt-2">
                        {userCartState?.length ? userCartState?.length : 0}
                      </p>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="file: mt-4 h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link to={"/wishlist"}>
              <div className="hover:text-black">
                <div className="">
                  <FaRegHeart className="text-[1.6rem]" />
                </div>
              </div>
            </Link>
          </div>
          <div>
            {authState?.user ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <span>Logout</span>
              </button>
            ) : (
              <>
                <button>
                  <Link to="/login" className="hover:no-underline text-white">
                    Account
                  </Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
