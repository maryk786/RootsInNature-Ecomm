import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="container   text-[#026603]">
        <div className="row pb-10 pt-4 justify-evenly ">
          <div className="footer-col-1 col-4">
            <div className="pb-3 flex justify-center">
              <Link to={"/"}>
                <img
                  className="footer-logo"
                  width={180}
                  height={180}
                  src={Logo}
                  alt="Logo"
                />
              </Link>
            </div>
            <div>
              <p className=" text-[0.85rem] text-[#026603] text-center">
                "Root In Nature" is a premier online nursery that offers a wide
                variety of plants for creating a beautiful and convenient home
                garden. It is one of the largest one-stop shops for plants. Our
                goal is to bring fresh greenery to your doorstep.
              </p>
            </div>
          </div>
          <div className="footer-col-2 col-4 pt-10 flex ">
            <div className="col-6 item1 ">
              <h1 className="footer-heading font-extrabold mb-3 ">Company</h1>
              <div className="footer-text flex flex-col text-[0.85rem] gap-1">
                <Link to={"/termcondition"} className="hover:text-[#026603]">Term & Conditions</Link>
                <p>+923102345678</p>
              </div>
            </div>

            <div className="col-6 item1">
              <h1 className="footer-heading font-extrabold mb-3">
                Contact With Us
              </h1>
              <div className="flex gap-3">
                <Link className="footer-icon bg-blue-500 h-7 w-7 text-sm flex items-center justify-center text-white rounded-full">
                  <FaFacebookF />
                </Link>
                <Link className="footer-icon bg-pink-700 h-7 w-7  text-sm flex items-center justify-center text-white rounded-full">
                  <FaInstagram />
                </Link>
                <Link className="footer-icon bg-blue-700 text-sm flex items-center justify-center h-7 w-7 text-white rounded-full">
                  <FaLinkedinIn />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#a3d359] via-[#3b7917] to-[#a3d359] font-semibold text-xs p-4 text-center text-white">
        <p>ROOT IN NATURE &#169; 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
