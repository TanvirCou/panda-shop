import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BestSellingProduct from '../../components/BestSellingProduct/BestSellingProduct';
import LoadingAnimation from '../../components/Loader/LoadingAnimation';
import Footer from '../../components/Shared/Footer/Footer';
import Header from '../../components/Shared/Header/Header';

const BestSelling = () => {
    const { isProductLoading } = useSelector(state => state.product);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    if (isProductLoading) return <LoadingAnimation />;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header activeHeading={3} />
            <BestSellingProduct />
            <Footer />
        </div>
    );
};

export default BestSelling;