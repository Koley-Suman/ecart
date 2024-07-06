import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice"
import useReducer from "./user-slice";

export const store = configureStore({
    reducer: {
        carts: cartReducer,
        user: useReducer
    },
    middleware: (getDefaultMiddelwdre) => getDefaultMiddelwdre({
        serializableCheck: false
    }),
})
