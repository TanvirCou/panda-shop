import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../../redux/features/productSlice';
import LoadingAnimation from '../../Loader/LoadingAnimation';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { toast } from "react-toastify";
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardProducts = () => {
    const { products, isProductLoading } = useSelector(state => state.product);
    const { shop } = useSelector(state => state.shop);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProduct(shop.shop._id));
    }, [dispatch, shop]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/product/delete-product/${id}`, { withCredentials: true });
            toast.success(res.data.message);
            console.log(res.data);
            dispatch(fetchProduct(shop?.shop._id));
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        // dispatch(deleteProduct(id));
        // window.location.reload();
    }

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
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products && products?.products.map((product, index) => (
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
                                                <th>
                                                    <AiOutlineDelete size={25} className='cursor-pointer' onClick={() => handleDelete(product._id)} />
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

export default DashboardProducts;