import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Category from '../../components/Category/Category';
import BestDeal from '../../components/BestDeal/BestDeal';
import Featured from '../../components/Featured/Featured';
import PopularEvent from '../../components/PopularEvent/PopularEvent';
import Sponsored from '../../components/Sponsored/Sponsored';
import Footer from '../../components/Footer/Footer';

const Home = () => {
    return (
        <div className=' bg-gray-100'>
            <Header activeHeading={1}/>
            <Hero />
            <Category />
            <BestDeal />
            <PopularEvent />
            <Featured />
            <Sponsored />
            <Footer />
        </div>
    );
};

export default Home;