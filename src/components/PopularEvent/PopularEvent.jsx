import React from 'react';
import EventCard from '../EventCard/EventCard';

const PopularEvent = () => {
    return (
        <div className='my-8'>
            <div className='px-[60px]'>
                <h1 className='text-xl font-semibold pb-4'>Popular Event</h1>
                <div className='w-full'>
                    <EventCard />
                </div>
            </div>
        </div>
    );
};

export default PopularEvent;