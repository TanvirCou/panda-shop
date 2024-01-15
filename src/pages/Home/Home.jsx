import React from 'react';
import Header from '../../components/Shared/Header/Header';
import Hero from '../../components/Home/Hero/Hero';
import Category from '../../components/Home/Category/Category';
import BestDeal from '../../components/Home/BestDeal/BestDeal';
import Featured from '../../components/Home/Featured/Featured';
import PopularEvent from '../../components/Home/PopularEvent/PopularEvent';
import Sponsored from '../../components/Home/Sponsored/Sponsored';
import Footer from '../../components/Shared/Footer/Footer';

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