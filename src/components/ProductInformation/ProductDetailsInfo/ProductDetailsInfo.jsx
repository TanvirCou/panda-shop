import React, { useState } from 'react';

const ProductDetailsInfo = ({data}) => {
    const [active, setActive] = useState(1);
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
                        <div className='text-md font-medium text-gray-600'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quam, nulla quo error mollitia debitis id dignissimos distinctio, magnam, beatae libero tempore nobis atque repellendus nam reprehenderit! Eum, veritatis? Explicabo.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet deleniti fugiat, dolores, velit repudiandae porro repellendus odio blanditiis, expedita minus id veniam quos quis incidunt! Dicta incidunt quaerat placeat deleniti?
                            <br />
                            <br />
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque iure fugit fuga aliquam adipisci a similique facere quod, sed architecto, sit dolore commodi nulla voluptates, beatae inventore quibusdam at animi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam velit quam ab esse a sit ut molestias voluptatem perspiciatis sapiente similique omnis accusantium earum eos aspernatur, odio illum tenetur nisi?
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam recusandae quam aspernatur reiciendis autem perferendis, similique minus repellendus sint ad earum optio assumenda corrupti eaque ab harum numquam ipsa placeat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae esse in corporis, voluptatibus reiciendis, cumque qui ducimus corrupti, similique numquam quisquam iusto. Ullam, hic! Tempore voluptates omnis amet esse mollitia!
                        </div> : null
                    }
                    {
                        active === 2 ?
                        <div className='flex justify-center w-full py-6'>
                            <p className='text-md font-medium text-gray-600'>No reviews yet</p>
                        </div> : null
                    }
                    {
                        active === 3 ?
                        <div className='block md:flex w-full py-6'>
                            <div className='w-full md:w-1/2'>
                                <div className='flex items-center'>
                                    <img src={data.shop.shop_avatar.url} alt="" className='w-12 h-12 rounded-full object-cover'/>
                                    <div>
                                    <p className='text-md font-medium text-teal-600 px-2'>{data.shop.name}</p>
                                    <p className='text-sm font-medium px-2'>({data.shop.ratings}) Ratings</p>
                                    </div>
                                </div>

                                <p className='text-md font-medium text-gray-600 pt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat atque ducimus doloribus mollitia illum, pariatur hic natus aliquam aliquid similique accusamus exercitationem assumenda laudantium consequatur culpa delectus soluta ipsa neque. lorem</p>
                            </div>
                            <div className='w-full md:w-1/2 mt-6 md:mt-0 flex flex-col items-end'>
                                <div className='flex items-center py-1.5'>
                                    <p className='text-md font-medium '>Joined on:</p>
                                    <p className='text-md font-medium text-gray-600 pl-2'>19 jun, 2022</p>
                                </div>
                                <div className='flex items-center py-1.5'>
                                    <p className='text-md font-medium '>Total Products:</p>
                                    <p className='text-md font-medium text-gray-600 pl-2'>1,021</p>
                                </div>
                                <div className='flex items-center py-1.5'>
                                    <p className='text-md font-medium '>Total Reviews:</p>
                                    <p className='text-md font-medium text-gray-600 pl-2'>121</p>
                                </div>
                                <button className='w-fit bg-black text-white px-6 py-2 mt-2 rounded-md font-medium'>Visit Shop</button>
                            </div>
                        </div> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsInfo;