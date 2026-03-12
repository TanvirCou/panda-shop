import TrackOrderDetails from '../../components/Profile/TrackOrderDetails';
import Footer from '../../components/Shared/Footer/Footer';
import Header from '../../components/Shared/Header/Header';

const TrackOrder = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
                <TrackOrderDetails />
            </div>
            <Footer />
        </div>
    );
};

export default TrackOrder;