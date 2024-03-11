/* eslint-disable react/prop-types */
import Countdown from './Countdown';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/features/cartSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const EventCard = ({ data }) => {
    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();


    const addToCartHandler = (id) => {
        const isItemsExits = cart && cart.find(i => i._id === id);
        if (isItemsExits) {
            toast.error("Items is already in cart");
        } else {
            const cartData = { ...data, qty: 1 };
            dispatch(addToCart(cartData));
            localStorage.setItem("cartItems", JSON.stringify([...cart, cartData]));
            toast.success("Item added to cart successfully");
        }
    };

    return (
        <div className='w-full bg-white rounded-md shadow-sm px-4 py-12 mt-8 md:mt-0'>
            <div className='block lg:flex w-full'>

                <div className='w-full lg:w-1/2 flex items-center'>
                    <img src={data?.images} alt="" />
                </div>
                <div className='w-full lg:w-1/2 flex flex-col justify-center px-4 overflow-hidden'>
                    <p className='text-xl font-semibold '>{data?.name}</p>
                    <p className='text-sm font-semibold py-2 text-gray-600 whitespace-pre-line '>
                        {data?.description}
                    </p>
                    <div className='flex items-center justify-between py-1'>
                        <div className='flex items-center'>
                            <p className='text-xl font-medium text-red-600 line-through'>{data?.originalPrice}</p>
                            <p className='text-xl font-medium text-gray-600 px-2'>{data?.discountPrice}</p>
                        </div>
                        <p className='font-medium text-green-600'>{data?.sold_out} sold</p>
                    </div>

                    <Countdown data={data} />

                    <div className='my-2'>
                        <Link to={`/product/${data?._id}?isEvent=true`}>
                            <button className='bg-black text-white font-medium px-3 py-1.5 rounded-md'>See Details</button>
                        </Link>
                        <button onClick={() => addToCartHandler(data?._id)} className='bg-black text-white font-medium px-3 py-1.5 rounded-md mx-4'>Buy Bow</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EventCard;