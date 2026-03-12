import { useEffect, useState } from 'react';
import { FiArrowRight, FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShopOrder } from '../../../redux/features/orderSlice';
import LoadingAnimation from '../../Loader/LoadingAnimation';

const STATUS_STYLES = {
    "Processing":                       "bg-amber-50 text-amber-600 border-amber-100",
    "Transferred to delivery partner":  "bg-blue-50 text-blue-600 border-blue-100",
    "Shipping":                         "bg-blue-50 text-blue-600 border-blue-100",
    "Received":                         "bg-teal-50 text-teal-600 border-teal-100",
    "On the way":                       "bg-indigo-50 text-indigo-600 border-indigo-100",
    "Delivered":                        "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Processing for Refund":            "bg-orange-50 text-orange-600 border-orange-100",
    "Refund Success":                   "bg-green-50 text-green-600 border-green-100",
    "Refund Rejected":                  "bg-red-50 text-red-600 border-red-100",
};

const StatusBadge = ({ status }) => {
    const cls = STATUS_STYLES[status] || "bg-gray-50 text-gray-500 border-gray-100";
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${cls} whitespace-nowrap`}>
            {status}
        </span>
    );
};

const ShopAllOrders = () => {
    const { shopOrders, isShopOrderLoading } = useSelector(state => state.order);
    const { shop } = useSelector(state => state.shop);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        dispatch(fetchShopOrder(shop.shop._id));
    }, [dispatch, shop]);

    const orders = shopOrders?.orders || [];
    const statuses = ['All', ...new Set(orders.map(o => o.status))];

    const filtered = orders.filter(o => {
        const matchSearch = o._id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'All' || o.status === filterStatus;
        return matchSearch && matchStatus;
    });

    if (isShopOrderLoading) return <LoadingAnimation />;

    return (
        <div className="p-4 md:p-6 space-y-5">
            
            <div>
                <h1 className="text-xl font-black text-gray-900">All Orders</h1>
                <p className="text-sm text-gray-400 mt-0.5">{orders.length} orders in your shop</p>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3">
                
                <div className="relative flex-1">
                    <FiSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search by Order ID…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full h-10 pl-9 pr-4 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 shadow-sm transition-all"
                    />
                </div>
                
                <div className="flex gap-1.5 flex-wrap">
                    {statuses.slice(0, 5).map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                                filterStatus === s
                                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-cyan-300 hover:text-cyan-600'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-2">
                        <span className="text-4xl">📭</span>
                        <p className="text-sm font-semibold text-gray-400">No orders found</p>
                        <p className="text-xs text-gray-300">Try changing your filters</p>
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
                                {filtered.map((order, index) => {
                                    const total = order.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0);
                                    return (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-150">
                                            <td className="px-5 py-4">
                                                <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg">
                                                    #{order._id.slice(-8).toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <StatusBadge status={order.status} />
                                            </td>
                                            <td className="px-5 py-4 font-semibold text-gray-700">
                                                {order.cart.length}
                                            </td>
                                            <td className="px-5 py-4 font-bold text-gray-900">
                                                ${total.toFixed(2)}
                                            </td>
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
        </div>
    );
};

export default ShopAllOrders;