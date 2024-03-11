import React from 'react';
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSideBar from '../../components/Admin/AdminSidebar';
import AdminOrders from '../../components/Admin/AdminOrders';

const AdminAllOrders = () => {
    return (
        <div className='bg-gray-100 h-screen'>
            <AdminHeader />
            <div className='flex w-full'>
                <div className='w-[80px] md:w-[330px]'>
                    <AdminSideBar active={2} />
                </div>
                <div className='w-[80%] overflow-y-scroll h-[90vh] webkit'>
                    <AdminOrders />
                </div>
            </div>
        </div>
    );
};

export default AdminAllOrders;