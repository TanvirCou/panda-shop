import AdminHeader from '../../components/Admin/AdminHeader';
import AdminShops from '../../components/Admin/AdminShops';
import AdminSideBar from '../../components/Admin/AdminSidebar';

const AdminAllShops = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <AdminHeader />
            <div className="flex flex-1 overflow-hidden">
                <div className="w-[60px] md:w-[240px] flex-shrink-0 sticky top-[60px] h-[calc(100vh-60px)] overflow-hidden">
                    <AdminSideBar active={3} />
                </div>
                <main className="flex-1 overflow-y-auto h-[calc(100vh-60px)]">
                    <AdminShops />
                </main>
            </div>
        </div>
    );
};

export default AdminAllShops;