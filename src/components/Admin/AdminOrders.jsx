import { useEffect, useState } from 'react';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrder } from '../../redux/features/orderSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';

const STATUS_COLORS = {
    "Processing":                       "bg-amber-50 text-amber-600 border-amber-200",
    "Transferred to delivery partner":  "bg-blue-50 text-blue-600 border-blue-200",
    "Shipping":                         "bg-blue-50 text-blue-600 border-blue-200",
    "Delivered":                        "bg-emerald-50 text-emerald-600 border-emerald-200",
    "Refund Success":                   "bg-green-50 text-green-600 border-green-200",
    "Refund Rejected":                  "bg-red-50 text-red-600 border-red-200",
};

const StatusBadge = ({ status }) => {
    const cls = STATUS_COLORS[status] || "bg-gray-50 text-gray-500 border-gray-200";
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cls}`}>
            {status}
        </span>
    );
};

const AdminOrders = () => {
    const { allOrders, isAdminOrderLoading } = useSelector(state => state.order);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        dispatch(fetchAdminOrder());
    }, [dispatch]);

    if (isAdminOrderLoading) return <LoadingAnimation />;

    const orders = allOrders?.orders || [];
    const statuses = ['All', ...new Set(orders.map(o => o.status))];

    const filtered = orders.filter(o => {
        const matchSearch = o._id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'All' || o.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className="p-4 md:p-6 space-y-5">
            
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-200">
                    <FiShoppingBag size={18} className="text-white" />
                </div>
                <div>
                    <h1 className="text-base font-black text-gray-900">All Orders</h1>
                    <p className="text-xs text-gray-400 font-medium">{orders.length} total orders</p>
                </div>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3">
                
                <div className="relative flex-1 max-w-md">
                    <FiSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search by Order ID…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full h-10 pl-9 pr-4 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 shadow-sm transition-all"
                    />
                </div>
                
                <div className="flex gap-1.5 flex-wrap">
                    {statuses.slice(0, 6).map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                                filterStatus === s
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
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
                        <span className="text-4xl text-gray-300 animate-bounce">📦</span>
                        <p className="text-sm font-semibold text-gray-400">No orders found</p>
                        <p className="text-xs text-gray-300">Try changing your search or filters</p>
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
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((order, index) => {
                                    const total = order.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0);
                                    return (
                                        <tr key={index} className="hover:bg-gray-50/60 transition-colors duration-150">
                                            <td className="px-5 py-3.5">
                                                <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg">
                                                    #{order._id.slice(-8).toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <StatusBadge status={order.status} />
                                            </td>
                                            <td className="px-5 py-3.5 font-semibold text-gray-700">
                                                {order.cart.length} item{order.cart.length !== 1 ? 's' : ''}
                                            </td>
                                            <td className="px-5 py-3.5 font-bold text-gray-900">
                                                ${total.toFixed(2)}
                                            </td>
                                            <td className="px-5 py-3.5 text-xs text-gray-400">
                                                {order?.createdAt?.slice(0, 10)}
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

export default AdminOrders;
