import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Spin, Alert } from "antd";
import { getOrders } from "../features/auth/authSlice"; // Import your getOrders action

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Total Payment",
    dataIndex: "totalPayment",
    key: "totalPayment",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.auth?.orders) || []; // Default to an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await dispatch(getOrders());
      } catch (err) {
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [dispatch]);

  // Calculate the total revenue from all orders
  const totalRevenue = orders.reduce(
    (total, order) => total + parseFloat(order?.totalPayment || 0),
    0
  );

  // Prepare data for table
  const orderData = orders.map((order, index) => ({
    key: index + 1,
    orderId: order._id, // Adjust based on your order object structure
    totalPayment: `Rs ${parseFloat(order.totalPayment || 0).toFixed(2)}`, // Convert to number and format as currency
  }));

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      {loading && (
        <div className="text-center">
          <Spin size="large" />
        </div>
      )}
      {error && (
        <Alert message={error} type="error" showIcon className="mb-4" />
      )}
      {!loading && !error && (
        <>
          <h5 className="text-success text-center my-5">
            Total Revenue from Orders: Rs {totalRevenue.toFixed(2)}
          </h5>
          <Table columns={columns} dataSource={orderData} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
