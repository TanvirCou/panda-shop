import React from 'react';
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSideBar from '../../components/Admin/AdminSidebar';
import AllWithdraw from '../../components/Admin/AllWithdraw';

const AdminWithdrawRequest = () => {
    return (
        <div className='bg-gray-100 h-screen'>
            <AdminHeader />
            <div className='flex w-full'>
                <div className='w-[80px] md:w-[330px]'>
                    <AdminSideBar active={7} />
                </div>
                <div className='w-[80%] overflow-y-scroll h-[90vh] webkit'>
                    <AllWithdraw />
                </div>
            </div>
        </div>
    );
};

export default AdminWithdrawRequest;