import { AiOutlineGift } from 'react-icons/ai';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineEvent, MdOutlineMessage } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
    const { shop } = useSelector(state => state.shop);
    console.log(shop);

    return (
        <>
            {
                shop && shop?.shop &&

                <div className='w-full h-16 flex items-center justify-between px-5 md:px-8 shadow-md z-30 top-0 left-0 sticky'>
                    <Link to="/">
                        <div className='font-bold text-3xl cursor-pointer items-center font-[Poppins] 
                text-gray-800'>
                            Panda-Shop
                        </div>
                    </Link>
                    <div className='flex items-center'>
                        <Link to="/shop/dashboard/coupon-code" className='hidden md:block'>
                            <AiOutlineGift size={28} color='black' className='mx-4' />
                        </Link>
                        <Link to="/shop/dashboard/all-events" className='hidden md:block'>
                            <MdOutlineEvent size={28} color='black' className='mx-4' />
                        </Link>
                        <Link to="/shop/dashboard/orders" className='hidden md:block'>
                            <FiShoppingBag size={28} color='black' className='mx-4' />
                        </Link>
                        <Link to="/shop/dashboard/all-products" className='hidden md:block'>
                            <FiPackage size={28} color='black' className='mx-4' />
                        </Link>
                        <Link to="/dashboard-messages" className='hidden md:block'>
                            <MdOutlineMessage size={28} color='black' className='mx-4' />
                        </Link>
                        <Link to={`/shop/${shop?.shop?._id}`}>
                            <img src={shop.shop.avatar} alt="" className='w-10 h-10 rounded-full object-cover ml-4' />
                        </Link>
                    </div>
                </div>
            }
        </>
    );
};

export default DashboardHeader;