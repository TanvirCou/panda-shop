import React from 'react';
import { FaCartPlus } from "react-icons/fa";
import { RxCross2 } from 'react-icons/rx';

const WishItem = ({data}) => {
    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <RxCross2 />

                <img src="https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png" alt="" className='w-12 h-12 object-cover mx-5'/>

                <div>
                    <p className='text-sm font-medium'>{data.name}</p>
                    <p className='font-medium text-red-600'>${data.price}</p>
                </div>
                <div className='pl-2'>
                <FaCartPlus size={22}/>
                </div>
            </div>
            
        </div>
    );
};

export default WishItem;