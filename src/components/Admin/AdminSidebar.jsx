/* eslint-disable react/prop-types */
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineDashboard, MdOutlineEvent, MdOutlineSettings } from 'react-icons/md';
import { PiMoney } from "react-icons/pi";
import { Link } from 'react-router-dom';
import "../../App.css";
import { FaShopify, FaUserFriends } from 'react-icons/fa';

const AdminSideBar = ({ active }) => {
    return (
        <div className='w-full h-[93vh] md:h-[90vh] flex flex-col justify-center md:block bg-white shadow-md pt-4 overflow-y-scroll webkit'>
            <Link to="/admin/dashboard">
                <div className={`flex items-center mx-6 py-5 ${active === 1 ? "text-red-600" : "text-gray-800"}`}>
                    <MdOutlineDashboard size={25} />
                    <p className='font-medium mx-2 md:block hidden'>Dashboard</p>
                </div>
            </Link>

            <Link to="/admin/dashboard/all-orders">
                <div className={`flex items-center mx-6 py-5 ${active === 2 ? "text-red-600" : "text-gray-800"}`}>
                    <FiShoppingBag size={25} />
                    <p className='font-medium mx-2 md:block hidden'>All Orders</p>
                </div>
            </Link>

            <Link to="/admin/dashboard/all-shops">
                <div className={`flex items-center mx-6 py-5 ${active === 3 ? "text-red-600" : "text-gray-800"}`}>
                    <FaShopify size={25} />
                    <p className='font-medium mx-2 md:block hidden'>All Shops</p>
                </div>
            </Link>

            <Link to="/admin/dashboard/all-users">
                <div className={`flex items-center mx-6 py-5 ${active === 4 ? "text-red-600" : "text-gray-800"}`}>
                    <FaUserFriends size={25} />
                    <p className='font-medium mx-2 md:block hidden'>All Users</p>
                </div>
            </Link>

            <Link to="/admin/dashboard/all-products">
                <div className={`flex items-center mx-6 py-5 ${active === 5 ? "text-red-600" : "text-gray-800"}`}>
                    <FiPackage size={25} />
                    <p className='font-medium mx-2 md:block hidden'>All Products</p>
                </div>
            </Link>

            <Link to="/admin/dashboard/all-events">
                <div className={`flex items-center mx-6 py-5 ${active === 6 ? "text-red-600" : "text-gray-800"}`}>
                    <MdOutlineEvent size={25} />
                    <p className='font-medium mx-2 md:block hidden'>All Events</p>
                </div>
            </Link>


            <Link to="/admin/dashboard/withdraw-request">
                <div className={`flex items-center mx-6 py-5 ${active === 7 ? "text-red-600" : "text-gray-800"}`}>
                    <PiMoney size={25} />
                    <p className='font-medium mx-2 md:block hidden'>Withdraw Request</p>
                </div>
            </Link>

            <Link to="/profile">
                <div className={`flex items-center mx-6 py-5 ${active === 8 ? "text-red-600" : "text-gray-800"}`}>
                    <MdOutlineSettings size={25} />
                    <p className='font-medium mx-2 md:block hidden'>Settings</p>
                </div>
            </Link>
        </div>
    );
};

export default AdminSideBar;