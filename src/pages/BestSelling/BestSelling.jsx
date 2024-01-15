import React from 'react';
import Header from '../../components/Shared/Header/Header';
import BestSellingProduct from '../../components/BestSellingProduct/BestSellingProduct';
import Footer from '../../components/Shared/Footer/Footer';

const BestSelling = () => {
    return (
        <div className='bg-gray-100'>
            <Header activeHeading={2}/>
            <BestSellingProduct />
            <Footer />
        </div>
    );
};

export default BestSelling;