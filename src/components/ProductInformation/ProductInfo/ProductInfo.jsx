/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishList, removeFromWishList } from "../../../redux/features/wishListSlice";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/features/cartSlice";
import axios from "axios";


const ProductInfo = ({ data, eventData }) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);

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
        if (wishList && wishList.find(i => i._id === data?._id)) {
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

    const handleClick = async (shopId) => {
        try {

            const res = await axios.post(`https://panda-shop.onrender.com/api/chat/createChat`, { userId: shopId }, { withCredentials: true });
            console.log(res.data);
            // if (!chats.find(c => c._id === res.data._id)) {
            //     setChats([res.data, ...chats]);
            // }

            // setSelectedChat(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const totalProduct = allProducts?.allProducts.filter(i => i?.shopId === data?.shopId);

    const totalReview = totalProduct.reduce((acc, i) => acc + i?.reviews.length, 0);

    const shopTotalRating = totalProduct.reduce((acc, i) => acc + (i?.ratings ? i.ratings : 0), 0);

    const shopAvgRating = shopTotalRating / totalReview;

    return (
        <>
            {
                data ?
                    <div className='py-6 w-full flex justify-center'>
                        <div className='w-[90%]'>
                            <div className='block md:flex w-full'>
                                {
                                    eventData ?
                                        <div className='w-full md:w-1/2 flex flex-col items-center mt-10'>
                                            <img src={data?.images} alt="" className="w-[60%]" />
                                        </div> :
                                        <div className='w-full md:w-1/2 flex flex-col items-center '>
                                            <img src={data?.images[select]} alt="" className="w-[60%]" />
                                            <div className="flex flex-wrap justify-center items-center pt-2">
                                                {
                                                    data?.images.map((i, index) => (
                                                        <div key={index} className={`${select === index ? "border-2 border-gray-200 shadow-sm rounded-md" : null} cursor-pointer pr-2`} onClick={() => setSelect(index)}>
                                                            <img src={i} alt="" className="w-[200px]" />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                }


                                <div className='w-full md:w-1/2 pt-8 px-6'>
                                    <p className='text-2xl font-semibold '>{data.name}</p>
                                    <p className='text-base font-medium py-2 text-gray-600'>{data.description}</p>
                                    <div className='flex py-2'>
                                        <p className='text-2xl font-medium'>{data.discountPrice}$</p>
                                        <p className='text-base font-medium text-red-600 px-2 line-through'>{data.originalPrice ? data.originalPrice + "$" : null}</p>
                                    </div>

                                    <div className='flex items-center justify-between pt-2 pr-2'>
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

                                    <div onClick={() => addToCartHandler(data?._id)} className='flex items-center bg-black w-fit px-4 py-2 rounded-md cursor-pointer my-6'>
                                        <p className='text-white font-medium mr-2'>Add to Cart</p>
                                        <IoCartOutline size={20} color='white' />
                                    </div>


                                    <div className="flex items-center">

                                        <div className='flex items-center py-2 mr-6'>
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

                                        <div className='flex items-center bg-teal-600 w-fit px-4 py-2 rounded-md cursor-pointer' onClick={() => handleClick(data?.shop._id)}>
                                            <p className='text-white font-medium mr-2'>Send Message</p>
                                            <FiMessageCircle size={20} color='white' />
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    : null
            }
        </>
    );
};

export default ProductInfo;