/* eslint-disable react/prop-types */
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { IoHeartOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import WishItem from './WishItem';

const Wishlist = ({ setWishlistOpen }) => {
    const [isClosing, setIsClosing] = useState(false);
    const { wishList } = useSelector(state => state.wishList);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => setWishlistOpen(false), 300);
    };

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150]"
            onClick={handleClose}
        >
            
            <div
                className={`absolute top-0 right-0 h-full w-[85%] sm:w-[380px] bg-white shadow-2xl flex flex-col ${isClosing ? 'drawer-slide-out' : 'drawer-slide-in'}`}
                onClick={(e) => e.stopPropagation()}
            >
                
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
                            <IoHeartOutline size={17} className="text-rose-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Wishlist</p>
                            <p className="text-xs text-gray-400 font-medium">
                                {wishList?.length || 0} {wishList?.length === 1 ? 'item' : 'items'} saved
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                        <RxCross2 size={17} />
                    </button>
                </div>

                {wishList && wishList.length === 0 ? (
                    /* ── Empty state ── */
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
                        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                            <IoHeartOutline size={30} className="text-gray-300" />
                        </div>
                        <p className="text-base font-bold text-gray-700">Your wishlist is empty</p>
                        <p className="text-sm text-gray-400 text-center">
                            Save items you love and come back to them later.
                        </p>
                        <button
                            onClick={handleClose}
                            className="mt-2 text-sm font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
                        >
                            Browse Products →
                        </button>
                    </div>
                ) : (
                    /* ── Items list ── */
                    <div className="flex-1 overflow-y-auto py-2">
                        {wishList && wishList.map((i, index) => (
                            <WishItem data={i} key={index} setWishlistOpen={handleClose} />
                        ))}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default Wishlist;