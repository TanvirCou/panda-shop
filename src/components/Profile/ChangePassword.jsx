import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Password don't match");
        } else {
            try {
                const res = await axios.put("https://panda-shop.onrender.com/api/user/update-user-password", { oldPassword, newPassword }, { withCredentials: true });
                toast.success("Password change SuccessFully");
                console.log((res.data));
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
    }

    return (
        <div className='px-4 py-6 w-full'>
            <div className='flex flex-col items-center'>
                <p className='text-2xl font-medium'>Change Password</p>
                <div>
                    <div className='flex flex-col pt-3 '>
                        <label className='text-sm text-gray-500 font-medium'>Old Password</label>
                        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your old password' />
                    </div>
                    <br />
                    <div className='flex flex-col pt-3 '>
                        <label className='text-sm text-gray-500 font-medium'>New Password</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your new password' />
                    </div>
                    <br />
                    <div className='flex flex-col pt-3 '>
                        <label className='text-sm text-gray-500 font-medium'>Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter confirm password' />
                    </div>

                    <button onClick={handleChangePassword} className='px-8 py-1.5 mt-4 bg-transparent text-teal-600 font-medium border border-teal-600 w-fit rounded-md'>Update</button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;