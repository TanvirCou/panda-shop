/* eslint-disable react/prop-types */

const CheckoutBar = ({ active }) => {
    const steps = [
        { id: 1, name: "Shipping" },
        { id: 2, name: "Payment" },
        { id: 3, name: "Success" }
    ];

    return (
        <div className="w-full flex justify-center pt-24 pb-12 md:pt-16 md:pb-16 bg-gray-50">
            <div className="relative w-full max-w-xl px-4 flex justify-between items-center">
                
                <div className="absolute top-5 left-8 right-8 h-[2px] bg-gray-200 -z-0 rounded-full" />
                
                
                <div 
                    className="absolute top-5 left-8 h-[2px] bg-emerald-500 transition-all duration-700 ease-out -z-0 rounded-full"
                    style={{ 
                        width: active === 1 ? "0%" : active === 2 ? "50%" : "calc(100% - 64px)" 
                    }}
                />

                {steps.map((step) => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                        
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 border-2 ${
                            active >= step.id 
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200 scale-110" 
                            : "bg-white border-gray-200 text-gray-400"
                        }`}>
                            {active > step.id ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                step.id
                            )}
                        </div>

                        
                        <span className={`absolute -bottom-8 whitespace-nowrap text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
                            active >= step.id ? "text-gray-900" : "text-gray-400"
                        }`}>
                            {step.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckoutBar;