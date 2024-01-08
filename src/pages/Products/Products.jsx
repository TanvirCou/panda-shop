import React from 'react';
import AllProducts from '../../components/AllProducts/AllProducts';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Products = () => {
    return (
        <div className='bg-gray-100'>
            <Header activeHeading={3}/>
            <AllProducts />
            <Footer />
        </div>
    );
};

export default Products;