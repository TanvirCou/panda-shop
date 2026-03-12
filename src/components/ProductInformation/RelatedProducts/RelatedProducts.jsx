/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import ProductCart from '../../Shared/ProductCart/ProductCart';

const RelatedProducts = ({ data }) => {
    const { allProducts } = useSelector(state => state.product);
    const products = allProducts && allProducts.allProducts.filter(
        i => i?.category === data?.category && i._id !== data?._id
    );

    if (!products || products.length === 0) return null;

    return (
        <div className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight whitespace-nowrap">
                        Related Products
                    </h2>
                    <div className="h-px bg-gray-200 flex-1" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
                    {products.map((i, index) => (
                        <ProductCart data={i} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;