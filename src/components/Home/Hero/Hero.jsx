import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div
            className="relative min-h-[75vh] md:min-h-[82vh] mt-[60px] md:mt-0 w-full flex items-center overflow-hidden bg-cover bg-center md:bg-right"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&auto=format&fit=crop&q=80)" }}
        >
            
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent pointer-events-none" />

            
            <div className="absolute -left-24 top-[-20%] w-72 h-72 bg-emerald-100 opacity-20 rounded-full blur-3xl pointer-events-none" />

            
            <div className="relative z-10 w-[90%] md:w-[55%] lg:w-[45%] px-6 md:px-16 py-12">


                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-4">
                    Quality Goods<br />
                    <span className="text-emerald-500">Modern Living</span>
                </h1>

                <p className="text-gray-500 text-base leading-relaxed max-w-md mb-8">
                    Discover curated collections from premium global brands designed to elevate your modern shopping experience.
                </p>

                
                <div className="flex flex-wrap items-center gap-3">
                    <Link to="/products">
                        <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200">
                            Shop Now
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </Link>

                </div>

                
                <div className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-gray-200/60">
                    {[
                        { value: "10K+", label: "Products" },
                        { value: "98%", label: "Satisfaction" },
                        { value: "Free", label: "Delivery" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-xl font-extrabold text-gray-900">{stat.value}</p>
                            <p className="text-xs text-gray-400 font-medium mt-0.5">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;