import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUser } from '../../redux/features/userSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';

const AdminUsers = () => {
    const { allUsers, allUsersLoading } = useSelector(state => state.user);

    const [userId, setUserId] = useState("");
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUser());
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.delete(`http://localhost:3000/api/user/delete-user/${userId}`, { withCredentials: true });
            toast.success(res.data.message);
            setOpen(false);
            dispatch(fetchAllUser());
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <>
            {
                allUsersLoading ? <LoadingAnimation /> :
                    <div className='px-4 py-2 w-full'>
                        <p className='text-lg font-semibold py-2'>All Users</p>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className="bg-gray-200 rounded-[4px]">
                                        <th>Serial</th>
                                        <th>User Info</th>
                                        <th>User Email</th>
                                        <th>Phone number</th>
                                        <th>Role</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allUsers?.users.map((user, index) => (
                                            <tr key={index} className='hover'>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <div className='flex items-center'>
                                                        <img src={user?.avatar} alt="" className='w-8 h-8 rounded-full object-cover' />
                                                        <p className='font-medium ml-2'>{user.name}</p>
                                                    </div>

                                                </td>
                                                <td>
                                                    {user?.email}
                                                </td>
                                                <td>
                                                    {user?.phoneNumber}
                                                </td>
                                                <td>
                                                    {user.role}
                                                </td>
                                                <th>
                                                    <AiOutlineDelete size={22} className='cursor-pointer' onClick={() => setOpen(true) || setUserId(user._id)} />
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

export default AdminUsers;