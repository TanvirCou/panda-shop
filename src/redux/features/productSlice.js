import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk("product/createProduct", async(newProduct) => {
    const res = await axios.post("http://localhost:3000/api/product/create-product", newProduct);
    return res.data;
});

export const fetchProduct = createAsyncThunk("product/fetchProduct", async(shopId) => {
    const res = await axios.get(`http://localhost:3000/api/product/all-products/${shopId}`);
    return res.data;
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async(productId) => {
    const res = await axios.delete(`http://localhost:3000/api/product/delete-product/${productId}`, {withCredentials: true});
    return res.data;
});

export const fetchAllProduct = createAsyncThunk("product/fetchAllProduct", async() => {
    const res = await axios.get(`http://localhost:3000/api/product/get-all-products`);
    return res.data;
});


export const productSlice = createSlice({
    name: "product",
    initialState: {
        isProductLoading: true,
    },
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state) => {
            state.isProductLoading = true
            state.success = false
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.isProductLoading = false,
            state.product = action.payload,
            state.success = true
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.isProductLoading = false,
            state.error = action.payload,
            state.success = false
        });

        builder.addCase(fetchProduct.pending, (state) => {
            state.isProductLoading = true
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.isProductLoading = false,
            state.products = action.payload,
            state.success = true
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.isProductLoading = false,
            state.error = action.payload,
            state.success = false
        });

        builder.addCase(deleteProduct.pending, (state) => {
            state.isProductLoading = true
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.isProductLoading = false,
            state.message = action.payload,
            state.success = true
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.isProductLoading = false,
            state.error = action.payload,
            state.success = false
        });

        builder.addCase(fetchAllProduct.pending, (state) => {
            state.isProductLoading = true
        });
        builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
            state.isProductLoading = false,
            state.allProducts = action.payload,
            state.success = true
        });
        builder.addCase(fetchAllProduct.rejected, (state, action) => {
            state.isProductLoading = false,
            state.error = action.payload,
            state.success = false
        });
    },
});

export default productSlice.reducer;