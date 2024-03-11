import React from 'react';
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminHero from '../../components/Admin/AdminHero';

const AdminDashboard = () => {
    return (
        <div className='bg-gray-100 h-screen'>
            <AdminHeader />
            <div className='flex w-full'>
                <div className='w-[80px] md:w-[330px]'>
                    <AdminSidebar active={1} />
                </div>
                <div className='w-[80%] overflow-y-scroll h-[90vh] webkit'>
                    <AdminHero />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;