import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Faq from '../../components/Faq/Faq';

const FAQ = () => {
    return (
        <div className='bg-gray-100'>
            <Header activeHeading={5} />
            <Faq />
            <Footer />
        </div>
    );
};

export default FAQ;