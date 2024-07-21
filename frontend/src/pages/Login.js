import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userSlice";

const signInSchema = yup.object({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email Address is required"),
  password: yup.string().required("5 character password is required"),
});
const LoginForm = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(login(values)).unwrap();
        resetForm();
        navigate("/");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    },
  });
  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      navigate("/");
    }
  }, [authState]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-3xl text-center font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>{" "}
        <div className="error mt-2">
          {formik.touched.email && formik.errors.email}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="error mt-2">
          {formik.touched.password && formik.errors.password}
        </div>
        <div className=" pb-4">
          <Link
            to={"/forget-password"}
            className="text-red-600 hover:text-red-800 hover:no-underline"
          >
            forgot password ?
          </Link>
        </div>
        <div className="mb-3 flex justify-center items-center">
          <button
            type="submit"
            className="py-[10px] px-10 rounded-md bg-green-900 text-white"
          >
            Login
          </button>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-sm">
            No account?&nbsp;&nbsp;&nbsp;
            <Link
              className="hover:text-green-900 font-bold text-green-900"
              to={{ pathname: "/register" }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
