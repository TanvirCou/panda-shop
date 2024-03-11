import DashboardHeader from '../../components/Shop/ShopDashboard/DashboardHeader';
import DashboardSideBar from '../../components/Shop/ShopDashboard/DashboardSideBar';
import CreateEvent from '../../components/Shop/ShopDashboard/CreateEvent';

const DashboardCreateEvent = () => {
    return (
        <div className='bg-gray-100 overflow-hidden'>
            <DashboardHeader />
            <div className='flex w-full'>
                <div className='w-[80px] md:w-[330px]'>
                    <DashboardSideBar active={6} />
                </div>
                <div className='w-[80%] overflow-hidden'>
                    <CreateEvent />
                </div>
            </div>
        </div>
    );
};

export default DashboardCreateEvent;