import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ProfileSidebar from '../../components/Profile/ProfileSidebar';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import OrderInfo from '../../components/Profile/OrderInfo';
import RefundInfo from '../../components/Profile/RefundInfo';
import TrackOrderInfo from '../../components/Profile/TrackOrderInfo';
import PaymentInfo from '../../components/Profile/PaymentInfo';
import AddressInfo from '../../components/Profile/AddressInfo';

const Profile = () => {
    const [active, setActive] = useState(1);
    return (
        <div className='bg-gray-100'>
            <Header />
            <div className='flex md:px-12'>
                <div className='w-[20%] md:w-[30%] mt-20 md:mt-0'>
                    <ProfileSidebar active={active} setActive={setActive}/>
                </div>
                <div className='w-[80%] md:w-[70%]'>
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
                        active === 5 && <TrackOrderInfo />
                    }
                    {
                        active === 6 && <PaymentInfo />
                    }
                    {
                        active === 7 && <AddressInfo />
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;