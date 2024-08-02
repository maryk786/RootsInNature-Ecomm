import React, { useEffect } from "react";
import { RiShoppingCartLine, RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../features/user/userSlice";
import BreadCrum from "../components/BreadCrum";
import { Link } from "react-router-dom";
import { addToWishlist } from "../features/product/productSlice";

import { toast } from "react-toastify";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistArray = useSelector((state) => state.auth.wishlist?.wishlist);
  const isLoading = false;
  const notify = () => toast("Remove from Wishlist");

  useEffect(() => {
    getWishlistDb();
  }, [dispatch]);

  const getWishlistDb = () => {
    dispatch(getUserWishlist()).catch((error) => {
      console.error("Error fetching wishlist:", error);
    });
  };
  const removeToWish = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserWishlist());
    }, 500);
    notify();
  };
  return (
    <div>
      <BreadCrum title="My wishlist" name="Wishlist" />

      <div className="container mt-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="row justify-center gap-4">
            {Array.isArray(wishlistArray) && wishlistArray.length > 0 ? (
              wishlistArray.map((item) => (
                // <div key={item.id} className="col-7 flex border p-2">
                //   <div className="h-48 flex justify-center items-center bg-cover rounded-l text-center overflow-hidden">
                //     <img src={item.images} className="h-56 w-80" alt="" />
                //   </div>
                //   <div className=" w-full rounded-l-none  bg-white rounded-b flex flex-col justify-between leading-normal">
                //     <div className="px-4 pt-4">
                //       <p className="text-gray-400 text-sm pb-1">{item.category.join(" , ")}</p>
                //       <div className="flex justify-between items-center">
                //         <h1 className="font-bold text-3xl text-black pb-3">
                //           {item.title}
                //         </h1>
                //         <div className="text-2xl rounded-lg p-1 cursor-pointer">
                //           <RiDeleteBinLine />
                //         </div>
                //       </div>
                //       <p className="text-gray-400 text-base pb-2">{item.season.join(" , ")}</p>
                //       <div className="flex justify-between items-center">
                //         <h1 className="font-semibold text-[1.6rem] pb-1">{`${item.price}`}</h1>
                //         <div className="text-[1.7rem] p-1 rounded-lg border-green-900 border-2 hover:text-white hover:bg-green-900">
                //           <RiShoppingCartLine />
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                // </div>
                <div className="border w-[20%]">
                  <Link
                    to={`/product/${item?._id}`}
                    className="hover:no-underline max-w-[16rem] rounded hover:text-[#026603] w-full p-2"
                  >
                    <img
                      className="w-full h-[180px]"
                      src={item?.imageList?.[0]}
                      alt={item?.title}
                    />
                  </Link>
                  <div className="px-2 py-3">
                    <p className="text-gray-400 text-sm">
                      {item?.category.join(", ")}
                    </p>
                    <div className="flex justify-between items-center pb-2">
                      <h1 className="font-bold text-[1.4rem] mb-2 text-black pt-2">
                        {item?.title}
                      </h1>
                      <div
                        className="text-2xl rounded-lg p-1 cursor-pointer hover:text-red-700"
                        onClick={() => removeToWish(item._id)}
                      >
                        <RiDeleteBinLine />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-[1.2rem] mb-2">
                        Rs {item?.price}
                      </h1>
                      <div
                        className="text-[1.4rem] rounded-lg p-1 border-green-900 border-2 hover:text-white hover:bg-green-900 cursor-pointer"
                        // onClick={() => addToCartHandler(item?._id)}
                      >
                        <RiShoppingCartLine />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
