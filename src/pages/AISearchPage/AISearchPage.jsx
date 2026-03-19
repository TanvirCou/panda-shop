import axios from "axios";
import { useState } from "react";
import AIIntentFilters from "../../components/AISearch/AIIntentFilters";
import AIProductGrid from "../../components/AISearch/AIProductGrid";
import AIPromptField from "../../components/AISearch/AIPromptField";
import Footer from "../../components/Shared/Footer/Footer";
import Header from "../../components/Shared/Header/Header";

const AISearchPage = () => {
    const [products, setProducts] = useState(null);
    const [intent, setIntent] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!loading && prompt.trim()) {
                handleSubmit();
            }
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);
            setProducts([]);

            const res = await axios.post("https://panda-shop-server-production.up.railway.app/api/ai/search", { prompt });
            
            if (res.data.success) {
                setProducts(res.data.products);
                setIntent(res.data.intent);
            }
        } catch (error) {
            console.error("AI Search Error:", error.response?.data?.message);
            setError(error.response?.data?.message || "Something went wrong. The AI service may be temporarily unavailable or out of quota.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header activeHeading={2} />

            <div className="flex-1 w-full bg-gradient-to-br from-emerald-50 via-white to-teal-0 pt-24 md:pt-16 pb-20 mx-4 md:mx-12">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                            AI Shopping <span className="text-emerald-500">Assistant</span>
                        </h1>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Describe what you're looking for, and our AI will find the perfect products from our catalog.
                        </p>
                    </div>

                    <div className="mb-16">
                        <AIPromptField 
                            prompt={prompt} 
                            setPrompt={setPrompt} 
                            loading={loading} 
                            error={error} 
                            handleKeyDown={handleKeyDown} 
                            handleSubmit={handleSubmit} 
                        />
                    </div>

                    {!error && <AIIntentFilters intent={intent} loading={loading} />}

                    {!error && <AIProductGrid loading={loading} products={products} />}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AISearchPage;
