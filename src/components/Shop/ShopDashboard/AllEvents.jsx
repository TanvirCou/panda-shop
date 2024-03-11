import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingAnimation from '../../Loader/LoadingAnimation';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { fetchEvent } from '../../../redux/features/eventSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardProducts = () => {
    const { events, isEventLoading } = useSelector(state => state.event);
    const { shop } = useSelector(state => state.shop);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchEvent(shop.shop._id));
    }, [dispatch, shop]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/event/delete-event/${id}`, { withCredentials: true });
            toast.success(res.data.message);
            console.log(res.data);
            dispatch(fetchEvent(shop.shop._id));
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            {
                isEventLoading ? <LoadingAnimation />
                    :

                    <div className='px-4 py-2 w-full'>
                        <p className='text-lg font-semibold py-2'>All Events</p>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className="bg-gray-200 rounded-[4px]">
                                        <th>Serial</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Sold out</th>
                                        <th>Status</th>
                                        <th>Preview</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        events && events?.events.map((event, index) => (
                                            <tr key={index} className=''>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {event.name}
                                                </td>
                                                <td>
                                                    {event.discountPrice}
                                                </td>
                                                <td>
                                                    {event.stock}
                                                </td>
                                                <td>
                                                    {event.sold_out}
                                                </td>
                                                <td>
                                                    {event.status}
                                                </td>
                                                <th>
                                                    <Link to={`/product/${event._id}?isEvent=true`}>
                                                        <AiOutlineEye size={25} className='cursor-pointer' />
                                                    </Link>
                                                </th>
                                                <th>
                                                    <AiOutlineDelete size={25} className='cursor-pointer' onClick={() => handleDelete(event._id)} />
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>
    );
};

export default DashboardProducts;