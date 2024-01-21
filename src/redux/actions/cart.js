export const addToCart = (data) => async(dispatch, getState) => {
    dispatch({
        type: "addToCart",
        payload: data
    });

    console.log(getState());
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data
};

export const removeFromCart = (data) => async(dispatch, getState) => {
    dispatch({
        type: "removeFromCart",
        payload: data.id
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data
};