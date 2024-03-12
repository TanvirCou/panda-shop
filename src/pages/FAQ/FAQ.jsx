import Header from '../../components/Shared/Header/Header';
import Footer from '../../components/Shared/Footer/Footer';
import Faq from '../../components/Faq/Faq';
import { useEffect } from 'react';

const FAQ = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='bg-gray-100'>
            <Header activeHeading={5} />
            <Faq />
            <Footer />
        </div>
    );
};

export default FAQ;