import { PT_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "./components/Header";
import { useAppSelector } from "@/rtk/store";
import { useDispatch } from "react-redux";
import { receivedProducts } from "@/rtk/amazon.slice";
import ImageGrid from "./components/ImageGrid";
import { listProducts } from "@/services/amazonApi";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";
import Footer from './containers';

export type ISelectOptions = "All" | "Mobile" | "Laptop";

const inter = PT_Sans({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const { products, skip, total } = useAppSelector(
    (state) => state.products
  );

  const userName = "Mallikarjun";
  const cartQuantity = 4;

  const [selectedOption, setSelectedOption] = useState<ISelectOptions>("All");
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState({ imageGridLoading: false });
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 12;
  const skipValue = (currentPage - 1) * pageLimit;

  const dispatch = useDispatch();
  useEffect(() => {
    const find = async () => {
      try {
        setLoading((s) => ({ ...s, imageGridLoading: true }));
        const response = await listProducts({
          limit: pageLimit,
          search:
            searchValue === "" && selectedOption === "All"
              ? ""
              : searchValue
              ? searchValue || ""
              : selectedOption || "",
          skip: skipValue,
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
    <main className={`${inter.className} min-h-screen bg-gray-300`}>
      <div className='fixed top-0 left-0 right-0 z-50'>
        <Header
          loading={loading.imageGridLoading}
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
          skip={skip}
          total={total}
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
      <div className='z-50'>
        <Footer />
      </div>
    </main>
  );
}
