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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:3000/api/shop/shop-login",
                { email, password },
                { withCredentials: true }
            );
            toast.success("Login success!");
            navigate(`/shop/dashboard`);
            dispatch(fetchShop());
        } catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
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
                className="w-full h-11 mt-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]"
            >
                Sign In to Dashboard
            </button>
        </form>
    );
};

export default ShopLogin;
