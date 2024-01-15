import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async() => {
    const res = await axios.get("http://localhost:3000/api/user/get", {withCredentials: true});
    return res.data;
});

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isAuthenticated = true,
            state.user = action.payload
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false,
            state.isAuthenticated = false,
            state.error = action.payload
        });
    },
});

export default userSlice.reducer;