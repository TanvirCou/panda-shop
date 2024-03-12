import AllProducts from '../../components/Products/AllProducts/AllProducts';
import Header from '../../components/Shared/Header/Header';
import Footer from '../../components/Shared/Footer/Footer';
import { useSelector } from 'react-redux';
import LoadingAnimation from '../../components/Loader/LoadingAnimation';
import { useEffect } from 'react';

const Products = () => {
    const { isProductLoading } = useSelector(state => state.product);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='bg-gray-100'>
            {
                isProductLoading ? <LoadingAnimation /> :
                    <>
                        <Header activeHeading={3} />
                        <AllProducts />
                        <Footer />
                    </>
            }

        </div>
    );
};

export default Products;