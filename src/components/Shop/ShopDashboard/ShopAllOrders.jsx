import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingAnimation from '../../Loader/LoadingAnimation';
import { fetchShopOrder } from '../../../redux/features/orderSlice';
import { Link } from 'react-router-dom';

const ShopAllOrders = () => {
    const { shopOrders, isShopOrderLoading } = useSelector(state => state.order);
    const { shop } = useSelector(state => state.shop);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchShopOrder(shop.shop._id));
    }, [dispatch, shop]);

    return (
        <>
            {
                isShopOrderLoading ? <LoadingAnimation /> :
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
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        shopOrders?.orders.map((order, index) => (
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

export default ShopAllOrders;