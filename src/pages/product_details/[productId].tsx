import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductDetails } from "@/services/amazonApi";
import ProductViewer from "../components/ProductViewer";
import Loader from "../components/Loader";
import StarRating from "../components/StarRatings";
import { useAppDispatch, useAppSelector } from "@/rtk/store";
import { addToCart } from "@/rtk/cart.slice";
import { dollarToINDIAN } from "@/utils";

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
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cartProducts);
  const { productId } = router.query;

  const productsFromCart = cart.filter(
    (product) => product.id === +(productId || 1)
  );
  const cartProductQuantity = productsFromCart[0]?.quantity || 0;
  const [productDetails, setProductDetails] = useState<IProductDetails>();
  const [quantity, setQuantity] = useState(
    cartProductQuantity ? cartProductQuantity : 1
  );
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

  const ratingFloat = `${productDetails?.rating}`.split(".")[1];

  const handleAddToCart = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(addToCart({ ...productDetails, quantity }));
  };

  return (
    <div className='mt-7'>
      {productDetails ? (
        <div>
          <div className='w-[100vw] flex justify-center'>
            <div className='flex items-center h-[5vh] w-[62.8vw] text-gray-700 text-sm capitalize '>
              {productDetails && (
                <p className='cursor-pointer'>
                  {productDetails?.category} &#62;{" "}
                  {productDetails?.brand && `${productDetails?.brand} > `}
                  {productDetails?.title}
                </p>
              )}
            </div>
          </div>
          <div className='flex justify-center items-start space-x-2 space-y-5'>
            <div className='relative h-[55vh] w-[30vw] overflow-hidden'>
              {<ProductViewer images={productDetails?.images || []} />}
            </div>
            <div className='h-[55vh] w-[30vw]'>
              <div>
                <p className='text-lg font-semibold mb-2'>
                  {productDetails.description}
                </p>
                <p className='text-indigo-400 text-xs cursor-pointer'>
                  Visit {productDetails.brand} store
                </p>
                <div className='flex items-center'>
                  <StarRating
                    rate={
                      +ratingFloat > 50
                        ? Math.ceil(productDetails.rating || 0)
                        : Math.floor(productDetails.rating || 0)
                    }
                  />
                  <p className='mt-1 mx-2 text-indigo-500'>
                    {" "}
                    {Math.ceil(
                      (productDetails.rating as any) * 10
                    )} Ratings <span className='px-2'>|</span> 7 answered
                    questions
                  </p>
                </div>
                <div className='mt-2'>
                  <p className='text-red-600 font-medium'>Deal</p>
                  <div className='flex items-center space-x-3'>
                    <p className='text-red-600 font-light'>
                      {" "}
                      - {productDetails.discountPercentage} %
                    </p>
                    <p className='relative text-lg font-semibold pl-0.5'>
                      <span className='absolute top-0 -left-2 transform text-base font-normal scale-x-75'>
                        ₹
                      </span>{" "}
                      {dollarToINDIAN(productDetails.price || 0).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                  <div className='flex text-gray-600 text-xs'>
                    M.R.P : ₹{" "}
                    <p className='line-through'>
                      {Math.round(
                        (dollarToINDIAN(productDetails.price || 0) * 100) /
                          (100 -
                            Math.round(
                              productDetails.discountPercentage as any
                            ))
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className='mt-2'>
                    <p className='text-gray-600'>
                      {" "}
                      FREE Delivery.{" "}
                      <span className='text-indigo-600 cursor-pointer'>
                        Details
                      </span>
                    </p>
                    <p className='text-gray-700'>Inclusive of all taxes</p>
                  </div>
                  <div className='text-lg text-emerald-700 font-bold'>
                    <p>In Stock</p>
                  </div>
                  <div className='flex content-center text-lg mt-2'>
                    <div
                      className={`py-1 px-4 rounded-sm border-t border-l border-b  border-az_orange cursor-pointer ${
                        quantity === 1 && "pointer-events-none"
                      }`}
                      onClick={() => setQuantity((s) => s - 1)}
                    >
                      -
                    </div>
                    <div className='py-1 px-4 rounded-sm border border-az_orange'>
                      {quantity}
                    </div>
                    <div
                      className={`py-1 px-4 rounded-sm border-t border-r border-b border-az_orange cursor-pointer ${
                        quantity === 5 && "pointer-events-none"
                      }`}
                      onClick={() => setQuantity((s) => s + 1)}
                    >
                      +
                    </div>
                  </div>
                  <div className='mt-4 flex space-x-2'>
                    <div
                      className='bg-az_add_to_cart cursor-pointer rounded-lg py-2 px-4 w-fit font-light text-sm hover:bg-az_orange hover:opacity-90'
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </div>
                    <div className='bg-az_buy_now cursor-pointer rounded-lg py-2 px-4 w-fit font-light text-sm hover:bg-az_orange hover:opacity-90'>
                      Buy Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-[50vh] w-full'>
          <Loader size='large' />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
