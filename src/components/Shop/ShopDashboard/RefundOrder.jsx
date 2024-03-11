import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShopOrder } from '../../../redux/features/orderSlice';
import LoadingAnimation from '../../Loader/LoadingAnimation';

const RefundOrder = () => {
    const { shopOrders, isShopOrderLoading } = useSelector(state => state.order);
    const { shop } = useSelector(state => state.shop);
    const dispatch = useDispatch();
    const [data, setData] = useState();

    useEffect(() => {
        dispatch(fetchShopOrder(shop.shop._id));
    }, [dispatch, shop]);

    useEffect(() => {
        const data = shopOrders?.orders.filter(i => i?.status === "Processing for Refund" || i?.status === "Refund Success");
        setData(data);
    }, [shopOrders]);

    return (
        <>
            {
                isShopOrderLoading ? <LoadingAnimation /> :
                    <div className='px-4 py-2 w-full'>
                        <p className='text-lg font-semibold py-2'>All Refund Orders</p>
                        <div className="overflow-x-auto">
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
                                        data && data.map((order, index) => (
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
                                                    <Link to={`/shop/order/${order._id}`}>
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

export default RefundOrder;