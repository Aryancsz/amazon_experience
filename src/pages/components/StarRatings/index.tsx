import React from "react";

const stars = (rate: number) => {
  const starSpans = [];
  for (let v = 1; v <= 5; v++) {
    if (v <= rate) {
      starSpans.push(
        <span key={v} className='star text-3xl text-az_orange'>
          ★
        </span>
      );
    } else {
      starSpans.push(
        <span key={v} className='star text-3xl'>
          ☆
        </span>
      );
    }
  }

  return <div>{starSpans}</div>;
};

interface IStarRating {
  rate: number;
}

const StarRating: React.FC<IStarRating> = ({ rate }) => {
  return <>{stars(rate)}</>;
};

export default StarRating;
