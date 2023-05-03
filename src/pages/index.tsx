import { PT_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "./components/Header";
import { useAppSelector } from "@/rtk/store";
import { useDispatch } from "react-redux";
import { receivedProducts } from "@/rtk/amazon.slice";
import ImageGrid from "./components/ImageGrid";
import { listProducts } from "@/services/amazonApi";

export type ISelectOptions = "All" | "Mobile" | "Laptop";

const inter = PT_Sans({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const products = useAppSelector((state) => state.products);

  const userName = "Mallikarjun";
  const cartQuantity = 4;

  const [selectedOption, setSelectedOption] = useState<ISelectOptions>("All");
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useDispatch();
  useEffect(() => {
    const find = async () => {
      try {
        const response = await listProducts({
          limit: 12,
          search: searchValue === '' && selectedOption === "All" ? "" : searchValue ? searchValue || '' : selectedOption || '',
          skip: 0,
        });
        dispatch(receivedProducts(response));
      } catch (error) {
        console.error(error);
      }
    };
    find();
  }, [selectedOption, searchValue]);

  return (
    <main className={`${inter.className} min-h-screen bg-gray-300`}>
      <div className='fixed top-0 left-0 right-0 z-50'>
        <Header
          setSelectedOption={setSelectedOption}
          cartQuantity={cartQuantity}
          userName={userName}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
      </div>
      <div className='flex flex-col items-center justify-center mt-16'>
        <div className='relative h-[74vh] w-[84.5vw] rounded-b-3xl overflow-hidden'>
          <Image
            src='https://user-images.githubusercontent.com/73257543/235905021-eeb69c8e-672d-4f21-b7bd-021444cfc479.png'
            alt='slide'
            fill
          />
        </div>
        <div className='w-10/12 -mt-[22rem] z-20'>
          <ImageGrid products={products.products} />
        </div>
      </div>
    </main>
  );
}
