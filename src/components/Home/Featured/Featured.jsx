import { useSelector } from 'react-redux';
import ProductCart from '../../Shared/ProductCart/ProductCart';

const Featured = () => {
    const { allProducts } = useSelector(state => state.product);

    return (
        <div className="mx-4 md:mx-12 my-12">
            
            <div className="flex items-center justify-between mb-7 pb-5 border-b border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                        Featured <span className="text-emerald-500">Products</span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-1 font-medium">
                        Hand-picked items just for you
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                    <div className="h-1 w-20 bg-emerald-500 rounded-full" />
                    <div className="h-1 w-10 bg-emerald-300 rounded-full" />
                    <div className="h-1 w-5 bg-emerald-100 rounded-full" />
                </div>
            </div>

            
            {allProducts && allProducts.allProducts.length !== 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {allProducts?.allProducts.map((i, index) => <ProductCart data={i} key={index} />)}
                </div>
            ) : (
                <div className="h-[40vh] w-full flex flex-col justify-center items-center gap-3 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <span className="text-4xl">📦</span>
                    <p className="text-base font-bold text-gray-700">No products found!</p>
                    <p className="text-sm text-gray-400">Check back later for featured items</p>
                </div>
            )}
        </div>
    );
};

export default Featured;