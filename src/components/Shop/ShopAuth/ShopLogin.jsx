import axios from "axios";
import { useState } from "react";
import { IoEye, IoEyeOff, IoLockClosedOutline, IoMailOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchShop } from "../../../redux/features/shopSlice";

const ShopLogin = () => {
    const [passShow, setPassShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(
                "https://panda-shop-server-production.up.railway.app/api/shop/shop-login",
                { email, password },
                { withCredentials: true }
            );
            toast.success("Login success!");
            navigate(`/shop/dashboard`);
            dispatch(fetchShop());
        } catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full h-11 bg-white border border-gray-200 rounded-xl pl-10 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200";

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                    <IoMailOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className={inputClass}
                    />
                </div>
            </div>

            
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                <div className="relative">
                    <IoLockClosedOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type={passShow ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        className={`${inputClass} pr-10`}
                    />
                    <button
                        type="button"
                        onClick={() => setPassShow(!passShow)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {passShow ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                    </button>
                </div>
            </div>

            
            <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="remember-me" className="accent-cyan-500 w-3.5 h-3.5" />
                    <span className="text-sm font-medium text-gray-600">Remember me</span>
                </label>
                <Link to="/shop/forgot-password" className="text-sm font-semibold text-cyan-600 hover:text-cyan-500 transition-colors">
                    Forgot Password?
                </Link>
            </div>

            
            <button
                type="submit"
                disabled={loading}
                className="w-full h-11 mt-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {loading ? (
                    <svg className='animate-spin h-5 w-5 text-white' viewBox='0 0 24 24' fill='none'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z' />
                    </svg>
                ) : (
                    "Sign In to Dashboard"
                )}
            </button>

            <div className="relative flex items-center justify-center pb-2">
                <div className="absolute inset-y-0 inset-x-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative px-4 bg-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2.5">
                    For Recruiters
                </div>
            </div>

            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setEmail("kta516930@gmail.com");
                    setPassword("tanvir1234");
                    toast.info("Demo credentials loaded! Click Sign In.");
                }}
                className="w-full h-11 bg-white hover:bg-gray-100 border border-gray-200 text-cyan-700 text-sm font-bold rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
                <IoEye size={18} className="text-cyan-500" />
                Load Demo Shop Owner
            </button>
        </form>
    );
};

export default ShopLogin;
