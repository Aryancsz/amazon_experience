import { useAppSelector } from "@/rtk/store";
import { ChevronDownIcon, FaceFrownIcon } from "@heroicons/react/24/outline";
import React from "react";
import Image from "next/image";
import { ICartProducts } from "@/rtk/cart.slice";
import { dollarToINDIAN } from "@/utils";
import CartListCard from "../components/CartListCard";

interface ICartProps {}

const Cart: React.FC<ICartProps> = () => {
  const cartItems = useAppSelector((state) => state.cartProducts);

  const items = cartItems.cart.slice().reverse();

  const calculateTotalCost = (items: ICartProducts[]) => {
    return items.reduce((acc, item) => {
      acc = acc + item.quantity * item.price;
      return acc;
    }, 0);
  };

  return (
    <div className='w-[100vw] bg-gray-300 flex justify-center'>
      <div className='w-[75vw] bg-white p-3 mx-3 my-10 h-[60vh]'>
        <div>
          {items.length > 0 ? (
            <h1 className='text-3xl font-medium'>Shopping Cart</h1>
          ) : (
            <h1 className='text-3xl font-medium'>Your Amazon Cart is empty.</h1>
          )}
          {items.length > 0 ? (
            <p className='text-indigo-500 text-sm'>Selected items</p>
          ) : (
            <p className='text-gray-700 mt-1 text-sm w-2/3'>
              Your shopping cart is waiting. Give it purpose – fill it with
              groceries, clothing, household supplies, electronics and more.
              Continue shopping on the{" "}
              <span className='text-indigo-500'>Amazon.in homepage</span>, learn
              about <span className='text-indigo-500'>today&apos;s deals,</span>{" "}
              or visit your <span className='text-indigo-500'>Wish List.</span>
            </p>
          )}
          <div className='flex justify-end'>
            <span className='text-gray-600 text-sm'>Price</span>
          </div>
          <hr className='mb-3' />
          {items.length > 0 ? (
            <div className='overflow-y-auto h-[45vh] pr-2'>
              {items.map((item: ICartProducts) => {
                return <CartListCard key={item.id} item={item} />;
              })}
            </div>
          ) : (
            <div className='flex justify-center items-center'>
              <FaceFrownIcon className='h-48 w-48 text-az_orange' />
            </div>
          )}
        </div>
      </div>
      <div className='w-[20vw] bg-white p-7 mx-3 my-10 h-[30vh]'>
        <div className='text-lg mb-1 flex'>
          Subtotal &#40;{items.length} item &#41; :{" "}
          <p className='font-bold ml-2'>{dollarToINDIAN(calculateTotalCost(items)).toLocaleString("en-IN")}</p>
        </div>
        <div className='flex space-x-2 items-center text-sm'>
          <input type='checkbox' className='h-3 w-3 cursor-pointer' />
          <p>This order contains a gift</p>
        </div>
        <div className='h-full flex flex-col space-y-7 justify-center items-center'>
          <p className='bg-az_add_to_cart py-2 px-2.5 w-full text-center rounded-md cursor-pointer hover:bg-az_buy_now'>
            Proceed to Buy
          </p>
          <div className='flex justify-between w-full py-2 px-3 space-x-2 border border-gray-600 rounded-sm cursor-pointer'>
            <p>EMI Available</p>
            <ChevronDownIcon className='h-5 w-5' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
