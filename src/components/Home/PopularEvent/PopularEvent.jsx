import EventCard from '../../Shared/EventCard/EventCard';
import { useSelector } from 'react-redux';

const PopularEvent = () => {
    const { allEvents } = useSelector(state => state.event);


    return (
        <div className='my-8'>
            <div className='px-[30px] md:px-[40px] lg:px-[60px]'>
                <h1 className='text-xl font-semibold pb-4'>Popular Event</h1>
                <div className='w-full'>
                    {
                        allEvents && allEvents?.allEvents.length !== 0 && <EventCard data={allEvents && allEvents.allEvents[0]}/>
                    }
                    {
                        allEvents && allEvents?.allEvents.length === 0 && 
                        <div className='h-[20vh] w-full flex justify-center items-center'>
                            <p className='text-xl font-semibold'>No event found!</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default PopularEvent;