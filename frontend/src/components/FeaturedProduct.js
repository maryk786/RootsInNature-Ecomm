import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProduct, addToWishlist } from "../features/product/productSlice";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";

const FeaturedProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productState =
    useSelector((state) => state.product?.product) || [];
  console.log("fetaure product", productState);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  const featuredProducts = Array.isArray(productState)
    ? productState?.filter((products) => products?.featuredProducts)
    : [];

  console.log("featuredProducts", featuredProducts);

  return (
    <div className="container mb-5">
      <div className="row justify-center">
        <div className="col-10">
          <h1 className="mb-5 font-bold text-3xl">Our Popular Products</h1>
          {featuredProducts.length === 0 ? (
            <p className="text-center text-xl text-gray-600 mt-5">
              No products available
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {featuredProducts.map((product, index) => (
                <div className="border" key={index}>
                  <Link
                    to={`/product/${product?._id}`}
                    className="hover:no-underline max-w-[16rem] rounded hover:text-[#026603] w-full p-2"
                  >
                    <img
                      className="w-full h-[180px]"
                      src={product?.images}
                      alt={product?.title}
                    />
                  </Link>
                  <div className="px-2 py-3">
                    <p className="text-gray-400 text-sm">
                      {product?.category?.join(" , ")}
                    </p>
                    <div className="flex justify-between items-center pb-2">
                      <div>
                        <h1 className="font-bold text-[1.4rem] mb-2 text-black pt-2">
                          {product?.title}
                        </h1>
                        <p>{product?.season?.join(" , ")}</p>
                      </div>
                      <div
                        className="text-2xl rounded-lg p-1 cursor-pointer hover:text-green-700"
                        onClick={() => addToWish(product?._id)}
                      >
                        <FaRegHeart />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-[1.2rem] mb-2">
                        Rs{product?.price}
                      </h1>
                      <div
                        className="text-[1.4rem] rounded-lg p-1 border-green-900 border-2 hover:text-white hover:bg-green-900 cursor-pointer"
                        onClick={() => navigate(`/product/${product?._id}`)}
                      >
                        <RiShoppingCartLine />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
