import { IoNotificationsOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    const { user } = useSelector(state => state.user);

    return (
        <div className="w-full h-[60px] bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 flex items-center justify-between px-4 md:px-8 sticky top-0 z-[100] shadow-lg shadow-indigo-900/20">
            
            <Link to="/" className="flex items-center gap-2.5">
                <span className="text-lg font-black text-white tracking-tight">
                    Panda<span className="text-indigo-200">Shop</span>
                    <span className="ml-2 text-[10px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded-full align-middle">Admin</span>
                </span>
            </Link>

            
            <div className="flex items-center gap-2 md:gap-3">
                
                <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors duration-200">
                    <IoNotificationsOutline size={18} />
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-400 rounded-full border-2 border-indigo-600" />
                </button>

                
                <div className="hidden md:block w-px h-6 bg-white/20 mx-1" />

                
                <Link to="/profile" className="flex items-center gap-2.5">
                    {user?.user?.avatar ? (
                        <img
                            src={user.user.avatar}
                            alt={user.user.name}
                            className="w-8 h-8 rounded-xl object-cover border-2 border-white/30"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center text-sm font-black">
                            A
                        </div>
                    )}
                    <div className="hidden md:flex flex-col">
                        <p className="text-xs font-bold text-white leading-tight">{user?.user?.name || "Admin"}</p>
                        <p className="text-[10px] text-indigo-200">Administrator</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminHeader;