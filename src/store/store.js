import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice"

export const store = configureStore({
    reducer:cartReducer
})