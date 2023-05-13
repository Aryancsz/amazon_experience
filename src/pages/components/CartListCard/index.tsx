import { ICartProducts, addToCart, deleteAnItem } from "@/rtk/cart.slice";
import React, { useState } from "react";
import Image from "next/image";
import { dollarToINDIAN } from "@/utils";
import { useAppDispatch } from "@/rtk/store";

interface ICartListCard {
  item: ICartProducts;
}
const CartListCard: React.FC<ICartListCard> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleCartItemDelete = (id: number) => {
    dispatch(deleteAnItem({ id }));
  };

  const handleCartModify = (qty: number, item: ICartProducts) => {
    if (qty === 0) return;
    dispatch(
      addToCart({
        ...item,
        quantity: qty > 5 ? 5 : qty,
      })
    );
  };
  return (
    <>
      <div className='flex space-x-7 mt-2'>
        <div className='relative h-[12rem] w-[17rem]'>
          <Image src={item.thumbnail as string} alt='india' fill />
        </div>
        <div className='flex w-full justify-between'>
          <div className='flex flex-col justify-evenly text-sm mr-2'>
            <p className='text-lg font-medium'>{item.description}</p>
            <div className='space-y-1'>
              <p className='text-emerald-700 font-semibold'>In Stock</p>
              <p className='text-gray-600'>Eligible for FREE shipping</p>
              <div className='flex space-x-2 items-center'>
                <input type='checkbox' className='h-3 w-3 cursor-pointer' />
                <p>
                  This will be a gift{" "}
                  <span className='text-indigo-600 cursor-pointer'>
                    Learn more
                  </span>
                </p>
              </div>
              <p>
                <span className='font-bold'>Brand:</span> {item.brand}
              </p>
              <div className='flex items-center space-x-2'>
                <p className='font-semibold'>Quantity :</p>
                <div className='flex content-center justify-center'>
                  <div
                    className={`px-2 rounded-sm border-t border-l border-b  border-az_orange cursor-pointer ${
                      item.quantity === 1 && "pointer-events-none"
                    }`}
                    onClick={() => handleCartModify(item.quantity - 1, item)}
                  >
                    -
                  </div>
                  <div className='px-2 rounded-sm border border-az_orange'>
                    {item.quantity}
                  </div>
                  <div
                    className={`px-2 rounded-sm border-t border-r border-b border-az_orange cursor-pointer ${
                      item.quantity === 5 && "pointer-events-none"
                    }`}
                    onClick={() => handleCartModify(item.quantity + 1, item)}
                  >
                    +
                  </div>
                </div>
                <p className='text-gray-600'>|</p>
                <p
                  className='text-indigo-600 cursor-pointer'
                  onClick={() => handleCartItemDelete(item.id)}
                >
                  Delete
                </p>
                <p className='text-gray-600'>|</p>
                <p className='text-indigo-600 cursor-pointer'>Save for later</p>
                <p className='text-gray-600'>|</p>
                <p className='text-indigo-600 cursor-pointer'>
                  See more like this
                </p>
                <p className='text-gray-600'>|</p>
                <p className='text-indigo-600 cursor-pointer'>Share</p>
              </div>
            </div>
          </div>
          <p className='relative text-lg font-semibold pl-0.5'>
            <span className='absolute top-0 -left-2 transform text-base font-normal scale-x-75'>
              ₹
            </span>{" "}
            {(dollarToINDIAN(item.price || 0) * item.quantity).toLocaleString(
              "en-IN"
            )}
          </p>
        </div>
      </div>
      <hr className='my-3' />
    </>
  );
};

export default CartListCard;
