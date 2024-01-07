import React from 'react';
import { productData } from '../../static/data';
import ProductCart from '../ProductCart/ProductCart';

const BestDeal = () => {

    const sortedData = productData.sort((a, b) => b.total_sell - a.total_sell);
    const bestDealData = sortedData.slice(0, 5);
    return (
        <div className='my-8'>
            <div className='px-[60px]'>
                <h1 className='text-xl font-semibold pb-4'>Best Deal</h1>
                <div className='grid grid-cols-1 gap-[5px] sm:grid-cols-2 sm:gap-[10px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[25px]'>
                    {
                        bestDealData && bestDealData.map((i, index) => <ProductCart data={i} key={index}/>)
                    }
                </div>
            </div>
        </div>
    );
};

export default BestDeal;