import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";

import { getProducts } from "../features/product/productSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Stock",
    dataIndex: "stock",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Filter products where stock is zero and calculate revenue
  const outOfStockProducts = products
    ?.filter((product) => product.stock === 0)
    .map((product, index) => ({
      key: index + 1,
      name: product.title, // Adjust based on your product object structure
      category: product.category.join(" , "), // Adjust based on your product object structure
      stock: product.stock,
      price: product.price, // Assuming price is a field in your product object
    }));

  // Calculate the revenue of out-of-stock products
  const totalRevenue = outOfStockProducts?.reduce((total, product) => total + product.price, 0);

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <h5 className="text-danger text-center my-5">Out of Stock Products</h5>
      <div>
        <Table columns={columns} dataSource={outOfStockProducts} />
      </div>
      <h5 className="text-success text-center my-5">
        Total Revenue from Out of Stock Products: ${totalRevenue.toFixed(2)}
      </h5>
    </div>
  );
};

export default Dashboard;
