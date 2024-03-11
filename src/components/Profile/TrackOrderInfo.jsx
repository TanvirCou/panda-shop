import { useEffect } from 'react';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../../redux/features/orderSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';
import { Link } from 'react-router-dom';

const TrackOrderInfo = () => {
    const { orders, isOrderLoading } = useSelector(state => state.order);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrder(user.user._id));
    }, [dispatch, user]);

    console.log(orders);
    return (
        <>
            {
                isOrderLoading ? <LoadingAnimation /> :
                    <div className='px-4 py-2 w-full'>
                        <p className='text-lg font-semibold py-2'>Track Orders</p>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th>Order id</th>
                                        <th>Status</th>
                                        <th>Items Qty</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders?.orders.map((order, index) => (
                                            <tr key={index} className='hover'>
                                                <td>
                                                    {order._id}
                                                </td>
                                                <td>
                                                    {order.status}
                                                </td>
                                                <td>
                                                    {order.cart.length}
                                                </td>
                                                <td>
                                                    ${order.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0)}
                                                </td>
                                                <th>
                                                    <Link to={`/user/track-order/${order._id}`}>
                                                        <MdOutlineTrackChanges size={20} className='cursor-pointer' />
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
        </>

    );
};

export default TrackOrderInfo;