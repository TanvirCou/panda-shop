import { useEffect } from 'react';
import { FiArrowRight, FiPackage, FiShoppingBag } from 'react-icons/fi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { PiMoney } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShopOrder } from '../../../redux/features/orderSlice';
import { fetchProduct } from '../../../redux/features/productSlice';
import LoadingAnimation from '../../Loader/LoadingAnimation';
import ShopDashboardCharts from './ShopDashboardCharts';

const StatCard = ({ icon: Icon, iconBg, label, value, linkTo, linkLabel }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
                <Icon size={20} className="text-white" />
            </div>
        </div>
        <div>
            <p className="text-2xl font-black text-gray-900">{value}</p>
            <p className="text-xs font-medium text-gray-400 mt-0.5">{label}</p>
        </div>
        {linkTo && (
            <Link to={linkTo} className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:text-cyan-500 transition-colors mt-auto">
                {linkLabel} <FiArrowRight size={12} />
            </Link>
        )}
    </div>
);

const DashboardHero = () => {
    const { products, isProductLoading } = useSelector(state => state.product);
    const { shop, loading } = useSelector(state => state.shop);
    const { shopOrders, isShopOrderLoading } = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProduct(shop?.shop?._id));
        dispatch(fetchShopOrder(shop?.shop?._id));
    }, [dispatch, shop]);

    if (isProductLoading || isShopOrderLoading || loading) return <LoadingAnimation />;

    const orders = shopOrders?.orders || [];
    const refundCount = orders.filter(o => o.status?.startsWith("Refund")).length || 0;

    return (
        <div className="p-4 md:p-6 space-y-6">
            
            <div className="bg-gradient-to-r from-cyan-600 via-sky-500 to-cyan-500 rounded-2xl p-5 md:p-6 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                        <p className="text-sky-100 text-sm font-medium">Welcome back 👋</p>
                        <h1 className="text-xl md:text-2xl font-black text-white mt-0.5">{shop?.shop?.name}</h1>
                    </div>
                    <Link to="/shop/dashboard/create-product">
                        <button className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white text-sm font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-colors duration-200">
                            + Add Product
                        </button>
                    </Link>
                </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
                <StatCard
                    icon={PiMoney}
                    iconBg="bg-gradient-to-br from-cyan-500 to-sky-500 shadow-md shadow-cyan-200"
                    label="Available Balance"
                    value={`$${shop?.shop?.availableBalance.toFixed(2)}`}
                    linkTo="/shop/dashboard/withdraw-money"
                    linkLabel="Withdraw"
                />
                <StatCard
                    icon={FiShoppingBag}
                    iconBg="bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md shadow-emerald-200"
                    label="Total Orders"
                    value={orders.length}
                    linkTo="/shop/dashboard/all-orders"
                    linkLabel="View All"
                />
                <StatCard
                    icon={FiPackage}
                    iconBg="bg-gradient-to-br from-amber-400 to-orange-400 shadow-md shadow-amber-200"
                    label="Total Products"
                    value={products?.products.length ?? 0}
                    linkTo="/shop/dashboard/all-products"
                    linkLabel="View All"
                />
                <StatCard
                    icon={HiOutlineReceiptRefund}
                    iconBg="bg-gradient-to-br from-rose-500 to-pink-500 shadow-md shadow-rose-200"
                    label="Refunds"
                    value={refundCount}
                    linkTo="/shop/dashboard/refund-order"
                    linkLabel="View All"
                />
            </div>

            
            <ShopDashboardCharts orders={orders} />
        </div>
    );
};

export default DashboardHero;