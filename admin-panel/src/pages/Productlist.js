import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
  const notify = () => toast("Remove product");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
    notify();
  };

  const data1 = productState.map((product, index) => ({
    key: index + 1,
    title: product.title,
    category: product.category.join(" , "),
    price: product.price,
    action: (
      <>
        <Link to={`/admin/product/${product._id}`} className="fs-3 text-danger">
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

  console.log(data1);

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
