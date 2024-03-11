import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCart from '../../Shared/ProductCart/ProductCart';
import { useSelector } from 'react-redux';

const AllProducts = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");
    const { allProducts } = useSelector(state => state.product);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (categoryData === null) {
            const d = allProducts && allProducts.allProducts;
            setData(d);
        }
        else {
            const categoryProduct = allProducts && allProducts.allProducts.filter(p => p.category === categoryData);
            setData(categoryProduct);
        }
    }, [categoryData, allProducts])

    return (
        <div className='mt-16 mb-6 md:my-6'>
            <div className='px-[30px] md:px-[40px] lg:px-[60px]'>
                {data.length > 0 ?
                    <div className='grid grid-cols-1 gap-[15px] sm:grid-cols-2 sm:gap-[20px] md:grid-cols-3 md:gap-[20px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[25px]'>
                        {
                            data && data.map((i, index) => <ProductCart data={i} key={index} />)
                        }

                    </div> :
                    <div className='flex justify-center w-full py-32'>
                        <p className='text-2xl font-semibold text-gray-700'>No Products Found!</p>
                    </div>
                }
            </div>

        </div>
    );
};

export default AllProducts;