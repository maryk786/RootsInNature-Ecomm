import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};

export const getOrderByid = async (id) => {
  try {
    const response = await axios.get(`${base_url}user/orderbyId/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getOrderByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${base_url}user/getorderbyUser/${userId}`,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const updateOrder = async (id, updateData) => {
  try {
    const response = await axios.put(
      `${base_url}user/order/update-order/${id}`,
      updateData,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const authService = {
  login,
  getOrders,
  getOrderByUserId,
  getOrderByid,
  updateOrder,
};

export default authService;
