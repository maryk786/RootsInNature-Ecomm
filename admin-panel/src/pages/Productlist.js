import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "../utils/baseUrl";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Stock",
    dataIndex: "stock",
    sorter: (a, b) => a.stock - b.stock,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => parseFloat(a.price) - parseFloat(b.price),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const navigate = useNavigate();
  const notify = () => toast("Remove product");
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product || []);
  console.log(productState);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
    notify();
  };

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 1) {
      try {
        const response = await axios.get(
          `${base_url}product/search?query=${e.target.value}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (productId) => {
    navigate(`/admin/product/${productId}`);
    setSuggestions([]);
  };

  const data1 = productState.products?.map((product, index) => ({
    key: index + 1,
    title: product?.title,
    category: product?.category.join(" , "),
    price: product?.price,
    stock:
      product?.stock > 0 ? (
        product.stock
      ) : (
        <span style={{ color: "red" }}>Out of Stock</span>
      ),
    action: (
      <>
        <Link
          to={`/admin/product/${product?._id}`}
          className="fs-3 text-danger"
        >
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => handleDelete(product._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative flex w-full"
        >
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-3 ml-3 outline-none border-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div
            className="text-2xl bg-[#026603] text-white h-9 min-w-[50px] flex justify-center items-center rounded-r-full cursor-pointer"
            onClick={() =>
              navigate(`/products/search?q=${encodeURIComponent(searchQuery)}`)
            }
          >
            <IoMdSearch />
          </div>
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border cursor-pointer rounded-b-md shadow-lg z-10">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion._id}
                  className="block p-2 hover:no-underline hover:text-green-900 hover:bg-gray-200 " style={{cursor:"pointer"}}
                  onClick={() => handleSuggestionClick(suggestion._id)}
                >
                  {suggestion.title}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
