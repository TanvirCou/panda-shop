import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Category from '../../components/Category/Category';
import BestDeal from '../../components/BestDeal/BestDeal';

const Home = () => {
    return (
        <div className='h-[2000px] bg-gray-100'>
            <Header activeHeading={1}/>
            <Hero />
            <Category />
            <BestDeal />
        </div>
    );
};

export default Home;