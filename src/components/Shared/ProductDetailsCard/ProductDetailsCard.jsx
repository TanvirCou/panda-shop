/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { IoCartOutline, IoClose, IoHeart, IoHeartOutline, IoStar } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/features/cartSlice';
import { addToWishList, removeFromWishList } from '../../../redux/features/wishListSlice';

const ProductDetailsCard = ({ data, setOpen }) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);

    const { cart } = useSelector(state => state.cart);
    const { wishList } = useSelector(state => state.wishList);
    const { allProducts } = useSelector(state => state.product);
    const dispatch = useDispatch();

    const discount = data?.originalPrice
        ? Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)
        : null;

    const handleIncrementCount = () => setCount(prev => prev + 1);
    const handleDecrementCount = () => setCount(prev => (prev > 1 ? prev - 1 : prev));

    const addToCartHandler = (id) => {
        if (cart?.find(i => i._id === id)) {
            toast.error("Item is already in cart");
        } else if (data?.stock < count) {
            toast.error("Product stock limited");
        } else {
            const cartData = { ...data, qty: count };
            dispatch(addToCart(cartData));
            localStorage.setItem("cartItems", JSON.stringify([...cart, cartData]));
            toast.success("Item added to cart successfully");
        }
    };

    useEffect(() => {
        setClick(!!(wishList?.find(i => i._id === data._id)));
    }, [wishList, data]);

    const handleAddToWishList = (data) => {
        setClick(true);
        dispatch(addToWishList(data));
        localStorage.setItem("wishListItems", JSON.stringify([...wishList, data]));
    };

    const handleRemoveFromWishList = (data) => {
        setClick(false);
        dispatch(removeFromWishList(data?._id));
        const updated = wishList.filter(i => i._id !== data._id);
        localStorage.setItem("wishListItems", JSON.stringify(updated));
    };

    localStorage.setItem("wishListItems", JSON.stringify([...wishList]));

    const totalProduct = allProducts?.allProducts.filter(i => i?.shopId === data?.shopId) || [];
    const totalReview = totalProduct.reduce((acc, i) => acc + i?.reviews?.length, 0);
    const shopTotalRating = totalProduct.reduce((acc, i) => acc + (i?.ratings || 0), 0);
    const shopAvgRating = totalReview > 0 ? (shopTotalRating / totalReview).toFixed(1) : null;

    if (!data) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
            <div className="relative bg-white rounded-md md:rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">

                
                <button
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 z-10 w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <IoClose size={18} />
                </button>

                <div className="flex flex-col md:flex-row">
                    
                    <div className="w-full md:w-[45%] flex-shrink-0">
                        <div className="relative bg-gray-50 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden aspect-square">
                            <img
                                src={data.images[0]}
                                alt={data.name}
                                className="w-full h-full object-contain p-6"
                            />
                            {discount && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl">
                                    -{discount}%
                                </div>
                            )}
                        </div>

                        
                        <div className="p-5 border-t border-gray-100">
                            <Link to={`/shop/${data?.shop._id}`} className="flex items-center gap-3 group">
                                <img
                                    src={data.shop.avatar}
                                    alt={data.shop.name}
                                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100 group-hover:ring-emerald-200 transition-all"
                                />
                                <div>
                                    <p className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{data.shop.name}</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        {shopAvgRating ? (
                                            <>
                                                <IoStar size={11} className="text-amber-400" />
                                                <span className="text-xs text-gray-500 font-medium">{shopAvgRating}/5 · {totalReview} reviews</span>
                                            </>
                                        ) : (
                                            <span className="text-xs text-gray-400">No reviews yet</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            <p className="text-xs text-gray-400 mt-3 font-medium">
                                <span className="text-gray-700 font-bold">{data.sold_out}</span> sold
                            </p>
                        </div>
                    </div>

                    
                    <div className="flex-1 p-6 md:p-8 flex flex-col">
                        
                        <div className="mb-5">
                            <h2 className="text-xl font-bold text-gray-900 leading-snug mb-2 pr-10">{data.name}</h2>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{data.description}</p>
                        </div>

                        
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl font-bold text-gray-900">${data.discountPrice}</span>
                            {data.originalPrice && (
                                <span className="text-base text-gray-400 line-through font-medium">${data.originalPrice}</span>
                            )}
                            {discount && (
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">Save {discount}%</span>
                            )}
                        </div>

                        
                        <div className="mb-6">
                            <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-lg ${data.stock > 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                                {data.stock > 0 ? `✓ ${data.stock} in stock` : "Out of stock"}
                            </span>
                        </div>

                        
                        <div className="flex items-center justify-between mb-6">
                            
                            <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden">
                                <button
                                    onClick={handleDecrementCount}
                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold text-lg transition-colors"
                                >
                                    −
                                </button>
                                <span className="w-10 h-10 flex items-center justify-center text-sm font-bold text-gray-900 border-x border-gray-200">
                                    {count}
                                </span>
                                <button
                                    onClick={handleIncrementCount}
                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold text-lg transition-colors"
                                >
                                    +
                                </button>
                            </div>

                            
                            <button
                                onClick={() => click ? handleRemoveFromWishList(data) : handleAddToWishList(data)}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 ${
                                    click
                                        ? "bg-red-50 border-red-200 text-red-500"
                                        : "bg-gray-50 border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400"
                                }`}
                                title={click ? "Remove from wishlist" : "Add to wishlist"}
                            >
                                {click ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
                            </button>
                        </div>

                        
                        <button
                            onClick={() => addToCartHandler(data._id)}
                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200/50 mb-4"
                        >
                            <IoCartOutline size={20} />
                            Add to Cart
                        </button>

                        
                        <Link
                            to={`/product/${data._id}`}
                            onClick={() => setOpen(false)}
                            className="text-center text-xs font-semibold text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                            View full product details →
                        </Link>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ProductDetailsCard;