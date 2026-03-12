import { brands } from "../../../static/data";



const Sponsored = () => {
    return (
        <div className="hidden md:block mx-4 md:mx-12 my-12">
            
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] text-center mb-6">
                Trusted Brands
            </p>

            
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-8 py-7">
                <div className="flex items-center justify-between gap-6">
                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center flex-1 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 cursor-default"
                        >
                            <img
                                src={brand.url}
                                alt={brand.name}
                                className="max-h-[40px] w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sponsored;