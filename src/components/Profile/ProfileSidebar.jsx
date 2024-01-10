import React from 'react';
import { AiOutlineInbox, AiOutlineShopping } from 'react-icons/ai';
import { IoLogOutOutline, IoMapOutline, IoPersonOutline } from 'react-icons/io5';
import { HiReceiptRefund } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa6";

const ProfileSidebar = ({active, setActive}) => {
    return (
        <div className='px-8 py-6'>
            <div className='bg-white w-full rounded-md shadow-sm py-4'>
                <div className='flex items-center cursor-pointer px-8 py-4' onClick={() => setActive(1)}>
                    <IoPersonOutline size={18} color={`${active === 1 ? "red" : "black"}`}/>
                    <p className={`text-sm font-medium pl-3 pt-0.5 ${active === 1 ? "text-[red]" : "text-black"}`}>Profile</p>
                </div>

                <div className='flex items-center cursor-pointer px-8 py-4' onClick={() => setActive(2)}>
                    <AiOutlineShopping size={18} color={`${active === 2 ? "red" : "black"}`}/>
                    <p className={`text-sm font-medium pl-3 pt-0.5 ${active === 2 ? "text-[red]" : "text-black"}`}>Orders</p>
                </div>

                <div className='flex items-center cursor-pointer px-8 py-4' onClick={() => setActive(3)}>
                    <HiReceiptRefund size={18} color={`${active === 3 ? "red" : "black"}`}/>
                    <p className={`text-sm font-medium pl-3 pt-0.5 ${active === 3 ? "text-[red]" : "text-black"}`}>Refunds</p>
                </div>

                <div className='flex items-center cursor-pointer px-8 py-4' onClick={() => setActive(4)}>
                    <AiOutlineInbox size={18} color={`${active === 4 ? "red" : "black"}`}/>
                    <p className={`text-sm font-medium pl-3 pt-0.5 ${active === 4 ? "text-[red]" : "text-black"}`}>Inbox</p>
                </div>

                <div className='flex items-center cursor-pointer px-8 py-4' onClick={() => setActive(5)}>
                    <IoMapOutline size={18} color={`${active === 5 ? "red" : "black"}`}/>
                    <p className={`text-sm font-medium pl-3 pt-0.5 ${active === 5 ? "text-[red]" : "text-black"}`}>Track Order</p>
                </div>

                <div className='flex items-center cursor-pointer px-8 py-4' onClick={() => setActive(6)}>
                    <MdPayment size={18} color={`${active === 6 ? "red" : "black"}`}/>
                    <p className={`text-sm font-medium pl-3 pt-0.5 ${active === 6 ? "text-[red]" : "text-black"}`}>Payment methods</p>
                </div>

                <div className='flex items-center cursor-pointer px-8 py-4' onClick={() => setActive(7)}>
                    <FaRegAddressCard size={18} color={`${active === 7 ? "red" : "black"}`}/>
                    <p className={`text-sm font-medium pl-3 pt-0.5 ${active === 7 ? "text-[red]" : "text-black"}`}>Address</p>
                </div>

                <div className='flex items-center cursor-pointer px-8 py-4' onClick={() => setActive(8)}>
                    <IoLogOutOutline size={18} color={`${active === 8 ? "red" : "black"}`}/>
                    <p className={`text-sm font-medium pl-3 pt-0.5 ${active === 8 ? "text-[red]" : "text-black"}`}>Logout</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;