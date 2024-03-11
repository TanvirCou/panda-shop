/* eslint-disable react/prop-types */
import ProductCart from '../../Shared/ProductCart/ProductCart';
import { useSelector } from 'react-redux';

const RelatedProducts = ({ data }) => {
    const { allProducts } = useSelector(state => state.product);
    const products = allProducts && allProducts.allProducts.filter(i => i?.category === data?.category && i._id !== data?._id);

    return (
        <div className='w-full bg-gray-100 mt-12'>
            <div className='px-12 py-6'>
                <p className='text-xl font-semibold pb-4'>Related Products</p>
                <div className='grid grid-cols-1 gap-[5px] sm:grid-cols-2 sm:gap-[10px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[25px]'>
                    {
                        products && products.map((i, index) => <ProductCart data={i} key={index} />)
                    }
                </div>
            </div>

        </div>
    );
};

export default RelatedProducts;