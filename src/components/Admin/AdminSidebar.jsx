/* eslint-disable react/prop-types */
import axios2 from "axios";
import { FaShopify, FaUserFriends } from "react-icons/fa";
import { FiLogOut, FiPackage, FiShoppingBag } from "react-icons/fi";
import {
    MdOutlineDashboard,
    MdOutlineEvent,
    MdOutlineSettings,
} from "react-icons/md";
import { PiMoney } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUser } from "../../redux/features/userSlice";

const NAV_ITEMS = [
  {
    id: 1,
    to: "/admin/dashboard",
    icon: MdOutlineDashboard,
    label: "Dashboard",
  },
  {
    id: 2,
    to: "/admin/dashboard/all-orders",
    icon: FiShoppingBag,
    label: "All Orders",
  },
  {
    id: 3,
    to: "/admin/dashboard/all-shops",
    icon: FaShopify,
    label: "All Shops",
  },
  {
    id: 4,
    to: "/admin/dashboard/all-users",
    icon: FaUserFriends,
    label: "All Users",
  },
  {
    id: 5,
    to: "/admin/dashboard/all-products",
    icon: FiPackage,
    label: "All Products",
  },
  {
    id: 6,
    to: "/admin/dashboard/all-events",
    icon: MdOutlineEvent,
    label: "All Events",
  },
  {
    id: 7,
    to: "/admin/dashboard/withdraw-request",
    icon: PiMoney,
    label: "Withdrawals",
  },
  { id: 8, to: "/admin/settings", icon: MdOutlineSettings, label: "Settings" },
];

const AdminSideBar = ({ active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios2.get(
        "https://panda-shop-server-v4.up.railway.app/api/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message || "Logged out successfully");
      dispatch(fetchUser());
      navigate("/auth");
    } catch (err) {
      toast.error("Logout failed");
      console.log(err);
    }
  };

  return (
    <div className='h-full w-full bg-white border-r border-gray-100 shadow-sm flex flex-col py-3 overflow-y-auto'>
      <div className='hidden md:block px-5 mb-4'>
        <div className='h-0.5 w-full bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full opacity-60' />
      </div>

      <nav className='flex flex-col gap-0.5 px-2 flex-1'>
        {NAV_ITEMS.map(({ id, to, icon: Icon, label }) => {
          const isActive = active === id;
          return (
            <Link key={id} to={to} className='w-full'>
              <div
                title={label}
                className={`flex items-center justify-center md:justify-start gap-0 md:gap-3 px-2 md:px-3 py-2.5 rounded-xl transition-all duration-200 group
                                    ${
                                      isActive
                                        ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-100"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                    }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200
                                    ${
                                      isActive
                                        ? "bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-md shadow-indigo-200"
                                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                                    }`}
                >
                  <Icon size={16} />
                </div>

                <span
                  className={`hidden md:block text-sm font-semibold truncate transition-colors duration-200
                                    ${
                                      isActive
                                        ? "text-indigo-700"
                                        : "text-gray-600 group-hover:text-gray-800"
                                    }`}
                >
                  {label}
                </span>

                {isActive && (
                  <div className='absolute right-1 md:static md:ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0' />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className='px-2 pt-2 border-t border-gray-100 mt-2'>
        <button
          onClick={handleLogout}
          title='Logout'
          className='w-full flex items-center justify-center md:justify-start gap-0 md:gap-3 px-2 md:px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 group'
        >
          <div className='flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 text-red-400 group-hover:bg-red-100 flex items-center justify-center transition-colors duration-200'>
            <FiLogOut size={16} />
          </div>
          <span className='hidden md:block text-sm font-semibold text-red-500'>
            Logout
          </span>
        </button>
      </div>

      <div className='px-5 pt-3 hidden md:block'>
        <div className='h-0.5 w-full bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full opacity-30' />
        <p className='text-[10px] text-gray-300 font-medium mt-3 text-center'>
          © {new Date().getFullYear()} PandaShop Admin
        </p>
      </div>
    </div>
  );
};

export default AdminSideBar;
