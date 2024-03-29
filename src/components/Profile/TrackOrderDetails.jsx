import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '../../redux/features/orderSlice';
import LoadingAnimation from '../Loader/LoadingAnimation';

const TrackOrderDetails = () => {
  const { orders, isOrderLoading } = useSelector(state => state.order);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(fetchOrder(user.user._id));
  }, [dispatch, user]);

  useEffect(() => {
    const data = orders?.orders.find(i => i._id === id);
    setData(data);
  }, [id, orders]);

  return (
    <>
      {
        isOrderLoading ? <LoadingAnimation /> :
          <div className="w-full h-[80vh] flex justify-center items-center">
            {data && data?.status === "Processing" ? (
              <h1 className="text-[20px]">Your Order is processing in shop.</h1>
            ) : data?.status === "Transferred to delivery partner" ? (
              <h1 className="text-[20px]">
                Your Order is on the way for delivery partner.
              </h1>
            ) : data?.status === "Shipping" ? (
              <h1 className="text-[20px]">
                Your Order is on the way with our delivery partner.
              </h1>
            ) : data?.status === "Received" ? (
              <h1 className="text-[20px]">
                Your Order is in your city. Our Delivery man will deliver it.
              </h1>
            ) : data?.status === "On the way" ? (
              <h1 className="text-[20px]">
                Our Delivery man is going to deliver your order.
              </h1>
            ) : data?.status === "Delivered" ? (
              <h1 className="text-[20px]">Your order is delivered!</h1>
            ) : data?.status === "Processing for Refund" ? (
              <h1 className="text-[20px]">Your refund is processing!</h1>
            ) : data?.status === "Refund Success" ? (
              <h1 className="text-[20px]">Your Refund is success!</h1>
            ) : null}
          </div>
      }
    </>

  );
};

export default TrackOrderDetails;