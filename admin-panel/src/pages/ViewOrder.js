import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderByid } from "../features/auth/authSlice";

import { useNavigate } from "react-router-dom";

import { BiArrowBack } from "react-icons/bi";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];

const ViewOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth.orders);
  console.log(orderState);

  useEffect(() => {
    if (id) {
      dispatch(getOrderByid(id));
    }
  }, [dispatch, id]);
  const goBack = () => {
    navigate(-1);
  };
  const data1 =
    orderState?.orderItems?.map((item, index) => ({
      key: index + 1,
      name: item.product?.title,
      quantity: item.quantity,
      amount: item.price * item.quantity,
    })) || [];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Order</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
