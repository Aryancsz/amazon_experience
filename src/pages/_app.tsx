import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, useAppSelector } from "../rtk/store";
import Footer from "./containers";
import Header from "./components/Header";
import { useState } from "react";
import { useRouter } from "next/router";
export type ISelectOptions = "all" | "mobile" | "laptop";

export default function App({ Component, pageProps }: AppProps) {
  const userName = "Mallikarjun";
  const pageLimit = 12;

  const [selectedOption, setSelectedOption] = useState<ISelectOptions>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState({ imageGridLoading: false });

  const router = useRouter();
  return (
    <Provider store={store}>
      <div
        className={`fixed top-0 left-0 right-0 z-50`}
      >
        <Header
          loading={loading.imageGridLoading}
          setSelectedOption={setSelectedOption}
          userName={userName}
          setSearchValue={setSearchValue}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className='mt-16'>
        <Component
          {...pageProps}
          loading={loading}
          setLoading={setLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageLimit={pageLimit}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          searchValue={searchValue}
        />
      </div>
      <div className='z-50'>
        <Footer />
      </div>
    </Provider>
  );
}
