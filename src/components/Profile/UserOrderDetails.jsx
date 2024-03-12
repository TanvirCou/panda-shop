import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../Loader/LoadingAnimation';
import { fetchOrder } from '../../redux/features/orderSlice';
import { RxCross1 } from 'react-icons/rx';
import "../../App.css";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserOrderDetails = () => {
    const { orders, isOrderLoading } = useSelector(state => state.order);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState("");
    const [refresh, setRefresh] = useState(false);



    const reviewHandler = async (e) => {
        e.preventDefault();
        const reviewDetails = {
            user: user.user,
            rating,
            comment: review,
            productId: selectedItem?._id,
            orderId: id
        };
        try {
            await axios.put("https://panda-shop.onrender.com/api/product/create-new-review", reviewDetails, { withCredentials: true });
            setOpen(false);
            setRefresh(!refresh);
            setReview("");
            setRating(1);
            toast.success("Review successfully given");
        } catch (error) {
            toast.error(error);
            console.log(error);
        }

    }

    useEffect(() => {
        dispatch(fetchOrder(user.user._id));
    }, [dispatch, user, refresh]);

    useEffect(() => {
        const data = orders?.orders.find(i => i._id === id);
        setData(data);
    }, [id, orders])


    const refundHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`https://panda-shop.onrender.com/api/order/order-refund/${id}`, { status: "Processing for Refund" });
            toast.success(res.data.message);
            setRefresh(!refresh);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <div>
            {
                isOrderLoading && data ? <LoadingAnimation /> :
                    <div className='py-6 px-10'>
                        <div className='flex items-center justify-between'>
                            <p className='text-xl font-semibold'>Order Details</p>
                        </div>
                        <br />
                        <div className='flex items-center justify-between text-sm text-gray-600 font-medium'>
                            <p className=''>Order Id: {data?._id}</p>
                            <p>Placed on: {data?.createdAt.slice(0, 10)}</p>
                        </div>

                        <br />

                        <div>
                            {
                                data?.cart.map((i, index) => (
                                    <div key={index} className='flex items-center justify-between shadow-sm rounded-md my-2'>
                                        <div className='flex items-center'>
                                            <img src={i?.images[0]} alt="" className='w-20 h-20' />
                                            <div className='ml-6'>
                                                <p className='text-sm font-medium'>{i.name}</p>
                                                <p className='text-sm text-gray-600'>Us${i.discountPrice} * {i.qty}</p>
                                            </div>
                                        </div>
                                        {
                                            data?.status === "Delivered" && !i.isReviewed && <button onClick={() => setOpen(true) || setSelectedItem(i)} className='bg-black text-white font-medium px-4 py-1.5 rounded'>Write a Review</button>
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        {
                            open && <div className='fixed w-full h-screen bg-[#00000030] z-40 top-0 left-0 flex items-center justify-center'>
                                <div className='w-[90%] md:w-[50%] h-[90vh] md:h-[85vh] bg-white rounded-md shadow-sm relative p-4 overflow-y-scroll webkit'>
                                    <RxCross1 size={25} onClick={() => setOpen(false)} className='absolute right-3 top-3 z-50' />
                                    <div>
                                        <p className='text-xl font-semibold text-center'>Give Review</p>

                                        <div className='flex items-center shadow-sm rounded-md my-2 mx-4'>
                                            <img src={selectedItem?.images[0]} alt="" className='w-20 h-20' />
                                            <div className='ml-6'>
                                                <p className='text-sm font-medium'>{selectedItem?.name}</p>
                                            </div>
                                        </div>
                                        <br />
                                        <div className='mx-4'>
                                            <p className='font-medium'>Give Ratings <span className='text-red-600'>*</span></p>
                                            <div className='flex my-2'>
                                                {
                                                    [1, 2, 3, 4, 5].map(i => (
                                                        rating >= i ?
                                                            <AiFillStar
                                                                key={i}
                                                                size={25}
                                                                className='mr-1 cursor-pointer'
                                                                color='orange'
                                                                onClick={() => setRating(i)} /> :
                                                            <AiOutlineStar
                                                                key={i}
                                                                size={25}
                                                                className='mr-1 cursor-pointer'
                                                                color='orange'
                                                                onClick={() => setRating(i)} />
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <br />

                                        <div className='mx-4'>
                                            <p className='font-medium mb-2'>Give Review <span className='text-xs text-gray-400'>(Optional)</span></p>
                                            <textarea value={review} onChange={(e) => setReview(e.target.value)} rows="7" placeholder='How was your product? Give a expression of this product.' className='w-full border border-gray-300 rounded-md p-2' />
                                        </div>

                                        <button onClick={reviewHandler} className='bg-black text-white font-medium px-4 py-1.5 rounded mx-4 my-2'>Submit</button>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className='w-full flex justify-end'>
                            <p className='font-medium text-gray-600'>Total Price: <strong className='text-black pl-1'>US${data?.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0)}</strong></p>
                        </div>

                        <br />
                        <br />

                        <div className='w-full block md:flex items-center shadow-sm rounded-md p-4 bg-gray-100'>
                            <div className='w-full md:w-[50%]'>
                                <p className='text-lg font-medium '>Shipping Address</p>
                                <div className='mt-2 font-medium text-gray-500 px-2'>
                                    <p>Address: {data?.shippingAddress.address1} {data?.shippingAddress.address2}</p>
                                    <p>Country: {data?.shippingAddress.country}</p>
                                    <p>City: {data?.shippingAddress.city}</p>
                                    <p>Zip Code:{data?.shippingAddress.zipCode}</p>
                                    <p>Phone: {data?.user.phoneNumber}</p>
                                </div>
                            </div>
                            <div className='w-full md:w-[50%]'>
                                <p className='text-lg font-medium '>Payment Info</p>
                                <div className='mt-2 font-medium text-gray-500 px-1'>
                                    <p>Status: {data?.paymentInfo.status ? data?.paymentInfo.status : "Not Paid"}</p>
                                    {
                                        data?.status === "Delivered" && <button onClick={refundHandler} className='bg-black text-white font-medium px-4 py-1.5 rounded'>Get Refund</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <br />

                        <button className='bg-black text-white font-medium px-4 py-1.5 rounded'>Send Message</button>
                    </div>
            }
        </div>
    );
};

export default UserOrderDetails;