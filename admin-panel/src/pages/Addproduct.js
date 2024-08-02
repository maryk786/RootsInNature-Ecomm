// Addproduct.jsx
import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/pcategory/pcategorySlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createProducts,
  getProducts,
  getProById,
  resetState,
  updateProduct,
} from "../features/product/productSlice";

const schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  slug: yup.string().required("slug is required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  category: yup.array().of(yup.string()).required("category is required"),
  stock: yup.number().required("stock is Required"),
  blooming_time: yup.string().required("blooming_time is required"),
  soil_requirement: yup.string().required("soil_requirement is required"),
  watering_schedule: yup.string().required("watering_schedule is required"),
  light_requirement: yup.string().required("light_requirement is required"),
  scientific_name: yup.string().required("scientific_name is required"),
  common_name: yup.string().required("common_name is required"),
  uses: yup.string().required("uses is required"),
  season: yup.array().of(yup.string()).required("Season is required"),
  featuredProducts: yup.boolean().required("Featured Products is required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getCategories());
    if (id) {
      dispatch(getProById(id));
    }
  }, [dispatch, id]);

  const catState = useSelector((state) => state.pCategory.pCategories);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product?.products);
  console.log(newProduct);
  const { isSuccess, isError, createdProduct } = newProduct;
  const firstProduct = newProduct[0] || {};

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, createdProduct, navigate, dispatch]);

  const [images, setImages] = useState([]);

  useEffect(() => {
    const imgList = imgState.map((i) => ({
      public_id: i.public_id,
      url: i.url,
    }));
    setImages(imgList);
  }, [imgState]);

  const formik = useFormik({
    initialValues: {
      slug: firstProduct?.slug || "",
      title: firstProduct?.title || "",
      description: firstProduct?.description || "",
      common_name: firstProduct?.common_name || "",
      scientific_name: firstProduct?.scientific_name || "",
      price: firstProduct?.price || "",
      stock: firstProduct?.stock || "",
      category: firstProduct?.category || [],
      uses: firstProduct?.uses || "",
      image: images,
      light_requirement: firstProduct?.light_requirement || "",
      soil_requirement: firstProduct?.soil_requirement || "",
      watering_schedule: firstProduct?.watering_schedule || "",
      blooming_time: firstProduct?.blooming_time || "",
      season: firstProduct?.season || [],
      featuredProducts: firstProduct?.featuredProducts || false,
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (id) {
        dispatch(updateProduct({ id, product: values }));
        dispatch(resetState());
      } else {
        dispatch(createProducts(values));
      }
      formik.resetForm();
    },
  });

  console.log("Category type:", typeof formik.values.category);
  const handleSeasonChange = (event) => {
    const { options } = event.target;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    formik.setFieldValue("season", selectedValues);
  };
  return (
    <div>
      <h3 className="mb-4 title">{id ? "Edit" : "Add"} Product</h3>
      <div className="container">
        <div className="row">
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex gap-3 flex-column"
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="col-6">
                <CustomInput
                  type="text"
                  label="Enter Slug"
                  name="slug"
                  onChng={formik.handleChange("slug")}
                  onBlr={formik.handleBlur("slug")}
                  val={formik.values.slug}
                />
                <div className="error">
                  {formik.touched.slug && formik.errors.slug}
                </div>
              </div>

              <div className="col-6">
                <CustomInput
                  type="text"
                  label="Enter Product Title"
                  name="title"
                  onChng={formik.handleChange("title")}
                  onBlr={formik.handleBlur("title")}
                  val={formik.values.title}
                />
                <div className="error">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {firstProduct?.common_name && (
                <div className="col-6">
                  <CustomInput
                    type="text"
                    label="Enter common_name"
                    name="common_name"
                    onChng={formik.handleChange("common_name")}
                    onBlr={formik.handleBlur("common_name")}
                    val={formik.values.common_name}
                  />
                  <div className="error">
                    {formik.touched.common_name && formik.errors.common_name}
                  </div>
                </div>
              )}

              {firstProduct?.scientific_name && (
                <div className="col-6">
                  <CustomInput
                    type="text"
                    label="Enter scientific_name"
                    name="scientific_name"
                    onChng={formik.handleChange("scientific_name")}
                    onBlr={formik.handleBlur("scientific_name")}
                    val={formik.values.scientific_name}
                  />
                  <div className="error">
                    {formik.touched.scientific_name &&
                      formik.errors.scientific_name}
                  </div>
                </div>
              )}
            </div>

            <div className="">
              <label
                htmlFor=""
                className=""
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                Description
              </label>
              <CustomInput
                type="text"
                label="Enter description"
                name="description"
                onChng={formik.handleChange("description")}
                onBlr={formik.handleBlur("description")}
                val={formik.values.description}
              />
            </div>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>

            {firstProduct?.season && firstProduct?.season?.length > 0 && (
              <div>
                <label
                  htmlFor=""
                  className=""
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Season
                </label>{" "}
                <select
                  name="season"
                  onChange={handleSeasonChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.season}
                  multiple
                  className="form-control py-3"
                >
                  <option value="summer">Summer</option>
                  <option value="winter">Winter</option>
                  <option value="spring">Spring</option>
                  <option value="autumn">Autumn</option>
                  <option value="evergreen">Evergreen</option>
                </select>{" "}
                <div className="error">
                  {formik.touched.season && formik.errors.season}
                </div>
              </div>
            )}

            <div className="">
              <label
                htmlFor=""
                className=""
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                Featured Product
              </label>
              <input
                type="checkbox"
                name="featuredProducts"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.featuredProducts}
              />
              <div className="error">
                {formik.touched.featuredProducts &&
                  formik.errors.featuredProducts}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div className="col-6">
                <CustomInput
                  type="number"
                  label="Enter Product Price"
                  name="price"
                  onChng={formik.handleChange("price")}
                  onBlr={formik.handleBlur("price")}
                  val={formik.values.price}
                />
                <div className="error">
                  {formik.touched.price && formik.errors.price}
                </div>
              </div>
              <div className="col-6">
                <CustomInput
                  type="number"
                  label="Enter Product stock"
                  name="stock"
                  onChng={formik.handleChange("stock")}
                  onBlr={formik.handleBlur("stock")}
                  val={formik.values.stock}
                />
                <div className="error">
                  {formik.touched.stock && formik.errors.stock}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div className="col-6">
                <label
                  htmlFor="category"
                  className="form-label"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Select Category
                </label>
                <select
                  name="category"
                  onChange={formik.handleChange("category")}
                  onBlur={formik.handleBlur("category")}
                  value={formik.values.category}
                  className="form-control py-3"
                  multiple
                >
                  <option value="">Select Category</option>
                  {catState.map((i, j) => (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  ))}
                </select>
                <div className="error">
                  {formik.touched.category && formik.errors.category}
                </div>
              </div>
              {firstProduct?.uses && (
                <div className="col-6">
                  <CustomInput
                    type="text"
                    label="Enter Product Uses"
                    name="uses"
                    onChng={formik.handleChange("uses")}
                    onBlr={formik.handleBlur("uses")}
                    val={formik.values.uses}
                  />
                  <div className="error">
                    {formik.touched.uses && formik.errors.uses}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {firstProduct?.light_requirement && (
                <div className="col-6">
                  <CustomInput
                    type="text"
                    label="Enter light_requirement"
                    name="light_requirement"
                    onChng={formik.handleChange("light_requirement")}
                    onBlr={formik.handleBlur("light_requirement")}
                    val={formik.values.light_requirement}
                  />
                  <div className="error">
                    {formik.touched.light_requirement &&
                      formik.errors.light_requirement}
                  </div>
                </div>
              )}

              {firstProduct?.soil_requirement && (
                <div className="col-6">
                  <CustomInput
                    type="text"
                    label="Enter soil_requirement"
                    name="soil_requirement"
                    onChng={formik.handleChange("soil_requirement")}
                    onBlr={formik.handleBlur("soil_requirement")}
                    val={formik.values.soil_requirement}
                  />
                  <div className="error">
                    {formik.touched.soil_requirement &&
                      formik.errors.soil_requirement}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {firstProduct?.watering_schedule && (
                <div className="col-6">
                  <CustomInput
                    type="text"
                    label="Enter watering_schedule"
                    name="watering_schedule"
                    onChng={formik.handleChange("watering_schedule")}
                    onBlr={formik.handleBlur("watering_schedule")}
                    val={formik.values.watering_schedule}
                  />
                  <div className="error">
                    {formik.touched.watering_schedule &&
                      formik.errors.watering_schedule}
                  </div>
                </div>
              )}
              {firstProduct?.blooming_time && (
                <div className="col-6">
                  <CustomInput
                    type="text"
                    label="Enter blooming_time"
                    name="blooming_time"
                    onChng={formik.handleChange("blooming_time")}
                    onBlr={formik.handleBlur("blooming_time")}
                    val={formik.values.blooming_time}
                  />
                  <div className="error">
                    {formik.touched.blooming_time &&
                      formik.errors.blooming_time}
                  </div>
                </div>
              )}
            </div>

            <div className="col-12">
              <div className="bg-white border-1 p-5 text-center">
                <Dropzone
                  onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
            <div className="showimages d-flex flex-wrap mt-3 gap-3">
              {imgState?.map((i, j) => (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              ))}
            </div>

            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              {id ? "Update" : "Add"} Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
