/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty, IoMdStar, IoMdStarOutline } from "react-icons/io";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/features/cartSlice';
import { addToWishList, removeFromWishList } from '../../../redux/features/wishListSlice';
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard';

const ProductCart = ({ data, isEvent }) => {
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
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
            toast.success("Item added to cart successfully");
        }
    };

    useEffect(() => {
        if (wishList && wishList.find(i => i._id === data._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishList, data])

    const handleAddToWishList = (data) => {
        setClick(!click);
        dispatch(addToWishList(data));
        localStorage.setItem("wishListItems", JSON.stringify([...wishList, data]));
        // toast.success("Item added to wishlist successfully");
    }

    const handleRemoveFromWishList = (data) => {
        setClick(!click);
        dispatch(removeFromWishList(data?._id));
        // toast.success("Item remove from wishlist successfully");
    }

    localStorage.setItem("wishListItems", JSON.stringify([...wishList]));

    // Discount %
    const discountPct = data.originalPrice && data.discountPrice && data.originalPrice > data.discountPrice
        ? Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)
        : null;

    return (
        <div
            className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 overflow-hidden flex flex-col"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            
            {discountPct > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm pointer-events-none">
                    -{discountPct}%
                </div>
            )}

            
            <div className={`absolute top-3 right-3 z-10 flex flex-col gap-1.5 transition-all duration-300 ${hovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <button
                    onClick={() => click ? handleRemoveFromWishList(data) : handleAddToWishList(data)}
                    title={click ? 'Remove from wishlist' : 'Add to wishlist'}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md border border-gray-100 transition-colors duration-200 ${click ? 'bg-rose-50 text-rose-500' : 'bg-white text-gray-400 hover:text-rose-500 hover:bg-rose-50'}`}
                >
                    {click ? <IoMdHeart size={17} /> : <IoMdHeartEmpty size={17} />}
                </button>
                <button
                    onClick={() => setOpen(!open)}
                    title="Quick view"
                    className="w-8 h-8 rounded-xl flex items-center justify-center bg-white text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 shadow-md border border-gray-100 transition-colors duration-200"
                >
                    <IoEyeOutline size={17} />
                </button>
                <button
                    onClick={() => addToCartHandler(data?._id)}
                    title="Add to cart"
                    className="w-8 h-8 rounded-xl flex items-center justify-center bg-white text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 shadow-md border border-gray-100 transition-colors duration-200"
                >
                    <IoCartOutline size={17} />
                </button>
            </div>

            
            <Link to={isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}>
                <div className="h-[200px] w-full flex items-center justify-center bg-gray-50 px-6 pt-5 pb-3 group-hover:bg-emerald-50/30 transition-colors duration-300">
                    <img
                        src={data.images ? data.images[0] : ""}
                        alt={data.name}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            </Link>

            
            <div className="px-4 pt-3 pb-4 flex flex-col flex-1 gap-1.5">
                
                <Link to={`/shop/${data?.shop._id}`}>
                    <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider hover:text-emerald-500 transition-colors duration-150">
                        {data.shop.name}
                    </p>
                </Link>

                
                <Link to={isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}>
                    <p className="text-sm font-semibold text-gray-800 leading-snug hover:text-emerald-600 transition-colors duration-150 line-clamp-2">
                        {data.name.length > 45 ? data.name.slice(0, 45) + " ...." : data.name}
                    </p>
                </Link>

                
                <div className="flex items-center gap-0.5">
                    <IoMdStar size={14} className="text-amber-400" />
                    <IoMdStar size={14} className="text-amber-400" />
                    <IoMdStar size={14} className="text-amber-400" />
                    <IoMdStar size={14} className="text-amber-400" />
                    <IoMdStarOutline size={14} className="text-amber-400" />
                    <span className="text-[10px] text-gray-400 ml-1 font-medium">(4.5)</span>
                </div>

                
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-bold text-gray-900">
                            ${data.originalPrice === 0 ? data.originalPrice : data.discountPrice}
                        </span>
                        {data.originalPrice ? (
                            <span className="text-xs text-gray-400 line-through font-medium">
                                ${data.originalPrice}
                            </span>
                        ) : null}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {data.sold_out} sold
                    </span>
                </div>
            </div>

            
            <button
                onClick={() => addToCartHandler(data?._id)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold tracking-wide transition-all duration-300 ${hovered ? 'opacity-100 max-h-12' : 'opacity-0 max-h-0 overflow-hidden py-0'}`}
            >
                <IoCartOutline size={15} />
                ADD TO CART
            </button>

            {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
    );
};

export default ProductCart;