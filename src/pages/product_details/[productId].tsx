import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductDetails } from "@/services/amazonApi";
import Image from "next/image";

interface IProductDetailsProps {}
interface IProductDetails {
  id: number;
  title: string;
  description: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
}
const ProductDetails: React.FC<IProductDetailsProps> = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [productDetails, setProductDetails] = useState<IProductDetails>();

  useEffect(() => {
    if (productId) {
      const productDetails = async () => {
        const res = await getProductDetails({ productId });
        setProductDetails(res);
      };
      try {
        productDetails();
      } catch (error) {
        console.error(error);
      }
    }
  }, [productId]);

  return (
    <div className='mt-7'>
      <div className='flex justify-center items-start space-x-5 space-y-5 bg-az_orange'>
        <div className='relative h-56 w-56 overflow-hidden'>
          <Image src={productDetails?.thumbnail || ""} alt='slide' fill />
        </div>
        <div className='h-56 w-56'>
          <p>details</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
