import React from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import WishItem from './WishItem';
import { useSelector } from 'react-redux';

const Wishlist = ({setWishlistOpen}) => {

    const { wishList } = useSelector(state => state.wishList);

    return (
        <div className='fixed top-0 left-0 w-full h-screen bg-[#0000004d] z-10'>
            <div className='transition duration-500 ease-in fixed top-0 right-0 bg-white min-h-full w-[70%] md:w-[25%] shadow-sm '>
            {
                    wishList && wishList.length === 0 ? (
                        <div className="w-full h-screen">
                                    <div className='flex justify-end pt-3 pr-3'>
                                    <RxCross2 size={25} className='cursor-pointer' onClick={() => setWishlistOpen(false)} />
                                </div>
                                <div className="w-full h-screen flex items-center justify-center">
                                    <p className="text-ms font-medium">WishList is empty</p>
                                </div>
                        </div>
                    ) : (
                        <div>
                    <div className='flex justify-end pt-3 pr-3'>
                        <RxCross2 size={25} className='cursor-pointer' onClick={() => setWishlistOpen(false)} />
                    </div>
                    
                    <div className='flex items-center p-4'>
                         <IoHeartOutline size={25} />
                         <p className='font-medium pl-2'>{wishList && wishList.length} Items</p>
                    </div>

                    <div className='w-full border-t'>
                        {wishList&& wishList.map((i, index) => <WishItem data={i} key={index} setWishlistOpen={setWishlistOpen}/>)}
                    </div>

                </div>
                    ) 
                }
            </div> 
        </div>
    );
};

export default Wishlist;