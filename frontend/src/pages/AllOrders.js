import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderByUserId } from "../features/user/userSlice";
import BreadCrum from "../components/BreadCrum";
import { format } from "date-fns";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.auth?.order);
  const userId = useSelector((state) => state.auth?.user?._id);

  console.log("Orders:", orders);
  console.log("User ID:", userId);

  useEffect(() => {
    if (userId) {
      dispatch(getOrderByUserId(userId));
    }
  }, [dispatch, userId]);

  if (!orders) {
    return <div>Loading...</div>;
  }

  const isOrdersArray = Array.isArray(orders);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy 'at' h:mm a");
  };

  return (
    <>
      <BreadCrum title="My Orders" name="My Orders" />
      <div className="container my-8 p-4 bg-white shadow-md">
        <div className="row justify-center">
          <div className="flex justify-center gap-3 flex-wrap">
            {!isOrdersArray ? (
              <div>No orders found.</div>
            ) : (
              orders.map((order) => (
                <div
                className="col-4"
                  key={order?._id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                 
                  <div>
                    {order?.orderItems?.map((item, index) => (
                      <div
                        key={`${order._id}-${index}`}
                        className="mt-2 mb-4 flex justify-between items-center"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.product?.images}
                            className="w-14 h-14"
                            alt={item.title}
                          />
                          <div className="flex justify-center flex-col">
                            <p className="font-semibold">
                              Title: {item.product?.title}
                            </p>
                            <p className="text-sm">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p>
                            <b>Rs {item.price * item.quantity}</b>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p>Order Status: {order?.orderStatus}</p>
                  <p>Shipping Fee: 99</p>
                  <p>Payment Method: {order?.paymentMethod}</p>
                  <p>Total Amount: Rs {order?.totalPayment}</p>
                  <div className="text-end">
                    <p>Ordered Date: {formatDate(order?.createdAt)}</p>
                  <p>Order ID: {order?._id}</p>
                  </div>
                 
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
