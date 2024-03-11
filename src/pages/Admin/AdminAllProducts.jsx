import React from 'react';
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSideBar from '../../components/Admin/AdminSidebar';
import AdminProducts from '../../components/Admin/AdminProducts';

const AdminAllProducts = () => {
    return (
        <div className='bg-gray-100 h-screen'>
            <AdminHeader />
            <div className='flex w-full'>
                <div className='w-[80px] md:w-[330px]'>
                    <AdminSideBar active={5} />
                </div>
                <div className='w-[80%] overflow-y-scroll h-[90vh] webkit'>
                    <AdminProducts />
                </div>
            </div>
        </div>
    );
};

export default AdminAllProducts;