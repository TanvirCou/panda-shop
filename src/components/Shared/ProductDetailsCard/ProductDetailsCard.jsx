import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { FiMessageCircle } from "react-icons/fi";
import { useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/features/cartSlice';

const ProductDetailsCard = ({data, setOpen}) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);

    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleIncrementCount = () => {
        setCount((prev) => prev + 1);
    };

    const handleDecrementCount = () => {
        setCount((prev) => (prev > 1) ? (prev - 1) : prev);
    };

    const addToCartHandler = (id) => {
        const isItemsExits = cart && cart.find(i => i.id === id);
        if(isItemsExits) {
            toast.error("Items is already in cart");
        } else {
            if(data.stock < count) {
                toast.error("Product stock limited");
            } else {
                const cartData = {...data, qty: count};
            dispatch(addToCart(cartData));
            localStorage.setItem("cartItems", JSON.stringify([...cart, cartData]));
            toast.success("Item added to cart successfully");
            }
        }
    }

    return (
        <div className='bg-white'>
            {data ? (
            <div className='fixed w-full h-screen bg-[#00000030] z-40 top-0 left-0 flex items-center justify-center'>
                <div className='w-[90%] md:w-[60%] h-[90vh] md:h-[75vh] bg-white rounded-md shadow-sm relative p-4 overflow-y-scroll'>
                    <RxCross1 size={25} onClick={() => setOpen(false)} className='absolute right-3 top-3 z-50' />
                        <div className='w-full block md:flex'>
                            <div className='w-full md:w-1/2 '>
                                <img src={data.image_Url[0].url} alt="" />
                                <div className='flex items-center py-1 px-2'>
                                    <img src={data.shop.shop_avatar.url} alt="" className='w-12 h-12 rounded-full object-cover'/>
                                    <div>
                                    <p className='text-md font-medium text-teal-600 px-2'>{data.shop.name}</p>
                                    <p className='text-sm font-medium px-2'>({data.shop.ratings}) Ratings</p>
                                    </div>
                                </div>
                                <div className='flex items-center bg-black w-fit px-4 py-2 rounded-md my-3 cursor-pointer mx-2'>
                                    <p className='text-white font-medium mr-2'>Send Message</p>
                                    <FiMessageCircle size={20} color='white' />
                                </div>
                                <p className='font-medium text-red-600 p-2'>({data.total_sell}) Sold out</p>
                            </div>

                            <div className='w-full md:w-1/2 pt-8 px-2'>
                                <p className='text-xl font-semibold '>{data.name}</p>
                                <p className='text-sm font-semibold py-2 text-gray-600'>{data.description}</p>
                                <div className='flex py-2'>
                                    <p className='text-xl font-medium '>{data.price === 0 ? data.price : data.discount_price}$</p>
                                    <p className='text-sm font-medium text-red-600 px-2 line-through'>{data.price ? data.price + "$" : null}</p>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <div>
                                    <button
                                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                    onClick={handleDecrementCount}
                                    >
                                    -
                                    </button>
                                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                                    {count}
                                    </span>
                                    <button
                                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                    onClick={handleIncrementCount}
                                    >
                                    +
                                    </button>
                                     </div>

                                     <div>
                                     {click ? <IoMdHeart size={30} color="red" onClick={() => setClick(!click)} title='Remove from wishlist' className='cursor-pointer'/> : 
                                    <IoMdHeartEmpty size={30} color="black" onClick={() => setClick(!click)} title='Add to wishlist' className='cursor-pointer'/>}
                                     </div>
                                </div>

                                <div className='flex items-center bg-black w-fit px-4 py-2 rounded-md cursor-pointer my-6' onClick={() => addToCartHandler(data.id)}>
                                    <p className='text-white font-medium mr-2'>Add to Cart</p>
                                    <IoCartOutline size={20} color='white' />
                                </div>
                            </div>
                        </div>
                </div>
            </div>    
            ): null}
        </div>
    );
};

export default ProductDetailsCard;