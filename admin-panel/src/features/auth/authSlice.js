import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import { toast } from "react-toastify";

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrderByid = createAsyncThunk(
  "order/getOrderByid",
  async (id, thunkAPI) => {
    try {
      const response = await authService.getOrderByid(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getOrderByUserId = createAsyncThunk(
  "order/getOrderByUserId",
  async (userId, thunkAPI) => {
    try {
      const response = await authService.getOrderByUserId(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, updateData }, thunkAPI) => {
    try {
      const response = await authService.updateOrder(id, updateData);
      console.log("Response from updateOrder:", response); // Debugging log
      return response.updatedOrder; // Return the updated order object directly
    } catch (error) {
      console.error("Error in updateOrder:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrderByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        toast.info("Orders fetched successfully!");
      })
      .addCase(getOrderByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(`Failed to fetch orders: ${action.payload}`);
      })
      .addCase(getOrderByid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        toast.info("Orders fetched successfully!");
      })
      .addCase(getOrderByid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(`Failed to fetch orders: ${action.payload}`);
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        console.log("Update Order Fulfilled:", action.payload); // This should now show the order object

        if (action.payload && action.payload._id) {
          if (Array.isArray(state.orders)) {
            const index = state.orders.findIndex(
              (order) => order._id === action.payload._id
            );
            if (index !== -1) {
              state.orders[index] = action.payload;
            }
          }
          toast.success("Order status updated successfully!");
        } else {
          console.error("Invalid payload structure", action.payload);
        }
      })

      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(`Failed to update order: ${action.payload}`);
      });
  },
});

export default authSlice.reducer;
