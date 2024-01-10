import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import { useParams } from 'react-router-dom';
import { productData } from '../../static/data';
import ProductDetailsInfo from '../../components/ProductDetailsInfo/ProductDetailsInfo';
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';

const ProductInformation = () => {
    const [data, setData] = useState();
    const {name} = useParams();
    const product_name = name.replace(/-/g, " ");
    
    useEffect(() => {
        const product = productData.find((i) => i.name === product_name);
        setData(product);
    }, []);

    return (
        <div className='bg-white'>
            <Header />
            <ProductInfo data={data}/>
            <ProductDetailsInfo data={data}/>
            <RelatedProducts data={data} />
            <Footer/>
        </div>
    );
};

export default ProductInformation;