import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const createEvent = createAsyncThunk("event/createEvent", async(newEvent) => {
    const res = await axios.post("http://localhost:3000/api/event/create-event", newEvent);
    return res.data;
});

export const fetchEvent = createAsyncThunk("event/fetchEvent", async(shopId) => {
    const res = await axios.get(`http://localhost:3000/api/event/all-events/${shopId}`);
    return res.data;
});

export const deleteEvent = createAsyncThunk("product/deleteProduct", async(eventId) => {
    const res = await axios.delete(`http://localhost:3000/api/event/delete-event/${eventId}`, {withCredentials: true});
    return res.data;
});

export const fetchAllEvent = createAsyncThunk("event/fetchAllEvent", async() => {
    const res = await axios.get(`http://localhost:3000/api/event/get-all-events`);
    return res.data;
});

export const eventSlice = createSlice({
    name: "Event",
    initialState: {
        isEventLoading: true,
    },
    extraReducers: (builder) => {
        builder.addCase(createEvent.pending, (state) => {
            state.isEventLoading = true
        });
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.isEventLoading = false,
            state.event = action.payload,
            state.success = true
        });
        builder.addCase(createEvent.rejected, (state, action) => {
            state.isEventLoading = false,
            state.error = action.payload,
            state.success = false
        });

        builder.addCase(fetchEvent.pending, (state) => {
            state.isEventLoading = true
        });
        builder.addCase(fetchEvent.fulfilled, (state, action) => {
            state.isEventLoading = false,
            state.events = action.payload,
            state.success = true
        });
        builder.addCase(fetchEvent.rejected, (state, action) => {
            state.isEventLoading = false,
            state.error = action.payload,
            state.success = false
        });

        builder.addCase(deleteEvent.pending, (state) => {
            state.isEventLoading = true
        });
        builder.addCase(deleteEvent.fulfilled, (state, action) => {
            state.isEventLoading = false,
            state.message = action.payload,
            state.success = true
        });
        builder.addCase(deleteEvent.rejected, (state, action) => {
            state.isEventLoading = false,
            state.error = action.payload,
            state.success = false
        });

        builder.addCase(fetchAllEvent.pending, (state) => {
            state.isEventLoading = true
        });
        builder.addCase(fetchAllEvent.fulfilled, (state, action) => {
            state.isEventLoading = false,
            state.allEvents = action.payload,
            state.success = true
        });
        builder.addCase(fetchAllEvent.rejected, (state, action) => {
            state.isEventLoading = false,
            state.error = action.payload,
            state.success = false
        });
    },
});

export default eventSlice.reducer;