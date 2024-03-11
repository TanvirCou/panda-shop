import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvent } from '../../redux/features/eventSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AdminEvents = () => {
    const { allEvents, isEventLoading } = useSelector(state => state.event);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchAllEvent());
    }, []);

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allEvents && allEvents?.allEvents.map((event, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {event.name}
                                                </td>
                                                <td>
                                                    ${event.discountPrice}
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

export default AdminEvents;