import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import shopReducer from "./features/shopSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        shop: shopReducer
    }
});

export default store;