import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const BreadCrum = (props) => {
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };
  const { title, name} = props;
  return (
    <div className="py-4 bg-[#d2f1a398] shadow-sm ">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="text-4xl font-bold pb-4 capitalize  ">{title}</h1>
            <div className="flex justify-center items-center mt-2">
              <div
                className="hover:no-underline hover:text-green-800 cursor-pointer"
                onClick={home}
              >
                Root In Nature - Home &nbsp;
              </div>
              <FaArrowRight /> &nbsp; &nbsp;{" "}
              <div className="capitalize text-base font-medium">{name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrum;
