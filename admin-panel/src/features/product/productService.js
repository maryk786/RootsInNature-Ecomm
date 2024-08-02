import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data; // Ensure this is plain data
};

const getProById = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  return response.data; // Ensure this is plain data
};

const createProduct = async (productData) => {
  const response = await axios.post(`${base_url}product/`, productData, config);
  return response.data; // Ensure this is plain data
};

const updateProduct = async (id, product) => {
  const response = await axios.put(`${base_url}product/${id}`, product, config);
  return response.data; // Ensure this is plain data
};

const deleteProduct = async (productId) => {
  const response = await axios.delete(`${base_url}product/${productId}`, config);
  return response.data; // Ensure this is plain data
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProById,
};

export default productService;
