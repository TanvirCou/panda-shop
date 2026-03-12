/* eslint-disable react/prop-types */
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { IoBagHandleOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../../redux/features/cartSlice';
import SingleCart from './SingleCart';

const Cart = ({ setCartOpen }) => {
    const [isClosing, setIsClosing] = useState(false);
    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => setCartOpen(false), 300);
    };

    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data._id));
    };

    localStorage.setItem("cartItems", JSON.stringify([...cart]));

    const quantityChangeHandler = (data) => {
        dispatch(addToCart(data));
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);

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
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <IoBagHandleOutline size={18} className="text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Shopping Cart</p>
                            <p className="text-xs text-gray-400 font-medium">
                                {cart?.length || 0} {cart?.length === 1 ? 'item' : 'items'}
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

                {cart && cart.length === 0 ? (
                    /* ── Empty state ── */
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
                        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                            <IoBagHandleOutline size={30} className="text-gray-300" />
                        </div>
                        <p className="text-base font-bold text-gray-700">Your cart is empty</p>
                        <p className="text-sm text-gray-400 text-center">
                            Add items to your cart and they&apos;ll appear here.
                        </p>
                        <button
                            onClick={handleClose}
                            className="mt-2 text-sm font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
                        >
                            Continue Shopping →
                        </button>
                    </div>
                ) : (
                    <>
                        
                        <div className="flex-1 overflow-y-auto py-2">
                            {cart && cart.map((i, index) => (
                                <SingleCart
                                    data={i}
                                    key={index}
                                    quantityChangeHandler={quantityChangeHandler}
                                    removeFromCartHandler={removeFromCartHandler}
                                />
                            ))}
                        </div>

                        
                        <div className="border-t border-gray-100 p-5 space-y-4">
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Subtotal</span>
                                <span className="text-lg font-black text-gray-900">US${totalPrice.toFixed(2)}</span>
                            </div>

                            
                            <Link to="/checkout" state={{ subTotal: totalPrice }} onClick={handleClose}>
                                <button className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]">
                                    Checkout · US${totalPrice.toFixed(2)}
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};

export default Cart;