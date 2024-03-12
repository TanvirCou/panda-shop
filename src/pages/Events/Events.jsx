import Header from '../../components/Shared/Header/Header';
import Footer from '../../components/Shared/Footer/Footer';
import EventCard from '../../components/Shared/EventCard/EventCard';
import { useSelector } from 'react-redux';
import LoadingAnimation from '../../components/Loader/LoadingAnimation';
import { useEffect } from 'react';

const Events = () => {
    const { allEvents, isEventLoading } = useSelector(state => state.event);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            {
                isEventLoading ? <LoadingAnimation /> :
                    <div>
                        <Header activeHeading={4} />
                        {
                            allEvents && allEvents?.allEvents.length !== 0 && allEvents.allEvents.map((i, index) => <EventCard key={index} data={i} />)
                        }
                        {
                            allEvents && allEvents?.allEvents.length === 0 &&
                            <div className='h-[60vh] w-full flex justify-center items-center'>
                                <p className='text-xl font-semibold'>No event found!</p>
                            </div>
                        }

                        <Footer />
                    </div>
            }
        </>
    );
};

export default Events;