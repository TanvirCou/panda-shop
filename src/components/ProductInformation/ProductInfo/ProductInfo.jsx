/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import {
    IoCartOutline,
    IoShieldCheckmarkOutline,
    IoStorefrontOutline,
    IoSwapHorizontalOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/features/cartSlice";
import {
    addToWishList,
    removeFromWishList,
} from "../../../redux/features/wishListSlice";

const ProductInfo = ({ data, eventData }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const { allProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleIncrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrementCount = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const addToCartHandler = (id) => {
    const isItemsExits = cart && cart.find((i) => i._id === id);
    if (isItemsExits) {
      toast.error("Items is already in cart");
    } else {
      if (data?.stock < count) {
        toast.error("Product stock limited");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        localStorage.setItem("cartItems", JSON.stringify([...cart, cartData]));
        toast.success("Item added to cart successfully");
      }
    }
  };

  useEffect(() => {
    if (wishList && wishList.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList, data]);

  const handleAddToWishList = (data) => {
    setClick(!click);
    dispatch(addToWishList(data));
    localStorage.setItem("wishListItems", JSON.stringify([...wishList, data]));
  };

  const handleRemoveFromWishList = (data) => {
    setClick(!click);
    dispatch(removeFromWishList(data?._id));
  };

  localStorage.setItem("wishListItems", JSON.stringify([...wishList]));

  // eslint-disable-next-line no-unused-vars
  const handleClick = async (shopId) => {
    try {
      const res = await axios.post(
        `https://panda-shop-server-v4.up.railway.app/api/chat/createChat`,
        { userId: shopId },
        { withCredentials: true }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalProduct = allProducts?.allProducts.filter(
    (i) => i?.shopId === data?.shopId
  );

  const totalReview = totalProduct.reduce(
    (acc, i) => acc + i?.reviews.length,
    0
  );

  const shopTotalRating = totalProduct.reduce(
    (acc, i) => acc + (i?.ratings ? i.ratings : 0),
    0
  );

  const shopAvgRating = shopTotalRating / totalReview;

  const discount =
    data?.originalPrice && data?.discountPrice
      ? Math.round(
          ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
        )
      : null;

  return (
    <>
      {data ? (
        <div className='bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14'>
            <div className='flex flex-col lg:flex-row gap-10 lg:gap-20'>
              <div className='w-full lg:w-[48%] flex flex-col gap-5'>
                <div className='relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden aspect-square flex items-center justify-center border border-gray-100'>
                  <img
                    src={eventData ? data?.images : data?.images[select]}
                    alt={data?.name}
                    className='w-[75%] h-[75%] object-contain transition-all duration-500 hover:scale-105'
                  />
                  {discount && (
                    <div className='absolute top-5 left-5 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg shadow-emerald-200'>
                      -{discount}%
                    </div>
                  )}

                  {!eventData && (
                    <button
                      onClick={() =>
                        click
                          ? handleRemoveFromWishList(data)
                          : handleAddToWishList(data)
                      }
                      className={`absolute top-5 right-5 w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 active:scale-90 ${
                        click
                          ? "bg-red-50 text-red-500"
                          : "bg-white text-gray-400 hover:text-red-400"
                      }`}
                    >
                      {click ? (
                        <IoMdHeart size={22} />
                      ) : (
                        <IoMdHeartEmpty size={22} />
                      )}
                    </button>
                  )}
                </div>

                {!eventData && data?.images?.length > 1 && (
                  <div className='flex gap-3 overflow-x-auto pb-1'>
                    {data.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelect(index)}
                        className={`relative flex-shrink-0 w-20 h-20 m-1 rounded-2xl overflow-hidden border-2 transition-all duration-200 bg-gray-50 ${
                          select === index
                            ? "border-emerald-500 shadow-md shadow-emerald-100 scale-105"
                            : "border-transparent hover:border-gray-200"
                        }`}
                      >
                        <img
                          src={img}
                          alt=''
                          className='w-full h-full object-contain p-1'
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className='grid grid-cols-3 gap-3 mt-1'>
                  {[
                    {
                      icon: <IoShieldCheckmarkOutline size={18} />,
                      label: "Secure Payment",
                    },
                    {
                      icon: <IoSwapHorizontalOutline size={18} />,
                      label: "Easy Returns",
                    },
                    {
                      icon: <IoStorefrontOutline size={18} />,
                      label: "Verified Seller",
                    },
                  ].map((b, i) => (
                    <div
                      key={i}
                      className='flex flex-col items-center gap-1.5 bg-gray-50 rounded-2xl py-3 px-2 border border-gray-100'
                    >
                      <span className='text-emerald-600'>{b.icon}</span>
                      <span className='text-[11px] font-semibold text-gray-500 text-center leading-tight'>
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='w-full lg:w-[52%] flex flex-col gap-6'>
                {data?.category && (
                  <span className='inline-flex self-start items-center bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide'>
                    {data.category}
                  </span>
                )}
                <div>
                  <h1 className='text-3xl font-extrabold text-gray-900 leading-snug tracking-tight'>
                    {data.name}
                  </h1>
                  <div className='flex items-center gap-3 mt-2'>
                    {data?.ratings > 0 && (
                      <div className='flex items-center gap-1'>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-base ${
                              i < Math.round(data.ratings)
                                ? "text-amber-400"
                                : "text-gray-200"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className='text-sm font-semibold text-gray-500 ml-1'>
                          ({data?.reviews?.length || 0})
                        </span>
                      </div>
                    )}
                    {data?.sold_out > 0 && (
                      <span className='text-xs font-semibold text-gray-400'>
                        {data.sold_out} sold
                      </span>
                    )}
                  </div>
                </div>

                <div className='flex items-baseline gap-4'>
                  <span className='text-4xl font-black text-gray-900'>
                    ${data.discountPrice}
                  </span>
                  {data.originalPrice && (
                    <span className='text-xl font-medium text-gray-300 line-through'>
                      ${data.originalPrice}
                    </span>
                  )}
                  {discount && (
                    <span className='text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full'>
                      Save {discount}%
                    </span>
                  )}
                </div>

                <div className='h-px w-full bg-gray-100' />

                <p className='text-gray-500 text-[15px] leading-relaxed line-clamp-4'>
                  {data.description}
                </p>

                {data?.stock !== undefined && (
                  <div className='flex items-center gap-2'>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        data.stock > 0 ? "bg-emerald-500" : "bg-red-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-semibold ${
                        data.stock > 0 ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {data.stock > 0
                        ? `${data.stock} in stock`
                        : "Out of stock"}
                    </span>
                  </div>
                )}

                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-4'>
                    <span className='text-sm font-semibold text-gray-500'>
                      Qty:
                    </span>
                    <div className='flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden'>
                      <button
                        onClick={handleDecrementCount}
                        className='w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors font-bold text-lg'
                      >
                        −
                      </button>
                      <span className='w-12 text-center font-bold text-gray-900 text-base'>
                        {count}
                      </span>
                      <button
                        onClick={handleIncrementCount}
                        className='w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors font-bold text-lg'
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCartHandler(data?._id)}
                    className='w-full h-14 bg-gray-900 hover:bg-emerald-600 text-white font-bold text-base rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-200/60 active:scale-[0.98]'
                  >
                    <IoCartOutline size={22} />
                    Add to Cart
                  </button>
                </div>

                <div className='h-px w-full bg-gray-100' />

                <Link
                  to={`/shop/${data?.shop._id}`}
                  className='flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-300 group'
                >
                  <div className='relative flex-shrink-0'>
                    <img
                      src={data.shop.avatar}
                      alt={data.shop.name}
                      className='w-14 h-14 rounded-xl object-cover'
                    />
                    <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='font-bold text-gray-900 group-hover:text-emerald-700 transition-colors truncate'>
                      {data.shop.name}
                    </p>
                    <p className='text-xs text-gray-500 mt-0.5'>
                      {shopAvgRating
                        ? `${shopAvgRating.toFixed(1)} / 5 rating`
                        : "Verified Seller"}
                    </p>
                  </div>
                  <span className='text-xs font-semibold text-emerald-600 bg-white border border-emerald-200 px-3 py-1.5 rounded-xl whitespace-nowrap group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all'>
                    Visit Shop →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductInfo;
