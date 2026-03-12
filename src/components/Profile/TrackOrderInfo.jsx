import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrder } from '../../redux/features/orderSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';

const STATUS_STYLES = {
    "Delivered": "bg-emerald-50 text-emerald-700",
    "Processing": "bg-amber-50 text-amber-700",
    "Shipped": "bg-blue-50 text-blue-700",
    "Shipping": "bg-blue-50 text-blue-700",
    "Processing for Refund": "bg-orange-50 text-orange-700",
    "Refund Success": "bg-purple-50 text-purple-700",
    "On the way": "bg-cyan-50 text-cyan-700",
    "Received": "bg-teal-50 text-teal-700",
    "Transferred to delivery partner": "bg-indigo-50 text-indigo-700",
};

const TrackOrderInfo = () => {
    const { orders, isOrderLoading } = useSelector(state => state.order);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrder(user.user._id));
    }, [dispatch, user]);

    if (isOrderLoading) return <LoadingAnimation />;

    const orderList = orders?.orders || [];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Track Orders</h2>

            {orderList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-100 rounded-2xl">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 text-2xl">📦</div>
                    <p className="font-semibold text-gray-400">No orders to track</p>
                    <p className="text-sm text-gray-300 mt-1">Your orders will appear here once placed</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide pb-3 pr-4">Order ID</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide pb-3 pr-4">Status</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide pb-3 pr-4">Items</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide pb-3 pr-4">Total</th>
                                <th className="pb-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orderList.map((order, index) => (
                                <tr key={index} className="group hover:bg-gray-50/70 transition-colors">
                                    <td className="py-3.5 pr-4 font-mono text-xs text-gray-500 truncate max-w-[120px]">
                                        #{order._id.slice(-8).toUpperCase()}
                                    </td>
                                    <td className="py-3.5 pr-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3.5 pr-4 font-medium text-gray-900">
                                        {order.cart.length} {order.cart.length === 1 ? "item" : "items"}
                                    </td>
                                    <td className="py-3.5 pr-4 font-bold text-gray-900">
                                        ${order.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0)}
                                    </td>
                                    <td className="py-3.5 text-right">
                                        <Link to={`/user/track-order/${order._id}`}>
                                            <button className="text-xs font-semibold text-gray-500 hover:text-emerald-600 bg-gray-100 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-all">
                                                Track →
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TrackOrderInfo;