import { useEffect, useState } from 'react';
// import { productData } from '../../../static/data';
import ProductCart from '../../Shared/ProductCart/ProductCart';
import { useSelector } from 'react-redux';

const BestDeal = () => {
    const { allProducts } = useSelector(state => state.product);
    const [data, setData] = useState([]);

    useEffect(() => {
        const allProductsData = allProducts.allProducts ? [...allProducts.allProducts] : [];
        const sortedData = allProductsData && allProductsData.sort((a, b) => b.sold_out - a.sold_out);
        const bestDealData = sortedData && sortedData.slice(0, 5);
        setData(bestDealData);
    }, [allProducts]);

    return (
        <div className='my-8'>
            <div className='px-[30px] md:px-[40px] lg:px-[60px]'>
                <h1 className='text-xl font-semibold pb-4'>Best Deal</h1>
                <div className='grid grid-cols-1 gap-[5px] sm:grid-cols-2 sm:gap-[10px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[25px]'>
                    {
                        data && data.length !== 0 && data.map((i, index) => <ProductCart data={i} key={index} />)
                    }
                    {
                        data && data.length === 0 &&
                        <div className='h-[60vh] w-full flex justify-center items-center'>
                            <p className='text-xl font-semibold'>No products found!</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default BestDeal;