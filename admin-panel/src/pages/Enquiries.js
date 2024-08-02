import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enqId, setEnqId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setEnqId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);

  const enqState = useSelector((state) => state.enquiry.enquiries);
  const data1 = enqState.map((enquiry, index) => ({
    key: index + 1,
    name: enquiry.firstname,
    email: enquiry.email,
    mobile: enquiry.mobile,
    status: (
      <select
        defaultValue={enquiry.status || "Submitted"}
        className="form-control form-select"
        onChange={(e) => setEnquiryStatus(e.target.value, enquiry._id)}
      >
        <option value="Submitted">Submitted</option>
        <option value="Contacted">Contacted</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
    ),
    action: (
      <>
        <Link className="ms-3 fs-3 text-danger" to={`/admin/enquiries/${enquiry._id}`}>
          <AiOutlineEye />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(enquiry._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const setEnquiryStatus = (status, id) => {
    console.log(`Status: ${status}, ID: ${id}`);
    const data = { id, enqData: status };
    dispatch(updateAEnquiry(data));
  };

  const deleteEnq = (id) => {
    console.log(`Deleting enquiry with ID: ${id}`);
    dispatch(deleteAEnquiry(id))
      .unwrap()
      .then((response) => {
        console.log("Delete response:", response);
        dispatch(getEnquiries());
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
    setOpen(false);
  };

  return (
    <div>
      <h3 className="mb-4 title">Inquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteEnq(enqId)}
        title="Are you sure you want to delete this enquiry?"
      />
    </div>
  );
};

export default Enquiries;
