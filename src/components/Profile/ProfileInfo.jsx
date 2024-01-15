import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/features/userSlice';
import { MdOutlinePermMedia } from "react-icons/md";

const ProfileInfo = ({active}) => {
    const { user } = useSelector(state => state.user);
    

  const [name, setName] = useState(user?.user?.name);
  const [email, setEmail] = useState(user?.user?.email);

  const handleUpdate = (e) => {
    e.preventDefault();
  }
    return (
        <div>
            <div className='px-4 py-6 w-full'>
                <div className='w-full flex justify-center items-end relative'>
                    <img src={user?.user?.avatar} alt="" className=' h-[160px] w-[160px] rounded-full object-cover border-[3px] border-teal-500'/>
                    <div className='absolute ml-[116px] mb-4'> 
                    <MdOutlinePermMedia size={28} className='bg-gray-100 p-1 rounded-full'/>
                    </div>
                </div>

                <div className='flex flex-wrap justify-between mt-4 px-6 md:px-0'>
                <div className='flex flex-col pt-3 '>
                    <label className='text-sm text-gray-500 font-medium'>Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your full name' />
                </div>

                <div className='flex flex-col pt-3'>
                    <label className='text-sm text-gray-500 font-medium'>Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your email address' />
                </div>

                <div className='flex flex-col pt-3'>
                    <label className='text-sm text-gray-500 font-medium'>Phone Number</label>
                    <input type="number" className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your phone number' />
                </div>

                <div className='flex flex-col pt-3'>
                    <label className='text-sm text-gray-500 font-medium'>Zip Code</label>
                    <input type="number" className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your zip code' />
                </div>

                <div className='flex flex-col pt-3'>
                    <label className='text-sm text-gray-500 font-medium'>Address 1</label>
                    <input type="text" className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your address' />
                </div>

                <div className='flex flex-col pt-3'>
                    <label className='text-sm text-gray-500 font-medium'>Address 2</label>
                    <input type="text" className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your address' />
                </div>
                </div>
                <button onClick={handleUpdate} className='px-8 py-1.5 mt-4 bg-transparent text-teal-600 font-medium border border-teal-600 w-fit rounded-md'>Update</button>
            </div>
        </div>
    );
};

export default ProfileInfo;