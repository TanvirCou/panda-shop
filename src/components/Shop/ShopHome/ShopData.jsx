/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoCalendarOutline, IoChatbubbleOutline, IoGridOutline, IoStorefrontOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EventCard from '../../Shared/EventCard/EventCard';
import ProductCart from '../../Shared/ProductCart/ProductCart';
import Ratings from '../../Shared/Ratings/Ratings';

const TABS = [
    { id: 1, label: "Products", icon: IoGridOutline },
    { id: 2, label: "Events", icon: IoCalendarOutline },
    { id: 3, label: "Reviews", icon: IoChatbubbleOutline },
];

const ShopData = ({ products, events, id }) => {
    const [active, setActive] = useState(1);
    const { shop } = useSelector(state => state.shop);

    const allReviews = products?.products.map(i => i.reviews).flat() || [];
    const isOwner = shop?.shop?._id === id;

    return (
        <div className="w-full flex flex-col min-h-full">
            
            <div className="flex flex-col-reverse md:flex-row items-center justify-between mb-6 gap-3 ">
                <div className="flex gap-1 bg-gray-100/70 p-1 rounded-2xl">
                    {TABS.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActive(tab.id)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    active === tab.id
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                <Icon size={15} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {isOwner && (
                    <Link to="/shop/dashboard">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200">
                            <IoStorefrontOutline size={16} />
                            Dashboard
                        </button>
                    </Link>
                )}
            </div>

            
            {active === 1 && (
                <div>
                    {products?.products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                            {products.products.map((item, index) => (
                                <ProductCart data={item} key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-100 rounded-2xl">
                            <span className="text-4xl mb-3">🛍️</span>
                            <p className="font-semibold text-gray-400">No products yet</p>
                            <p className="text-sm text-gray-300 mt-1">This shop hasn't added any products</p>
                        </div>
                    )}
                </div>
            )}

            
            {active === 2 && (
                <div>
                    {events?.events.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {events.events.map((item, index) => (
                                <EventCard data={item} isEvent={true} key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-100 rounded-2xl">
                            <span className="text-4xl mb-3">📅</span>
                            <p className="font-semibold text-gray-400">No active events</p>
                            <p className="text-sm text-gray-300 mt-1">Check back later for promotions and events</p>
                        </div>
                    )}
                </div>
            )}

            
            {active === 3 && (
                <div>
                    {allReviews.length > 0 ? (
                        <div className="space-y-3">
                            {allReviews.map((review, index) => (
                                <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3">
                                    <img
                                        src={review?.user.avatar}
                                        alt={review?.user.name}
                                        className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 flex-wrap">
                                            <p className="text-sm font-bold text-gray-900">{review?.user.name}</p>
                                            <Ratings rating={review?.rating} />
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{review?.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-100 rounded-2xl">
                            <span className="text-4xl mb-3">⭐</span>
                            <p className="font-semibold text-gray-400">No reviews yet</p>
                            <p className="text-sm text-gray-300 mt-1">Be the first to leave a review</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShopData;