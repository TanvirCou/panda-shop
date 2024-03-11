import DashboardHeader from '../../components/Shop/ShopDashboard/DashboardHeader';
import DashboardSideBar from '../../components/Shop/ShopDashboard/DashboardSideBar';
import RefundOrder from '../../components/Shop/ShopDashboard/RefundOrder';

const DashboardRefunds = () => {
    return (
        <div className='bg-gray-100 h-screen'>
            <DashboardHeader />
            <div className='flex w-full'>
                <div className='w-[80px] md:w-[330px]'>
                    <DashboardSideBar active={10} />
                </div>
                <div className='w-[80%] overflow-y-scroll h-[90vh] webkit'>
                    <RefundOrder />
                </div>
            </div>
        </div>
    );
};

export default DashboardRefunds;