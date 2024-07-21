import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";

export const getProductbyPage = createAsyncThunk(
  "product/getProductsByPage",
  async (category, thunkAPI) => {
    try {
      return await productService.getProductByPage(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllProduct = createAsyncThunk(
  "products/GetProducts",
  async () => {
    try {
      const data = await productService.getProducts();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getAProduct = createAsyncThunk(
  "product/getAProducts",
  async (id, thunkAPI) => {
    try {
      return await productService.getSingleProducts(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "product/wishlist",
  async (prodId, thunkAPI) => {
    try {
      return await productService.addToWishList(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    isError: false,
    isLoading: false,
    message: "",
    isSuccess: false,
    wishlist: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductbyPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductbyPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.productList = action.payload;
      })
      .addCase(getProductbyPage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
      })

      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        state.message = "Product Fetched Successfully";
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
      })

      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
        state.message = "loading";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wishlist = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        if (state.isError === true) {
          toast.error(action.payload, "error occurred");
        }
      });
  },
});

export default productSlice.reducer;
