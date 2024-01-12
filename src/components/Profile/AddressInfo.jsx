import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const AddressInfo = () => {
    return (
        <div className='px-4 py-6 w-full'>
            <div className='flex items-center justify-between'>
                <p className='text-2xl font-medium'>My Addresses</p>
                <button className='w-fit px-4 py-2 bg-black text-white rounded-md font-medium'>Add New</button>
            </div>
            <div className='flex items-center justify-between bg-white shadow-sm rounded-sm w-full h-[70px] px-10 my-4'>
                <div className='flex items-center'>
                <p className='font-medium'>Default</p>
                </div>
                <div className='flex items-center'>
                <p className='font-medium'>Hamzerbagh,muradpur,chittagong</p>
                </div>
                <div className='flex items-center'>
                <p className='font-medium'>2205/A</p>
                </div>
                <div>
                    <AiOutlineDelete size={22} className='cursor-pointer'/>
                </div>
            </div>
        </div>
    );
};

export default AddressInfo;