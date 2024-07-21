import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProductByPage = async (category) => {
  try {
    const response = await axios.get(`${base_url}product/pagination?category=${category}`);
    if (response.data) {
      console.log(response.data)
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const getProducts = async () => {
  try {
    const response = await axios.get(`${base_url}product`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const getSingleProducts = async (id) => {
  try {
    const response = await axios.get(`${base_url}product/${id}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const addToWishList = async (prodId) => {
  console.log(prodId);
  try {
    const response = await axios.put(
      `${base_url}product/wishlist`,
      { prodId },
      config
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const productService = {
  getProductByPage,
  getProducts,
  getSingleProducts,
  addToWishList,
};
