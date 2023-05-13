import { PT_Sans } from "next/font/google";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/rtk/store";
import ImageGrid from "./components/ImageGrid";
import { listProducts } from "@/services/amazonApi";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";
import { ISelectOptions } from "./_app";
import { receivedProducts } from "@/rtk/products.slice";
import Head from 'next/head';

const inter = PT_Sans({ subsets: ["latin"], weight: "400" });

interface IHomeProps {
  loading: { imageGridLoading: boolean };
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageLimit: number;
  setLoading: Dispatch<SetStateAction<{ imageGridLoading: boolean }>>;
  searchValue: string;
  selectedOption: ISelectOptions;
}

export default function Home({
  loading,
  currentPage,
  setCurrentPage,
  pageLimit,
  setLoading,
  searchValue,
  selectedOption,
}: IHomeProps) {
  const { products, skip, total } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const skipValue = (currentPage - 1) * pageLimit;
    const find = async () => {
      try {
        setLoading((s) => ({ ...s, imageGridLoading: true }));
        const response = await listProducts({
          limit: pageLimit,
          search:
            searchValue === "" && selectedOption === "all"
              ? ""
              : searchValue
              ? searchValue || ""
              : selectedOption || "",
          skip: searchValue || selectedOption !== "all" ? 0 : skipValue,
        });
        dispatch(receivedProducts(response));
        setLoading((s) => ({ ...s, imageGridLoading: false }));
      } catch (error) {
        console.error(error);
        setLoading((s) => ({ ...s, imageGridLoading: false }));
      }
    };
    find();
  }, [selectedOption, searchValue, currentPage]);
  return (
    <>
      <Head>
        <title>Amazon Experience</title>
      </Head>
      <main className={`${inter.className} min-h-screen bg-gray-300`}>
        <div className='flex flex-col items-center justify-center'>
          <div className='relative h-[74vh] w-[84.5vw] rounded-b-3xl overflow-hidden'>
            <Image
              src='https://user-images.githubusercontent.com/73257543/235905021-eeb69c8e-672d-4f21-b7bd-021444cfc479.png'
              alt='slide'
              fill
            />
          </div>
          <div className='w-10/12 -mt-[22rem] z-20'>
            {!loading.imageGridLoading ? (
              <ImageGrid products={products} />
            ) : (
              <div className='h-[50vh] w-full flex items-center justify-center'>
                <Loader size='large' />
              </div>
            )}
          </div>
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            limit={pageLimit}
            skip={skip as number}
            total={total as number}
          />
          <div
            className='flex justify-center w-full text-white cursor-pointer bg-az_gray_light py-4 hover:opacity-80'
            onClick={() => {
              window.scrollTo({ behavior: "smooth", top: 0 });
            }}
          >
            Back to top
          </div>
        </div>
      </main>
    </>
  );
}
