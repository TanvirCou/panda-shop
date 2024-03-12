import "../../../App.css";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlinePermMedia } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from "axios";
import { fetchShop } from "../../../redux/features/shopSlice";
import LoadingAnimation from "../../Loader/LoadingAnimation";

const ShopSettings = () => {
    const { shop, loading } = useSelector(state => state.shop);
    const dispatch = useDispatch();


    const [name, setName] = useState(shop?.shop?.name);
    const [description, setDescription] = useState(shop?.shop?.description);
    const [address, setAddress] = useState(shop?.shop?.address)
    const [phoneNumber, setPhoneNumber] = useState(shop?.shop?.phoneNumber);
    const [zipCode, setZipCode] = useState(shop?.shop?.zipCode);
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        const shop = {
            name,
            description,
            address,
            phoneNumber,
            zipCode,
            avatar: file
        };

        try {
            const res = await axios.put("https://panda-shop.onrender.com/api/shop/update-shop-info", shop, { withCredentials: true });
            toast.success(res.data.message);
            console.log(res);
            dispatch(fetchShop());
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };


    return (
        <div>
            {
                loading ? <LoadingAnimation /> :
                    <div className='px-4 py-6'>
                        {
                            avatar ?
                                <div className='w-full flex justify-center items-end relative'>
                                    <img src={URL.createObjectURL(avatar)} alt="" className=' h-[200px] w-[200px] rounded-md object-cover border-[3px] border-teal-500' />
                                </div> :
                                <div className='w-full flex justify-center items-end relative'>
                                    <img src={shop?.shop?.avatar} alt="" className=' h-[160px] w-[160px] rounded-full object-cover border-[3px] border-teal-500' />
                                    <div className='absolute ml-[116px] mb-4'>
                                        <label htmlFor="avatar">
                                            <MdOutlinePermMedia size={28} className='bg-gray-100 p-1 rounded-full cursor-pointer' />
                                            <input type="file" name="avatar" id="avatar" className='sr-only' onChange={(e) => handleFile(e.target.files[0])} />
                                        </label>
                                    </div>
                                </div>
                        }


                        <div className='flex flex-col w-full items-center mt-4 px-6 md:px-0'>
                            <div className='flex flex-col pt-3 '>
                                <label className='text-sm text-gray-500 font-medium'>Shop Name</label>
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className='w-[300px] md:w-[500px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your full name' />
                            </div>

                            <div className='flex flex-col pt-3 '>
                                <label className='text-sm text-gray-500 font-medium'>Shop Description</label>
                                <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} rows="7" className='w-[300px] md:w-[500px] border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your full name' />
                            </div>

                            <div className='flex flex-col pt-3 '>
                                <label className='text-sm text-gray-500 font-medium'>Shop Address</label>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='w-[300px] md:w-[500px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your full name' />
                            </div>

                            <div className='flex flex-col pt-3 '>
                                <label className='text-sm text-gray-500 font-medium'>Full Name</label>
                                <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='w-[300px] md:w-[500px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your full name' />
                            </div>

                            <div className='flex flex-col pt-3 '>
                                <label className='text-sm text-gray-500 font-medium'>Full Name</label>
                                <input type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className='w-[300px] md:w-[500px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your full name' />
                            </div>


                            <button onClick={handleUpdate} className='px-8 py-1.5 mt-4 bg-transparent text-teal-600 font-medium border border-teal-600 w-fit rounded-md'>Update</button>
                        </div>
                    </div>
            }

        </div>
    );
};

export default ShopSettings;