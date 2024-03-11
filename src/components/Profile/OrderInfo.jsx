import { useSelector } from 'react-redux';
import LoadingAnimation from '../Loader/LoadingAnimation';
import { Link } from 'react-router-dom';

const OrderInfo = () => {
    const { orders, isOrderLoading } = useSelector(state => state.order);

    console.log(orders.orders[0]);


    return (
        <>
            {
                isOrderLoading ? <LoadingAnimation /> :
                    <div className='px-4 py-2 w-full'>
                        <p className='text-lg font-semibold py-2'>All Orders</p>
                        <div className="overflow-x-auto ">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className="bg-gray-200 rounded-[4px]">
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
                                                    {order?.cart.length}
                                                </td>
                                                <td>
                                                    ${order.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0)}
                                                </td>
                                                <th>
                                                    <Link to={`/user/order/${order._id}`}>
                                                        <button className="btn btn-ghost btn-xs">Details</button>
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

export default OrderInfo;