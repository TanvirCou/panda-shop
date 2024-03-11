import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingAnimation from '../../Loader/LoadingAnimation';
import { fetchShopOrder } from '../../../redux/features/orderSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchShop } from '../../../redux/features/shopSlice';
import { fetchAllProduct } from '../../../redux/features/productSlice';

const OrderDetails = () => {
    const { shopOrders, isShopOrderLoading } = useSelector(state => state.order);
    const { shop } = useSelector(state => state.shop);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [data, setData] = useState();
    const [status, setStatus] = useState("");

    useEffect(() => {
        dispatch(fetchShopOrder(shop?.shop._id));
    }, [dispatch, shop]);

    useEffect(() => {
        const data = shopOrders?.orders.find(i => i._id === id);
        setData(data);
    }, [id, shopOrders]);


    const handleStatus = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`http://localhost:3000/api/order/update-order-status/${data._id}`, { status }, { withCredentials: true });
            console.log(res.data);
            toast.success("Order status updated");
            dispatch(fetchShopOrder(shop.shop._id));
            dispatch(fetchAllProduct());
            dispatch(fetchShop());
        } catch (error) {
            toast.error(error);
            console.log(error);
        }

    }

    const refundHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`http://localhost:3000/api/order/order-refund-success/${data._id}`, { status }, { withCredentials: true });
            console.log(res.data);
            toast.success(res.data.message);
            dispatch(fetchShopOrder(shop.shop._id));
            dispatch(fetchAllProduct());
            dispatch(fetchShop());
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    return (
        <div>
            {
                isShopOrderLoading && data ? <LoadingAnimation /> :
                    <div className='py-6 px-10'>
                        <div className='flex items-center justify-between'>
                            <p className='text-xl font-semibold'>Order Details</p>
                            <Link to="/shop/dashboard/all-orders">
                                <button className='bg-red-300 font-medium px-4 py-1.5 rounded'>Order List</button>
                            </Link>
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
                                    <div key={index} className='flex items-center shadow-sm rounded-md my-2'>
                                        <img src={i?.images[0]} alt="" className='w-20 h-20' />
                                        <div className='ml-6'>
                                            <p className='text-sm font-medium'>{i?.name}</p>
                                            <p className='text-sm text-gray-600'>Us${i.discountPrice} * {i.qty}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

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
                                <div className='mt-2 font-medium text-gray-500 px-2'>
                                    <p>Status: {data?.paymentInfo.status ? data?.paymentInfo.status : "Not Paid"}</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <>
                            {
                                data?.status !== "Processing for Refund" && data?.status !== "Refund Success" ?
                                    data?.status !== "Delivered" &&
                                    <div className='px-2'>
                                        <p className='text-lg font-medium'>Orders Status</p>
                                        <select value={status} onChange={(e) => setStatus(e.target.value)} className='my-3 py-1.5 px-2 bg-gray-100 focus:border-teal-600 focus:ring-teal-600'>
                                            {
                                                [
                                                    "Processing",
                                                    "Transferred to delivery partner",
                                                    "Shipping",
                                                    "Received",
                                                    "On the way",
                                                    "Delivered"
                                                ].slice(
                                                    [
                                                        "Processing",
                                                        "Transferred to delivery partner",
                                                        "Shipping",
                                                        "Received",
                                                        "On the way",
                                                        "Delivered"
                                                    ].indexOf(data?.status)
                                                ).map((i, index) => (
                                                    <option value={i} key={index}>{i}</option>
                                                ))
                                            }
                                        </select>
                                        <br />
                                        <button onClick={handleStatus} className='bg-red-300 font-medium px-4 py-1.5 rounded'>Update Status</button>
                                    </div> :
                                    data?.status !== "Refund Success" &&
                                    <div className='px-2'>
                                        <p className='text-lg font-medium'>Orders Status</p>
                                        <select value={status} onChange={(e) => setStatus(e.target.value)} className='my-3 py-1.5 px-2 bg-gray-100 focus:border-teal-600 focus:ring-teal-600'>
                                            {
                                                [
                                                    "Processing for Refund",
                                                    "Refund Success"
                                                ].slice(
                                                    [
                                                        "Processing for Refund",
                                                        "Refund Success"
                                                    ].indexOf(data?.status)
                                                ).map((i, index) => (
                                                    <option value={i} key={index}>{i}</option>
                                                ))
                                            }
                                        </select>
                                        <br />
                                        <button onClick={refundHandler} className='bg-red-300 font-medium px-4 py-1.5 rounded'>Update Status</button>
                                    </div>
                            }



                        </>
                    </div>
            }
        </div>
    );
};

export default OrderDetails;