import React, { useState } from "react";
import Image from "next/image";

interface IProductViewer {
  images: string[];
}

const ProductViewer: React.FC<IProductViewer> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div className='m-1.5'>
      <div className='grid grid-cols-4 grid-rows-6 gap-2'>
        {images?.[0] && (
          <div
            className='h-24 w-full relative border border-gray-300 cursor-pointer hover:transform hover:scale-105'
            onMouseEnter={() => setImageIndex(0)}
          >
            <Image
              className='p-0.5'
              src={`${images?.[0]}`}
              alt='slide1'
              fill
              sizes='(max-width: 768px)'
            />
          </div>
        )}
        {images?.[1] && (
          <div
            className='col-start-1 row-start-2 h-24 w-full relative border border-gray-300 cursor-pointer hover:transform hover:scale-105'
            onMouseEnter={() => setImageIndex(1)}
          >
            <Image
              className='p-0.5'
              src={`${images?.[1]}`}
              alt='slide2'
              fill
              sizes='(max-width: 768px)'
            />
          </div>
        )}
        {images?.[2] && (
          <div
            className='col-start-1 row-start-3 h-24 w-full relative border border-gray-300 cursor-pointer hover:transform hover:scale-105'
            onMouseEnter={() => setImageIndex(2)}
          >
            <Image
              className='p-0.5'
              src={`${images?.[2]}`}
              alt='slide3'
              fill
              sizes='(max-width: 768px)'
            />
          </div>
        )}
        {images?.[imageIndex] && (
          <div className='col-span-3 row-span-6 col-start-2 row-start-1 h-[25rem] w-full relative'>
            <Image
              className='p-0.5'
              src={`${images?.[imageIndex]}`}
              alt='slide3'
              fill
              sizes='(max-width: 768px)'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductViewer;
