import axios from 'axios';
import { useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../redux/features/userSlice';

const Login = () => {
    const [passShow, setPassShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://panda-shop.onrender.com/api/user/login", { email, password }, { withCredentials: true });
            toast.success("Login success!");
            navigate("/");
            dispatch(fetchUser());
        } catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleLogin} className=''>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Email Address</p>
                <input type="email" name="" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Enter your email' className='w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-teal-500' />
            </div>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Password</p>
                <div className='relative flex justify-end items-center'>
                    <input type={!passShow ? `password` : `text`} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Enter your password' className='flex justify-center w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-teal-500 ' />
                    {!passShow ?
                        <IoEye size={22} onClick={() => setPassShow(true)} className='cursor-pointer absolute mx-1.5' /> :
                        <IoEyeOff size={22} onClick={() => setPassShow(false)} className='cursor-pointer  absolute mx-1.5' />
                    }
                </div>
            </div>
            <div className='flex justify-between items-center px-4 pt-0.5 pb-2'>
                <div className='flex items-center'>
                    <input type="checkbox" name="remember-me" className='accent-teal-500' />
                    <p className='text-sm font-medium pl-2'>Remember me</p>
                </div>
                <p className='text-sm font-medium underline cursor-pointer text-teal-600'>Forgotten Password?</p>
            </div>
            <div className='px-4 py-1.5'>
                <button className='bg-teal-600 hover:bg-teal-700 hover:text-gray-300 w-full h-10 rounded-md text-white text-md font-medium'>Login</button>
            </div>
        </form>
    );
};

export default Login;