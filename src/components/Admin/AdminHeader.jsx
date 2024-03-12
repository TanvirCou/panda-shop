import { FaShopify, FaUserFriends } from 'react-icons/fa';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineEvent } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    const { user } = useSelector(state => state.user);

    return (
        <div className='w-full h-16 flex items-center justify-between px-5 md:px-8 shadow-md z-30 top-0 left-0 fixed'>
            <Link to="/">
                <div className='font-bold text-3xl cursor-pointer items-center font-[Poppins]
                text-gray-800'>
                    Panda-Shop
                </div>
            </Link>
            <div className='flex items-center'>
                <Link to="/admin/dashboard/all-shops" className='hidden md:block'>
                    <FaShopify size={28} color='black' className='mx-4' />
                </Link>
                <Link to="/admin/dashboard/all-events" className='hidden md:block'>
                    <MdOutlineEvent size={28} color='black' className='mx-4' />
                </Link>
                <Link to="/admin/dashboard/all-orders" className='hidden md:block'>
                    <FiShoppingBag size={28} color='black' className='mx-4' />
                </Link>
                <Link to="/admin/dashboard/all-products" className='hidden md:block'>
                    <FiPackage size={28} color='black' className='mx-4' />
                </Link>
                <Link to="/shop/dashboard/all-users" className='hidden md:block'>
                    <FaUserFriends size={28} color='black' className='mx-4' />
                </Link>
                <Link to={`/profile`}>
                    <img src={user?.user.avatar} alt="" className='w-10 h-10 rounded-full object-cover ml-4' />
                </Link>
            </div>
        </div>
    );
};

export default AdminHeader;