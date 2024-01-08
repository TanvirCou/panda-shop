import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import EventCard from '../../components/EventCard/EventCard';

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