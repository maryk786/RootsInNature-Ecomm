import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userServices";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getUserWishlist = createAsyncThunk(
  "user/wishlist",
  async (thunkAPI) => {
    try {
      return await authService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue("error", error.message);
    }
  }
);
export const addProToCart = createAsyncThunk(
  "user/cart/add",
  async (cartData, thunkAPI) => {
    try {
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getUserCart = createAsyncThunk(
  "user/cart/get",
  async (thunkAPI) => {
    try {
      return await authService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "user/cart/remove",
  async (id, thunkAPI) => {
    try {
      return await authService.removeFromCart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateProductCart = createAsyncThunk(
  "user/cart/update",
  async (cartDetail, thunkAPI) => {
    try {
      return await authService.updateQuantity(cartDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async ({ user, shippingInfo, orderItems }, { rejectWithValue }) => {
    try {
      const response = await authService.createOrder({
        user,
        shippingInfo,
        orderItems,
      });
      return response;
    } catch (error) {
      console.error("Error in createOrder thunk:", error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const getOrderByUserId = createAsyncThunk(
  "order/getByUserId",
  async (userId, thunkAPI) => {
    try {
      const response = await authService.getOrderByUserId(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const emptyCart = createAsyncThunk(
  "user/emptyCart",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user?.token;
      const cartItems = state.user?.cart;
      authService.saveCartToLocalStorage(cartItems);
      await authService.emptyCart(token);
      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const restoreCart = createAsyncThunk(
  "user/restoreCart",
  async (_, thunkAPI) => {
    try {
      const cartItems = authService.getCartFromLocalStorage();
      return cartItems;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Async thunk to fetch all orders
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async () => {
    try {
      const orders = await authService.getAllOrders();
      return orders;
    } catch (error) {
      throw error;
    }
  }
);

const getCustomerFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCustomerFromLocalStorage,
  isError: false,
  isLoading: false,
  message: "",
  isSuccess: false,
  order: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.info("User Created Successfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        if (state.isSuccess === true) {
          localStorage.setItem("token", action.payload.token);
          toast.info("User Logged In");
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "Logged out successfully";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message;
      })

      .addCase(getUserWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wishlist = action.payload;
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })

      .addCase(addProToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.addCart = action.payload;
        if (state.isSuccess === true) {
          toast.info("Product Added to Cart");
        }
      })
      .addCase(addProToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message = action.error?.message || "An error occurred";
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })

      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.getCart = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })

      .addCase(emptyCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emptyCart.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cart = [];
        toast.info("Cart Emptied Successfully");
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })
      .addCase(restoreCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.getCart = action.payload;
        if (state.isSuccess === true) {
          toast.info("Cart Restored Successfully");
        }
      })
      .addCase(restoreCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })

      .addCase(removeProductFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleteCart = action.payload;
        if (state.isSuccess === true) {
          toast.info("Product remove from Cart");
        }
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })
      .addCase(updateProductCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updateCart = action.payload;
        if (state.isSuccess === true) {
          toast.info("Quantity from Cart");
        }
      })
      .addCase(updateProductCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error?.message || "An error occurred";
        if (state.isError) {
          toast.error(state.message);
        }
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Order placed successfully!");
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(`Order failed: ${action.error.message}`);
      })
      // Get Order by User ID
      .addCase(getOrderByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
        toast.info("Orders fetched successfully!");
      })
      .addCase(getOrderByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(`Failed to fetch orders: ${action.payload}`);
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default authSlice.reducer;
