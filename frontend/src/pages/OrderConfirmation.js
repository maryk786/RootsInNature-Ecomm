import React, { useEffect, useState } from "react";
import BreadCrum from "../components/BreadCrum";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const order = useSelector((state) => state.auth.order?.newOrder);
  const userCartState = useSelector((state) => state.auth.getCart);

  // Calculate total amount based on cart items
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let sum = 0;
    userCartState?.forEach((item) => {
      sum += item.quantity * item.price;
    });
    setTotalAmount(sum);
  }, [userCartState]);

  // State to store order from localStorage
  const [storedOrder, setStoredOrder] = useState(null);

  useEffect(() => {
    const storedOrderString = localStorage.getItem("orders");
    if (storedOrderString) {
      const storedOrderData = JSON.parse(storedOrderString);
      if (Array.isArray(storedOrderData) && storedOrderData.length > 0) {
        setStoredOrder(storedOrderData[0].newOrder);
      }
    }
  }, []);

  if (!order && !storedOrder) {
    return (
      <div className="text-xl">
        <p className="justify-center font-semibold items-center text-center">
          No Orders yet
        </p>
      </div>
    );
  }

  // Determine which order to display
  const displayOrder = order || storedOrder;

  return (
    <>
      <BreadCrum title="Order Confirmation" name="Order Confirmation" />
      <div className="container my-8 p-4 bg-white shadow-md">
        <div className="row justify-center">
          <div className="col-5">
            {displayOrder.orderItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 py-4 rounded-md shadow-md flex flex-col justify-between items-center"
              >
                <h2 className="text-xl font-semibold mb-2">Order Details</h2>
                <div className="flex flex-col space-y-2 gap-2 py-3">
                  <div className="flex justify-between gap-40 items-center">
                    <span className="font-medium">Order ID:</span>
                    <span>{displayOrder._id}</span>
                  </div>
                  <div className="flex justify-between gap-5 items-center">
                    <span className="font-medium">Total Amount:</span>
                    <span>Rs {item.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Payment Method:</span>
                    <span>{displayOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Status:</span>
                    <span>{displayOrder.orderStatus}</span>
                  </div>
                  <button onClick={() => navigate("/")} className="my-3 py-2">Back to Home</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
