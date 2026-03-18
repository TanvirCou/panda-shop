import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ShopLogin from '../../components/Shop/ShopAuth/ShopLogin';
import ShopRegister from '../../components/Shop/ShopAuth/ShopRegister';

const SELLER_FEATURES = [
    { icon: "🏪", text: "Set up your online store in minutes" },
    { icon: "📦", text: "Manage products, events & orders" },
    { icon: "💰", text: "Fast & secure payment withdrawals" },
    { icon: "📊", text: "Track sales with powerful analytics" },
];

const ShopAuth = () => {
    const [active, setActive] = useState(true);
    const { isShop, loading } = useSelector(state => state.shop);
    const navigate = useNavigate();

    useEffect(() => {
        if (isShop === true) {
            navigate(`/shop/dashboard`);
        }
    }, [isShop, loading]);

    return (
        <div className="fixed inset-0 w-full h-full flex overflow-hidden">
            
            <div className="hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col justify-between bg-gradient-to-br from-cyan-600 via-sky-500 to-cyan-700 p-12 relative overflow-hidden flex-shrink-0 h-full">
                
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

                
                <div className="relative z-10">
                    <Link to="/" className="text-2xl font-black text-white tracking-tight">
                        Panda<span className="text-cyan-100">Shop</span>
                        <span className="ml-2 text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-full align-middle">
                            Seller
                        </span>
                    </Link>
                </div>

                
                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight">
                        Grow your<br />
                        <span className="text-cyan-100">business online.</span>
                    </h2>
                    <p className="text-sky-100/80 text-base leading-relaxed max-w-xs">
                        Join thousands of sellers on PandaShop and reach millions of customers worldwide.
                    </p>

                    
                    <ul className="space-y-3 pt-2">
                        {SELLER_FEATURES.map((f) => (
                            <li key={f.text} className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 bg-white/15 rounded-lg text-base backdrop-blur-sm">
                                    {f.icon}
                                </span>
                                <span className="text-sm text-sky-50/90 font-medium">{f.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                
                <div className="relative z-10">
                    <p className="text-xs text-sky-200/60 font-medium">
                        © {new Date().getFullYear()} PandaShop · Seller Portal
                    </p>
                </div>
            </div>

            
            <div className="flex-1 h-full overflow-y-auto flex flex-col items-center bg-gray-50 px-6 py-12 sm:px-10">
                
                <div className="lg:hidden mb-8 text-center">
                    <Link to="/" className="text-2xl font-black text-gray-800 tracking-tight">
                        Panda<span className="text-cyan-500">Shop</span>
                        <span className="ml-2 text-xs font-bold bg-cyan-100 text-cyan-600 px-2 py-0.5 rounded-full align-middle">Seller</span>
                    </Link>
                </div>

                <div className="w-full max-w-[440px] my-auto">
                    
                    <div className="mb-7">
                        <h1 className="text-2xl text-center lg:text-left font-bold text-gray-900 tracking-tight">
                            {active ? "Welcome back, Seller" : "Open your store"}
                        </h1>
                        <p className="text-sm text-gray-400 mt-1 text-center lg:text-left">
                            {active
                                ? "Sign in to access your seller dashboard."
                                : "Fill in the details below to create your shop."}
                        </p>
                    </div>

                    
                    <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full mb-6" />

                    
                    <div className="flex bg-gray-100 rounded-xl p-1 mb-7 relative border border-gray-200">
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-white shadow-sm border border-gray-200 transition-all duration-300 ease-in-out ${active ? "left-1" : "left-[calc(50%+3px)]"}`}
                        />
                        <button
                            onClick={() => setActive(true)}
                            className={`relative z-10 w-1/2 py-2 text-[13px] font-semibold rounded-lg transition-colors duration-300 ${active ? "text-cyan-600" : "text-gray-400 hover:text-gray-600"}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setActive(false)}
                            className={`relative z-10 w-1/2 py-2 text-[13px] font-semibold rounded-lg transition-colors duration-300 ${!active ? "text-cyan-600" : "text-gray-400 hover:text-gray-600"}`}
                        >
                            Register
                        </button>
                    </div>

                    
                    {active ? <ShopLogin /> : <ShopRegister setActive={setActive} />}
                </div>
            </div>
        </div>
    );
};

export default ShopAuth;