/* eslint-disable react/prop-types */
import { AiOutlineGift } from 'react-icons/ai';
import { FiFilePlus, FiPackage, FiShoppingBag } from 'react-icons/fi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { MdOutlineCreateNewFolder, MdOutlineDashboard, MdOutlineEvent, MdOutlineSettings } from 'react-icons/md';
import { PiMoney } from "react-icons/pi";
import { Link } from 'react-router-dom';
import "../../../App.css";

const DashboardSideBar = ({ active }) => {
    return (
        <div className='w-full h-[92vh] md:h-[90vh] flex flex-col justify-center md:block bg-white shadow-md pt-4 overflow-y-scroll webkit'>
            <Link to="/shop/dashboard">
                <div className={`flex items-center mx-6 py-6 md:py-[15px] ${active === 1 ? "text-red-600" : "text-gray-800"}`}>
                    <MdOutlineDashboard size={25} />
                    <p className='font-medium mx-2 md:block hidden'>Dashboard</p>
                </div>
            </Link>

            <Link to="/shop/dashboard/all-orders">
                <div className={`flex items-center mx-6 py-6 md:py-[15px] ${active === 2 ? "text-red-600" : "text-gray-800"}`}>
                    <FiShoppingBag size={25} />
                    <p className='font-medium mx-2 md:block hidden'>All Orders</p>
                </div>
            </Link>

            <Link to="/shop/dashboard/all-products">
                <div className={`flex items-center mx-6 py-6 md:py-[15px] ${active === 3 ? "text-red-600" : "text-gray-800"}`}>
                    <FiPackage size={25} />
                    <p className='font-medium mx-2 md:block hidden'>All Products</p>
                </div>
            </Link>

            <Link to="/shop/dashboard/create-product">
                <div className={`flex items-center mx-6 py-6 md:py-3 ${active === 4 ? "text-red-600" : "text-gray-800"}`}>
                    <MdOutlineCreateNewFolder size={25} />
                    <p className='font-medium mx-2 md:block hidden'>Create Product</p>
                </div>
            </Link>

            <Link to="/shop/dashboard/all-events">
                <div className={`flex items-center mx-6 py-6 md:py-[15px] ${active === 5 ? "text-red-600" : "text-gray-800"}`}>
                    <MdOutlineEvent size={25} />
                    <p className='font-medium mx-2 md:block hidden'>All Events</p>
                </div>
            </Link>

            <Link to="/shop/dashboard/create-event">
                <div className={`flex items-center mx-6 py-6 md:py-[15px] ${active === 6 ? "text-red-600" : "text-gray-800"}`}>
                    <FiFilePlus size={25} />
                    <p className='font-medium mx-2 md:block hidden'>Create Event</p>
                </div>
            </Link>

            <Link to="/shop/dashboard/withdraw-money">
                <div className={`flex items-center mx-6 py-6 md:py-[15px] ${active === 7 ? "text-red-600" : "text-gray-800"}`}>
                    <PiMoney size={25} />
                    <p className='font-medium mx-2 md:block hidden'>Withdraw Money</p>
                </div>
            </Link>


            <Link to="/shop/dashboard/coupon-code">
                <div className={`flex items-center mx-6 py-6 md:py-[15px] ${active === 9 ? "text-red-600" : "text-gray-800"}`}>
                    <AiOutlineGift size={25} />
                    <p className='font-medium mx-2 md:block hidden'>Discount codes</p>
                </div>
            </Link>

            <Link to="/shop/dashboard/refund-order">
                <div className={`flex items-center mx-6 py-6 md:py-[15px] ${active === 10 ? "text-red-600" : "text-gray-800"}`}>
                    <HiOutlineReceiptRefund size={25} />
                    <p className='font-medium mx-2 md:block hidden'>Refunds</p>
                </div>
            </Link>

            <Link to="/shop/settings">
                <div className={`flex items-center mx-6 py-6 md:py-[15px] ${active === 11 ? "text-red-600" : "text-gray-800"}`}>
                    <MdOutlineSettings size={25} />
                    <p className='font-medium mx-2 md:block hidden'>Settings</p>
                </div>
            </Link>
        </div>
    );
};

export default DashboardSideBar;