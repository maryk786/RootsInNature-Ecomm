import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";
const register = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const login = async (userData) => {
  console.log(userData);
  try {
    const response = await axios.post(`${base_url}user/login`, userData);
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const getUserWishlist = async () => {
  // console.log(config);
  try {
    const response = await axios.get(`${base_url}user/wishlist`, config);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || error.message);
  }
};
const addToCart = async (cartData) => {
  try {
    const response = await axios.post(`${base_url}user/cart`, cartData, config);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
const getCart = async () => {
  try {
    const response = await axios.get(`${base_url}user/cart`, config);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log("eeoroor");
    throw new Error(error.response?.data?.message || error.message);
  }
};
const removeFromCart = async (cartItemId) => {
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${cartItemId}`,
    config
  );

  if (response.data) {
    return response.data;
  }
};

const updateQuantity = async (cartDetail) => {
  try {
    const response = await axios.put(
      `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
      null,
      config
    );

    if (response.data) {
      return response.data;
    } else {
      console.log("error");
    }
  } catch (error) {
    console.error(
      "Error updating quantity:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || error.message);
  }
};

const createOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${base_url}user/cart/create-order`,
      orderData,
      config
    );
    const createdOrder = response.data;

    // Save order data to local storage
    saveOrderToLocalStorage(createdOrder);

    return createdOrder;
  } catch (error) {
    console.error("Error creating order:", error.message);
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
// Fetch all orders from the backend
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${base_url}user/getAllOrders`, config);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching orders: " + error.message);
  }
};
const logout = async () => {
  try {
    await axios.get(`${base_url}user/logout`, {}, config);
    localStorage.removeItem("customer");
    localStorage.removeItem("orders");
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const emptyCart = async () => {
  try {
    const response = await axios.delete(`${base_url}user/empty-cart`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
// Function to save order data to local storage
const saveOrderToLocalStorage = (order) => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
};

// Function to retrieve orders from local storage
export const getOrdersFromLocalStorage = () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  return orders;
};

// Add functions to save and retrieve cart items to/from local storage
const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("userCart", JSON.stringify(cartItems));
};

const getCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem("userCart");
  return cartItems ? JSON.parse(cartItems) : [];
};

export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
  getCart,
  removeFromCart,
  saveCartToLocalStorage,
  getCartFromLocalStorage,
  updateQuantity,
  createOrder,
  logout,
  emptyCart,
  getOrderByUserId,
  getAllOrders,
};
