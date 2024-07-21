import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const { data } = props;
  // console.log("data", data?.title);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  // if (!Array.isArray(data) || data.length === 0) {
  //   return <p>No product available.</p>;
  // }

  return (
    <>
      {/* {data?.map((item, index) => ( */}
      <div
        className="border"
        // key={index}
      >
        <Link
          to={`/product/${data?._id}`}
          className="hover:no-underline max-w-[16rem] rounded hover:text-[#026603] w-full p-2"
        >
          <img
            className="w-full h-[180px]"
            src={data?.images}
            alt={data?.title}
          />
        </Link>
        <div className="px-2 py-3">
          <p className="text-gray-400 text-sm">{data?.category?.join(" , ")}</p>
          <div className="flex justify-between items-center pb-2">
            <div>
              <h1 className="font-bold text-[1.4rem] mb-2 text-black pt-2">
                {data?.title}
              </h1>
              <p>{data?.season?.join(" , ")}</p>
            </div>

            <div
              className="text-2xl rounded-lg p-1 cursor-pointer hover:text-green-700"
              onClick={() => addToWish(data?._id)}
            >
              <FaRegHeart />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-[1.2rem] mb-2">
              Rs{data?.price}
            </h1>
            <div
              className="text-[1.4rem] rounded-lg p-1 border-green-900 border-2 hover:text-white hover:bg-green-900 cursor-pointer"
              onClick={() => navigate(`/product/${data?._id}`)}
            >
              <RiShoppingCartLine />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
