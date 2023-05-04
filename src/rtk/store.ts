import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products.slice";
import cartReducer from "./cart.slice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cartProducts: cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
