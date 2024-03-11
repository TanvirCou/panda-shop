import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name: "wishList",
    initialState: {
        wishList: localStorage.getItem("wishListItems") ? JSON.parse(localStorage.getItem("wishListItems")) : [],
    },
    reducers: {
        addToWishList: (state, action) => {
            const item = action.payload;
            return {
                ...state,
                wishList: [...state.wishList, item]
            }
        },

        removeFromWishList: (state, action) => {
            return {
                ...state,
                wishList: state.wishList.filter(i => i._id !== action.payload),
            }
            
        }
    }
});

export const {addToWishList, removeFromWishList} = wishListSlice.actions;

export default wishListSlice.reducer;