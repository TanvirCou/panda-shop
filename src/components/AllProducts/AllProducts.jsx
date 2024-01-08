import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productData } from '../../static/data';
import ProductCart from '../ProductCart/ProductCart';

const AllProducts = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");

    const [data, setData] = useState([]);

    useEffect(() => {
        if(categoryData === null) {
            const allProduct = productData && productData.sort((a, b) => a.total_sell - b.total_sell);
            setData(allProduct);
        }
        else {
           const categoryProduct = productData && productData.filter(p => p.category === categoryData);
           setData(categoryProduct); 
        }
    }, [categoryData])

    return (
        <div className='my-6'>
            <div className='px-[60px]'>
                <div className='grid grid-cols-1 gap-[15px] sm:grid-cols-2 sm:gap-[20px] md:grid-cols-3 md:gap-[20px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[25px]'>
                    {
                        data && data.map((i, index) => <ProductCart data={i} key={index}/>)
                    }
                    
                </div>
            </div>
            {data.length === 0 ? (
                    <div className='flex justify-center w-full py-32'>
                        <p className='text-2xl font-semibold text-gray-700'>No Products Found!</p>
                    </div>
                    ) : null}
        </div>
    );
};

export default AllProducts;