import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async() => {
    const res = await axios.get("http://localhost:3000/api/user/get", {withCredentials: true});
    return res.data;
});

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        isAuthenticated: false,
        user: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true,
            state.isAuthenticated = false,
            state.user = [],
            state.error = null
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isAuthenticated = true,
            state.user = action.payload,
            state.error = null
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false,
            state.isAuthenticated = false,
            state.user = [],
            state.error = action.payload
        });
    },
});

export default userSlice.reducer;