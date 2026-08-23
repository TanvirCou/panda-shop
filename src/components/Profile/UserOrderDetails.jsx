import axios from "axios";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../App.css";
import { fetchOrder } from "../../redux/features/orderSlice";
import LoadingAnimation from "../Loader/LoadingAnimation";

const STATUS_STEPS = ["Processing", "Shipped", "Delivered"];

const STATUS_STYLES = {
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Processing: "bg-amber-50 text-amber-700 border-amber-200",
  Shipped: "bg-blue-50 text-blue-700 border-blue-200",
  "Processing for Refund": "bg-orange-50 text-orange-700 border-orange-200",
  "Refund Success": "bg-purple-50 text-purple-700 border-purple-200",
};

const UserOrderDetails = () => {
  const { orders, isOrderLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
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
      orderId: id,
    };
    try {
      await axios.put(
        "https://panda-shop-server-v4.up.railway.app/api/product/create-new-review",
        reviewDetails,
        { withCredentials: true }
      );
      setOpen(false);
      setRefresh(!refresh);
      setReview("");
      setRating(1);
      toast.success("Review successfully given");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchOrder(user.user._id));
  }, [dispatch, user, refresh]);

  useEffect(() => {
    const found = orders?.orders.find((i) => i._id === id);
    setData(found);
  }, [id, orders]);

  const refundHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://panda-shop-server-v4.up.railway.app/api/order/order-refund/${id}`,
        { status: "Processing for Refund" }
      );
      toast.success(res.data.message);
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const statusIndex = STATUS_STEPS.indexOf(data?.status);
  const totalPrice = data?.cart.reduce(
    (acc, i) => acc + i.discountPrice * i.qty,
    0
  );

  if (isOrderLoading && !data) return <LoadingAnimation />;

  return (
    <div className='bg-gray-50 min-h-screen pb-16'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 py-8'>
        <div className='flex items-center gap-4 mb-8'>
          <button
            onClick={() => navigate(-1)}
            className='w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors'
          >
            <IoArrowBackOutline size={18} />
          </button>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Order Details</h1>
            <p className='text-sm text-gray-500 mt-0.5'>
              #{data?._id?.slice(-10).toUpperCase()} · Placed on{" "}
              {data?.createdAt?.slice(0, 10)}
            </p>
          </div>
          {data?.status && (
            <span
              className={`ml-auto inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold border ${
                STATUS_STYLES[data.status] ||
                "bg-gray-100 text-gray-600 border-gray-200"
              }`}
            >
              {data.status}
            </span>
          )}
        </div>

        {statusIndex !== -1 && (
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6'>
            <h3 className='text-sm font-bold text-gray-500 uppercase tracking-wide mb-6'>
              Order Progress
            </h3>
            <div className='relative flex justify-between items-start'>
              <div className='absolute top-4 left-[10%] right-[10%] h-0.5 bg-gray-100 -z-0' />

              <div
                className='absolute top-4 left-[10%] h-0.5 bg-emerald-400 transition-all duration-500 -z-0'
                style={{
                  width: `${(statusIndex / (STATUS_STEPS.length - 1)) * 80}%`,
                }}
              />

              {STATUS_STEPS.map((step, i) => (
                <div
                  key={step}
                  className='relative z-10 flex flex-col items-center w-1/3'
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                      i <= statusIndex
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200"
                        : "bg-white border-gray-200 text-gray-400"
                    }`}
                  >
                    {i < statusIndex ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs font-bold mt-3 text-center transition-colors duration-300 ${
                      i <= statusIndex ? "text-emerald-600" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6'>
          <h3 className='text-sm font-bold text-gray-500 uppercase tracking-wide mb-4'>
            Items ({data?.cart?.length})
          </h3>
          <div className='space-y-4'>
            {data?.cart.map((item, index) => (
              <div
                key={index}
                className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100'
              >
                <img
                  src={item?.images[0]}
                  alt={item.name}
                  className='w-16 h-16 rounded-xl object-contain bg-white border border-gray-100'
                />
                <div className='flex-1 min-w-0'>
                  <p className='font-semibold text-gray-900 text-sm truncate'>
                    {item.name}
                  </p>
                  <p className='text-sm text-gray-500 mt-0.5'>
                    ${item.discountPrice} × {item.qty} ={" "}
                    <span className='font-bold text-gray-700'>
                      ${item.discountPrice * item.qty}
                    </span>
                  </p>
                </div>
                {data?.status === "Delivered" && !item.isReviewed && (
                  <button
                    onClick={() => {
                      setOpen(true);
                      setSelectedItem(item);
                    }}
                    className='flex-shrink-0 text-xs font-semibold text-gray-600 hover:text-emerald-700 bg-white border border-gray-200 hover:border-emerald-300 px-3 py-1.5 rounded-lg transition-all'
                  >
                    Review
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className='flex justify-end mt-4 pt-4 border-t border-gray-100'>
            <div className='text-right'>
              <p className='text-xs font-bold text-gray-400 uppercase tracking-wide'>
                Order Total
              </p>
              <p className='text-2xl font-black text-gray-900'>${totalPrice}</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
            <h3 className='text-sm font-bold text-gray-500 uppercase tracking-wide mb-4'>
              Shipping Address
            </h3>
            <div className='space-y-2 text-sm text-gray-600'>
              <p className='font-semibold text-gray-900'>{data?.user?.name}</p>
              <p>
                {data?.shippingAddress?.address1}{" "}
                {data?.shippingAddress?.address2}
              </p>
              <p>
                {data?.shippingAddress?.city}, {data?.shippingAddress?.country}
              </p>
              <p>ZIP: {data?.shippingAddress?.zipCode}</p>
              <p className='pt-1 font-medium text-gray-700'>
                📞 {data?.user?.phoneNumber}
              </p>
            </div>
          </div>

          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
            <h3 className='text-sm font-bold text-gray-500 uppercase tracking-wide mb-4'>
              Payment Info
            </h3>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-500'>Payment Status</span>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    data?.paymentInfo?.status === "succeeded"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {data?.paymentInfo?.status
                    ? data.paymentInfo.status
                    : "Not Paid"}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-500'>Order Status</span>
                <span className='text-sm font-semibold text-gray-900'>
                  {data?.status}
                </span>
              </div>
              {data?.status === "Delivered" && (
                <button
                  onClick={refundHandler}
                  className='w-full mt-3 py-2.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 text-sm font-semibold rounded-xl border border-transparent hover:border-red-200 transition-all'
                >
                  Request Refund
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {open &&
        ReactDOM.createPortal(
          <div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-[150] flex items-center justify-center p-4'>
            <div className='relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto'>
              <button
                onClick={() => setOpen(false)}
                className='absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors'
              >
                <RxCross1 size={14} />
              </button>

              <div className='p-6'>
                <h2 className='text-xl font-bold text-gray-900 mb-5'>
                  Leave a Review
                </h2>

                <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-6'>
                  <img
                    src={selectedItem?.images[0]}
                    alt=''
                    className='w-14 h-14 rounded-xl object-contain bg-white border border-gray-100'
                  />
                  <p className='font-semibold text-sm text-gray-900'>
                    {selectedItem?.name}
                  </p>
                </div>

                <div className='mb-6'>
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-wide block mb-3'>
                    Rating <span className='text-red-500'>*</span>
                  </label>
                  <div className='flex gap-1'>
                    {[1, 2, 3, 4, 5].map((i) =>
                      rating >= i ? (
                        <AiFillStar
                          key={i}
                          size={32}
                          color='orange'
                          className='cursor-pointer'
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={i}
                          size={32}
                          color='orange'
                          className='cursor-pointer'
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className='mb-6'>
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2'>
                    Your Review{" "}
                    <span className='text-gray-400 normal-case font-medium'>
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows='5'
                    placeholder='Share your experience with this product...'
                    className='w-full border border-gray-200 bg-gray-50 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none'
                  />
                </div>

                <button
                  onClick={reviewHandler}
                  className='w-full py-3 bg-gray-900 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-all duration-300'
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default UserOrderDetails;
