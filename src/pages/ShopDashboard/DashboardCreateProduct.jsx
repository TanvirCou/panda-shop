import CreateProduct from '../../components/Shop/ShopDashboard/CreateProduct';
import DashboardHeader from '../../components/Shop/ShopDashboard/DashboardHeader';
import DashboardSideBar from '../../components/Shop/ShopDashboard/DashboardSideBar';

const DashboardCreateProduct = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <DashboardHeader />
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-[58px] md:w-[220px] lg:w-[240px] flex-shrink-0 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
                    <DashboardSideBar active={4} />
                </aside>
                <main className="flex-1 overflow-y-auto h-[calc(100vh-60px)]">
                    <CreateProduct />
                </main>
            </div>
        </div>
    );
};

export default DashboardCreateProduct;