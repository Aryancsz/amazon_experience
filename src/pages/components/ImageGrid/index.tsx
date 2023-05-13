import React from "react";
import Image from "next/image";
import StarRating from "../StarRatings";
import { IProducts } from "@/rtk/products.slice";
import Link from "next/link";
import { dollarToINDIAN } from "@/utils";

interface IImageGrid {
  products: IProducts[];
}
const ImageGrid: React.FC<IImageGrid> = ({ products }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {products?.map((product) => {
        const ratingFloat = `${product.rating}`.split(".")[1];
        return (
          <Link href={`/product_details/${product.id}`} key={product.id}>
            <div
              key={product.id}
              className='h-96 bg-white px-2 flex flex-col justify-between items-center overflow-hidden cursor-pointer'
            >
              <div className='relative h-56 w-72 mt-2'>
                <Image src={product?.images?.[0]} alt={product.title} fill />
              </div>
              <div className='my-2 w-full'>
                <h1>{product.title}</h1>
                <div className='flex items-center'>
                  <StarRating
                    rate={
                      +ratingFloat > 50
                        ? Math.ceil(product.rating)
                        : Math.floor(product.rating)
                    }
                  />
                  <p className='text-gray-600 mt-1 mx-2'>
                    {" "}
                    {Math.ceil(product.rating * 10)}
                  </p>
                </div>
                <div className='flex'>
                  <p className='font-semibold'>
                    Save {Math.round(product.discountPercentage)}%
                  </p>
                  {product.discountPercentage > 13 && (
                    <p className='bg-red-700 px-1 mx-2 text-white w-28 rounded-sm'>
                      Deal of the day
                    </p>
                  )}
                </div>
                <div className='flex mt-2'>
                  <p className='text-red-700 font-sans text-2xl'>
                    ₹ {dollarToINDIAN(product.price).toLocaleString("en-IN")}
                  </p>
                  <p className='mx-2 mb-0.5 self-end line-through text-gray-700'>
                    {Math.round(
                      (dollarToINDIAN(product.price) * 100) /
                        (100 - Math.round(product.discountPercentage))
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ImageGrid;
