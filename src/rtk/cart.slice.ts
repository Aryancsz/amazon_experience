import { createSlice, current } from "@reduxjs/toolkit";

export interface ICartProducts {
  id: number;
  title?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
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
        const newArr = currentCartState.filter(product=> product.id !== action.payload.id)
        newArr.push(action.payload)
        return { ...state, cart: [...newArr] };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
