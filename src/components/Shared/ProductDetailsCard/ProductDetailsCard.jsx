/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/features/cartSlice';
import { Link } from 'react-router-dom';
import { addToWishList, removeFromWishList } from '../../../redux/features/wishListSlice';

const ProductDetailsCard = ({ data, setOpen }) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);

    const { cart } = useSelector(state => state.cart);
    const { wishList } = useSelector(state => state.wishList);
    const { allProducts } = useSelector(state => state.product);
    const dispatch = useDispatch();

    const handleIncrementCount = () => {
        setCount((prev) => prev + 1);
    };

    const handleDecrementCount = () => {
        setCount((prev) => (prev > 1) ? (prev - 1) : prev);
    };

    const addToCartHandler = (id) => {
        const isItemsExits = cart && cart.find(i => i._id === id);
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
        if (wishList && wishList.find(i => i._id === data._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishList, data])

    const handleAddToWishList = (data) => {
        setClick(!click);
        dispatch(addToWishList(data));
        localStorage.setItem("wishListItems", JSON.stringify([...wishList, data]));
        // toast.success("Item added to wishlist successfully");
    }

    const handleRemoveFromWishList = (data) => {
        setClick(!click);
        dispatch(removeFromWishList(data?._id));
        // toast.success("Item remove from wishlist successfully");
    }

    localStorage.setItem("wishListItems", JSON.stringify([...wishList]));

    const totalProduct = allProducts?.allProducts.filter(i => i?.shopId === data?.shopId);

    const totalReview = totalProduct.reduce((acc, i) => acc + i?.reviews.length, 0);

    const shopTotalRating = totalProduct.reduce((acc, i) => acc + (i?.ratings ? i.ratings : 0), 0);

    const shopAvgRating = shopTotalRating / totalReview;

    return (
        <div className='bg-white'>
            {data ? (
                <div className='fixed w-full h-screen bg-[#00000030] z-40 top-0 left-0 flex items-center justify-center'>
                    <div className='w-[90%] md:w-[60%] h-[90vh] md:h-[75vh] bg-white rounded-md shadow-sm relative p-4 overflow-y-scroll'>
                        <RxCross1 size={25} onClick={() => setOpen(false)} className='absolute right-3 top-3 z-50' />
                        <div className='w-full block md:flex'>
                            <div className='w-full md:w-1/2 '>
                                <img src={data.images[0]} alt="" />
                                <div className='flex items-center py-1 px-2'>
                                    <Link to={`/shop/${data?.shop._id}`}>
                                        <img src={data.shop.avatar} alt="" className='w-12 h-12 rounded-full object-cover' />
                                    </Link>
                                    <div>
                                        <Link to={`/shop/${data?.shop._id}`}>
                                            <p className='text-md font-medium text-teal-600 px-2'>{data.shop.name}</p>
                                        </Link>
                                        <p className='text-sm font-medium px-2'>{shopAvgRating ? `(${shopAvgRating}/5) Ratings` : "No review"}</p>
                                    </div>
                                </div>
                                {/* <div className='flex items-center bg-black w-fit px-4 py-2 rounded-md my-3 cursor-pointer mx-2'>
                                    <p className='text-white font-medium mr-2'>Send Message</p>
                                    <FiMessageCircle size={20} color='white' />
                                </div> */}
                                <p className='font-medium text-red-600 p-2'>({data.sold_out}) Sold out</p>
                            </div>

                            <div className='w-full md:w-1/2 pt-8 px-2'>
                                <p className='text-xl font-semibold '>{data.name}</p>
                                <p className='text-sm font-semibold py-2 text-gray-600'>{data.description}</p>
                                <div className='flex py-2'>
                                    <p className='text-xl font-medium '>{data.discountPrice}$</p>
                                    <p className='text-sm font-medium text-red-600 px-2 line-through'>{data.originalPrice ? data.originalPrice + "$" : null}</p>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <div>
                                        <button
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            onClick={handleDecrementCount}
                                        >
                                            -
                                        </button>
                                        <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                                            {count}
                                        </span>
                                        <button
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            onClick={handleIncrementCount}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div>
                                        {click ? <IoMdHeart size={30} color="red" onClick={() => handleRemoveFromWishList(data)} title='Remove from wishlist' className='cursor-pointer' /> :
                                            <IoMdHeartEmpty size={30} color="black" onClick={() => handleAddToWishList(data)} title='Add to wishlist' className='cursor-pointer' />}
                                    </div>
                                </div>

                                <div className='flex items-center bg-black w-fit px-4 py-2 rounded-md cursor-pointer my-6' onClick={() => addToCartHandler(data._id)}>
                                    <p className='text-white font-medium mr-2'>Add to Cart</p>
                                    <IoCartOutline size={20} color='white' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ProductDetailsCard;