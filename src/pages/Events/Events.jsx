import React from 'react';
import Header from '../../components/Shared/Header/Header';
import Footer from '../../components/Shared/Footer/Footer';
import EventCard from '../../components/Shared/EventCard/EventCard';

const Events = () => {
    return (
        <div>
            <Header activeHeading={4} />
            <EventCard />
            <EventCard />
            <Footer />
        </div>
    );
};

export default Events;