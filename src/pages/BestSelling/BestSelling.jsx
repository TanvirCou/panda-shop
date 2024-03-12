import { useEffect } from 'react';
import Header from '../../components/Shared/Header/Header';
import BestSellingProduct from '../../components/BestSellingProduct/BestSellingProduct';
import Footer from '../../components/Shared/Footer/Footer';
import { useSelector } from 'react-redux';
import LoadingAnimation from '../../components/Loader/LoadingAnimation';

const BestSelling = () => {
    const { isProductLoading } = useSelector(state => state.product);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='bg-gray-100'>
            {
                isProductLoading ? <LoadingAnimation /> :
                    <>
                        <Header activeHeading={2} />
                        <BestSellingProduct />
                        <Footer />
                    </>
            }
        </div>
    );
};

export default BestSelling;