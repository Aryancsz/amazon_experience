import { IProductsResponse } from "@/services/amazonApi";
import { createSlice } from "@reduxjs/toolkit";

export interface IProducts {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const initialState: IProductsResponse = {
  products: [],
};

const productsSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    receivedProducts(state, action) {
      const { products, limit, skip, total } = action.payload;
      state.products = products;
      state.limit = limit;
      state.skip = skip;
      state.total = total;
    },
  },
});

export const { receivedProducts } = productsSlice.actions;
export default productsSlice.reducer;
