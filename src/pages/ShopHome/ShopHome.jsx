import { useEffect, useState } from 'react';
import ShopInfo from '../../components/Shop/ShopHome/ShopInfo';
import ShopData from '../../components/Shop/ShopHome/ShopData';
import { useDispatch, useSelector } from 'react-redux';
import LoadingAnimation from '../../components/Loader/LoadingAnimation';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../redux/features/productSlice';
import { fetchEvent } from '../../redux/features/eventSlice';

const ShopHome = () => {
    const { loading } = useSelector(state => state.shop);
    const [shopLoading, setShopLoading] = useState(false);
    const [data, setData] = useState();
    const { id } = useParams();

    const { products, isProductLoading } = useSelector(state => state.product);
    const { events, isEventLoading } = useSelector(state => state.event);
    const dispatch = useDispatch();

    useEffect(() => {
        setShopLoading(true);
        const getShop = async () => {
            try {
                const res = await axios.get(`https://panda-shop.onrender.com/api/shop/get-shop-info/${id}`);
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
        dispatch(fetchEvent(id))
    }, [id]);

    console.log(events);
    console.log(products);

    return (
        <>
            {
                loading || shopLoading || isProductLoading || isEventLoading ? <LoadingAnimation /> :
                    <div className='bg-gray-100 md:h-screen'>
                        <div className='py-6 pl-6 md:pl-12 pr-6 md:flex'>
                            <div className='w-full md:w-[40%] lg:w-[30%] xl:w-[25%]'>
                                <ShopInfo isOwner={true} data={data} products={products} id={id} />
                            </div>
                            <div className='w-full md:w-[60%] lg:w-[70%] xl:w-[75%]'>
                                <ShopData isOwner={true} products={products} events={events} id={id} />
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default ShopHome;