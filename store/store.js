import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../reducer/CartReducer";
import ProductReducer from "../reducer/ProductReducer";
import { apiSlice } from "../reducer/apiSlice";

export default configureStore({
	reducer: {
		cart: CartReducer,
		product: ProductReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});
