import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaShopify } from "react-icons/fa";
import { FiEye, FiSearch, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAllShop } from "../../redux/features/shopSlice";
import LoadingAnimation from "../Loader/LoadingAnimation";

const AdminShops = () => {
    const { allShops, allShopLoading } = useSelector(state => state.shop);
    const [shopId, setShopId] = useState("");
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllShop());
    }, [dispatch]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete(
                `https://panda-shop-server-production.up.railway.app/api/shop/delete-shop/${shopId}`,
                { withCredentials: true }
            );
            toast.success(res.data.message);
            setOpen(false);
            dispatch(fetchAllShop());
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (allShopLoading) return <LoadingAnimation />;
    const shops = allShops?.shops || [];

    const filtered = shops.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 md:p-6 space-y-5">
            
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-md shadow-teal-200">
                    <FaShopify size={18} className="text-white" />
                </div>
                <div>
                    <h1 className="text-base font-black text-gray-900">All Shops</h1>
                    <p className="text-xs text-gray-400 font-medium">{shops.length} registered shops</p>
                </div>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3">
                
                <div className="relative flex-1 max-w-md">
                    <FiSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search by Shop Name or Email…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full h-10 pl-9 pr-4 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 shadow-sm transition-all"
                    />
                </div>
            </div>

            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-2">
                        <span className="text-4xl text-gray-300 animate-bounce">🏪</span>
                        <p className="text-sm font-semibold text-gray-400">No shops found</p>
                        <p className="text-xs text-gray-300">Try changing your search</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide border-b border-gray-100">
                                    <th className="px-5 py-3.5 text-left">#</th>
                                    <th className="px-5 py-3.5 text-left">Shop</th>
                                    <th className="px-5 py-3.5 text-left">Email</th>
                                    <th className="px-5 py-3.5 text-left">Joined</th>
                                    <th className="px-5 py-3.5 text-left">Balance</th>
                                    <th className="px-5 py-3.5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((shop, index) => (
                                    <tr key={index} className="hover:bg-gray-50/60 transition-colors duration-150">
                                        <td className="px-5 py-3.5 text-xs font-bold text-gray-400">{index + 1}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2.5">
                                                <img
                                                    src={shop?.avatar}
                                                    alt={shop.name}
                                                    className="w-8 h-8 rounded-lg object-cover flex-shrink-0 ring-1 ring-gray-100"
                                                />
                                                <p className="text-sm font-semibold text-gray-800">{shop.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-500 text-xs">{shop?.email}</td>
                                        <td className="px-5 py-3.5 text-gray-400 text-xs">{shop?.createdAt?.slice(0, 10)}</td>
                                        <td className="px-5 py-3.5">
                                            <span className="font-bold text-gray-800">${shop.availableBalance?.toFixed(2) || "0.00"}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link to={`/shop/${shop._id}`}>
                                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors duration-150">
                                                        <FiEye size={14} />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => { setOpen(true); setShopId(shop._id); }}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors duration-150"
                                                >
                                                    <AiOutlineDelete size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            
            {open && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <FiX size={16} />
                        </button>

                        <div className="flex flex-col items-center gap-4 text-center pt-2">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                                <AiOutlineDelete size={22} className="text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-base font-black text-gray-900">Delete Shop?</h3>
                                <p className="text-sm text-gray-400 mt-1">This action cannot be undone. All shop data will be permanently removed.</p>
                            </div>
                            <div className="flex gap-3 w-full mt-1">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 h-10 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-sm font-semibold text-white hover:from-red-400 hover:to-rose-400 transition-all shadow-md shadow-red-200"
                                >
                                    Delete Shop
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminShops;
