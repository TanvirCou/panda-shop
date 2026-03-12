/* eslint-disable react/prop-types */
import { IoCartOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/features/cartSlice';
import Countdown from './Countdown';

const EventCard = ({ data }) => {
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

    // Discount %
    const discountPct = data?.originalPrice && data?.discountPrice
        ? Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)
        : null;

    return (
        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="block lg:flex w-full">
                
                <div className="relative w-full lg:w-1/2 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-10 min-h-[280px]">
                    
                    <div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)', backgroundSize: '22px 22px' }}
                    />
                    {discountPct > 0 && (
                        <div className="absolute top-4 left-4 bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm z-10">
                            -{discountPct}% OFF
                        </div>
                    )}
                    <img
                        src={data?.images}
                        alt={data?.name}
                        className="relative z-10 max-h-[240px] w-auto object-contain drop-shadow-lg"
                    />
                </div>

                
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-8">
                    
                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Limited Time Offer
                    </div>

                    
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-snug mb-3">
                        {data?.name}
                    </h3>

                    
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                        {data?.description}
                    </p>

                    
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-3xl font-black text-gray-900">${data?.discountPrice}</span>
                        {data?.originalPrice && (
                            <span className="text-base text-gray-400 line-through font-medium">${data?.originalPrice}</span>
                        )}
                        <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full ml-1">
                            {data?.sold_out} sold
                        </span>
                    </div>

                    
                    <div className="my-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ends in</p>
                        <Countdown data={data} />
                    </div>

                    
                    <div className="flex items-center gap-3 mt-2">
                        <Link to={`/product/${data?._id}?isEvent=true`}>
                            <button className="px-5 py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200 active:scale-95">
                                See Details
                            </button>
                        </Link>
                        <button
                            onClick={() => addToCartHandler(data?._id)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-md"
                        >
                            <IoCartOutline size={17} />
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;