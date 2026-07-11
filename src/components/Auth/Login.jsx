import axios from "axios";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUser } from "../../redux/features/userSlice";

const InputWrapper = ({ label, children }) => (
  <div className='space-y-1.5'>
    <label className='block text-[11px] font-semibold tracking-widest text-gray-400 uppercase'>
      {label}
    </label>
    {children}
  </div>
);

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        "https://panda-shop-server-v3.up.railway.app/api/user/login",
        { email, password },
        { withCredentials: true }
      );
      // Fetch user to determine role-based redirect
      const res = await axios.get(
        "https://panda-shop-server-v3.up.railway.app/api/user/get",
        {
          withCredentials: true,
        }
      );
      const role = res.data?.user?.role;
      toast.success("Login success!");
      dispatch(fetchUser());
      if (role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className='space-y-4'>
      <InputWrapper label='Email Address'>
        <div className='relative'>
          <MdOutlineEmail
            size={17}
            className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
          />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='you@example.com'
            className='w-full h-11 bg-white border border-gray-200 text-gray-800 placeholder:text-gray-300 text-sm pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 shadow-sm transition-all duration-200'
          />
        </div>
      </InputWrapper>

      <InputWrapper label='Password'>
        <div className='relative'>
          <MdLockOutline
            size={17}
            className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
          />
          <input
            type={!passShow ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Enter your password'
            className='w-full h-11 bg-white border border-gray-200 text-gray-800 placeholder:text-gray-300 text-sm pl-10 pr-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 shadow-sm transition-all duration-200'
          />
          <button
            type='button'
            onClick={() => setPassShow(!passShow)}
            className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-emerald-500 transition-colors duration-200'
            tabIndex={-1}
          >
            {!passShow ? <IoEye size={18} /> : <IoEyeOff size={18} />}
          </button>
        </div>
      </InputWrapper>

      <div className='flex items-center justify-between pt-0.5'>
        <label className='flex items-center gap-2 cursor-pointer group'>
          <input
            type='checkbox'
            name='remember-me'
            className='w-3.5 h-3.5 accent-emerald-500 rounded'
          />
          <span className='text-xs text-gray-400 group-hover:text-gray-600 transition-colors'>
            Remember me
          </span>
        </label>
        <Link
          to='/forgot-password'
          className='text-xs font-medium text-emerald-600 hover:text-emerald-500 cursor-pointer transition-colors underline underline-offset-2'
        >
          Forgot password?
        </Link>
      </div>

      <div className='relative py-1'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-100' />
        </div>
      </div>

      <button
        type='submit'
        disabled={loading}
        className='w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-200/60 hover:shadow-emerald-300/70 active:scale-[0.985] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 tracking-wide flex items-center justify-center'
      >
        {loading ? (
          <svg
            className='animate-spin h-5 w-5 text-white'
            viewBox='0 0 24 24'
            fill='none'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
            />
          </svg>
        ) : (
          "Sign In →"
        )}
      </button>

      <div className='relative flex items-center justify-center pb-2'>
        <div className='absolute inset-x-0 mt-3 flex items-center'>
          <div className='w-full border-t border-gray-200' />
        </div>
        <div className='relative px-4 bg-white text-[10px] font-bold tracking-wider text-gray-400 uppercase mt-3'>
          For Recruiters
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3 mt-4'>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            setEmail("kazi.tanvir.cou@gmail.com");
            setPassword("tanvir1234");
            toast.info("Demo User loaded! Click Sign In.");
          }}
          className='w-full h-[42px] bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-[0.98]'
        >
          <IoEye size={16} />
          Demo User
        </button>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            setEmail("ahmed.tnvr999@gmail.com");
            setPassword("tanvir1234");
            toast.info("Demo Admin loaded! Click Sign In.");
          }}
          className='w-full h-[42px] bg-white hover:bg-teal-50 text-teal-600 border border-teal-100 text-xs font-bold rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-[0.98]'
        >
          <IoEye size={16} />
          Demo Admin
        </button>
      </div>
    </form>
  );
};

export default Login;
