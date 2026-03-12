import { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { MdOutlineRefresh } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShopOrder } from '../../../redux/features/orderSlice';
import LoadingAnimation from '../../Loader/LoadingAnimation';

const STATUS_STYLES = {
    "Processing for Refund": "bg-orange-50 text-orange-600 border-orange-100",
    "Refund Success":         "bg-green-50 text-green-600 border-green-100",
    "Refund Rejected":        "bg-red-50 text-red-500 border-red-100",
};

const RefundOrder = () => {
    const { shopOrders, isShopOrderLoading } = useSelector(state => state.order);
    const { shop } = useSelector(state => state.shop);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(fetchShopOrder(shop.shop._id));
    }, [dispatch, shop]);

    useEffect(() => {
        const refundOrders = shopOrders?.orders?.filter(
            i => i?.status === "Processing for Refund" || i?.status === "Refund Success" || i?.status === "Refund Rejected"
        );
        setData(refundOrders || []);
    }, [shopOrders]);

    if (isShopOrderLoading) return <LoadingAnimation />;

    return (
        <div className="p-4 md:p-6 space-y-5">
            
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-xl font-black text-gray-900">Refund Orders</h1>
                    <p className="text-sm text-gray-400 mt-0.5">
                        {data.length} order{data.length !== 1 ? "s" : ""} requiring attention
                    </p>
                </div>
                <button
                    onClick={() => dispatch(fetchShopOrder(shop.shop._id))}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-500 hover:text-cyan-600 hover:border-cyan-200 text-sm font-semibold rounded-xl shadow-sm transition-all duration-200"
                >
                    <MdOutlineRefresh size={16} /> Refresh
                </button>
            </div>

            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-2">
                        <span className="text-4xl">✅</span>
                        <p className="text-sm font-semibold text-gray-400">No refund requests</p>
                        <p className="text-xs text-gray-300">All your orders are in good standing</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide border-b border-gray-100">
                                    <th className="px-5 py-3.5 text-left">Order ID</th>
                                    <th className="px-5 py-3.5 text-left">Status</th>
                                    <th className="px-5 py-3.5 text-left">Items</th>
                                    <th className="px-5 py-3.5 text-left">Total</th>
                                    <th className="px-5 py-3.5 text-left">Date</th>
                                    <th className="px-5 py-3.5 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data.map((order, index) => {
                                    const total = order.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0);
                                    const statusCls = STATUS_STYLES[order.status] || "bg-gray-50 text-gray-500 border-gray-100";
                                    return (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-150">
                                            <td className="px-5 py-4">
                                                <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg">
                                                    #{order._id.slice(-8).toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusCls}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 font-semibold text-gray-700">{order.cart.length}</td>
                                            <td className="px-5 py-4 font-bold text-gray-900">${total.toFixed(2)}</td>
                                            <td className="px-5 py-4 text-gray-400 text-xs">
                                                {order.createdAt?.slice(0, 10) || "—"}
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <Link to={`/shop/order/${order._id}`}>
                                                    <button className="flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:text-cyan-500 ml-auto transition-colors">
                                                        Details <FiArrowRight size={11} />
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            
            {data.some(o => o.status === "Processing for Refund") && (
                <div className="flex items-start gap-3 px-4 py-3.5 bg-orange-50 border border-orange-100 rounded-xl">
                    <span className="text-lg mt-0.5">⚠️</span>
                    <p className="text-xs text-orange-700 font-medium leading-relaxed">
                        You have pending refund requests. Go to <strong>Order Details</strong> to approve or reject each refund.
                        Approving will update inventory automatically.
                    </p>
                </div>
            )}
        </div>
    );
};

export default RefundOrder;