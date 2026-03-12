import { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineEvent } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllEvent } from '../../redux/features/eventSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';

const EventStatusBadge = ({ status }) => {
    const isRunning = status === "Running";
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
            isRunning
                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                : "bg-gray-50 text-gray-500 border-gray-200"
        }`}>
            {status || "—"}
        </span>
    );
};

const AdminEvents = () => {
    const { allEvents, isEventLoading } = useSelector(state => state.event);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(fetchAllEvent());
    }, [dispatch]);

    if (isEventLoading) return <LoadingAnimation />;

    const events = allEvents?.allEvents || [];

    const filtered = events.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 md:p-6 space-y-5">
            
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md shadow-pink-200">
                    <MdOutlineEvent size={18} className="text-white" />
                </div>
                <div>
                    <h1 className="text-base font-black text-gray-900">All Events</h1>
                    <p className="text-xs text-gray-400 font-medium">{events.length} total events</p>
                </div>
            </div>

            
            <div className="relative max-w-md">
                <FiSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search by Event Name…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full h-10 pl-9 pr-4 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:border-pink-400 shadow-sm transition-all"
                />
            </div>

            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-2">
                        <span className="text-4xl text-gray-300 animate-bounce">🎪</span>
                        <p className="text-sm font-semibold text-gray-400">No events found</p>
                        <p className="text-xs text-gray-300">Try changing your search</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide border-b border-gray-100">
                                    <th className="px-5 py-3.5 text-left">#</th>
                                    <th className="px-5 py-3.5 text-left">Event</th>
                                    <th className="px-5 py-3.5 text-left">Price</th>
                                    <th className="px-5 py-3.5 text-left">Stock</th>
                                    <th className="px-5 py-3.5 text-left">Sold</th>
                                    <th className="px-5 py-3.5 text-left">Status</th>
                                    <th className="px-5 py-3.5 text-center">View</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((event, index) => (
                                    <tr key={index} className="hover:bg-gray-50/60 transition-colors duration-150">
                                        <td className="px-5 py-3.5 text-xs font-bold text-gray-400">{index + 1}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2.5">
                                                {event.images?.[0]?.url ? (
                                                    <img
                                                        src={event.images[0].url}
                                                        alt={event.name}
                                                        className="w-8 h-8 rounded-lg object-cover flex-shrink-0 ring-1 ring-gray-100"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-500 flex items-center justify-center flex-shrink-0">
                                                        <MdOutlineEvent size={14} />
                                                    </div>
                                                )}
                                                <p className="text-sm font-semibold text-gray-800 line-clamp-1 max-w-[160px]">{event.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 font-bold text-gray-900">
                                            ${event.discountPrice?.toFixed(2)}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`font-semibold text-sm ${event.stock === 0 ? 'text-red-500' : 'text-gray-700'}`}>
                                                {event.stock}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 font-semibold text-gray-600">
                                            {event.sold_out}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <EventStatusBadge status={event.status} />
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex justify-center">
                                                <Link to={`/product/${event._id}?isEvent=true`}>
                                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors duration-150">
                                                        <AiOutlineEye size={14} />
                                                    </button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminEvents;