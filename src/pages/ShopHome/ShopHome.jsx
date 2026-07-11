import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import LoadingAnimation from "../../components/Loader/LoadingAnimation";
import Footer from "../../components/Shared/Footer/Footer";
import Header from "../../components/Shared/Header/Header";
import ShopData from "../../components/Shop/ShopHome/ShopData";
import ShopInfo from "../../components/Shop/ShopHome/ShopInfo";
import { fetchEvent } from "../../redux/features/eventSlice";
import { fetchProduct } from "../../redux/features/productSlice";

const ShopHome = () => {
  const { loading } = useSelector((state) => state.shop);
  const [shopLoading, setShopLoading] = useState(false);
  const [data, setData] = useState();
  const { id } = useParams();

  const { products, isProductLoading } = useSelector((state) => state.product);
  const { events, isEventLoading } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    setShopLoading(true);
    const getShop = async () => {
      try {
        const res = await axios.get(
          `https://panda-shop-server-v3.up.railway.app/api/shop/get-shop-info/${id}`
        );
        setData(res.data);
        setShopLoading(false);
      } catch (error) {
        setShopLoading(false);
        console.log(error);
      }
    };
    getShop();
  }, [id]);

  useEffect(() => {
    dispatch(fetchProduct(id));
    dispatch(fetchEvent(id));
  }, [id, dispatch]);

  const isLoading =
    loading || shopLoading || isProductLoading || isEventLoading;

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Header />

      {isLoading ? (
        <div className='flex-1 flex items-center justify-center'>
          <LoadingAnimation />
        </div>
      ) : (
        <main className='flex-1 pt-[50px] md:pt-0'>
          <div className='w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-500 h-2' />

          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-8'>
            <div className='flex flex-col md:flex-row gap-6'>
              <aside className='w-full md:w-[280px] lg:w-[300px] flex-shrink-0'>
                <div className='md:sticky md:top-6'>
                  <ShopInfo data={data} products={products} id={id} />
                </div>
              </aside>

              <div className='flex-1 min-w-0'>
                <ShopData products={products} events={events} id={id} />
              </div>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default ShopHome;
