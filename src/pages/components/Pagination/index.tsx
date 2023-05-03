import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IPagination {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  total: number;
  skip: number;
  limit: number;
}

const Pagination: React.FC<IPagination> = ({
  limit,
  total,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(total / limit);

  const handleClickPrev = () => {
    if (currentPage === 1) return;
    setCurrentPage((s) => s - 1);
  };
  const handleClickNext = () => {
    if (totalPages === currentPage) return;
    setCurrentPage((s) => s + 1);
  };
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [currentPage]);

  return (
    <div className='my-2 bg-white rounded-md cursor-pointer'>
      <div className='flex justify-center items-center'>
        <div
          className={`p-2 border hover:border-az_orange ${
            currentPage === 1 && "opacity-80 cursor-not-allowed"
          }`}
          onClick={handleClickPrev}
        >
          Prev
        </div>
        <div className={`p-2 border hover:border-az_orange px-4`}>{currentPage}</div>
        <div
          className={`p-2 border hover:border-az_orange ${
            totalPages === currentPage && "opacity-80 cursor-not-allowed"
          }`}
          onClick={handleClickNext}
        >
          next
        </div>
      </div>
    </div>
  );
};

export default Pagination;
