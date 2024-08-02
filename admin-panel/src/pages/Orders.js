import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateOrder } from "../features/auth/authSlice";

// Define the columns for the Ant Design table
const columns = [
  { title: "SNo", dataIndex: "key" },
  { title: "Name", dataIndex: "name" },
  { title: "Address", dataIndex: "streetAddress" },
  { title: "Product", dataIndex: "product" },
  { title: "Amount", dataIndex: "amount" },
  { title: "Date", dataIndex: "date" },
  { title: "Status", dataIndex: "status" },
  { title: "Action", dataIndex: "action" },
];

const Orders = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders);

  const handleEdit = (orderId, currentStatus) => {
    setEditId(orderId);
    setStatus(currentStatus);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = (orderId) => {
    dispatch(updateOrder({ id: orderId, updateData: { orderStatus: status } }));
    setEditId(null);
  };

  const data1 = Array.isArray(orderState)
    ? orderState.map((order, index) => ({
        key: index + 1,
        name: `${order?.shippingInfo.firstName} ${order?.shippingInfo.lastName}`,
        streetAddress: order?.shippingInfo.streetAddress,
        product: <Link to={`/admin/order/${order?._id}`}>View Order</Link>,
        amount: order?.totalPayment,
        date: new Date(order?.createdAt).toLocaleString(),
        status:
          editId === order._id ? (
            <select
              defaultValue={order?.orderStatus || "Pending"}
              className="form-control form-select"
              onChange={handleStatusChange}
            >
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              {/* Add more options as needed */}
            </select>
          ) : (
            order?.orderStatus
          ),
        action: (
          <>
            {editId === order._id ? (
              <Button
                type="link"
                onClick={() => handleSave(order._id)}
                className="fs-3 text-success"
              >
                Save
              </Button>
            ) : (
              <Button
                type="link"
                onClick={() => handleEdit(order._id, order?.orderStatus)}
                className="fs-3 text-danger"
              >
                <BiEdit />
              </Button>
            )}
            <Link
              className="ms-3 fs-3 text-danger"
              to={`/admin/delete-order/${order?._id}`}
            >
              <AiFillDelete />
            </Link>
          </>
        ),
      }))
    : [];

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
