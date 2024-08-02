import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import BreadCrum from "../components/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { TbArrowBack } from "react-icons/tb";
import {
  getUserCart,
  removeProductFromCart,
  createOrder,
  emptyCart, // Import the emptyCart action
} from "../features/user/userSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch user information and cart from Redux state
  const user = useSelector((state) => state.auth.user);
  const userCartState = useSelector((state) => state.auth.getCart);

  // Calculate total amount based on cart items
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum += Number(userCartState[index].quantity * userCartState[index].price);
    }
    setTotalAmount(sum);
  }, [userCartState]);

  // Form validation schema using Yup
  const validationSchema = yup.object({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    address: yup.string().required("Address is required"),
    postcode: yup.string().required("Postcode is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: yup.string().required("Phone number is required"),
  });

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      firstname: user ? user.firstname : "",
      lastname: user ? user.lastname : "",
      address: "",
      postcode: "",
      email: user ? user.email : "",
      mobile: user ? user.mobile : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Prepare order data from form values and user cart
        const orderItems = userCartState.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
          price: item.price,
        }));

        const orderData = {
          user: user?._id,
          shippingInfo: {
            firstName: values.firstname,
            lastName: values.lastname,
            streetAddress: values.address,
            postalCode: values.postcode,
          },
          orderItems: orderItems,
        };

        // Dispatch action to create order
        await dispatch(createOrder(orderData)).unwrap();

        // Dispatch action to empty the cart
        await dispatch(emptyCart()).unwrap();

        // Clear the form and cart after successful order placement
        formik.resetForm();
        dispatch(getUserCart());

        // Navigate to order confirmation page
        navigate("/all-orders");
      } catch (error) {
        console.error("Failed to create order:", error);
      }
    },
  });

  // Function to delete a product from the cart
  const deleteAProduct = (id) => {
    dispatch(removeProductFromCart(id)).then(() => {
      dispatch(getUserCart());
    });
  };

  return (
    <>
      <BreadCrum title="CheckOut" name="CheckOut" />
      <div className="container">
        <div className="row justify-center mt-5">
          <div className="col-6">
            <form
              onSubmit={formik.handleSubmit}
              className="flex border rounded-md p-4"
            >
              <div className="">
                <h3 className="mb-3">
                  <span className="font-bold text-3xl ">Billing Details</span>
                </h3>

                <div className="flex space-x-4 my-4">
                  <div className="">
                    <label htmlFor="firstname" className="">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                    {formik.touched.firstname && formik.errors.firstname && (
                      <div className="error">{formik.errors.firstname}</div>
                    )}
                  </div>

                  <div className="">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                    {formik.touched.lastname && formik.errors.lastname && (
                      <div className="error">{formik.errors.lastname}</div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="address">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 mb-3  border border-gray-300"
                    required
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="error">{formik.errors.address}</div>
                  )}
                </div>

                <div className="flex space-x-4 mb-2">
                  <div className="w-1/2">
                    <label htmlFor="postcode">Postcode</label>
                    <input
                      type="text"
                      name="postcode"
                      id="postcode"
                      value={formik.values.postcode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 border border-gray-300"
                      placeholder="Postcode / Zip"
                      required
                    />
                    {formik.touched.postcode && formik.errors.postcode && (
                      <div className="error">{formik.errors.postcode}</div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4 my-3">
                  <div className="w-1/2">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 border border-gray-300"
                      required
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="error">{formik.errors.email}</div>
                    )}
                  </div>

                  <div className="w-1/2">
                    <label htmlFor="mobile">Phone</label>
                    <input
                      type="text"
                      name="mobile"
                      id="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 border border-gray-300"
                      required
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                      <div className="error">{formik.errors.mobile}</div>
                    )}
                  </div>
                </div>
              </div>
            </form>
            <div className="flex justify-between my-4">
              <Link
                to={"/cart"}
                className="hover:no-underline text-lg border-green-900 border px-2 rounded hover:bg-[#026603] text-green-800 hover:text-white flex justify-center items-center gap-1"
              >
                <TbArrowBack className="text-xl" />
                Back to Cart
              </Link>
              <button onClick={() => navigate("/shop")}>
                Continue Shopping
              </button>
              <button type="submit" onClick={formik.handleSubmit}>
                Place Order
              </button>
            </div>
          </div>

          <div className="col-4">
            <div className=" border-2 px-3 pb-5 border-gray-100 rounded-md">
              <h3 className="text-center font-bold text-3xl pt-4">
                Your Order
              </h3>

              <div>
                <div className="mt-5 mb-4">
                  {userCartState &&
                    userCartState?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b py-2"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.productId?.imageList?.[0]}
                            className="w-14 h-14"
                            alt=""
                          />
                          <div className="flex justify-center flex-col">
                            <p className="font-semibold">
                              {item.productId?.title}
                            </p>
                            <p className="text-sm">
                              Quantity : {item?.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p>
                            <b>Rs {item.price * item.quantity}</b>
                          </p>
                          <div className="flex justify-end">
                            <FaTrash
                              className="text-red-600 cursor-pointer"
                              onClick={() => deleteAProduct(item?._id)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex justify-between items-center border-b py-2 mb-4">
                  <div>
                    <p className="font-semibold">SubTotal</p>
                    <p className="text-sm">Delivery Charges</p>
                  </div>
                  <div>
                    <p>Rs {totalAmount}</p>
                    <p>Rs 99</p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b py-2">
                  <div>
                    <p className="font-semibold">Total</p>
                  </div>
                  <div>
                    <p className="font-semibold">Rs {totalAmount + 99}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
