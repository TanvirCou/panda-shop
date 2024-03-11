/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import "../../../App.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { fetchShop } from '../../../redux/features/shopSlice';

const ShopInfo = ({ data, products, id }) => {
    const { shop } = useSelector(state => state.shop);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await axios.get("http://localhost:3000/api/shop/logout", { withCredentials: true });
        dispatch(fetchShop());
        navigate("/");

    };

    const totalReview = products && products?.products.reduce((acc, i) => acc + i?.reviews.length, 0);

    const shopTotalRating = products && products?.products.reduce((acc, i) => acc + (i?.ratings ? i.ratings : 0), 0);

    const shopAvgRating = shopTotalRating / totalReview;

    return (
        <div className='w-full md:h-[92vh] bg-white rounded shadow-md py-4 md:sticky md:overflow-y-scroll overflow-x-hidden webkit'>
            <div className='flex flex-col items-center'>
                <img src={data?.shop.avatar} alt="" className='w-36 h-36 rounded-full object-cover' />
                <p className='text-lg font-medium my-2'>{data?.shop.name}</p>
            </div>
            {data?.shop.description &&
                <div className='px-4 pt-4 text-sm'>
                    <p className='font-semibold '>Description</p>
                    <p className='font-medium text-gray-500'>{data?.shop?.description}</p>
                </div>
            }
            <div className='px-4 pt-4 text-sm'>
                <p className='font-semibold '>Address</p>
                <p className='font-medium text-gray-500'>{data?.shop.address}</p>
            </div>
            <div className='px-4 pt-4 text-sm'>
                <p className='font-semibold '>Phone Number</p>
                <p className='font-medium text-gray-500'>{data?.shop.phoneNumber}</p>
            </div>
            <div className='px-4 pt-4 text-sm'>
                <p className='font-semibold '>Total Products</p>
                <p className='font-medium text-gray-500'>{products?.products.length}</p>
            </div>
            <div className='px-4 pt-4 text-sm'>
                <p className='font-semibold '>Shop Ratings</p>
                <p className='font-medium text-gray-500'>{shopAvgRating || 0}/5</p>
            </div>
            <div className='px-4 pt-4 text-sm'>
                <p className='font-semibold '>Joined on</p>
                <p className='font-medium text-gray-500'>{data?.shop.createdAt.slice(0, 10)}</p>
            </div>

            {(shop && shop?.shop?._id === id) ?
                <div className='w-full'>
                    <Link to="/shop/settings">
                        <button className='bg-black w-[90%] py-1.5 text-white mx-4 mt-6 rounded-md font-medium'>Edit Shop</button>
                    </Link>
                    <button onClick={handleLogout} className='bg-black w-[90%] py-1.5 text-white mx-4 mt-6 rounded-md font-medium'>Log out</button>
                </div> : ""
            }
        </div>
    );
};

export default ShopInfo;