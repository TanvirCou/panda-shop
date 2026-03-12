import { IoArrowBackOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Complete = () => {
    return (
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-2xl shadow-emerald-100/50 max-w-lg w-full text-center">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce transition-all">
                    <IoCheckmarkCircle size={64} />
                </div>
                
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-4">Payment Successful!</h1>
                <p className="text-gray-500 font-medium mb-10 leading-relaxed px-4">
                    Thank you for your purchase! Your order has been placed successfully and is now being processed. We've sent a confirmation email to your inbox.
                </p>

                <div className="flex flex-col gap-4">
                    <Link 
                        to="/"
                        className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <IoArrowBackOutline size={20} />
                        Back to Shopping
                    </Link>
                </div>
            </div>

            
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-teal-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
        </div>
    );
};

export default Complete;