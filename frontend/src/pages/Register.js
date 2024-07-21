import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";

const signUpSchema = yup.object({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().required().email("Email should be valid"),
  password: yup.string().required("5 character password is required"),
  mobile: yup.string().required("Mobile No is required"),
});
const RegistrationForm = () => {
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(registerUser(values)).unwrap();
        resetForm();
        navigate("/login");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    },
  });


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-20">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-xl"
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Create Account</h2>
        </div>

        <div className="flex mb-4">
          <div className="mr-2 w-1/2">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstname}
              onChange={formik.handleChange("firstname")}
              onBlur={formik.handleBlur("firstname")}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="error mt-2">
            {formik.touched.firstname && formik.errors.firstname}
          </div>
          <div className="ml-2 w-1/2">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastname}
              onChange={formik.handleChange("lastname")}
              onBlur={formik.handleBlur("lastname")}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="error mt-2">
            {formik.touched.lastname && formik.errors.lastname}
          </div>
        </div>
        <div className="flex mb-4">
          <div className="mr-2 w-1/2">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <div className="ml-2 w-1/2">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange("mobile")}
              onBlur={formik.handleBlur("mobile")}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="error mt-2">
            {formik.touched.mobile && formik.errors.mobile}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="tel"
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

        <div className="mb-4">
          <p className="text-xs">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our privacy policy.
          </p>
        </div>
        <div className="mb-3 flex justify-center items-center">
          <button
            type="submit"
            className="p-2 px-3 rounded-md bg-green-900 text-white"
          >
            Signup
          </button>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-sm">
            Already have an account?&nbsp;&nbsp;&nbsp;
            <Link
              className="hover:text-green-900 font-bold text-green-900"
              to={{ pathname: "/login" }}
            >
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
