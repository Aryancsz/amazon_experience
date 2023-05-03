import { IProducts } from "@/rtk/amazon.slice";
import axios from "axios";

export interface IProductsResponse {
  limit?: number;
  products: IProducts[];
  skip?: number;
  total?: number;
}

interface IListProductsConfig {
  search: string;
  limit: number;
  skip: number;
}
export const listProducts = async ({
  limit,
  search,
  skip,
}: IListProductsConfig) => {
  const url = search
    ? `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
    : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  const response = await axios.get(url);
  return response.data as IProductsResponse;
};
