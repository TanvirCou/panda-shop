import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../../App.css";
import LoadingAnimation from '../../components/Loader/LoadingAnimation';
import AddressInfo from '../../components/Profile/AddressInfo';
import ChangePassword from '../../components/Profile/ChangePassword';
import OrderInfo from '../../components/Profile/OrderInfo';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileSidebar from '../../components/Profile/ProfileSidebar';
import RefundInfo from '../../components/Profile/RefundInfo';
import TrackOrderInfo from '../../components/Profile/TrackOrderInfo';
import Header from '../../components/Shared/Header/Header';
import { fetchOrder } from '../../redux/features/orderSlice';

const Profile = () => {
    const [active, setActive] = useState(1);
    const { isLoading, user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrder(user?.user._id));
    }, [user]);

    return (
        <>
            {isLoading ? <LoadingAnimation /> :
                <div className='bg-gray-50 h-screen overflow-hidden flex flex-col'>
                    <Header />
                    <div className='flex-1 overflow-hidden'>
                        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
                            <div className='flex gap-4 md:gap-6 h-full py-4 md:py-6 overflow-hidden'>
                                
                                <div className='flex-shrink-0 w-14 md:w-64 h-full'>
                                    <ProfileSidebar active={active} setActive={setActive} />
                                </div>
                                
                                <div className='flex-1 min-w-0 overflow-y-auto h-full pr-2 custom-scrollbar'>
                                    {active === 1 && <ProfileInfo />}
                                    {active === 2 && <OrderInfo />}
                                    {active === 3 && <RefundInfo />}
                                    {active === 4 && <TrackOrderInfo />}
                                    {active === 5 && <ChangePassword />}
                                    {active === 6 && <AddressInfo />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Profile;