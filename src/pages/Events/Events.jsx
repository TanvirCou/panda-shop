import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingAnimation from '../../components/Loader/LoadingAnimation';
import EventCard from '../../components/Shared/EventCard/EventCard';
import Footer from '../../components/Shared/Footer/Footer';
import Header from '../../components/Shared/Header/Header';

const Events = () => {
    const { allEvents, isEventLoading } = useSelector(state => state.event);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    if (isEventLoading) return <LoadingAnimation />;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header activeHeading={4} />

            <div className="mx-4 md:mx-12 mt-[90px] md:mt-12 mb-12">
                
                <div className="flex items-center justify-between mb-8 pb-5 border-b border-gray-100">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                            All <span className="text-emerald-500">Events</span>
                        </h2>
                        <p className="text-sm text-gray-400 mt-1 font-medium">
                            Limited-time deals — grab them before they expire
                        </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5">
                        <div className="h-1 w-20 bg-emerald-500 rounded-full" />
                        <div className="h-1 w-10 bg-emerald-300 rounded-full" />
                        <div className="h-1 w-5 bg-emerald-100 rounded-full" />
                    </div>
                </div>

                
                {allEvents && allEvents?.allEvents.length !== 0 ? (
                    <div className="flex flex-col gap-6">
                        {allEvents.allEvents.map((i, index) => (
                            <EventCard key={index} data={i} />
                        ))}
                    </div>
                ) : (
                    <div className="h-[50vh] w-full flex flex-col justify-center items-center gap-3 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <span className="text-5xl">🎉</span>
                        <p className="text-lg font-bold text-gray-800">No events right now!</p>
                        <p className="text-sm text-gray-400">Check back soon — new events are added regularly.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Events;