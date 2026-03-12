import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { faqData } from '../../static/data';

const Faq = () => {
    const [activeTab, setActiveTab] = useState(0);

    const toggleTab = (tab) => {
        if (activeTab === tab) {
            setActiveTab(0);
        } else {
            setActiveTab(tab);
        }
    };

    return (
        <div className="mx-4 md:mx-12 pt-[90px] md:pt-8 mb-12">
            
            <div className="flex items-center justify-between mb-10 pb-5 border-b border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                        Frequently Asked <span className="text-emerald-500">Questions</span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-1 font-medium">
                        Can&apos;t find what you&apos;re looking for? Feel free to contact us.
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                    <div className="h-1 w-20 bg-emerald-500 rounded-full" />
                    <div className="h-1 w-10 bg-emerald-300 rounded-full" />
                    <div className="h-1 w-5 bg-emerald-100 rounded-full" />
                </div>
            </div>

            
            <div className="max-w-3xl mx-auto space-y-3">
                {faqData && faqData.map((i, index) => (
                    <div
                        key={index}
                        className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${activeTab === i.id ? 'border-emerald-200 shadow-emerald-50' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                        <button
                            onClick={() => toggleTab(i.id)}
                            className="w-full flex items-center justify-between px-6 py-4 text-left"
                        >
                            <span className={`text-sm font-semibold pr-4 transition-colors duration-200 ${activeTab === i.id ? 'text-emerald-600' : 'text-gray-800'}`}>
                                {i.question}
                            </span>
                            <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${activeTab === i.id ? 'bg-emerald-500 text-white rotate-180' : 'bg-gray-100 text-gray-400'}`}>
                                <IoIosArrowDown size={16} />
                            </div>
                        </button>

                        
                        <div className={`transition-all duration-300 ${activeTab === i.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                            <div className="px-6 pb-5">
                                <div className="h-px bg-emerald-100 mb-4" />
                                <p className="text-sm text-gray-500 leading-relaxed">{i.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;