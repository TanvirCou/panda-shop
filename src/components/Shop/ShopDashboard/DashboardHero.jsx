import { useEffect } from 'react';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { PiMoney } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../../../redux/features/productSlice';
import { fetchShopOrder } from '../../../redux/features/orderSlice';
import LoadingAnimation from '../../Loader/LoadingAnimation';

const DashboardHero = () => {
    const { products, isProductLoading } = useSelector(state => state.product);
    const { shop, loading } = useSelector(state => state.shop);
    const { shopOrders, isShopOrderLoading } = useSelector(state => state.order);
    const dispatch = useDispatch();
    // const [deliveredData, setDeliveredData] = useState([]);

    useEffect(() => {
        dispatch(fetchProduct(shop?.shop?._id));
        dispatch(fetchShopOrder(shop?.shop?._id));
    }, [dispatch, shop]);


    return (
        <>
            {
                (isProductLoading || isShopOrderLoading || loading) ? <LoadingAnimation /> :
                    <div className='py-4 px-6'>
                        <p className='text-xl font-semibold'>Overviews</p>

                        <div className='w-full block md:flex items-center justify-between my-4'>
                            <div className='w-full md:w-[30%] h-[25vh] mb-4 md:mb-0 bg-white shadow-sm rounded-md px-3 flex flex-col justify-center'>
                                <div className='flex items-center'>
                                    <PiMoney size={35} color='gray' />
                                    <p className='ml-3 text-gray-500 font-medium'>Account Balance <span className='text-sm'>(with 10% service charge)</span></p>
                                </div>
                                <p className='mt-4 mb-3 text-2xl font-medium mx-10'>${shop && shop?.shop?.availableBalance.toFixed(2)}</p>
                                <Link to="/shop/dashboard/withdraw-money">
                                    <p className='mx-2 text-teal-600 font-medium'>Withdraw Money</p>
                                </Link>
                            </div>

                            <div className='w-full md:w-[30%] h-[25vh] mb-4 md:mb-0 bg-white shadow-sm rounded-md px-3 flex flex-col justify-center'>
                                <div className='flex items-center'>
                                    <FiShoppingBag size={25} color='gray' />
                                    <p className='ml-3 text-gray-500 font-medium'>All Orders</p>
                                </div>
                                <p className='mt-4 mb-3 text-2xl font-medium mx-10'>{shopOrders?.orders.length}</p>
                                <Link to="/shop/dashboard/all-orders">
                                    <p className='mx-2 text-teal-600 font-medium'>View Orders</p>
                                </Link>
                            </div>

                            <div className='w-full md:w-[30%] h-[25vh] mb-4 md:mb-0 bg-white shadow-sm rounded-md px-3 flex flex-col justify-center'>
                                <div className='flex items-center'>
                                    <FiPackage size={30} color='gray' />
                                    <p className='ml-3 text-gray-500 font-medium'>All Products</p>
                                </div>
                                <p className='mt-4 mb-3 text-2xl font-medium mx-10'>{products?.products.length}</p>
                                <Link to="/shop/dashboard/all-products">
                                    <p className='mx-2 text-teal-600 font-medium'>View Products</p>
                                </Link>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <p className='text-lg font-semibold'>Latest Orders</p>
                            <div className='w-full h-fit bg-white shadow-sm rounded-md px-4 py-3 mt-2'>


                                <div className='w-full'>
                                    <div className="overflow-x-auto">
                                        <table className="table table-zebra">
                                            <thead>
                                                <tr className="bg-gray-200 rounded-[4px]">
                                                    <th>Order id</th>
                                                    <th>Status</th>
                                                    <th>Items Qty</th>
                                                    <th>Total</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    shopOrders?.orders.slice(0, 4).map((order, index) => (
                                                        <tr key={index} className='hover'>
                                                            <td>
                                                                {order._id}
                                                            </td>
                                                            <td>
                                                                {order.status}
                                                            </td>
                                                            <td>
                                                                {order?.cart.length}
                                                            </td>
                                                            <td>
                                                                ${order.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0)}
                                                            </td>
                                                            <th>
                                                                <Link to={`/shop/order/${order._id}`}>
                                                                    <button className="btn btn-ghost btn-xs">Details</button>
                                                                </Link>
                                                            </th>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
            }
        </>

    );
};

export default DashboardHero;