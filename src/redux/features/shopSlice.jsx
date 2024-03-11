import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchShop = createAsyncThunk("shop/fetchShop", async() => {
    const res = await axios.get("http://localhost:3000/api/shop/get", {withCredentials: true});
    return res.data;
});

export const fetchAllShop = createAsyncThunk("shop/fetchAllShop", async() => {
    const res = await axios.get("http://localhost:3000/api/shop/admin-all-shops", {withCredentials: true});
    return res.data;
});

export const shopSlice = createSlice({
    name: "shop",
    initialState: {
        loading: true
    },
    extraReducers: (builder) => {
        builder.addCase(fetchShop.pending, (state) => {
            state.loading = true,
            state.isShop = false,
            state.shop = [],
            state.error = null
        });
        builder.addCase(fetchShop.fulfilled, (state, action) => {
            state.loading = false,
            state.isShop = true,
            state.shop = action.payload,
            state.error = null
        });
        builder.addCase(fetchShop.rejected, (state, action) => {
            state.loading = false,
            state.isShop = false,
            state.shop = [],
            state.error = action.payload
        });

        builder.addCase(fetchAllShop.pending, (state) => {
            state.allShopLoading = true,
            state.shop = [],
            state.error = null
        });
        builder.addCase(fetchAllShop.fulfilled, (state, action) => {
            state.allShopLoading = false,
            state.allShops = action.payload,
            state.error = null
        });
        builder.addCase(fetchAllShop.rejected, (state, action) => {
            state.allShopLoading = false,
            state.error = action.payload
        });
    },
});

export default shopSlice.reducer;