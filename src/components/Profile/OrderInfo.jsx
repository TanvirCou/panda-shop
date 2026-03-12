import { IoBagCheckOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../Loader/LoadingAnimation';

const STATUS_STYLES = {
  "Delivered": "bg-emerald-50 text-emerald-700",
  "Processing": "bg-amber-50 text-amber-700",
  "Shipped": "bg-blue-50 text-blue-700",
  "Processing for Refund": "bg-orange-50 text-orange-700",
  "Refund Success": "bg-purple-50 text-purple-700",
};

const OrderInfo = () => {
    const { orders, isOrderLoading } = useSelector(state => state.order);

    if (isOrderLoading) return <LoadingAnimation />;

    const orderList = orders?.orders || [];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Orders</h2>

            {orderList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-100 rounded-2xl">
                    <IoBagCheckOutline size={48} className="text-gray-200 mb-3" />
                    <p className="font-semibold text-gray-400">No orders yet</p>
                    <p className="text-sm text-gray-300 mt-1">Your orders will appear here</p>
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
                                <th className="pb-3"></th>
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
                                        {order?.cart.length} {order?.cart.length === 1 ? "item" : "items"}
                                    </td>
                                    <td className="py-3.5 pr-4 font-bold text-gray-900">
                                        ${order.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0)}
                                    </td>
                                    <td className="py-3.5 text-right">
                                        <Link to={`/user/order/${order._id}`}>
                                            <button className="text-xs font-semibold text-gray-500 hover:text-emerald-600 bg-gray-100 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-all">
                                                View →
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

export default OrderInfo;