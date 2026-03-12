/* eslint-disable react/prop-types */
import axios from "axios";
import { AiOutlineLock, AiOutlineShopping } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa6";
import { HiReceiptRefund } from "react-icons/hi";
import {
    IoLogOutOutline,
    IoMapOutline,
    IoPersonOutline,
} from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUser } from "../../redux/features/userSlice";

const NAV_ITEMS = [
  { id: 1, label: "Profile", icon: IoPersonOutline },
  { id: 2, label: "Orders", icon: AiOutlineShopping },
  { id: 3, label: "Refunds", icon: HiReceiptRefund },
  { id: 4, label: "Track Order", icon: IoMapOutline },
  { id: 5, label: "Password", icon: AiOutlineLock },
  { id: 6, label: "Address", icon: FaRegAddressCard },
];

const ProfileSidebar = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("https://panda-shop-server-production.up.railway.app/api/user/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      dispatch(fetchUser());
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="sticky top-0">
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-150 border-b border-gray-50 last:border-0 ${
              active === id
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon size={18} className={active === id ? "text-emerald-600" : "text-gray-400"} />
            <span className={`hidden md:block text-sm font-semibold ${active === id ? "text-emerald-700" : ""}`}>
              {label}
            </span>
            {active === id && (
              <span className="ml-auto hidden md:block w-1.5 h-5 bg-emerald-500 rounded-full" />
            )}
          </button>
        ))}

        {user?.user?.role === "Admin" && (
          <Link to="/admin/dashboard">
            <div className="flex items-center gap-3 px-4 py-3.5 border-t border-gray-50 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all">
              <MdOutlineDashboard size={18} className="text-gray-400" />
              <span className="hidden md:block text-sm font-semibold">Dashboard</span>
            </div>
          </Link>
        )}

        <button
          onClick={logoutHandler}
          className="w-full flex items-center gap-3 px-4 py-3.5 border-t border-gray-100 text-red-500 hover:bg-red-50 transition-all"
        >
          <IoLogOutOutline size={18} />
          <span className="hidden md:block text-sm font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
