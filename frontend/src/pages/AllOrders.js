import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderByUserId } from "../features/user/userSlice";
import BreadCrum from "../components/BreadCrum";
import { format } from "date-fns";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.auth?.order) || [];
  const userId = useSelector((state) => state.auth?.user?._id);

  useEffect(() => {
    if (userId) {
      dispatch(getOrderByUserId(userId));
    }
  }, [dispatch, userId]);

  if (!Array.isArray(orders)) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy 'at' h:mm a");
  };

  return (
    <>
      <BreadCrum title="My Orders" name="My Orders" />
      <div className="container my-8 p-4 bg-white shadow-md">
        <div className="row justify-center">
          <div className="order-card flex justify-center gap-3 flex-wrap">
            {orders.length === 0 ? (
              <div>No orders found.</div>
            ) : (
              orders.map((order) => (
                <div
                  className="order-card-col border p-[20px] mb-[10px]"
                  key={order?._id}
                >
                  <div>
                    {order?.orderItems?.map((item, index) => (
                      <div
                        key={`${order._id}-${index}`}
                        className="mt-2 mb-4 flex justify-between items-center"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.product?.imageList?.[0]}
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
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="font-semibold">Order Status</div>
                      <div>{order?.orderStatus}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-semibold">Shipping Fee </div>
                      <div>99</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-semibold">Payment Method </div>
                      <div>{order?.paymentMethod}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-semibold">Total Amount </div>
                      <div className="font-semibold">
                        Rs {order?.totalPayment}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-semibold">Ordered Date</div>
                      <div>{formatDate(order?.createdAt)}</div>
                    </div>
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
