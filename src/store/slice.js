import { createSlice, nanoid } from "@reduxjs/toolkit";

import SHOP_DATA from "../../shop";
import product from "../../product";

const additemTocart = (carts, productToAdd) => {
    const isfind = carts.find((cart) => cart.id === productToAdd.id);
    if (isfind) {
        return carts.map((item) => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item);
    }

    return [...carts, { ...productToAdd, quantity: 1 }];
};

const initialState = {
    products: product,
    carts: [],
    currentUser: null
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart(state, action) {
            const isfind = state.carts.find((cart) => cart.id === action.payload.id);
            if (isfind) {
                return;
            }
            else {
                state.carts = [...state.carts, { ...action.payload, quantity: 1 }];
            }
        },
        increaseCart: (state, action) => {
            const isfind = state.carts.find((cart) => cart.id === action.payload);
            if (isfind) {
                state.carts = state.carts.map((item) => item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item);
            }
        },
        reduceCart: (state, action) => {
            const isfind = state.carts.find((cart) => cart.id === action.payload);
            if (isfind.quantity >= 2) {
                state.carts = state.carts.map((item) => item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item);
            }
        },
        removeCart: (state, action) => {
            state.carts = state.carts.filter((cart) =>
                cart.id != action.payload
            )
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        }
    }
})

export const { addCart, reduceCart, removeCart, increaseCart, setCurrentUser } = cartSlice.actions;
export default cartSlice.reducer;