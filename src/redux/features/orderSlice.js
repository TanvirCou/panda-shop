import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrder = createAsyncThunk("order/fetchOrder", async(userId) => {
    const res = await axios.get(`http://localhost:3000/api/order/get-all-orders/${userId}`);
    return res.data;
});

export const fetchShopOrder = createAsyncThunk("order/fetchShopOrder", async(shopId) => {
    const res = await axios.get(`http://localhost:3000/api/order/get-shop-all-orders/${shopId}`);
    return res.data;
});

export const fetchAdminOrder = createAsyncThunk("order/fetchAdminOrder", async() => {
    const res = await axios.get(`http://localhost:3000/api/order/admin-all-orders`, {withCredentials: true});
    return res.data;
});


export const orderSlice = createSlice({
    name: "order",
    initialState: {
        isOrderLoading: true,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.pending, (state) => {
            state.isOrderLoading = true
        });
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.isOrderLoading = false,
            state.orders = action.payload,
            state.success = true
        });
        builder.addCase(fetchOrder.rejected, (state, action) => {
            state.isOrderLoading = false,
            state.error = action.payload,
            state.success = false
        });

        builder.addCase(fetchShopOrder.pending, (state) => {
            state.isShopOrderLoading = true
        });
        builder.addCase(fetchShopOrder.fulfilled, (state, action) => {
            state.isShopOrderLoading = false,
            state.shopOrders = action.payload,
            state.success = true
        });
        builder.addCase(fetchShopOrder.rejected, (state, action) => {
            state.isShopOrderLoading = false,
            state.error = action.payload,
            state.success = false
        });

        builder.addCase(fetchAdminOrder.pending, (state) => {
            state.isAdminOrderLoading = true
        });
        builder.addCase(fetchAdminOrder.fulfilled, (state, action) => {
            state.isAdminOrderLoading = false,
            state.allOrders = action.payload,
            state.success = true
        });
        builder.addCase(fetchAdminOrder.rejected, (state, action) => {
            state.isAdminOrderLoading = false,
            state.error = action.payload,
            state.success = false
        });

    },
});

export default orderSlice.reducer;