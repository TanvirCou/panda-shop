import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async() => {
    const res = await axios.get("http://localhost:3000/api/user/get", {withCredentials: true});
    return res.data;
});

export const fetchAllUser = createAsyncThunk("user/fetchAllUser", async() => {
    const res = await axios.get("http://localhost:3000/api/user/admin-all-users", {withCredentials: true});
    return res.data;
});


export const updateUserInfo = createAsyncThunk("user/updateUserInfo", async(user) => {
    const res = await axios.put("http://localhost:3000/api/user/update-user-info", user, {withCredentials: true});
    return res.data;
});

export const updateAddresses = createAsyncThunk("user/updateAddresses", async(address) => {
    const res = await axios.put("http://localhost:3000/api/user/update-user-addresses", address, {withCredentials: true});
    console.log(res);
    return res.data;
});

export const deleteAddresses = createAsyncThunk("user/deleteAddresses", async(id) => {
    const res = await axios.delete(`http://localhost:3000/api/user/delete-user-address/${id}`, {withCredentials: true});
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

        builder.addCase(fetchAllUser.pending, (state) => {
            state.allUsersLoading = true
        });
        builder.addCase(fetchAllUser.fulfilled, (state, action) => {
            state.allUsersLoading = false,
            state.allUsers = action.payload
        });
        builder.addCase(fetchAllUser.rejected, (state, action) => {
            state.allUsersLoading = false,
            state.error = action.payload
        });

        builder.addCase(updateUserInfo.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(updateUserInfo.fulfilled, (state, action) => {
            state.isLoading = false,
            state.user = action.payload
        });
        builder.addCase(updateUserInfo.rejected, (state, action) => {
            state.isLoading = false,
            state.error = "Please provide correct information"
        });

        builder.addCase(updateAddresses.pending, (state) => {
            state.addressUpdateLoading = true
        });
        builder.addCase(updateAddresses.fulfilled, (state, action) => {
            state.addressUpdateLoading = false,
            state.addressUpdateSuccess = true,
            state.user = action.payload
        });
        builder.addCase(updateAddresses.rejected, (state, action) => {
            state.addressUpdateLoading = false,
            state.addressUpdateSuccess = false,
            state.error = "Address already exists"
        });

        builder.addCase(deleteAddresses.pending, (state) => {
            state.addressDeleteLoading = true
        });
        builder.addCase(deleteAddresses.fulfilled, (state, action) => {
            state.addressDeleteLoading = false,
            state.addressDeleteSuccess = true,
            state.user = action.payload
        });
        builder.addCase(deleteAddresses.rejected, (state, action) => {
            state.addressDeleteLoading = false,
            state.addressDeleteSuccess = false,
            state.error = action.payload
        });

    },
});

export default userSlice.reducer;