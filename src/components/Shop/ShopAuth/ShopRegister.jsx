import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { toast } from 'react-toastify';


const ShopRegister = () => {
    const [passShow, setPassShow] = useState(false);
    const [confirmPassShow, setConfirmPassShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [file, setFile] = useState(null);

    const [avatar, setAvatar] = useState(null);

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

    const handleRegister = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password don't match!");
        } else {
            const data = {
                name: name,
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                address: address,
                zipCode: zipCode,
                avatar: file
            }
            try {
                const res = await axios.post("http://localhost:3000/api/shop/shop-register", data);
                toast.success(res.data.message);
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setAvatar();
                setPhoneNumber();
                setAddress("");
                setZipCode();
            } catch (err) {
                toast.error(err.response.data.message);
            }
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Shop Name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Enter your shop name' className='w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-teal-500' />
            </div>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Email Address</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Enter your email' className='w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-teal-500' />
            </div>

            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Phone Number</p>
                <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required placeholder='Enter your phone number' className='w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-teal-500' />
            </div>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Address</p>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder='Enter your address' className='w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-teal-500' />
            </div>
            <div className='px-4 py-1.5'>
                <p className='text-md font-medium'>Zip Code</p>
                <input type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required placeholder='Enter your zip code' className='w-full h-10 border-2 border-gray-300 px-2 rounded-md placeholder:text-md placeholder:font-medium text-md font-medium focus:outline-teal-500' />
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
                        <input type="file" name="avatar" id="file-input" className='sr-only' onChange={(e) => handleFile(e.target.files[0])} />
                    </label>
                </div>
            </div>
            <div className='px-4 py-1.5'>
                <button className='bg-teal-600 hover:bg-teal-700 hover:text-gray-300 w-full h-10 rounded-md text-white text-md font-medium'>Register</button>
            </div>
        </form>
    );
};

export default ShopRegister;