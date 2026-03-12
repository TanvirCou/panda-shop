import UserOrderDetails from '../../components/Profile/UserOrderDetails';
import Footer from '../../components/Shared/Footer/Footer';
import Header from '../../components/Shared/Header/Header';

const OrderDetails = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 pt-[60px] md:pt-0">
                <UserOrderDetails />
            </div>
            <Footer />
        </div>
    );
};

export default OrderDetails;