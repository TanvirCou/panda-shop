import React from 'react';
import AllProducts from '../../components/Products/AllProducts/AllProducts';
import Header from '../../components/Shared/Header/Header';
import Footer from '../../components/Shared/Footer/Footer';

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