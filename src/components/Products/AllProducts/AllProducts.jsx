import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductCart from '../../Shared/ProductCart/ProductCart';

const AllProducts = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");
    const { allProducts } = useSelector(state => state.product);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (categoryData === null) {
            const d = allProducts && allProducts.allProducts;
            setData(d);
        } else {
            const categoryProduct = allProducts && allProducts.allProducts.filter(p => p.category === categoryData);
            setData(categoryProduct);
        }
    }, [categoryData, allProducts])

    return (
        <div className="mx-4 md:mx-12 pt-[90px] md:pt-8 mb-12">
            
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                        {categoryData
                            ? <><span className="text-emerald-500">{categoryData}</span> Products</>
                            : <>All <span className="text-emerald-500">Products</span></>
                        }
                    </h2>
                    <p className="text-sm text-gray-400 mt-1 font-medium">
                        {categoryData
                            ? `Showing all products in "${categoryData}"`
                            : `${data?.length || 0} products available`
                        }
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                    <div className="h-1 w-20 bg-emerald-500 rounded-full" />
                    <div className="h-1 w-10 bg-emerald-300 rounded-full" />
                    <div className="h-1 w-5 bg-emerald-100 rounded-full" />
                </div>
            </div>

            
            {data && data.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {data.map((i, index) => <ProductCart data={i} key={index} />)}
                </div>
            ) : (
                <div className="h-[50vh] w-full flex flex-col justify-center items-center gap-3 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <span className="text-5xl">📦</span>
                    <p className="text-lg font-bold text-gray-800">No Products Found!</p>
                    <p className="text-sm text-gray-400">
                        {categoryData ? `No products in "${categoryData}" yet.` : "Check back later for new arrivals."}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AllProducts;