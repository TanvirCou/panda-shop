import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ProfileSidebar from '../../components/Profile/ProfileSidebar';
import ProfileInfo from '../../components/Profile/ProfileInfo';

const Profile = () => {
    const [active, setActive] = useState(1);
    return (
        <div className='bg-gray-100'>
            <Header />
            <div className='flex px-12'>
                <div className='w-[30%]'>
                    <ProfileSidebar active={active} setActive={setActive}/>
                </div>
                <div className='w-[70%]'>
                    <ProfileInfo active={active}/>
                </div>
            </div>
        </div>
    );
};

export default Profile;