/* eslint-disable react/prop-types */
import { useState } from 'react';
import ProductCart from '../../Shared/ProductCart/ProductCart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Ratings from '../../Shared/Ratings/Ratings';

const ShopData = ({ products, events, id }) => {
    const [active, setActive] = useState(1);
    const { shop } = useSelector(state => state.shop);

    const allReviews = products && products?.products.map(i => i.reviews).flat();

    console.log(events);

    return (
        <div className='w-full md:h-[95vh] py-6 md:py-4 md:overflow-y-scroll md:sticky webkit px-4'>
            <div className='w-full md:flex items-center justify-between'>
                <div className='flex'>
                    <p onClick={() => setActive(1)} className={`text-lg font-medium pr-8 cursor-pointer ${active === 1 ? "text-red-600" : "text-gray-800"}`}>Shop Products</p>
                    <p onClick={() => setActive(2)} className={`text-lg font-medium pr-8 cursor-pointer ${active === 2 ? "text-red-600" : "text-gray-800"}`}>Running Events</p>
                    <p onClick={() => setActive(3)} className={`text-lg font-medium pr-8 cursor-pointer ${active === 3 ? "text-red-600" : "text-gray-800"}`}>Shop Reviews</p>
                </div>
                {
                    (shop && shop?.shop?._id === id) ?
                        <Link to="/shop/dashboard">
                            <div className='flex justify-end md:block'>
                                <button className='bg-black text-white text-sm font-medium py-1.5 px-4 rounded-md mt-3 md:mt-0'>Go to Dashboard</button>
                            </div></Link> : ""
                }

            </div>

            <br />

            {
                active === 1 &&
                <div className='grid grid-cols-1 gap-[5px] sm:grid-cols-2 sm:gap-[10px] md:grid-cols-2 md:gap-[15px] lg:grid-cols-3 lg:gap-[20px] xl:grid-cols-4 xl:gap-[25px]'>
                    {
                        products && products.products.map((i, index) => <ProductCart data={i} key={index} />)
                    }
                </div>
            }

            {
                active === 2 &&
                <div>
                    {
                        events.events.length > 0 ? events.events.map((i, index) => (
                            <div key={index} className='grid grid-cols-1 gap-[5px] sm:grid-cols-2 sm:gap-[10px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-3 lg:gap-[20px] xl:grid-cols-4 xl:gap-[25px]'>
                                <ProductCart data={i} isEvent={true} />
                            </div>
                        )) :

                            <div className='w-full h-[500px] flex items-center justify-center text-xl font-medium'>
                                No Event Found
                            </div>

                    }
                </div>
            }

            {
                active === 3 ?
                    <>
                        {
                            allReviews && allReviews.map((i, index) => (
                                <div key={index} className='flex py-2 px-2 bg-white mb-2 rounded-md'>
                                    <img src={i?.user.avatar} alt="" className='w-10 h-10 rounded-full object-cover' />
                                    <div className='ml-3'>
                                        <div className='flex items-center'>
                                            <p className='font-medium mr-2'>{i?.user.name}</p>
                                            <Ratings rating={i?.rating} />
                                        </div>
                                        <p className='text-sm font-normal mt-1'>{i?.comment}</p>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            allReviews && allReviews.length === 0 && <div className='flex justify-center w-full py-6'>
                                <p className='text-md font-medium text-gray-600'>No reviews yet</p>
                            </div>
                        }
                    </> : null

            }
        </div>
    );
};

export default ShopData;