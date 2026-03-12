import { useEffect } from 'react';
import { FaShopify } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { PiMoney } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrder } from '../../redux/features/orderSlice';
import { fetchAllShop } from '../../redux/features/shopSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';
import AdminDashboardCharts from './AdminDashboardCharts';
import AdminDashboardStatus from './AdminDashboardStatus';
import AdminStatCard from './AdminStatCard';



const AdminHero = () => {
    const { allShops, allShopLoading } = useSelector(state => state.shop);
    const { allOrders, isAdminOrderLoading } = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllShop());
        dispatch(fetchAdminOrder());
    }, [dispatch]);

    if (isAdminOrderLoading || allShopLoading) return <LoadingAnimation />;

    const orders = allOrders?.orders || [];
    const shops  = allShops?.shops   || [];

    const deliveredOrders = orders.filter(i => i.status === 'Delivered');
    const totalSales = deliveredOrders.reduce(
        (acc, i) => acc + i.cart.reduce((a, item) => a + item.originalPrice, 0), 0
    );
    const adminCharge = totalSales * 0.1;

    return (
        <div className="p-4 md:p-6 space-y-6">
            
            <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 rounded-2xl p-5 md:p-6 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                />
                <div className="relative z-10">
                    <p className="text-indigo-200 text-sm font-medium">Welcome back 👋</p>
                    <h1 className="text-xl md:text-2xl font-black text-white mt-0.5">Admin Overview</h1>
                </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <AdminStatCard
                    icon={PiMoney}
                    iconBg="bg-gradient-to-br from-indigo-500 to-blue-500 shadow-md shadow-indigo-200"
                    label="Admin Revenue (10%)"
                    value={`$${adminCharge.toFixed(2)}`}
                />
                <AdminStatCard
                    icon={FaShopify}
                    iconBg="bg-gradient-to-br from-teal-500 to-emerald-500 shadow-md shadow-teal-200"
                    label="Total Shops"
                    value={shops.length}
                    linkTo="/admin/dashboard/all-shops"
                    linkLabel="View Shops"
                />
                <AdminStatCard
                    icon={FiShoppingBag}
                    iconBg="bg-gradient-to-br from-rose-500 to-pink-500 shadow-md shadow-rose-200"
                    label="Total Orders"
                    value={orders.length}
                    linkTo="/admin/dashboard/all-orders"
                    linkLabel="View Orders"
                />
            </div>

            
            <AdminDashboardCharts orders={orders} />

            
            <AdminDashboardStatus orders={orders} />
        </div>
    );
};

export default AdminHero;