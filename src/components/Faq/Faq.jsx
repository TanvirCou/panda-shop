import React, { useState } from 'react';
import { faqData } from '../../static/data';
import { RxCross2 } from 'react-icons/rx';
import { IoIosArrowDown } from 'react-icons/io';

const Faq = () => {
    const [activeTab, setActiveTab] = useState(0);

    const toggleTab = (tab) => {
        if(activeTab === tab) {
            setActiveTab(0);
        } else {
            setActiveTab(tab);
        }
    };

    return (
        <div className='my-4'>
            <div className='px-8'>
                <p className='text-2xl font-semibold pb-2'>FAQ</p>
                <div>
                    {faqData && faqData.map((i, index) => (
                        <div key={index} className='bg-white text-gray-500 cursor-pointer rounded border-b border-gray-200'>
                            <button onClick={() => toggleTab(i.id)} className='w-full flex items-center justify-between p-3 my-0.5 rounded-md'>
                                <span className='font-medium'>{i.question}</span>
                                {activeTab === i.id ? <RxCross2 size={20}/> : <IoIosArrowDown size={22}/> }
                            </button>
                            {
                                activeTab === i.id && <div className='p-2 px-3'>
                                <p className='text-base text-gray-600'>{i.answer}</p>
                            </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;