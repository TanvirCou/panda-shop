import DashboardHeader from '../../components/Shop/ShopDashboard/DashboardHeader';
import DashboardSideBar from '../../components/Shop/ShopDashboard/DashboardSideBar';
import DashboardHero from '../../components/Shop/ShopDashboard/DashboardHero';

const ShopDashboard = () => {
    return (
        <div className='bg-gray-100 h-screen'>
            <DashboardHeader />
            <div className='flex w-full'>
                <div className='w-[80px] md:w-[330px]'>
                    <DashboardSideBar active={1} />
                </div>
                <div className='w-[80%] overflow-y-scroll h-[90vh] webkit'>
                    <DashboardHero />
                </div>
            </div>
        </div>
    );
};

export default ShopDashboard;