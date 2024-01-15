import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchShop = createAsyncThunk("shop/fetchShop", async() => {
    const res = await axios.get("http://localhost:3000/api/shop/get", {withCredentials: true});
    return res.data;
});

export const shopSlice = createSlice({
    name: "shop",
    initialState: {
        loading: false,
        isShop: false,
        shop: [],
        error: null
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
    },
});

export default shopSlice.reducer;