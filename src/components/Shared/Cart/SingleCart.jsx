import React, { useState } from 'react';
import { RxCross2, RxMinus, RxPlus } from 'react-icons/rx';
import { toast } from 'react-toastify';

const SingleCart = ({data, quantityChangeHandler, removeFromCartHandler}) => {
    const [value, setValue] = useState(data.qty);
    const totalPrice = data.discount_price * value;

    const increment = (data) => {
        if(data.stock <= value) {
            toast.error("Product stock limited");
        } else {
            setValue((prev) => prev + 1);
        const updatedData = {...data, qty: value + 1};
        quantityChangeHandler(updatedData);
        }
    }

    const decrement = (data) => {
        setValue((prev) => prev === 1 ? 1 : prev - 1);
        const updatedData = {...data, qty: value === 1 ? 1 : value - 1};
        quantityChangeHandler(updatedData);
    }

    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <div onClick={() => increment(data)} className=' cursor-pointer bg-teal-600 border border-teal-900 rounded-full w-[25px] h-[25px] flex items-center justify-center'>
                        <RxPlus size={20} color='white'/>
                    </div>
                    <span>{value}</span>
                    <div onClick={() => decrement(data)} className=' cursor-pointer bg-gray-300 border border-gray-400 rounded-full w-[25px] h-[25px] flex items-center justify-center'>
                        <RxMinus size={20} color='black'/>
                    </div>
                </div>

                <img src={data?.image_Url[0].url} alt="" className='w-16 h-16 object-cover mx-5'/>

                <div>
                    <p className='text-sm font-medium'>{data.name}</p>
                    <p className='text-sm text-gray-600 py-1'>${data.discount_price} * {value}</p>
                    <p className='font-medium text-red-600'>US${totalPrice}</p>
                </div>

                <div>
                    <RxCross2 size={12} className='cursor-pointer' onClick={() => removeFromCartHandler(data)}/>
                </div>
            </div>
            
        </div>
    );
};

export default SingleCart;