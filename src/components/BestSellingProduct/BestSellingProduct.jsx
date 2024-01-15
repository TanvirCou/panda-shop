import React, { useEffect, useState } from 'react';
import { productData } from '../../static/data';
import ProductCart from '../Shared/ProductCart/ProductCart';

const BestSellingProduct = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const product = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
        setData(product);
       
    }, []);

    return (
        <div className='my-6'>
            <div className='px-[60px]'>
                <div className='grid grid-cols-1 gap-[15px] sm:grid-cols-2 sm:gap-[20px] md:grid-cols-3 md:gap-[20px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[25px]'>
                    {
                        data && data.map((i, index) => <ProductCart data={i} key={index}/>)
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default BestSellingProduct;