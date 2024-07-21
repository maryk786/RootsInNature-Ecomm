// import React from "react";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import { Link, useParams } from "react-router-dom";

// const SideBar = ({ filteredProducts }) => {
//   const { type } = useParams(); // Get the category type from URL params

//   const Category = [
//     { name: "Cactus", type: "cactus" },
//     { name: "Climbers", type: "climbers" },
//     { name: "Flowers", type: "flowers" },
//     { name: "Fruit Plants", type: "fruit-plants" },
//     { name: "Grass", type: "grass" },
//     { name: "Ground Covers", type: "ground-covers" },
//     { name: "Organic Fertilizers", type: "organic-fertilizers" },
//     { name: "Indoor Plants", type: "indoor-plants" },
//     { name: "Shrubs", type: "shrubs" },
//     { name: "Seeds", type: "seeds" },
//     { name: "Succulents", type: "succulents" },
//     { name: "Hedge Plants Herbs", type: "hedge-plants-herbs" },
//   ];

//   return (
//     <div>
//       <div>
//         <ul>
//           {Category.map((e, i) => (
//             <div className="flex items-center py-1" key={i}>
//               <div className="text-xl">
//                 <IoIosArrowRoundForward />
//               </div>
//               &nbsp;
//               <Link
//                 to={`/product-category/${e.type}`}
//                 className={`hover:translate-x-3 hover:no-underline duration-500 ${
//                   type === e.type ? "text-green-700" : ""
//                 }`}
//               >
//                 {e.name}
//               </Link>
//             </div>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideBar;
import React, { useEffect, useState } from "react";
import BreadCrum from "../components/BreadCrum";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, addToWishlist } from "../features/product/productSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Shop = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(9);
  const [pageCount, setPageCount] = useState(1);
  const productState = useSelector((state) => state.product?.product);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    if (productState) {
      setPageCount(Math.ceil(productState.length / limit));
    }
  }, [productState, limit]);

  const filteredProducts = Array.isArray(productState)
    ? productState.filter((product) =>
        type ? product.type?.toLowerCase().includes(type.toLowerCase()) : true
      )
    : [];

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  function handlePageClick(selectedPage) {
    setCurrentPage(selectedPage.selected + 1); // +1 because ReactPaginate uses 0-based index
  }

  const Category = [
    { name: "Cactus", type: "cactus" },
    { name: "Climbers", type: "climbers" },
    { name: "Flowers", type: "flowers" },
    { name: "Fruit Plants", type: "fruit-plants" },
    { name: "Grass", type: "grass" },
    { name: "Ground Covers", type: "ground-covers" },
    { name: "Organic Fertilizers", type: "organic-fertilizers" },
    { name: "Indoor Plants", type: "indoor-plants" },
    { name: "Shrubs", type: "shrubs" },
    { name: "Seeds", type: "seeds" },
    { name: "Succulents", type: "succulents" },
    { name: "Hedge Plants Herbs", type: "hedge-plants-herbs" },
  ];

  const startIndex = (currentPage - 1) * limit;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + limit
  );

  return (
    <>
      <BreadCrum
        title={type ? type : "Shop"}
        name={type ? `Products -- ${type}` : "Products"}
      />
      <div className="py-5">
        <div className="container-xl">
          <div className="row">
            <div className="col-3">
              <div className="bg-[#d2f1a398] rounded-lg py-3 px-4 mb-3">
                <h1 className="text-xl font-semibold mb-3">Price</h1>
                <div className="flex gap-4 my-2">
                  <input
                    type="text"
                    name=""
                    id="floatingInput"
                    className="w-24 h-10 rounded-sm px-2"
                    placeholder="from"
                  />
                  <input
                    type="text"
                    name=""
                    id="floatingInput"
                    className="w-24 h-10 rounded-sm px-2"
                    placeholder="to"
                  />
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
            <div className="col-9">
              {/* Sort Bar  */}
              <div className="bg-[#d2f1a398] flex justify-end gap-4 py-3 px-4 rounded-lg mb-4">
                <div>
                  <select name="" className="px-4 py-2 border rounded bg-white">
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
                  <div className="grid grid-cols-3 gap-4">
                    {paginatedProducts.map((product, index) => (
                      <div className="border" key={index}>
                        <Link
                          to={`/product/${product._id}`}
                          className="hover:no-underline max-w-[16rem] rounded hover:text-[#026603] w-full p-2"
                        >
                          <img
                            className="w-full h-[180px]"
                            src={product.images}
                            alt={product.title}
                          />
                        </Link>
                        <div className="px-2 py-3">
                          <p className="text-gray-400 text-sm">
                            {product.category.join(" , ")}
                          </p>
                          <div className="flex justify-between items-center pb-2">
                            <div>
                              <h1 className="font-bold text-[1.4rem] mb-2 text-black pt-2">
                                {product.title}
                              </h1>
                              <p>{product.season.join(" , ")}</p>
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
                              Rs{product.price}
                            </h1>
                            <div
                              className="text-[1.4rem] rounded-lg p-1 border-green-900 border-2 hover:text-white hover:bg-green-900 cursor-pointer"
                              onClick={() =>
                                navigate(`/product/${product._id}`)
                              }
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
              <div className="flex justify-center my-5">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  containerClassName="pagination justify-content-center"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  activeClassName="active"
                  className="flex gap-4"
                  previousLabel="< previous"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

// shop code 