const AIIntentFilters = ({ intent, loading }) => {
    if (loading || !intent || Object.keys(intent).length === 0) return null;

    return (
        <div className="mb-8 flex items-center justify-center flex-wrap gap-3 text-sm animate-fade-in-up">
            <span className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-gray-700 font-semibold tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Filters:
            </span>
            {intent.category && <span className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full font-medium shadow-sm">Category: {intent.category}</span>}
            {intent.keywords?.map(kw => <span key={kw} className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-full shadow-sm">"{kw}"</span>)}
            {intent.minPrice !== null && intent.minPrice !== undefined && <span className="px-4 py-2 bg-teal-50 text-teal-700 border border-teal-100 rounded-full font-medium shadow-sm">Over ${intent.minPrice}</span>}
            {intent.maxPrice !== null && intent.maxPrice !== undefined && <span className="px-4 py-2 bg-teal-50 text-teal-700 border border-teal-100 rounded-full font-medium shadow-sm">Under ${intent.maxPrice}</span>}
        </div>
    );
};

export default AIIntentFilters;
