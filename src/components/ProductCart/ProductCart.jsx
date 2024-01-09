import React, { useState } from 'react';
import { IoMdEye, IoMdHeart, IoMdHeartEmpty, IoMdStar, IoMdStarOutline } from "react-icons/io";
import { IoCarOutline, IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard';

const ProductCart = ({data}) => {
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);

    const d = data.name;
    const product_name = d.replace(/\s+/g, '-');

    return (
        <div>
            <div className='w-full h-[340px] bg-white rounded-md shadow-sm relative'>
                <div>
                <Link to={`/product/${product_name}`}>
                <div className='h-[170px] w-full flex items-center justify-center py-3 px-4'>
                    <img src={data.image_Url[0].url} alt="" className='h-full w-full object-contain'/>
                </div>
                </Link>
                <div className='px-4'>
                    <div>
                    <Link to={`/shop/preview/${data?.shop.name}`}>
                    <p className='text-sm font-medium text-teal-600 py-3'>{data.shop.name}</p>
                    </Link>
                    </div>
                    <Link to={`/product/${data.id}`}>
                    <p className='text-sm font-medium'>{data.name.length > 45 ? data.name.slice(0, 45) + " ...." : data.name}</p>
                    <div className='flex items-center py-2'>
                        <IoMdStar size={22} color='orange' className='mr-1'/>
                        <IoMdStar size={22} color='orange' className='mr-1'/>
                        <IoMdStar size={22} color='orange' className='mr-1'/>
                        <IoMdStar size={22} color='orange' className='mr-1'/>
                        <IoMdStarOutline size={22} color='orange' className='mr-1'/>
                    </div>
                    <div className='flex items-center justify-between py-1'>
                        <div className='flex'>
                            <p className='text-xl font-medium text-gray-600'>{data.price === 0 ? data.price : data.discount_price}$</p>
                            <p className='text-sm font-medium text-red-600 px-2 line-through'>{data.price ? data.price + "$" : null}</p>
                        </div>
                        <p className='font-medium text-green-600'>{data.total_sell} sold</p>
                    </div>
                    </Link>
                </div>
                </div>

                <div>
                    {click ? <IoMdHeart size={25} color="red" onClick={() => setClick(!click)} title='Remove from wishlist' className='absolute top-5 right-2 cursor-pointer'/> : 
                    <IoMdHeartEmpty size={25} color="black" onClick={() => setClick(!click)} title='Add to wishlist' className='absolute top-5 right-2 cursor-pointer'/>}

                    <IoEyeOutline size={25} color="black" onClick={() => setOpen(!open)} title='Quick view' className='absolute top-14 right-2 cursor-pointer'/>

                    <IoCartOutline size={25} color="black"  title='Add to cart' className='absolute top-24 right-2 cursor-pointer'/>
                    {open ? <ProductDetailsCard setOpen={setOpen} data={data}/> : null}
                </div>
            </div>
        </div>
    );
};

export default ProductCart;