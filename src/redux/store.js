import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import shopReducer from "./features/shopSlice";
import cartReducer from "./features/cartSlice";
import productReducer from "./features/productSlice";
import eventReducer from "./features/eventSlice";
import wishListReducer from "./features/wishListSlice";
import orderReducer from "./features/orderSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        shop: shopReducer,
        cart: cartReducer,
        wishList: wishListReducer,
        product: productReducer,
        event: eventReducer,
        order: orderReducer
    }
});

export default store;