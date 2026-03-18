import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingAnimation from '../../components/Loader/LoadingAnimation';
import AllProducts from '../../components/Products/AllProducts/AllProducts';
import Footer from '../../components/Shared/Footer/Footer';
import Header from '../../components/Shared/Header/Header';

const Products = () => {
    const { isProductLoading } = useSelector(state => state.product);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    if (isProductLoading) return <LoadingAnimation />;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header activeHeading={4} />
            <AllProducts />
            <Footer />
        </div>
    );
};

export default Products;