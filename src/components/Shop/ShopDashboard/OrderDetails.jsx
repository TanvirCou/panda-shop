import axios from "axios";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiPackage } from "react-icons/fi";
import {
  IoCallOutline,
  IoCardOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchShopOrder } from "../../../redux/features/orderSlice";
import { fetchAllProduct } from "../../../redux/features/productSlice";
import { fetchShop } from "../../../redux/features/shopSlice";
import LoadingAnimation from "../../Loader/LoadingAnimation";

const STATUS_STYLES = {
  Processing: "bg-amber-50 text-amber-600 border-amber-100",
  "Transferred to delivery partner": "bg-blue-50 text-blue-600 border-blue-100",
  Shipping: "bg-blue-50 text-blue-600 border-blue-100",
  Received: "bg-teal-50 text-teal-600 border-teal-100",
  "On the way": "bg-indigo-50 text-indigo-600 border-indigo-100",
  Delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Processing for Refund": "bg-orange-50 text-orange-600 border-orange-100",
  "Refund Success": "bg-green-50 text-green-600 border-green-100",
  "Refund Rejected": "bg-red-50 text-red-600 border-red-100",
};

const StatusBadge = ({ status }) => {
  const cls =
    STATUS_STYLES[status] || "bg-gray-50 text-gray-500 border-gray-100";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${cls}`}
    >
      {status}
    </span>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className='flex items-start gap-2.5'>
    <div className='w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5'>
      <Icon size={13} className='text-gray-400' />
    </div>
    <div>
      <p className='text-[10px] font-bold text-gray-400 uppercase tracking-wide'>
        {label}
      </p>
      <p className='text-sm font-medium text-gray-700'>{value}</p>
    </div>
  </div>
);

const DELIVERY_STATUSES = [
  "Processing",
  "Transferred to delivery partner",
  "Shipping",
  "Received",
  "On the way",
  "Delivered",
];

const REFUND_STATUSES = ["Processing for Refund", "Refund Success"];

const OrderDetails = () => {
  const { shopOrders, isShopOrderLoading } = useSelector(
    (state) => state.order
  );
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(fetchShopOrder(shop?.shop._id));
  }, [dispatch, shop]);

  useEffect(() => {
    const found = shopOrders?.orders.find((i) => i._id === id);
    setData(found);
    if (found) setStatus(found.status);
  }, [id, shopOrders]);

  const handleStatus = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://panda-shop-server-v3.up.railway.app/api/order/update-order-status/${data._id}`,
        { status },
        { withCredentials: true }
      );
      toast.success("Order status updated");
      dispatch(fetchShopOrder(shop.shop._id));
      dispatch(fetchAllProduct());
      dispatch(fetchShop());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  const refundHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://panda-shop-server-v3.up.railway.app/api/order/order-refund-success/${data._id}`,
        { status },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      dispatch(fetchShopOrder(shop.shop._id));
      dispatch(fetchAllProduct());
      dispatch(fetchShop());
    } catch (error) {
      toast.error(error.response?.data?.message || "Refund update failed");
    }
  };

  if (isShopOrderLoading && !data) return <LoadingAnimation />;

  const totalPrice =
    data?.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0) || 0;
  const isRefundFlow =
    data?.status === "Processing for Refund" ||
    data?.status === "Refund Success";
  const isFinalized =
    data?.status === "Delivered" || data?.status === "Refund Success";

  const availableStatuses = isRefundFlow
    ? REFUND_STATUSES.slice(REFUND_STATUSES.indexOf(data?.status))
    : DELIVERY_STATUSES.slice(DELIVERY_STATUSES.indexOf(data?.status));

  return (
    <div className='p-4 md:p-6 space-y-5'>
      <div className='flex items-center justify-between gap-3 flex-wrap'>
        <div>
          <h1 className='text-xl font-black text-gray-900'>Order Details</h1>
          <p className='text-sm text-gray-400 mt-0.5 font-mono'>
            #{data?._id?.slice(-12).toUpperCase()}
          </p>
        </div>
        <Link to='/shop/dashboard/all-orders'>
          <button className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-cyan-300 text-gray-600 hover:text-cyan-600 text-sm font-semibold rounded-xl shadow-sm transition-all duration-200'>
            <FiArrowLeft size={14} /> All Orders
          </button>
        </Link>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        <div className='lg:col-span-2 space-y-4'>
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between flex-wrap gap-3'>
            <div className='flex items-center gap-2'>
              <div className='w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center'>
                <FiPackage size={16} className='text-cyan-600' />
              </div>
              <div>
                <p className='text-xs text-gray-400 font-medium'>Placed on</p>
                <p className='text-sm font-bold text-gray-900'>
                  {data?.createdAt?.slice(0, 10)}
                </p>
              </div>
            </div>
            <StatusBadge status={data?.status} />
          </div>

          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
            <div className='px-5 py-3.5 border-b border-gray-100'>
              <h2 className='text-sm font-bold text-gray-800'>
                Order Items ({data?.cart.length})
              </h2>
            </div>
            <div className='divide-y divide-gray-50'>
              {data?.cart.map((item, index) => (
                <div key={index} className='flex items-center gap-4 px-5 py-4'>
                  <div className='w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100'>
                    <img
                      src={item?.images?.[0]}
                      alt={item?.name}
                      className='w-full h-full object-contain p-1'
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-semibold text-gray-800 truncate'>
                      {item?.name}
                    </p>
                    <p className='text-xs text-gray-400 mt-0.5'>
                      ${item.discountPrice} × {item.qty}
                    </p>
                  </div>
                  <p className='text-sm font-bold text-gray-900 flex-shrink-0'>
                    ${(item.discountPrice * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className='flex items-center justify-between px-5 py-4 bg-gray-50 border-t border-gray-100'>
              <p className='text-sm font-semibold text-gray-500'>Order Total</p>
              <p className='text-lg font-black text-gray-900'>
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          {!isFinalized && (
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5'>
              <h2 className='text-sm font-bold text-gray-800 mb-3'>
                Update Order Status
              </h2>
              <div className='flex flex-col sm:flex-row gap-3'>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className='flex-1 h-10 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition-all'
                >
                  {availableStatuses.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  onClick={isRefundFlow ? refundHandler : handleStatus}
                  className='flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-cyan-200/50 transition-all duration-200 active:scale-[0.98] whitespace-nowrap'
                >
                  Update Status <FiArrowRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className='space-y-4'>
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5'>
            <h2 className='text-sm font-bold text-gray-800 mb-4'>
              Shipping Address
            </h2>
            <div className='space-y-3'>
              <InfoRow
                icon={IoLocationOutline}
                label='Address'
                value={`${data?.shippingAddress.address1 || ""} ${
                  data?.shippingAddress.address2 || ""
                }`.trim()}
              />
              <InfoRow
                icon={IoLocationOutline}
                label='City'
                value={data?.shippingAddress.city}
              />
              <InfoRow
                icon={IoLocationOutline}
                label='Country'
                value={data?.shippingAddress.country}
              />
              <InfoRow
                icon={IoLocationOutline}
                label='Zip Code'
                value={data?.shippingAddress.zipCode}
              />
              <InfoRow
                icon={IoCallOutline}
                label='Phone'
                value={data?.user?.phoneNumber || "—"}
              />
            </div>
          </div>

          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5'>
            <h2 className='text-sm font-bold text-gray-800 mb-4'>
              Payment Info
            </h2>
            <InfoRow
              icon={IoCardOutline}
              label='Payment Status'
              value={data?.paymentInfo?.status || "Not Paid"}
            />
            {data?.paymentInfo?.type && (
              <div className='mt-3'>
                <InfoRow
                  icon={IoCardOutline}
                  label='Method'
                  value={data.paymentInfo.type}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
