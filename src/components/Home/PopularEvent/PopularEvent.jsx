import { useSelector } from 'react-redux';
import EventCard from '../../Shared/EventCard/EventCard';

const PopularEvent = () => {
    const { allEvents } = useSelector(state => state.event);

    return (
        <div className="mx-4 md:mx-12 my-12">
            
            <div className="flex items-center justify-between mb-7 pb-5 border-b border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                        Popular <span className="text-emerald-500">Event</span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-1 font-medium">
                        Limited-time offers — grab them before they&apos;re gone
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                    <div className="h-1 w-20 bg-emerald-500 rounded-full" />
                    <div className="h-1 w-10 bg-emerald-300 rounded-full" />
                    <div className="h-1 w-5 bg-emerald-100 rounded-full" />
                </div>
            </div>

            
            <div className="w-full">
                {allEvents && allEvents?.allEvents.length !== 0 && (
                    <EventCard data={allEvents && allEvents.allEvents[0]} />
                )}
                {allEvents && allEvents?.allEvents.length === 0 && (
                    <div className="h-[30vh] w-full flex flex-col justify-center items-center gap-3 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <span className="text-4xl">🎉</span>
                        <p className="text-base font-bold text-gray-700">No event found!</p>
                        <p className="text-sm text-gray-400">Check back later for exciting events</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularEvent;