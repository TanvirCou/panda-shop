import React, { useState } from 'react';
import { RxCross2, RxMinus, RxPlus } from 'react-icons/rx';

const SingleCart = ({data}) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.price * value;

    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <div onClick={() => setValue((prev) => prev + 1)} className=' cursor-pointer bg-teal-600 border border-teal-900 rounded-full w-[25px] h-[25px] flex items-center justify-center'>
                        <RxPlus size={20} color='white'/>
                    </div>
                    <span>{value}</span>
                    <div onClick={() => setValue((prev) => prev > 1 ? (prev - 1) : value)} className=' cursor-pointer bg-gray-300 border border-gray-400 rounded-full w-[25px] h-[25px] flex items-center justify-center'>
                        <RxMinus size={20} color='black'/>
                    </div>
                </div>

                <img src="https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png" alt="" className='w-12 h-12 object-cover mx-5'/>

                <div>
                    <p className='text-sm font-medium'>{data.name}</p>
                    <p className='text-sm text-gray-600 py-1'>${data.price} * {value}</p>
                    <p className='font-medium text-red-600'>US${totalPrice}</p>
                </div>

                <div>
                    <RxCross2 size={12} className='cursor-pointer'/>
                </div>
            </div>
            
        </div>
    );
};

export default SingleCart;