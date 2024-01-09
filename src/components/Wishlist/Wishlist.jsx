import React from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import WishItem from './WishItem';

const Wishlist = ({setWishlistOpen}) => {

    const cartData = [
        {
            name: "Iphone 14 pro max 8/256gb silver color",
            desc: TextDecoderStream,
            price: 200
        },
        {
            name: "Iphone 14 pro max 8/256gb",
            desc: TextDecoderStream,
            price: 400
        },
        {
            name: "Iphone 14 pro max 8/256gb",
            desc: TextDecoderStream,
            price: 700
        }
    ];

    return (
        <div className='fixed top-0 left-0 w-full h-screen bg-[#0000004d] z-10'>
            <div className='transition duration-500 ease-in fixed top-0 right-0 bg-white min-h-full w-[25%] shadow-sm '>
                <div>
                    <div className='flex justify-end pt-3 pr-3'>
                        <RxCross2 size={25} className='cursor-pointer' onClick={() => setWishlistOpen(false)} />
                    </div>
                    
                    <div className='flex items-center p-4'>
                         <IoHeartOutline size={25} />
                         <p className='font-medium pl-2'>3 Items</p>
                    </div>

                    <div className='w-full border-t'>
                        {cartData && cartData.map((i, index) => <WishItem data={i} key={index} />)}
                    </div>

                </div>
            </div> 
        </div>
    );
};

export default Wishlist;