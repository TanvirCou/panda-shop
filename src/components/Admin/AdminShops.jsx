import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllShop } from '../../redux/features/shopSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminShops = () => {
    const { allShops, allShopLoading } = useSelector(state => state.shop);

    const [shopId, setShopId] = useState("");
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllShop());
    }, [])

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.delete(`https://panda-shop.onrender.com/api/shop/delete-shop/${shopId}`, { withCredentials: true });
            toast.success(res.data.message);
            setOpen(false);
            dispatch(fetchAllShop());
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            {
                allShopLoading ? <LoadingAnimation /> :
                    <div className='px-4 py-2 w-full'>
                        <p className='text-lg font-semibold py-2'>All Shops</p>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className="bg-gray-200 rounded-[4px]">
                                        <th>Serial</th>
                                        <th>Shop Info</th>
                                        <th>Shop Email</th>
                                        <th>Joined on</th>
                                        <th>Balance</th>
                                        <th>Preview</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allShops?.shops.map((shop, index) => (
                                            <tr key={index} className='hover'>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <div className='flex items-center'>
                                                        <img src={shop?.avatar} alt="" className='w-8 h-8 rounded-full object-cover' />
                                                        <p className='font-medium ml-2'>{shop.name}</p>
                                                    </div>

                                                </td>
                                                <td>
                                                    {shop?.email}
                                                </td>
                                                <td>
                                                    {shop?.createdAt.slice(0, 10)}
                                                </td>
                                                <td>
                                                    {shop.availableBalance}
                                                </td>
                                                <td>
                                                    <Link to={`/shop/${shop._id}`}>
                                                        <AiOutlineEye size={22} className='cursor-pointer' />
                                                    </Link>
                                                </td>
                                                <th>
                                                    <AiOutlineDelete size={22} className='cursor-pointer' onClick={() => setOpen(true) || setShopId(shop._id)} />
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        {
                            open &&
                            <div className='fixed w-full h-screen bg-[#00000030] z-40 top-0 left-0 flex items-center justify-center'>
                                <div className='w-[90%] md:w-[40%] h-[70vh] md:h-[55vh] bg-white rounded-md shadow-sm relative p-4 overflow-y-scroll webkit'>
                                    <RxCross1 size={25} onClick={() => setOpen(false)} className='absolute right-3 top-3 z-50 cursor-pointer' />
                                    <div className='flex flex-col justify-center items-center h-full'>
                                        <p className='text-2xl font-medium'>Are you want to delete this shop</p>
                                        <div className='mt-4'>
                                            <button onClick={() => setOpen(false)} className='bg-black text-white font-medium px-4 py-1.5 rounded-md'>Cancel</button>
                                            <button onClick={handleDelete} className='ml-6 bg-black text-white font-medium px-4 py-1.5 rounded-md'>Yes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
            }
        </>
    );
};

export default AdminShops;