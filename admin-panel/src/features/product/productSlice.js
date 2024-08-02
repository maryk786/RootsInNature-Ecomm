import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const createProducts = createAsyncThunk(
  "product/create-products",
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      console.error("Error in createProducts:", error.response || error);
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, product }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const getProById = createAsyncThunk(
  "product/getById",
  async (id, thunkAPI) => {
    try {
      return await productService.getProById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      await productService.deleteProduct(productId);
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// export const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getProducts.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getProducts.fulfilled, (state, action) => {
//         console.log("Products data:", action.payload); // Inspect payload data
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.products = action.payload; // Ensure payload is plain data
//       })
//       .addCase(getProducts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.payload; // Ensure payload is plain data
//       })
//       .addCase(createProducts.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.createdProduct = action.payload; // Ensure payload is plain data
//       })
//       .addCase(createProducts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.payload; // Ensure payload is plain data
//         if (state.isError) {
//           toast.error(action.payload);
//         }
//       })
//       .addCase(getProById.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getProById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.products = action.payload; // Ensure payload is plain data
//       })
//       .addCase(getProById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload; // Ensure payload is plain data
//         toast.error(`Failed to fetch product: ${action.payload}`);
//       })
//       .addCase(deleteProduct.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.products = state.products.filter(
//           (product) => product._id !== action.payload // Ensure payload is plain data
//         );
//       })
//       .addCase(deleteProduct.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload; // Ensure payload is plain data
//       })
//       .addCase(updateProduct.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         if (Array.isArray(state.products)) {
//           const index = state.products.findIndex(
//             (product) => product._id === action.payload._id // Ensure payload is plain data
//           );
//           if (index !== -1) {
//             state.products[index] = action.payload; // Ensure payload is plain data
//           }
//         } else {
//           console.error("State.products is not an array", state.products);
//         }
//       })
//       .addCase(updateProduct.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload; // Ensure payload is plain data
//       });
//   },
// });

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log("Products data:", action.payload); // Inspect payload data
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = Array.isArray(action.payload) ? action.payload : []; // Ensure payload is an array
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload; // Ensure payload is plain data
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        if (state.isError) {
          toast.error(action.payload);
        }
      })
      .addCase(getProById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = Array.isArray(action.payload)
          ? action.payload
          : [action.payload]; // Ensure payload is an array
      })
      .addCase(getProById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(`Failed to fetch product: ${action.payload}`);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (Array.isArray(state.products)) {
          const index = state.products.findIndex(
            (product) => product._id === action.payload._id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        } else {
          console.error("State.products is not an array", state.products);
        }

        toast.success("updated successfully!");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
