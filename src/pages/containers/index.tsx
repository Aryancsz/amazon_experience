import React from "react";
import Image from "next/image";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
const Footer = () => {
  return (
    <>
      <div className='flex justify-center bg-az_header_dark text-white w-full'>
        <div className='w-[60vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 my-5'>
          <div className='space-y-2'>
            <h1 className='text-lg font-bold'>Get to Know Us</h1>
            <ul>
              <li className='cursor-pointer text-sm hover:underline'>
                About Us
              </li>
              <li className='cursor-pointer text-sm hover:underline'>
                Careers
              </li>
              <li className='cursor-pointer text-sm hover:underline'>
                Press Releases
              </li>
              <li className='cursor-pointer text-sm hover:underline'>
                Amazon Science
              </li>
            </ul>
          </div>
          <div className='space-y-2'>
            <h1 className='text-lg font-bold'>Connect with Us</h1>
            <ul>
              <li className='cursor-pointer text-sm hover:underline'>
                Facebook
              </li>
              <li className='cursor-pointer text-sm hover:underline'>
                Twitter
              </li>
              <li className='cursor-pointer text-sm hover:underline'>
                Instagram
              </li>
            </ul>
          </div>
          <div className='space-y-2'>
            <h1 className='text-lg font-bold'>Make Money with Us</h1>
            <ul>
              <li className='cursor-pointer text-sm hover:underline'>
                Sell on Amazon
              </li>
              <li className='cursor-pointer text-sm hover:underline'>
                Sell under Amazon Accelerator
              </li>
              <li className='cursor-pointer text-sm hover:underline'>
                Protect and Build Your Brand
              </li>
              <li className='cursor-pointer text-sm hover:underline'>
                Amazon Global Selling
              </li>
              <li className='cursor-pointer text-sm hover:underline'>
                Become an Affiliate
              </li>
            </ul>
          </div>
          <div className='space-y-2'>
            <h1 className='text-lg font-bold'>Let Us Help You</h1>
            <ul>
              <li className='cursor-pointer text-sm hover:underline'>
                COVID-19 and Amazon
              </li>
              <li className='cursor-pointer text-sm hover:underline'>
                Your Account
              </li>
              <li className='cursor-pointer text-sm hover:underline'>
                Returns Centre
              </li>
              <li className='cursor-pointer text-sm hover:underline'>
                100% Purchase Protection
              </li>
              <li className='cursor-pointer text-sm hover:underline'>Help</li>
            </ul>
          </div>
        </div>
      </div>
      <p className='border-b border-b-gray-600' />
      <div className='flex justify-center bg-az_header_dark text-white w-full space-x-10 py-5'>
        <Image
          className='w-auto'
          src='https://user-images.githubusercontent.com/73257543/235652850-ffd1f086-ea7f-42b4-850f-2a6f64806eda.png'
          width={150}
          height={100}
          priority
          alt='amazon logo'
        />
        <div className='flex justify-center cursor-pointer items-center w-24 border border-gray-400 rounded-md my-2 px-1'>
          <p>English</p>
          <span>
            <ChevronUpDownIcon className='h-5 w-5' />
          </span>
        </div>
      </div>
      <div className='bg-az_header_dark text-white text-xs py-5 flex justify-center space-x-4'>
        <p>Australia</p>
        <p>Brazil</p>
        <p>Canada</p>
        <p>China</p>
        <p>France</p>
        <p>Germany</p>
        <p>Italy</p>
        <p>Japan</p>
        <p>Mexico</p>
        <p>Netherlands</p>
        <p>Poland</p>
        <p>Singapore</p>
        <p>Spain</p>
        <p>Turkey</p>
        <p>United Arab Emirates</p>
        <p>United Kingdom</p>
        <p>United States</p>
      </div>
      <div className='bg-az_header_dark py-5 text-xs text-white flex flex-col items-center justify-center'>
        <span>Copyrights notice this is only for training / learning purposes © 1996-2023</span>
        <span>Amazon.com, Inc. or its affiliates</span>
      </div>
    </>
  );
};

export default Footer;
