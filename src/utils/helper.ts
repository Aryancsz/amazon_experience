import { ICartProducts } from "@/rtk/cart.slice";

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - 1 + min) + min);
};

export const cartQuantityCalculator = (cartProducts: ICartProducts[]) => {
  return cartProducts.reduce((acc, product) => {
    return (acc = acc + product.quantity);
  }, 0);
};

export const dollarToINDIAN = (price: number): number => {
  return price * 81;
};
