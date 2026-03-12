/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Ratings from '../../Shared/Ratings/Ratings';

const ProductDetailsInfo = ({ data }) => {
    const [active, setActive] = useState(1);
    const { allProducts } = useSelector(state => state.product);

    const totalProduct = allProducts?.allProducts.filter(i => i?.shopId === data?.shopId);
    const totalReview = totalProduct.reduce((acc, i) => acc + i?.reviews.length, 0);
    const shopTotalRating = totalProduct.reduce((acc, i) => acc + (i?.ratings ? i.ratings : 0), 0);
    const shopAvgRating = shopTotalRating / totalReview;

    const tabs = [
        { id: 1, label: "Description" },
        { id: 2, label: `Reviews (${data?.reviews?.length || 0})` },
        { id: 3, label: "Seller Info" },
    ];

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                
                <div className="border-b border-gray-100">
                    <div className="flex gap-1 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActive(tab.id)}
                                className={`relative flex-shrink-0 px-6 py-3.5 text-sm font-semibold transition-all duration-200 ${
                                    active === tab.id
                                        ? "text-emerald-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                {tab.label}
                                {active === tab.id && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                
                <div className="py-8">

                    
                    {active === 1 && (
                        <div className="max-w-3xl">
                            <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line">
                                {data?.description || "No description available."}
                            </p>
                        </div>
                    )}

                    
                    {active === 2 && (
                        <div className="space-y-6 max-w-3xl">
                            {data?.reviews?.length > 0 ? (
                                data.reviews.map((rev, index) => (
                                    <div key={index} className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                        <img
                                            src={rev?.user.avatar}
                                            alt={rev?.user.name}
                                            className="w-11 h-11 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between flex-wrap gap-2">
                                                <p className="font-semibold text-gray-900 text-sm">{rev?.user.name}</p>
                                                <Ratings rating={rev?.rating} />
                                            </div>
                                            <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                                                {rev?.comment}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-3xl">
                                    <p className="text-5xl mb-4">💬</p>
                                    <p className="font-semibold text-gray-700">No reviews yet</p>
                                    <p className="text-sm text-gray-400 mt-1">Be the first to review this product</p>
                                </div>
                            )}
                        </div>
                    )}

                    
                    {active === 3 && (
                        <div className="flex flex-col lg:flex-row gap-8">
                            
                            <div className="flex-1 flex flex-col gap-5">
                                <div className="flex items-center gap-4">
                                    <Link to={`/shop/${data?.shop._id}`} className="relative flex-shrink-0">
                                        <img
                                            src={data?.shop.avatar}
                                            alt={data?.shop.name}
                                            className="w-16 h-16 rounded-2xl object-cover shadow-md"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" />
                                    </Link>
                                    <div>
                                        <Link to={`/shop/${data?.shop._id}`}>
                                            <h3 className="font-bold text-gray-900 text-lg hover:text-emerald-600 transition-colors">
                                                {data?.shop.name}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-gray-500">
                                            {shopAvgRating ? `${shopAvgRating.toFixed(1)} / 5 rating` : "Verified Seller"}
                                        </p>
                                    </div>
                                </div>

                                {data?.shop.description && (
                                    <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                                        {data.shop.description}
                                    </p>
                                )}

                                <Link to={`/shop/${data?.shop._id}`}>
                                    <button className="px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-emerald-600 transition-colors">
                                        Visit Shop
                                    </button>
                                </Link>
                            </div>

                            
                            <div className="lg:w-72 grid grid-cols-2 gap-4 content-start">
                                {[
                                    { label: "Member Since", value: data?.shop.createdAt?.slice(0, 10) },
                                    { label: "Total Products", value: totalProduct?.length },
                                    { label: "Total Reviews", value: totalReview },
                                    { label: "Avg. Rating", value: shopAvgRating ? `${shopAvgRating.toFixed(1)} / 5` : "—" },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{stat.label}</p>
                                        <p className="text-base font-bold text-gray-900 mt-1">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsInfo;