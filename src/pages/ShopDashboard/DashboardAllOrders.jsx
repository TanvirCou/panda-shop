import DashboardHeader from '../../components/Shop/ShopDashboard/DashboardHeader';
import DashboardSideBar from '../../components/Shop/ShopDashboard/DashboardSideBar';
import ShopAllOrders from '../../components/Shop/ShopDashboard/ShopAllOrders';

const DashboardAllOrders = () => {
    return (
        <div className='bg-gray-100 h-screen'>
            <DashboardHeader />
            <div className='flex w-full'>
                <div className='w-[80px] md:w-[330px]'>
                    <DashboardSideBar active={2} />
                </div>
                <div className='w-[80%] overflow-y-scroll h-[90vh] webkit'>
                    <ShopAllOrders />
                </div>
            </div>
        </div>
    );
};

export default DashboardAllOrders;