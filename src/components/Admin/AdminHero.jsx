import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllShop } from '../../redux/features/shopSlice';
import { fetchAdminOrder } from '../../redux/features/orderSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';
import { PiMoney } from 'react-icons/pi';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaShopify } from 'react-icons/fa';

const AdminHero = () => {
    const { allShops, allShopLoading } = useSelector(state => state.shop);
    const { allOrders, isAdminOrderLoading } = useSelector(state => state.order);
    const dispatch = useDispatch();
    // const [deliveredData, setDeliveredData] = useState([]);

    console.log(allOrders);

    const deliveredOrders = allOrders && allOrders?.orders.filter(i => i.status === "Delivered");

    const totalAmount = deliveredOrders?.reduce((acc, i) => acc + i.cart.reduce((acc, item) => acc + item.originalPrice, 0), 0);

    const adminCharge = totalAmount * 0.1;

    useEffect(() => {
        dispatch(fetchAllShop());
        dispatch(fetchAdminOrder());
    }, []);


    return (
        <>
            {
                allShopLoading && isAdminOrderLoading ? <LoadingAnimation /> :
                    <div className='py-4 px-6'>
                        <p className='text-xl font-semibold'>Overviews</p>

                        <div className='w-full block md:flex items-center justify-between my-4'>
                            <div className='w-full mb-3 md:mb-0 md:w-[30%] h-[25vh] bg-white shadow-sm rounded-md px-3 flex flex-col justify-center'>
                                <div className='flex items-center'>
                                    <PiMoney size={35} color='gray' />
                                    <p className='ml-3 text-gray-500 font-medium'>Total Balance</p>
                                </div>
                                <p className='mt-4 mb-3 text-2xl font-medium mx-10'>${adminCharge.toFixed(2)}</p>
                            </div>

                            <div className='w-full mb-3 md:mb-0 md:w-[30%] h-[25vh] bg-white shadow-sm rounded-md px-3 flex flex-col justify-center'>
                                <div className='flex items-center'>
                                    <FaShopify size={30} color='gray' />
                                    <p className='ml-3 text-gray-500 font-medium'>All Shops</p>
                                </div>
                                <p className='mt-4 mb-3 text-2xl font-medium mx-10'>{allShops?.shops.length}</p>
                                <Link to="/admin/dashboard/all-shops">
                                    <p className='mx-2 text-teal-600 font-medium'>View Shops</p>
                                </Link>
                            </div>

                            <div className='w-full mb-3 md:mb-0 md:w-[30%] h-[25vh] bg-white shadow-sm rounded-md px-3 flex flex-col justify-center'>
                                <div className='flex items-center'>
                                    <FiShoppingBag size={25} color='gray' />
                                    <p className='ml-3 text-gray-500 font-medium'>All Orders</p>
                                </div>
                                <p className='mt-4 mb-3 text-2xl font-medium mx-10'>{allOrders?.orders.length}</p>
                                <Link to="/admin/dashboard/all-orders">
                                    <p className='mx-2 text-teal-600 font-medium'>View Orders</p>
                                </Link>
                            </div>


                        </div>

                        <div className='mt-6'>
                            <p className='text-lg font-semibold'>Latest Orders</p>
                            <div className='w-full h-fit bg-white shadow-sm rounded-md px-4 py-5 mt-2'>


                                <div className='w-full'>
                                    <div className="overflow-x-auto">
                                        <table className="table table-zebra">
                                            <thead>
                                                <tr className="bg-gray-200 rounded-[4px]">
                                                    <th>Order id</th>
                                                    <th>Status</th>
                                                    <th>Items Qty</th>
                                                    <th>Total amount</th>
                                                    <th>Placed on</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allOrders?.orders.slice(0, 4).map((order, index) => (
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
                                                            <td>
                                                                {order?.createdAt.slice(0, 10)}
                                                            </td>
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

export default AdminHero;