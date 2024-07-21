import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";

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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders);

  useEffect(() => {
    if (orderState && orderState.length > 0) {
      const firstOrderShippingInfo = orderState[0].shippingInfo;
      const firstName = firstOrderShippingInfo.firstName;
      console.log("First order's first name:", firstName);
    } else {
      console.log("No orders found");
    }
  }, [orderState]);

  const data1 = orderState.map((order, index) => {
    const orderItem = order.orderItems[0]; // Assuming you want the first item for this example
    return {
      key: index + 1,
      name: `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`,
      product: (
        <Link to={`/admin/order/${order._id}`}>
          View Orders
        </Link>
      ),
      amount: orderItem.price, // Accessing the price from orderItems
      date: new Date(order.createdAt).toLocaleString(),
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    };
  });

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;
