import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProduct } from '../../redux/features/productSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
    const { allProducts, isProductLoading } = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllProduct());
    }, []);

    return (
        <div>
            {
                isProductLoading ? <LoadingAnimation />
                    :

                    <div className='px-4 py-2 w-full'>
                        <p className='text-lg font-semibold py-2'>All Products</p>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className="bg-gray-200 rounded-[4px]">
                                        <th>Serial</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Sold out</th>
                                        <th>Preview</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allProducts && allProducts?.allProducts.map((product, index) => (
                                            <tr key={index} className=''>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {product.name}
                                                </td>
                                                <td>
                                                    {product.discountPrice}
                                                </td>
                                                <td>
                                                    {product.stock}
                                                </td>
                                                <td>
                                                    {product.sold_out}
                                                </td>
                                                <th>
                                                    <Link to={`/product/${product._id}`}>
                                                        <AiOutlineEye size={25} className='cursor-pointer' />
                                                    </Link>
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>
    );
};

export default AdminProducts;