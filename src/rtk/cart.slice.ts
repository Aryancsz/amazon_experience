import { createSlice, current } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
export interface ICartProducts {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  quantity: number;
}

interface IInitialState {
  cart: ICartProducts[];
}

const initialState: IInitialState = {
  cart: [],
};

const cartSlice = createSlice({
  initialState,
  name: "cartProducts",
  reducers: {
    addToCart(state, action) {
      //   check if item present in state
      const currentCartState = current(state.cart);
      if (
        currentCartState.length > 0 &&
        currentCartState.some((item) => item.id === action.payload.id)
      ) {
        let result = currentCartState.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        return { ...state, cart: [...result] };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    },
    deleteAnItem(state, action) {
      const currentCartState = current(state.cart);
      const result = currentCartState.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cart: [...result] };
    },
    resetCart(state) {
      return { ...state, cart: [] };
    },
  },
});

export const { addToCart, deleteAnItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
