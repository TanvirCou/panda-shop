/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Ratings from '../../Shared/Ratings/Ratings';

const ProductDetailsInfo = ({ data }) => {
    const [active, setActive] = useState(1);
    const { allProducts } = useSelector(state => state.product);

    const totalProduct = allProducts?.allProducts.filter(i => i?.shopId === data?.shopId);

    const totalReview = totalProduct.reduce((acc, i) => acc + i?.reviews.length, 0);

    const shopTotalRating = totalProduct.reduce((acc, i) => acc + (i?.ratings ? i.ratings : 0), 0);

    const shopAvgRating = shopTotalRating / totalReview;

    return (
        <div className='my-10 px-6 w-full '>
            <div className='bg-gray-200 w-full py-4 rounded-md'>
                <div className='flex items-center justify-between border-b border-gray-300 pt-4 mx-2 md:mx-8'>
                    <div onClick={() => setActive(1)} className='relative cursor-pointer mx-4 md:mx-0 text-center'>
                        <p className='font-semibold text-md md:text-lg '>Product Details</p>
                        {
                            active === 1 ? <div className='absolute left-0 h-[3px] w-full bg-[crimson]'></div> : null
                        }
                    </div>
                    <div onClick={() => setActive(2)} className='relative cursor-pointer mx-4 md:mx-0 text-center'>
                        <p className='font-semibold text-lg'>Product Reviews</p>
                        {
                            active === 2 ? <div className='absolute left-0 h-[3px] w-full bg-[crimson]'></div> : null
                        }
                    </div>
                    <div onClick={() => setActive(3)} className='relative cursor-pointer mx-4 md:mx-0 text-center'>
                        <p className='font-semibold text-lg'>Seller Information</p>
                        {
                            active === 3 ? <div className='absolute left-0 h-[3px] w-full bg-[crimson]'></div> : null
                        }
                    </div>
                </div>
                <div className='px-6 md:px-10 py-4'>
                    {
                        active === 1 ?
                            <div className='text-md font-medium text-gray-600 whitespace-pre-line'>
                                {data?.description}
                            </div> : null
                    }
                    {
                        active === 2 ?
                            <>
                                {
                                    data && data?.reviews.map((i, index) => (
                                        <div key={index} className='flex'>
                                            <img src={i?.user.avatar} alt="" className='w-10 h-10 rounded-full object-cover' />
                                            <div className='ml-3'>
                                                <p className='font-medium'>{i?.user.name}</p>
                                                <Ratings rating={i?.rating} />
                                                <p className='text-sm font-normal mt-1'>{i?.comment}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    data && data?.reviews.length === 0 && <div className='flex justify-center w-full py-6'>
                                        <p className='text-md font-medium text-gray-600'>No reviews yet</p>
                                    </div>
                                }
                            </> : null

                    }
                    {
                        active === 3 ?
                            <div className='block md:flex w-full py-6'>
                                <div className='w-full md:w-1/2'>
                                    <div className='flex items-center'>
                                        <Link to={`/shop/${data?.shop._id}`}>
                                            <img src={data?.shop.avatar} alt="" className='w-12 h-12 rounded-full object-cover' />
                                        </Link>
                                        <div>
                                            <Link to={`/shop/${data?.shop._id}`}>
                                                <p className='text-md font-medium text-teal-600 px-2'>{data?.shop.name}</p>
                                            </Link>
                                            <p className='text-sm font-medium px-2'>{shopAvgRating ? `(${shopAvgRating}/5) Ratings` : "No review"}</p>
                                        </div>
                                    </div>

                                    <p className='text-md font-medium text-gray-600 pt-6'>{data?.shop.description}</p>
                                </div>
                                <div className='w-full md:w-1/2 mt-6 md:mt-0 flex flex-col items-end'>
                                    <div className='flex items-center py-1.5'>
                                        <p className='text-md font-medium '>Joined on:</p>
                                        <p className='text-md font-medium text-gray-600 pl-2'>{data?.shop.createdAt.slice(0, 10)}</p>
                                    </div>
                                    <div className='flex items-center py-1.5'>
                                        <p className='text-md font-medium '>Total Products:</p>
                                        <p className='text-md font-medium text-gray-600 pl-2'>{totalProduct?.length}</p>
                                    </div>
                                    <div className='flex items-center py-1.5'>
                                        <p className='text-md font-medium '>Total Reviews:</p>
                                        <p className='text-md font-medium text-gray-600 pl-2'>{totalReview}</p>
                                    </div>
                                    <Link to={`/shop/${data?.shop._id}`}>
                                        <button className='w-fit bg-black text-white px-6 py-2 mt-2 rounded-md font-medium'>Visit Shop</button>
                                    </Link>
                                </div>
                            </div> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsInfo;