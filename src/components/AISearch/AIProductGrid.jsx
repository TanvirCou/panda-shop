import ProductCart from "../Shared/ProductCart/ProductCart";

const AIProductGrid = ({ loading, products }) => {
    if (loading) {
        return (
            <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center py-12 sm:py-20">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-emerald-500 mb-4"></div>
                <p className="text-gray-500 font-medium text-sm sm:text-base">AI is hunting through the catalog...</p>
            </div>
        );
    }

    if (products === null) return null;

    return (
        <div className="mt-6 sm:mt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <span className="text-lg sm:text-xl">✨</span> AI Recommendations
            </h2>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-12 border-0">
                    {products.map((i, index) => (
                        <ProductCart data={i} key={index} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 sm:py-20 bg-white rounded-2xl border border-gray-100 shadow-sm mx-2 sm:mx-0">
                    <span className="text-3xl sm:text-4xl mb-3 sm:mb-4">🤖</span>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">No matching products found</h3>
                    <p className="text-gray-500 mt-2 text-sm sm:text-base text-center max-w-xs">Try adjusting your prompt or asking for something else.</p>
                </div>
            )}
        </div>
    );
};

export default AIProductGrid;
