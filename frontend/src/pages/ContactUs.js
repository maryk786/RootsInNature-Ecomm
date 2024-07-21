import React, { useState } from "react";
import BreadCrum from "../components/BreadCrum";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";
const ContactSchema = yup.object({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup.string().nullable().required().email("Email should be valid"),
  mobile: yup.string().default("").nullable().required("Mobile No is required"),
  comment: yup.string().default("").nullable().required("comment is required"),
});

const ContactUs = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: user ? user.firstname : "",
      lastname: user ? user.lastname : "",
      email: user ? user.email : "",
      mobile: user ? user.mobile : "",
      comment: "",
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(
          createQuery({
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            mobile: values.mobile,
            comment: values.comment,
          })
        ).unwrap();
        resetForm();
      } catch (error) {
        console.error("Inquiry Error :", error);
      }
    },
  });

  return (
    <div>
      <BreadCrum title="Contact Us" name="Contacts" />
      <div className="container">
        <div className="row justify-center">
          <div className="col-8 ">
            <div className="pt-12 pb-5">
              <h1 className="text-center text-3xl ">
                Got anything to say? Let us hear it!
              </h1>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="mb-10 border px-2 py-4 bg-[#e4f7c8]"
            >
              <div className="container pt-4">
                <div className="row ">
                  <div className="col-6">
                    <input
                      className="appearance-none block w-full bg-white  border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      value={formik.values.firstname}
                      onChange={formik.handleChange("firstname")}
                      onBlur={formik.handleBlur("firstname")}
                      required
                    />
                    <div className="error mt-2">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                  </div>
                  <div className="col-6">
                    <input
                      className="appearance-none block w-full bg-white  border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={formik.values.lastname}
                      onChange={formik.handleChange("lastname")}
                      onBlur={formik.handleBlur("lastname")}
                      required
                    />{" "}
                    <div className="error mt-2">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                  </div>

                  <div className="col-6">
                    <input
                      className="appearance-none block w-full bg-white  border border-[#a7ed3f88] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#a7ed3f88]"
                      id="grid-last-name"
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      required
                    />
                    <div className="error mt-2">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div className="col-6 pb-3">
                    <input
                      className="appearance-none block w-full bg-white  border border-[#a7ed3f88] rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#a7ed3f88]"
                      id="grid-last-name"
                      type="number"
                      name="mobile"
                      placeholder="Phone number"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                      required
                    />{" "}
                    <div className="error mt-2">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <textarea
                      name="comment"
                      className="appearance-none block w-full bg-white  border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      placeholder="comment"
                      value={formik.values.comment}
                      onChange={formik.handleChange("comment")}
                      onBlur={formik.handleBlur("comment")}
                      required
                      id=""
                      cols=""
                      rows="5"
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-center py-3">
                  <button className=" py-3 px-12" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
