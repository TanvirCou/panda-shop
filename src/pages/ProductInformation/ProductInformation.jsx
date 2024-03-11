import { useEffect, useState } from 'react';
import Header from '../../components/Shared/Header/Header';
import Footer from '../../components/Shared/Footer/Footer';
import ProductInfo from '../../components/ProductInformation/ProductInfo/ProductInfo';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductDetailsInfo from '../../components/ProductInformation/ProductDetailsInfo/ProductDetailsInfo';
import RelatedProducts from '../../components/ProductInformation/RelatedProducts/RelatedProducts';
import { useSelector } from 'react-redux';
import LoadingAnimation from '../../components/Loader/LoadingAnimation';

const ProductInformation = () => {
    const { allProducts, isProductLoading } = useSelector(state => state.product);
    const { allEvents, isEventLoading } = useSelector(state => state.event);

    const [data, setData] = useState();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const eventData = searchParams.get("isEvent");

    console.log(eventData);

    useEffect(() => {
        if (eventData !== null) {
            const product = allEvents && allEvents.allEvents.find((i) => i._id === id);
            setData(product);
        } else {
            const product = allProducts && allProducts.allProducts.find((i) => i._id === id);
            setData(product);
        }
    }, [allProducts, allEvents, id]);

    console.log(data);

    return (
        <div className='bg-white'>
            {
                isProductLoading || isEventLoading ? <LoadingAnimation /> :
                    <>
                        <Header />
                        <ProductInfo data={data} eventData={eventData} />
                        {
                            !eventData &&
                            <>
                                <ProductDetailsInfo data={data} />
                                <RelatedProducts data={data} />
                            </>
                        }
                        <Footer />
                    </>
            }

        </div>
    );
};

export default ProductInformation;