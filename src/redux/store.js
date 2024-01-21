import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import shopReducer from "./features/shopSlice";
import cartReducer from "./features/cartSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        shop: shopReducer,
        cart: cartReducer
    }
});

export default store;