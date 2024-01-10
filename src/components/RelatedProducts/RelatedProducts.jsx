import React from 'react';
import { productData } from '../../static/data';
import ProductCart from '../ProductCart/ProductCart';

const RelatedProducts = ({data}) => {
    
    const products = productData && productData.filter(i => i.category === data?.category);

    return (
        <div className='w-full bg-gray-100 mt-12'>
            <div className='px-12 py-6'>
                <p className='text-xl font-semibold pb-4'>Related Products</p>
                <div className='grid grid-cols-1 gap-[5px] sm:grid-cols-2 sm:gap-[10px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[25px]'>
                    {
                        products && products.map((i, index) => <ProductCart data={i} key={index}/>)
                    }
                </div>
            </div>
            
        </div>
    );
};

export default RelatedProducts;