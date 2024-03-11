import DashboardHeader from '../../components/Shop/ShopDashboard/DashboardHeader';
import DashboardSideBar from '../../components/Shop/ShopDashboard/DashboardSideBar';
import WithdrawMoney from '../../components/Shop/ShopDashboard/WithdrawMoney';

const DashboardWithdraw = () => {
    return (
        <div className='bg-gray-100 h-screen'>
            <DashboardHeader />
            <div className='flex w-full'>
                <div className='w-[80px] md:w-[330px]'>
                    <DashboardSideBar active={7} />
                </div>
                <div className='w-[80%]'>
                    <WithdrawMoney />
                </div>
            </div>
        </div>
    );
};

export default DashboardWithdraw;