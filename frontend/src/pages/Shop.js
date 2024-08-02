import React, { useEffect, useState, useMemo } from "react";
import BreadCrum from "../components/BreadCrum";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { FaArrowRight } from "react-icons/fa6";
import { getAllProduct, addToWishlist } from "../features/product/productSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const Shop = () => {
  const { type, category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(9);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("manual");
  const [pageCount, setPageCount] = useState(1);

  const notify = () => toast("Added to Wishlist");

  const productState = useSelector((state) => state.product?.product);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  // Memoized filtered and sorted products
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(productState)) return [];

    let filtered = productState.filter(
      (product) =>
        // Category filter
        (category
          ? product.category.some(
              (cat) => cat.toLowerCase() === category.toLowerCase()
            )
          : true) &&
        // Price filter
        (!minPrice || parseFloat(product.price) >= parseFloat(minPrice)) &&
        (!maxPrice || parseFloat(product.price) <= parseFloat(maxPrice))
    );

    // Sorting
    if (sort === "price ascending") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price descending") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [productState, category, minPrice, maxPrice, sort]);

  useEffect(() => {
    if (filteredProducts) {
      setPageCount(Math.ceil(filteredProducts.length / limit));
    }
  }, [filteredProducts, limit]);

  const startIndex = (currentPage - 1) * limit;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + limit
  );

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
    notify();
  };

  const OutOfStockRibbon = () => (
    <div className="absolute top-0 left-0 bg-red-600 text-white p-1 text-sm">
      Out of Stock
    </div>
  );
  function handlePageClick(selectedPage) {
    setCurrentPage(selectedPage.selected + 1);
  }

  const Category = [
    { name: "cactus", type: "cactus", category: "cactus" },
    { name: "Climbers", type: "climbers", category: "climbers" },
    { name: "Flowers", type: "flowers", category: "flowers" },
    { name: "Fruit Plants", type: "fruit-plants", category: "fruit-plants" },
    { name: "Grass", type: "grass", category: "grass" },
    { name: "Ground Covers", type: "ground-covers", category: "ground-covers" },
    {
      name: "Organic Fertilizers",
      type: "organic-fertilizers",
      category: "fertilizer",
    },
    { name: "Indoor Plants", type: "indoor-plants", category: "indoor-plants" },
    { name: "Shrubs", type: "shrubs", category: "shrubs" },
    { name: "Seeds", type: "seeds", category: "seed" },
    { name: "Succulents", type: "succulents", category: "succulents" },
  ];

  return (
    <>
      <div>
        <BreadCrum
          title={type ? type : "Shop"}
          name={type ? `Products -- ${type}` : "Products"}
        />
      </div>

      <div className="container-xl py-5 ">
        <div className="row shop-row">
          <div className="col-3 sidebar sidebar-price">
            <div className="bg-[#d2f1a398] rounded-lg py-3 px-4 mb-3">
              <h1 className="text-xl font-bold mb-3">Price Range</h1>
              <div className="my-2">
                <div className="flex justify-center gap-4 pb-2">
                  <input
                    type="text"
                    name=""
                    id="minPrice"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-16 h-10 rounded-sm px-2 text-center"
                    placeholder="from"
                  />
                  <p className="text-center font-medium flex justify-center items-center">
                    to
                  </p>
                  <input
                    type="text"
                    name=""
                    id="maxPrice"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-16 h-10 rounded-sm px-2 text-center font-medium"
                    placeholder="..."
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#d2f1a398] rounded-lg py-3 px-4 mb-3">
              <h1 className="text-xl font-semibold mb-3">Categories</h1>
              <div>
                <ul>
                  {Category.map((e, i) => (
                    <div className="flex items-center py-1" key={i}>
                      <div className="text-xl">
                        <IoIosArrowRoundForward />
                      </div>
                      &nbsp;
                      <Link
                        to={`/product-categories/${e.category}`}
                        className="hover:translate-x-3 hover:no-underline duration-500 hover:text-green-700"
                      >
                        {e.name}
                      </Link>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9 sidebar sidebar-sort">
            {/* Sort Bar  */}
            <div className="bg-[#d2f1a398] flex justify-end gap-4 py-3 px-4 rounded-lg mb-4">
              <div>
                <select
                  name=""
                  className="px-4 py-2 border rounded bg-white"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="manual">Default Sorting</option>
                  <option value="price descending">Price, high to low</option>
                  <option value="price ascending">Price, low to high</option>
                </select>
              </div>
            </div>
            <div>
              {paginatedProducts.length === 0 ? (
                <p className="text-center text-xl text-gray-600 mt-5">
                  No products available
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-4 shop-card">
                  {paginatedProducts.map((product, index) => (
                    <div className="border relative max-w-[16rem]" key={index}>
                      {product.stock <= 0 && <OutOfStockRibbon />}
                      <Link
                        to={`/product/${product._id}`}
                        className="hover:no-underline rounded hover:text-[#026603] w-full p-2"
                      >
                        <img
                          className="w-full h-[180px]"
                          src={product.imageList[0]}
                          alt={product.title}
                        />
                      </Link>
                      <div className="px-2 py-3">
                        <p className="text-gray-400 text-sm">
                          {product.category.join(" , ")}
                        </p>
                        <div className="flex justify-between items-center pb-2">
                          <div>
                            <h1 className="font-bold text-[1.2rem] mb-2 text-black pt-2">
                              {product.title}
                            </h1>
                          </div>
                          <div
                            className="text-2xl rounded-lg p-1 cursor-pointer hover:text-green-700"
                            onClick={() => addToWish(product._id)}
                          >
                            <FaRegHeart />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <h1 className="font-semibold text-[1.2rem] mb-2">
                            Rs {product.price}
                          </h1>
                          <div
                            className="text-[1.4rem] rounded-lg p-1 border-green-900 border-2 hover:text-white hover:bg-green-900 cursor-pointer"
                            onClick={() => navigate(`/product/${product._id}`)}
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

            {filteredProducts.length > limit && (
              <div className="flex justify-center my-5">
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  containerClassName="pagination justify-content-center"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  activeClassName="active"
                  className="flex gap-4 pagniantion"
                  previousLabel="< previous"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
