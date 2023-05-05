import { useAppSelector } from "@/rtk/store";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import React from "react";
import Image from "next/image";
import { ICartProducts } from "@/rtk/cart.slice";
import { dollarToINDIAN } from "@/utils";

interface ICartProps {}

const Cart: React.FC<ICartProps> = () => {
  const cartItems = useAppSelector((state) => state.cartProducts);

  return (
    <div className='w-[100vw] bg-gray-300 flex justify-center'>
      <div className='w-[75vw] bg-white p-3 mx-3 my-10 h-[60vh]'>
        <div>
          {cartItems.cart.length > 0 ? (
            <h1 className='text-3xl font-medium'>Shopping Cart</h1>
          ) : (
            <h1 className='text-3xl font-medium'>Your Amazon Cart is empty.</h1>
          )}
          {cartItems.cart.length > 0 ? (
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
          {cartItems.cart.length > 0 ? (
            <div>
              {cartItems.cart.map((item: ICartProducts) => {
                return (
                  <div key={item.id}>
                    <div className='flex space-x-7 mt-2'>
                      <div className='relative h-[12rem] w-[17rem]'>
                        <Image
                          src={item.thumbnail as string}
                          alt='india'
                          fill
                        />
                      </div>
                      <div className='flex w-full justify-between'>
                        <div>
                          <p className='text-lg font-medium'>
                            {item.description}
                          </p>
                        </div>
                        <p className='relative text-lg font-semibold pl-0.5'>
                          <span className='absolute top-0 -left-2 transform text-base font-normal scale-x-75'>
                            ₹
                          </span>{" "}
                          {(
                            dollarToINDIAN(item.price || 0) * item.quantity
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='flex justify-center items-center'>
              <FaceFrownIcon className='h-48 w-48 text-az_orange' />
            </div>
          )}
        </div>
      </div>
      <div className='w-[20vw] bg-white p-3 mx-3 my-10 h-[60vh]'></div>
    </div>
  );
};

export default Cart;
