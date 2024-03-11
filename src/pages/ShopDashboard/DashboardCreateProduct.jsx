import DashboardHeader from '../../components/Shop/ShopDashboard/DashboardHeader';
import DashboardSideBar from '../../components/Shop/ShopDashboard/DashboardSideBar';
import CreateProduct from '../../components/Shop/ShopDashboard/CreateProduct';

const DashboardCreateProduct = () => {
    return (
        <div className='bg-gray-100'>
            <DashboardHeader />
            <div className='flex w-full'>
                <div className='w-[80px] md:w-[330px]'>
                    <DashboardSideBar active={4} />
                </div>
                <div className='w-[80%]'>
                    <CreateProduct active={4} />
                </div>
            </div>
        </div>
    );
};

export default DashboardCreateProduct;