import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { RxAvatar } from "react-icons/rx";



const SignUp = () => {
    const [passShow, setPassShow] = useState(false);
    const [confirmPassShow, setConfirmPassShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [avatar, setAvatar] = useState(null);

    const handleFile = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSignUp}>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Full Name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Enter your full name' className='w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-teal-500' />
            </div>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Email Address</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Enter your email' className='w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-teal-500' />
            </div>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Password</p>
                <div className='relative flex justify-end items-center'>
                    <input type={!passShow ? `password` : `text`} value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" placeholder='Enter your password' className='flex justify-center w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-teal-500 ' />
                    {!passShow ? 
                        <IoEye size={22} onClick={() => setPassShow(true)} className='cursor-pointer absolute mx-1.5' /> :
                        <IoEyeOff size={22} onClick={() => setPassShow(false)} className='cursor-pointer  absolute mx-1.5' />
                    }
                </div>
            </div>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Confirm Password</p>
                <div className='relative flex justify-end items-center'>
                    <input type={!confirmPassShow ? `password` : `text`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder='Enter your password again' className='flex justify-center w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-teal-500 ' />
                    {!confirmPassShow ? 
                        <IoEye size={22} onClick={() => setConfirmPassShow(true)} className='cursor-pointer absolute mx-1.5' /> :
                        <IoEyeOff size={22} onClick={() => setConfirmPassShow(false)} className='cursor-pointer  absolute mx-1.5' />
                    }
                </div>
            </div>
            <div className='px-4 py-2.5 flex items-center'>
                <div className='h-8 w-8 rounded-full'>
                    {avatar ? <img src={URL.createObjectURL(avatar)} alt="" className='h-full w-full object-cover rounded-full' /> :
                        <RxAvatar className='w-8 h-8' />
                    }
                </div>
                <div className='px-4'>
                    <label htmlFor="file-input">
                        <p className='text-sm font-medium border border-gray-300 w-fit py-1.5 px-4 rounded-md cursor-pointer'>Upload a file</p>
                        <input type="file" name="avatar" id="file-input" className='sr-only' onChange={handleFile} />
                    </label>
                </div>
            </div>
            <div className='px-4 py-1.5'>
                <button className='bg-teal-600 hover:bg-teal-700 hover:text-gray-300 w-full h-10 rounded-md text-white text-md font-medium'>Register</button>
            </div>
        </form>
    );
};

export default SignUp;