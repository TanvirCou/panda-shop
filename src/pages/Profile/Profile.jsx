import { useEffect, useState } from 'react';
import Header from '../../components/Shared/Header/Header';
import ProfileSidebar from '../../components/Profile/ProfileSidebar';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import OrderInfo from '../../components/Profile/OrderInfo';
import RefundInfo from '../../components/Profile/RefundInfo';
import TrackOrderInfo from '../../components/Profile/TrackOrderInfo';
import AddressInfo from '../../components/Profile/AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import LoadingAnimation from '../../components/Loader/LoadingAnimation';
import ChangePassword from '../../components/Profile/ChangePassword';
import { fetchOrder } from '../../redux/features/orderSlice';
import "../../App.css"

const Profile = () => {
    const [active, setActive] = useState(1);
    const { isLoading, user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrder(user?.user._id));
    }, [user]);

    return (
        <>
            {
                isLoading ? <LoadingAnimation /> :
                    <div className='bg-gray-100 h-screen'>
                        <Header />
                        <div className='flex md:px-12'>
                            <div className='w-[20%] md:w-[30%] mt-20 md:mt-0'>
                                <ProfileSidebar active={active} setActive={setActive} />
                            </div>
                            <div className='w-[80%] md:w-[70%] mt-20 md:mt-0 overflow-y-scroll h-[90vh] md:h-[76vh] webkit'>
                                {
                                    active === 1 && <ProfileInfo />
                                }
                                {
                                    active === 2 && <OrderInfo />
                                }
                                {
                                    active === 3 && <RefundInfo />
                                }
                                {
                                    active === 4 && <TrackOrderInfo />
                                }
                                {
                                    active === 5 && <ChangePassword />
                                }
                                {
                                    active === 6 && <AddressInfo />
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default Profile;