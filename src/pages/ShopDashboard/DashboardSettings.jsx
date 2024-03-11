import ShopSettings from '../../components/Shop/ShopDashboard/ShopSettings';
import DashboardHeader from '../../components/Shop/ShopDashboard/DashboardHeader';
import DashboardSideBar from '../../components/Shop/ShopDashboard/DashboardSideBar';

const DashboardSettings = () => {
    return (
        <div className='bg-gray-100 h-screen '>
            <DashboardHeader />
            <div className='flex w-full'>
                <div className='w-[80px] md:w-[330px]'>
                    <DashboardSideBar active={11} />
                </div>
                <div className='w-[80%] overflow-y-scroll h-[92vh] webkit'>
                    <ShopSettings />
                </div>
            </div>
        </div>
    );
};

export default DashboardSettings;