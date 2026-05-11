/* eslint-disable react/prop-types */
import axios from "axios";
import {
    IoCalendarOutline,
    IoCallOutline,
    IoLocationOutline,
    IoLogOutOutline,
    IoSettingsOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchShop } from "../../../redux/features/shopSlice";

const ShopInfo = ({ data, products, id }) => {
  const { shop } = useSelector((state) => state.shop);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get(
      "https://panda-shop-server-production-v2.up.railway.app/api/shop/logout",
      { withCredentials: true }
    );
    dispatch(fetchShop());
    navigate("/");
  };

  const totalReview =
    products?.products.reduce((acc, i) => acc + i?.reviews.length, 0) || 0;
  const shopTotalRating =
    products?.products.reduce((acc, i) => acc + (i?.ratings || 0), 0) || 0;
  const shopAvgRating =
    totalReview > 0 ? (shopTotalRating / totalReview).toFixed(1) : null;
  const isOwner = shop?.shop?._id === id;
  const joinDate = data?.shop.createdAt
    ? new Date(data.shop.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100'>
      <div className='relative h-24 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 rounded-t-2xl overflow-hidden'>
        <div
          className='absolute inset-0 opacity-20'
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 50%, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className='flex justify-center -mt-10 mb-3 relative z-10'>
        <div className='w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-50'>
          {data?.shop.avatar && (
            <img
              src={data.shop.avatar}
              alt={data?.shop.name}
              className='w-full h-full object-cover'
            />
          )}
        </div>
      </div>

      <div className='text-center px-5 pb-4 border-b border-gray-100'>
        <h2 className='text-lg font-bold text-gray-900'>{data?.shop.name}</h2>
        {data?.shop.description && (
          <p className='text-xs text-gray-400 mt-1 leading-relaxed line-clamp-3'>
            {data?.shop.description}
          </p>
        )}
      </div>

      <div className='grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100'>
        {[
          { value: products?.products.length ?? "—", label: "Products" },
          { value: shopAvgRating ? `${shopAvgRating}★` : "—", label: "Rating" },
          { value: totalReview, label: "Reviews" },
        ].map((stat) => (
          <div key={stat.label} className='flex flex-col items-center py-3'>
            <span className='text-base font-black text-gray-900'>
              {stat.value}
            </span>
            <span className='text-[10px] text-gray-400 font-medium mt-0.5'>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className='px-5 py-4 space-y-3'>
        {data?.shop.address && (
          <div className='flex items-start gap-3'>
            <div className='w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5'>
              <IoLocationOutline size={14} className='text-gray-500' />
            </div>
            <div>
              <p className='text-[10px] font-bold text-gray-400 uppercase tracking-wide'>
                Address
              </p>
              <p className='text-sm font-medium text-gray-700'>
                {data.shop.address}
              </p>
            </div>
          </div>
        )}
        {data?.shop.phoneNumber && (
          <div className='flex items-start gap-3'>
            <div className='w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5'>
              <IoCallOutline size={14} className='text-gray-500' />
            </div>
            <div>
              <p className='text-[10px] font-bold text-gray-400 uppercase tracking-wide'>
                Phone
              </p>
              <p className='text-sm font-medium text-gray-700'>
                {data.shop.phoneNumber}
              </p>
            </div>
          </div>
        )}
        <div className='flex items-start gap-3'>
          <div className='w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5'>
            <IoCalendarOutline size={14} className='text-gray-500' />
          </div>
          <div>
            <p className='text-[10px] font-bold text-gray-400 uppercase tracking-wide'>
              Member since
            </p>
            <p className='text-sm font-medium text-gray-700'>{joinDate}</p>
          </div>
        </div>
      </div>

      {isOwner && (
        <div className='px-5 pb-5 space-y-2 border-t border-gray-100 pt-4'>
          <Link to='/shop/settings' className='block'>
            <button className='w-full flex items-center justify-center gap-2 py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200'>
              <IoSettingsOutline size={16} /> Edit Shop
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className='w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-xl transition-colors duration-200'
          >
            <IoLogOutOutline size={16} /> Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
