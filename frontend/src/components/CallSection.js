import React from "react";
import { BiSupport } from "react-icons/bi";
import { SlBadge } from "react-icons/sl";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
const SupportBar = () => {
  return (
    <>
      <div className="support-container bg-[#a3d359] px-20">
        <div
          className="support-bar-row justify-center gap-5
         py-14"
        >
          <div className="support-bar-grid grid grid-cols-4">
            <div className="text-center px-2">
              <div className="text-5xl flex justify-center mb-3">
                <BiSupport />
              </div>
              <h1 className="text-sm mb-3 font-bold">Online Support 24/7 </h1>
              <p className="text-xs mb-3">
                We will assist you with your inquiries
              </p>
            </div>
            <div className="text-center mx-1">
              <div className="text-5xl flex justify-center mb-3">
                <SlBadge />
              </div>
              <h1 className="text-sm mb-3 font-bold">Best Quality</h1>
              <p className="text-xs mb-3">
                Best quality plants for your houses
              </p>
            </div>
            <div className="text-center mx-1 md:px-4">
              <div className="text-5xl flex justify-center mb-3">
                <GiTakeMyMoney />
              </div>
              <h1 className="text-sm mb-3 font-bold">
                Money Back Or <p>Replacement Guarantee</p>
              </h1>
              <p className="text-xs mb-3 ">
                Free 100% refund or replacement If Plants Have Problems within
                24 hours of delivery
              </p>
            </div>
            <div className="support-bar-text text-center md:px-4">
              <div className="text-5xl flex justify-center mb-3">
                <FaShippingFast />
              </div>
              <h1 className="text-sm mb-3 font-bold">Shipping</h1>
              <p className="text-xs mb-3">
                Free Shipping Only For Plants Free shipping on organic
                fertilizers and seeds with plant orders over Rs 1000 or more
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportBar;
