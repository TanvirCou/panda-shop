import { AiOutlineGift } from 'react-icons/ai';
import { FiFilePlus, FiPackage, FiShoppingBag } from 'react-icons/fi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdOutlineCreateNewFolder, MdOutlineDashboard, MdOutlineEvent, MdOutlineSettings } from 'react-icons/md';
import { PiMoney } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutShop } from '../../../redux/features/shopSlice';

const NAV_ITEMS = [
    { id: 1,  to: "/shop/dashboard",                  icon: MdOutlineDashboard,       label: "Dashboard" },
    { id: 2,  to: "/shop/dashboard/all-orders",        icon: FiShoppingBag,            label: "All Orders" },
    { id: 3,  to: "/shop/dashboard/all-products",      icon: FiPackage,                label: "All Products" },
    { id: 4,  to: "/shop/dashboard/create-product",    icon: MdOutlineCreateNewFolder, label: "Create Product" },
    { id: 5,  to: "/shop/dashboard/all-events",        icon: MdOutlineEvent,           label: "All Events" },
    { id: 6,  to: "/shop/dashboard/create-event",      icon: FiFilePlus,               label: "Create Event" },
    { id: 7,  to: "/shop/dashboard/withdraw-money",    icon: PiMoney,                  label: "Withdraw Money" },
    { id: 9,  to: "/shop/dashboard/coupon-code",       icon: AiOutlineGift,            label: "Discount Codes" },
    { id: 10, to: "/shop/dashboard/refund-order",      icon: HiOutlineReceiptRefund,   label: "Refunds" },
    { id: 11, to: "/shop/settings",                    icon: MdOutlineSettings,        label: "Settings" },
];

const DashboardSideBar = ({ active }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await dispatch(logoutShop()).unwrap();
            toast.success("Logged out successfully");
            navigate("/shop-auth");
        } catch (err) {
            toast.error(err.message || "Logout failed");
        }
    };

    return (
        <div className="h-full w-full bg-white border-r border-gray-100 shadow-sm flex flex-col py-3 overflow-y-auto">
            
            <div className="hidden md:block px-5 mb-4">
                <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full opacity-60" />
            </div>

            <nav className="flex flex-col gap-1 px-1.5 md:px-2">
                {NAV_ITEMS.map(({ id, to, icon: Icon, label }) => {
                    const isActive = active === id;
                    return (
                        <Link key={id} to={to} title={label}>
                            <div
                                className={`flex items-center justify-center md:justify-start gap-0 md:gap-3 px-0 md:px-3 py-2.5 rounded-xl transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-gradient-to-r from-cyan-50 to-sky-50 text-cyan-700 border border-cyan-100'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                    }`}
                            >
                                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200
                                    ${isActive
                                        ? 'bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-md shadow-cyan-200'
                                        : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                    }`}
                                >
                                    <Icon size={16} />
                                </div>
                                <span className={`hidden md:block text-sm font-semibold truncate transition-colors duration-200
                                    ${isActive ? 'text-cyan-700' : 'text-gray-600 group-hover:text-gray-800'}`}
                                >
                                    {label}
                                </span>
                                
                                {isActive && (
                                    <div className="md:hidden absolute right-1 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            
            <div className="mt-auto px-1.5 md:px-2 pt-4 border-t border-gray-50">
                <button 
                    onClick={logoutHandler}
                    title="Logout"
                    className="w-full flex items-center justify-center md:justify-start gap-0 md:gap-3 px-0 md:px-3 py-2.5 rounded-xl transition-all duration-200 group text-red-500 hover:bg-red-50"
                >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center transition-colors duration-200 group-hover:bg-red-100">
                        <IoLogOutOutline size={16} />
                    </div>
                    <span className="hidden md:block text-sm font-semibold truncate">
                        Logout
                    </span>
                </button>

                
                <div className="hidden md:block px-3 pt-4 pb-2">
                    <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full opacity-30" />
                    <p className="text-[10px] text-gray-300 font-medium mt-3 text-center">
                        © {new Date().getFullYear()} PandaShop
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardSideBar;