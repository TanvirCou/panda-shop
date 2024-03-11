import Header from '../../components/Shared/Header/Header';
import Hero from '../../components/Home/Hero/Hero';
import Category from '../../components/Home/Category/Category';
import BestDeal from '../../components/Home/BestDeal/BestDeal';
import Featured from '../../components/Home/Featured/Featured';
import PopularEvent from '../../components/Home/PopularEvent/PopularEvent';
import Sponsored from '../../components/Home/Sponsored/Sponsored';
import Footer from '../../components/Shared/Footer/Footer';
import { useSelector } from 'react-redux';
import LoadingAnimation from '../../components/Loader/LoadingAnimation';

const Home = () => {
    const { isProductLoading } = useSelector(state => state.product);
    const { isEventLoading } = useSelector(state => state.event);
    const { isLoading } = useSelector(state => state.user);
    const { loading } = useSelector(state => state.shop);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchAllProduct());
    // }, [])

    return (
        <div className=' bg-gray-100'>
            {
                (isProductLoading || isEventLoading || isLoading || loading) ? <LoadingAnimation /> :
                    <>
                        <Header activeHeading={1} />
                        <Hero />
                        <Category />
                        <BestDeal />
                        <PopularEvent />
                        <Featured />
                        <Sponsored />
                        <Footer />
                    </>
            }

        </div>
    );
};

export default Home;