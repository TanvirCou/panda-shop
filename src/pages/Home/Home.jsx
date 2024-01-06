import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';

const Home = () => {
    return (
        <div className='h-[1000px]'>
            <Header activeHeading={1}/>
            <Hero />
        </div>
    );
};

export default Home;