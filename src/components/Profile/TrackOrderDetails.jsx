import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOrder } from '../../redux/features/orderSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';

const TRACK_STEPS = [
    {
        status: "Processing",
        label: "Order Placed",
        description: "Your order has been received and is being processed at our shop.",
        icon: "🛒",
    },
    {
        status: "Transferred to delivery partner",
        label: "Handed to Partner",
        description: "Your order has been transferred to our delivery partner.",
        icon: "🤝",
    },
    {
        status: "Shipping",
        label: "Shipped",
        description: "Your package is on the way with our delivery partner.",
        icon: "🚚",
    },
    {
        status: "Received",
        label: "Near You",
        description: "Your order has arrived in your city and is awaiting final delivery.",
        icon: "📍",
    },
    {
        status: "On the way",
        label: "Out for Delivery",
        description: "Our delivery person is on their way to your address.",
        icon: "🏃",
    },
    {
        status: "Delivered",
        label: "Delivered",
        description: "Your order has been successfully delivered. Enjoy!",
        icon: "✅",
    },
];

const REFUND_STEPS = [
    {
        status: "Processing for Refund",
        label: "Refund Requested",
        description: "Your refund request has been received and is being processed.",
        icon: "📤",
    },
    {
        status: "Refund Success",
        label: "Refund Complete",
        description: "Your refund has been processed successfully.",
        icon: "💰",
    },
];

const TrackOrderDetails = () => {
    const { orders, isOrderLoading } = useSelector(state => state.order);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        dispatch(fetchOrder(user.user._id));
    }, [dispatch, user]);

    useEffect(() => {
        const found = orders?.orders.find(i => i._id === id);
        setData(found);
    }, [id, orders]);

    if (isOrderLoading) return <LoadingAnimation />;

    const isRefund = data?.status === "Processing for Refund" || data?.status === "Refund Success";
    const steps = isRefund ? REFUND_STEPS : TRACK_STEPS;
    const currentIndex = steps.findIndex(s => s.status === data?.status);
    const currentStep = steps[currentIndex] || steps[0];

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pt-[calc(64px+2rem)]">

                
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors"
                >
                    ← Back
                </button>

                
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Tracking Order</p>
                            <h1 className="text-xl font-bold text-gray-900">#{id?.slice(-10).toUpperCase()}</h1>
                            {data && (
                                <p className="text-sm text-gray-500 mt-1">{data.cart.length} item{data.cart.length !== 1 ? "s" : ""} · ${data.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0)}</p>
                            )}
                        </div>
                        {data && (
                            <span className={`self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                                isRefund ? "bg-orange-50 text-orange-700" : currentIndex === steps.length - 1 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                            }`}>
                                {currentStep?.icon} {data.status}
                            </span>
                        )}
                    </div>
                </div>

                
                {data && currentStep && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl flex-shrink-0">
                                {currentStep.icon}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-1">{currentStep.label}</h2>
                                <p className="text-sm text-gray-500">{currentStep.description}</p>
                            </div>
                        </div>
                    </div>
                )}

                
                {data && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-6">Order Timeline</h3>
                        <div className="space-y-0">
                            {steps.map((step, index) => {
                                const isDone = index <= currentIndex;
                                const isCurrent = index === currentIndex;
                                const isLast = index === steps.length - 1;
                                return (
                                    <div key={step.status} className="flex gap-4">
                                        
                                        <div className="flex flex-col items-center">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 border-2 transition-all duration-300 ${
                                                isDone
                                                    ? isCurrent
                                                        ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200"
                                                        : "bg-emerald-100 border-emerald-200 text-emerald-700"
                                                    : "bg-white border-gray-200 text-gray-300"
                                            }`}>
                                                {isDone && !isCurrent ? "✓" : step.icon}
                                            </div>
                                            {!isLast && (
                                                <div className={`w-0.5 my-1 flex-1 min-h-[2rem] ${isDone && index < currentIndex ? "bg-emerald-200" : "bg-gray-100"}`} />
                                            )}
                                        </div>
                                        
                                        <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                                            <p className={`text-sm font-bold ${isDone ? "text-gray-900" : "text-gray-300"}`}>{step.label}</p>
                                            <p className={`text-xs mt-0.5 ${isDone ? "text-gray-500" : "text-gray-300"}`}>{step.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {!data && !isOrderLoading && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                        <p className="text-gray-400 font-semibold">Order not found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrderDetails;