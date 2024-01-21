import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const isItemExits = state.cart.find(i => i.id === item.id);
            if(isItemExits) {
                return {
                    ...state,
                    cart: state.cart.map(i => i.id === isItemExits.id ? item : i)
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
                cart: state.cart.filter(i => i.id !== action.payload),
            }
            
        }
    }
});

export const {addToCart, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;