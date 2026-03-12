import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { IoCardOutline, IoCashOutline, IoCheckmarkCircle, IoClose, IoLocationOutline, IoLogoPaypal } from 'react-icons/io5';
import LoadingAnimation from "../Loader/LoadingAnimation";

const PaymentMethodCard = ({ id, title, icon: Icon, description, isActive, onClick }) => (
    <div 
        onClick={onClick}
        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 relative group ${
            isActive 
            ? "border-emerald-500 bg-emerald-50/30 shadow-md shadow-emerald-100/50" 
            : "border-gray-100 hover:border-emerald-200 bg-white"
        }`}
    >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            isActive ? "bg-emerald-500 text-white" : "bg-gray-50 text-gray-400"
        }`}>
            <Icon size={24} />
        </div>
        <div className="flex-1">
            <p className={`font-black tracking-tight ${isActive ? "text-gray-900" : "text-gray-500"}`}>{title}</p>
            <p className="text-xs text-gray-400 font-medium">{description}</p>
        </div>
        {isActive && (
            <div className="absolute top-3 right-3 text-emerald-500">
                <IoCheckmarkCircle size={20} />
            </div>
        )}
    </div>
);

const Payment = ({ orderData, user, open, setOpen, onApprove, createOrder, paymentHandler, cashOnDelivery }) => {

    const [active, setActive] = useState(null);

    const stripeOptions = {
        style: {
            base: {
                fontSize: "15px",
                color: "#1f2937",
                fontFamily: "Inter, sans-serif",
                "::placeholder": {
                    color: "#9ca3af",
                },
            },
            invalid: {
                color: "#ef4444",
            },
        },
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            {!orderData ? <LoadingAnimation /> : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl shadow-gray-200/20">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <IoCardOutline size={22} />
                                </div>
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <PaymentMethodCard 
                                    id={1} 
                                    title="Debit / Credit Card" 
                                    icon={IoCardOutline} 
                                    description="Secure payment via Stripe"
                                    isActive={active === 1}
                                    onClick={() => setActive(1)}
                                />
                                <PaymentMethodCard 
                                    id={3} 
                                    title="Cash on Delivery" 
                                    icon={IoCashOutline} 
                                    description="Pay when you receive"
                                    isActive={active === 3}
                                    onClick={() => setActive(3)}
                                />
                            </div>

                            
                            {active === 1 && (
                                <div className="animate-in fade-in slide-in-from-top-4 duration-500 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-1.5 md:col-span-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Cardholder Name <span className="text-red-500">*</span></label>
                                            <input 
                                                type="text" 
                                                defaultValue={user?.user?.name}
                                                className="w-full h-11 px-4 bg-white border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 shadow-sm transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5 md:col-span-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Card Number</label>
                                            <div className="w-full h-11 px-4 bg-white border border-gray-100 rounded-xl flex items-center shadow-sm focus-within:border-emerald-500 transition-all">
                                                <CardNumberElement className="w-full" options={stripeOptions} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Expiration Date</label>
                                            <div className="w-full h-11 px-4 bg-white border border-gray-100 rounded-xl flex items-center shadow-sm focus-within:border-emerald-500 transition-all">
                                                <CardExpiryElement className="w-full" options={stripeOptions} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">CVC / CVV</label>
                                            <div className="w-full h-11 px-4 bg-white border border-gray-100 rounded-xl flex items-center shadow-sm focus-within:border-emerald-500 transition-all">
                                                <CardCvcElement className="w-full" options={stripeOptions} />
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={paymentHandler}
                                        className="w-full mt-8 h-12 bg-gray-900 hover:bg-black text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg transition-all active:scale-[0.98]"
                                    >
                                        Authorize Payment
                                    </button>
                                </div>
                            )}

                            
                            {active === 3 && (
                                <div className="animate-in fade-in slide-in-from-top-4 duration-500 bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 text-center">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <IoCashOutline size={32} />
                                    </div>
                                    <h4 className="text-lg font-black text-gray-900 mb-2">Cash on Delivery selected</h4>
                                    <p className="text-sm text-gray-500 font-medium mb-6">You will pay your total balance when the parcel is delivered to your doorstep.</p>
                                    <button 
                                        onClick={cashOnDelivery}
                                        className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-100 transition-all active:scale-[0.98]"
                                    >
                                        Confirm COD Order
                                    </button>
                                </div>
                            )}

                            
                            {open && (
                                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
                                    <div className="bg-white w-full max-w-md rounded-3xl p-6 relative shadow-2xl animate-in zoom-in-95 duration-200">
                                        <button 
                                            onClick={() => setOpen(false)}
                                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                                        >
                                            <IoClose size={20} />
                                        </button>
                                        <div className="mb-6">
                                            <IoLogoPaypal className="text-blue-600 mb-2" size={40} />
                                            <h3 className="text-xl font-black text-gray-900">PayPal Checkout</h3>
                                            <p className="text-sm text-gray-500 font-medium">Complete your purchase using PayPal</p>
                                        </div>
                                        <PayPalScriptProvider options={{ "client-id": "ARmcBNbGK01E-Dg0IBdUrxTvQXjfUwflz2x9ibfvOb5fRRTS5Te3U3cnHrJkQV7vigmUqE6ndm5rHfaG", components: "buttons" }}>
                                            <PayPalButtons style={{ layout: "vertical" }} onApprove={onApprove} createOrder={createOrder} />
                                        </PayPalScriptProvider>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-gray-200/20 sticky top-24">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6">Order Summary</h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Subtotal</span>
                                    <span className="text-sm font-black text-gray-900">${orderData?.subTotal?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Shipping</span>
                                    <span className="text-sm font-black text-gray-900">${orderData?.shipping?.toFixed(2)}</span>
                                </div>
                                {orderData?.discountPercentage > 0 && (
                                    <div className="flex justify-between items-center py-2 px-3 bg-emerald-50 rounded-xl">
                                        <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Discount</span>
                                        <span className="text-sm font-black text-emerald-600">−${orderData?.discountPercentage?.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="pt-4 border-t border-gray-100 flex justify-between items-end mb-6">
                                    <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Total Amount</span>
                                    <span className="text-2xl font-black text-emerald-600 tracking-tighter">${orderData?.totalPrice}</span>
                                </div>

                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <IoLocationOutline className="text-gray-400" size={16} />
                                        <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Deliver to</p>
                                    </div>
                                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                        {user?.user?.name}<br />
                                        Secure Delivery to your selected address
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;