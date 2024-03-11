import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrder } from '../../redux/features/orderSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';
const AdminOrders = () => {
    const { allOrders, isAdminOrderLoading } = useSelector(state => state.order);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAdminOrder());
    }, [])

    console.log(allOrders);

    return (
        <>
            {
                isAdminOrderLoading ? <LoadingAnimation /> :
                    <div className='px-4 py-2 w-full'>
                        <p className='text-lg font-semibold py-2'>All Orders</p>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className="bg-gray-200 rounded-[4px]">
                                        <th>Order id</th>
                                        <th>Status</th>
                                        <th>Items Qty</th>
                                        <th>Total</th>
                                        <th>Placed on</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allOrders?.orders.map((order, index) => (
                                            <tr key={index} className='hover'>
                                                <td>
                                                    {order._id}
                                                </td>
                                                <td>
                                                    {order.status}
                                                </td>
                                                <td>
                                                    {order?.cart.length}
                                                </td>
                                                <td>
                                                    ${order.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0)}
                                                </td>
                                                <td>
                                                    {order?.createdAt.slice(0, 10)}
                                                </td>
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

export default AdminOrders;