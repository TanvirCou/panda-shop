import { useEffect } from 'react';
import Faq from '../../components/Faq/Faq';
import Footer from '../../components/Shared/Footer/Footer';
import Header from '../../components/Shared/Header/Header';

const FAQ = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header activeHeading={5} />
            <Faq />
            <Footer />
        </div>
    );
};

export default FAQ;