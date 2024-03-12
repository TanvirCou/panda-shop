/* eslint-disable react/prop-types */
import { AiOutlineLock, AiOutlineShopping } from 'react-icons/ai';
import { IoLogOutOutline, IoMapOutline, IoPersonOutline } from 'react-icons/io5';
import { HiReceiptRefund } from "react-icons/hi";;
import { FaRegAddressCard } from "react-icons/fa6";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/features/userSlice';
import { MdOutlineDashboard } from 'react-icons/md';

const ProfileSidebar = ({ active, setActive }) => {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get("https://panda-shop.onrender.com/api/user/logout", { withCredentials: true });
            toast.success(res.data.message);
            dispatch(fetchUser());
            navigate("/");
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div className='px-2 md:px-8 md:pt-3 pb-2'>
            <div className='bg-white w-full h-[90vh] md:h-[75vh] flex flex-col justify-center rounded-md shadow-sm py-0'>
                <div className='flex items-center cursor-pointer px-6 md:px-8 py-5 md:py-4' onClick={() => setActive(1)}>
                    <IoPersonOutline size={18} color={`${active === 1 ? "red" : "black"}`} />
                    <p className={`hidden md:block text-sm font-medium pl-3 pt-0.5 ${active === 1 ? "text-[red]" : "text-black"}`}>Profile</p>
                </div>

                <div className='flex items-center cursor-pointer px-6 md:px-8 py-5 md:py-4' onClick={() => setActive(2)}>
                    <AiOutlineShopping size={18} color={`${active === 2 ? "red" : "black"}`} />
                    <p className={`hidden md:block text-sm font-medium pl-3 pt-0.5 ${active === 2 ? "text-[red]" : "text-black"}`}>Orders</p>
                </div>

                <div className='flex items-center cursor-pointer px-6 md:px-8 py-5 md:py-4' onClick={() => setActive(3)}>
                    <HiReceiptRefund size={18} color={`${active === 3 ? "red" : "black"}`} />
                    <p className={`hidden md:block text-sm font-medium pl-3 pt-0.5 ${active === 3 ? "text-[red]" : "text-black"}`}>Refunds</p>
                </div>

                {/* <div className='flex items-center cursor-pointer px-6 md:px-8 py-5 md:py-4' onClick={() => setActive(4)}>
                    <AiOutlineInbox size={18} color={`${active === 4 ? "red" : "black"}`}/>
                    <p className={`hidden md:block text-sm font-medium pl-3 pt-0.5 ${active === 4 ? "text-[red]" : "text-black"}`}>Inbox</p>
                </div> */}

                <div className='flex items-center cursor-pointer px-6 md:px-8 py-5 md:py-4' onClick={() => setActive(4)}>
                    <IoMapOutline size={18} color={`${active === 4 ? "red" : "black"}`} />
                    <p className={`hidden md:block text-sm font-medium pl-3 pt-0.5 ${active === 4 ? "text-[red]" : "text-black"}`}>Track Order</p>
                </div>

                <div className='flex items-center cursor-pointer px-6 md:px-8 py-5 md:py-4' onClick={() => setActive(5)}>
                    <AiOutlineLock size={18} color={`${active === 5 ? "red" : "black"}`} />
                    <p className={`hidden md:block text-sm font-medium pl-3 pt-0.5 ${active === 5 ? "text-[red]" : "text-black"}`}>Change Password</p>
                </div>

                <div className='flex items-center cursor-pointer px-6 md:px-8 py-5 md:py-4' onClick={() => setActive(6)}>
                    <FaRegAddressCard size={18} color={`${active === 6 ? "red" : "black"}`} />
                    <p className={`hidden md:block text-sm font-medium pl-3 pt-0.5 ${active === 6 ? "text-[red]" : "text-black"}`}>Address</p>
                </div>

                {
                    user && user?.user.role === "Admin" &&
                    <Link to="/admin/dashboard">
                        <div className='flex items-center cursor-pointer px-6 md:px-8 py-5 md:py-4'>
                            <MdOutlineDashboard size={18} color={`${active === 7 ? "red" : "black"}`} />
                            <p className={`hidden md:block text-sm font-medium pl-3 pt-0.5 ${active === 8 ? "text-[red]" : "text-black"}`}>Go to Dashboard</p>
                        </div>
                    </Link>
                }

                <div className='flex items-center cursor-pointer px-6 md:px-8 py-5 md:py-4' onClick={logoutHandler}>
                    <IoLogOutOutline size={18} color={`${active === 8 ? "red" : "black"}`} />
                    <p className={`hidden md:block text-sm font-medium pl-3 pt-0.5 ${active === 9 ? "text-[red]" : "text-black"}`}>Logout</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;