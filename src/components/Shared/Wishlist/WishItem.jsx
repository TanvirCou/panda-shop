/* eslint-disable react/prop-types */
import { IoBagAddOutline } from "react-icons/io5";
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/features/cartSlice';
import { removeFromWishList } from '../../../redux/features/wishListSlice';

const WishItem = ({ data, setWishlistOpen }) => {
    const { wishList } = useSelector(state => state.wishList);
    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const addToCartHandler = (id) => {
        const isItemsExits = cart && cart.find(i => i._id === id);
        if (isItemsExits) {
            toast.error("Items is already in cart");
        } else {
            const cartData = { ...data, qty: 1 };
            dispatch(addToCart(cartData));
            localStorage.setItem("cartItems", JSON.stringify([...cart, cartData]));
            setWishlistOpen(false);
            toast.success("Item added to cart successfully");
        }
    };

    const handleRemoveFromWishList = (data) => {
        dispatch(removeFromWishList(data?._id));
    };

    localStorage.setItem("wishListItems", JSON.stringify([...wishList]));

    return (
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50/60 transition-colors duration-150">
            
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={data?.images[0]} alt={data?.name} className="w-full h-full object-cover" />
            </div>

            
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{data?.name}</p>
                <p className="text-sm font-bold text-emerald-600 mt-0.5">US${data?.originalPrice}</p>
            </div>

            
            <button
                onClick={() => addToCartHandler(data?._id)}
                title="Add to cart"
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white transition-all duration-200 flex-shrink-0"
            >
                <IoBagAddOutline size={17} />
            </button>

            
            <button
                onClick={() => handleRemoveFromWishList(data)}
                title="Remove"
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors duration-150 flex-shrink-0"
            >
                <RxCross2 size={14} />
            </button>
        </div>
    );
};

export default WishItem;