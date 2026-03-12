import { useState } from 'react';
import { IoStorefrontOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
    const { shop } = useSelector(state => state.shop);
    const [notifOpen, setNotifOpen] = useState(false);

    if (!shop?.shop) return null;

    return (
        <div className="w-full h-[60px] bg-gradient-to-r from-cyan-600 via-sky-500 to-cyan-500 flex items-center justify-between px-4 md:px-8 sticky top-0 z-[100] shadow-lg shadow-cyan-900/20">
            
            <Link to="/" className="flex items-center gap-2">
                <span className="text-lg font-black text-white tracking-tight">
                    Panda<span className="text-cyan-100">Shop</span>
                    <span className="ml-2 text-[10px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded-full align-middle">Seller</span>
                </span>
            </Link>

            
            <div className="flex items-center gap-2 md:gap-3">
                
                <Link
                    to={`/shop/${shop.shop._id}`}
                    title="View Public Shop"
                    className="flex w-9 h-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                >
                    <IoStorefrontOutline size={18} />
                </Link>

                
                <div className="block w-px h-6 bg-white/20 mx-1" />

                
                <Link to={`/shop/${shop.shop._id}`} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl overflow-hidden border-2 border-white/30">
                        <img src={shop.shop.avatar} alt={shop.shop.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="hidden md:block">
                        <p className="text-xs font-bold text-white leading-tight">{shop.shop.name}</p>
                        <p className="text-[10px] text-sky-100">Seller</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DashboardHeader;