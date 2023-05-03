import React, {
  useRef,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  LegacyRef,
  RefObject,
} from "react";
import Image from "next/image";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ISelectOptions } from "@/pages";

interface IHeaderProps {
  userName: string;
  cartQuantity: number;
  searchValue: string;
  setSelectedOption: Dispatch<SetStateAction<ISelectOptions>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const Header: FunctionComponent<IHeaderProps> = ({
  userName,
  cartQuantity,
  setSelectedOption,
  searchValue,
  setSearchValue,
}) => {
  const categories = ["All", "Sunglasses", "Furniture", "Motorcycle"];

  const handleKeywordKeyPress = (e: React.KeyboardEvent<any>) => {
    if (e.key == "Enter") {
      setSearchValue(e.currentTarget.value);
    }
  };
  const searchInputReference = useRef() as RefObject<HTMLInputElement> 

  return (
    <header className='bg-header_dark text-white'>
      <div className='flex justify-between items-center'>
        <div className='mx-5 text-white flex'>
          <Image
            className='w-auto'
            src='https://user-images.githubusercontent.com/73257543/235652850-ffd1f086-ea7f-42b4-850f-2a6f64806eda.png'
            width={150}
            height={100}
            priority
            alt='amazon logo'
          />
          <div className='flex flex-col justify-center items-center p-2'>
            <p className='text-sm ml-4'>Deliver to {userName}</p>
            <div className='flex font-bold mt-1'>
              <MapPinIcon className='h-5 w-5 mr-1' />
              <p>Bengaluru 560006</p>
            </div>
          </div>
        </div>
        <div className='flex grow'>
          <select
            name='category'
            className='border text-black border-gray-700 rounded py-2 px-4 focus:outline-none focus:border-blue-500'
            onChange={(e) =>
              setSelectedOption(
                e.currentTarget.value.toLowerCase() as ISelectOptions
              )
            }
          >
            {categories.map((cat) => {
              return (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              );
            })}
          </select>
          <div className='relative mr-4 w-full'>
            <input
              ref={searchInputReference}
              type='text'
              name='text'
              onKeyUp={handleKeywordKeyPress}
              placeholder='Search Amazon'
              className=' text-black block w-full border-2 border-gray-700 rounded py-2 pl-2 pr-4 focus:outline-none focus:border-blue-500'
            />
            <div
              className='absolute top-0 right-0 mt-2 mr-2 hover:opacity-75 hover:transform hover:scale-105 z-50 cursor-pointer'
              onClick={() =>
                setSearchValue(searchInputReference?.current?.value as string)
              }
            >
              <MagnifyingGlassIcon className='h-7 w7 text-black z-50' />
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-5 mx-3'>
          <div className='flex flex-col justify-center items-center space-y-2'>
            <Image
              className='w-auto'
              src='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/800px-Flag_of_India.svg.png'
              alt='india'
              width={20}
              priority
              height={15}
            />
            <span className='font-bold text-sm'>EN</span>
          </div>
          <div className=' flex flex-col justify-center items-center'>
            <p className='text-sm'>Hello, {userName}</p>
            <p className='font-bold'>Account & Lists</p>
          </div>
          <div className=' flex flex-col justify-center items-center'>
            <p className='text-sm'>Returns</p>
            <p className='font-bold'>& Orders</p>
          </div>
          <div className='flex flex-col justify-center items-center '>
            <div className='text-sm font-black text-az-orenge rounded-full'>
              {cartQuantity}
            </div>
            <p className='font-bold'>Cart</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;