import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const isItemExits = state.cart.find(i => i._id === item._id);
            if(isItemExits) {
                return {
                    ...state,
                    cart: state.cart.map(i => i._id === isItemExits._id ? item : i)
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, item]
                }
            }
        },

        removeFromCart: (state, action) => {
            return {
                ...state,
                cart: state.cart.filter(i => i._id !== action.payload),
            }
            
        },

        emptyCart: (state, action) => {
            return {
                ...state,
                cart: [],
            }
        }
    }
});

export const {addToCart, removeFromCart, emptyCart} = cartSlice.actions;

export default cartSlice.reducer;