import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/features/userSlice';
import { MdOutlinePermMedia } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingAnimation from '../Loader/LoadingAnimation';

const ProfileInfo = () => {
    const { user, isLoading } = useSelector(state => state.user);
    const dispatch = useDispatch();


    const [name, setName] = useState(user?.user?.name);
    const [email, setEmail] = useState(user?.user?.email);
    const [phoneNumber, setPhoneNumber] = useState(user?.user?.phoneNumber);
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);

    const [avatar, setAvatar] = useState(null);

    //   useEffect(() => {
    //     if(error) {
    //         toast.error(error);
    //         window.location.reload();
    //     }
    //     if(user?.message) {
    //         toast.success(user?.message);
    //         window.location.reload();
    //     }
    //   }, [dispatch, error]);

    const handleFile = (pics) => {
        setAvatar(pics);

        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "panda-shop");
        data.append("cloud_name", "ddcn60bx4");
        fetch("https://api.cloudinary.com/v1_1/ddcn60bx4/image/upload", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setFile(data.url.toString());
                console.log(data.url.toString());
            })
            .catch((err) => {
                console.log(err);

            });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const user = {
            name,
            email,
            phoneNumber,
            password,
            avatar: file
        };

        try {
            const res = await axios.put("http://localhost:3000/api/user/update-user-info", user, { withCredentials: true });
            toast.success(res.data.message);
            dispatch(fetchUser());
            setAvatar(null);
            setFile(null);
            setPassword("");
        } catch (error) {
            toast.error(error.response.data.message);
        }

        // dispatch(updateUserInfo(user));
    };


    return (
        <>
            {
                isLoading ? <LoadingAnimation /> :
                    <div>
                        <div className='px-4 py-6 w-full'>
                            {
                                avatar ?
                                    <div className='w-full flex justify-center items-end relative'>
                                        <img src={URL.createObjectURL(avatar)} alt="" className=' h-[200px] w-[200px] rounded-md object-cover border-[3px] border-teal-500' />
                                    </div> :
                                    <div className='w-full flex justify-center items-end relative'>
                                        <img src={user?.user?.avatar} alt="" className=' h-[160px] w-[160px] rounded-full object-cover border-[3px] border-teal-500' />
                                        <div className='absolute ml-[116px] mb-4'>
                                            <label htmlFor="avatar">
                                                <MdOutlinePermMedia size={28} className='bg-gray-100 p-1 rounded-full cursor-pointer' />
                                                <input type="file" name="avatar" id="avatar" className='sr-only' onChange={(e) => handleFile(e.target.files[0])} />
                                            </label>
                                        </div>
                                    </div>
                            }


                            <div className='flex flex-wrap justify-between mt-4 md:px-0'>
                                <div className='flex flex-col pt-3 '>
                                    <label className='text-sm text-gray-500 font-medium'>Full Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your full name' />
                                </div>

                                <div className='flex flex-col pt-3'>
                                    <label className='text-sm text-gray-500 font-medium'>Email Address</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your email address' />
                                </div>

                                <div className='flex flex-col pt-3'>
                                    <label className='text-sm text-gray-500 font-medium'>Phone Number</label>
                                    <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your phone number' />
                                </div>

                                <div className='flex flex-col pt-3'>
                                    <label className='text-sm text-gray-500 font-medium'>Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-[300px] md:w-[400px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your password' />
                                </div>
                            </div>
                            <div className='flex justify-center md:justify-normal'>
                                <button onClick={handleUpdate} className='px-8 py-1.5 mt-4 bg-transparent text-teal-600 font-medium border border-teal-600 w-fit rounded-md'>Update</button>
                            </div>
                        </div>
                    </div>
            }
        </>

    );
};

export default ProfileInfo;