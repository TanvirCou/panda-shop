/* eslint-disable react/prop-types */
import { FaCartPlus } from "react-icons/fa";
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishList } from '../../../redux/features/wishListSlice';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/features/cartSlice';

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
    }

    localStorage.setItem("wishListItems", JSON.stringify([...wishList]));

    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <RxCross2 className='cursor-pointer' onClick={() => handleRemoveFromWishList(data)} />

                <img src={data?.images[0]} alt="" className='w-16 h-16 object-cover mx-5' />

                <div>
                    <p className='text-sm font-medium'>{data?.name}</p>
                    <p className='font-medium text-red-600'>${data?.originalPrice}</p>
                </div>
                <div className='pl-2'>
                    <FaCartPlus size={22} onClick={() => addToCartHandler(data?._id)} className='cursor-pointer' />
                </div>
            </div>

        </div>
    );
};

export default WishItem;