/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty, IoMdStar, IoMdStarOutline } from "react-icons/io";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList } from '../../../redux/features/wishListSlice';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/features/cartSlice';

const ProductCart = ({ data, isEvent }) => {
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const { wishList } = useSelector(state => state.wishList);
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

    return (
        <div>
            <div className='w-full h-[340px] my-2 md:my-0 bg-white rounded-md shadow-sm relative'>
                <div>
                    <Link to={isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}>
                        <div className='h-[170px] w-full flex items-center justify-center py-3 px-4'>
                            <img src={data.images ? data.images[0] : ""} alt="" className='h-full w-full object-contain' />
                        </div>
                    </Link>
                    <div className='px-4'>
                        <div>
                            <Link to={`/shop/${data?.shop._id}`}>
                                <p className='text-sm font-medium text-teal-600 py-3'>{data.shop.name}</p>
                            </Link>
                        </div>
                        <Link to={isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}>
                            <p className='text-sm font-medium'>{data.name.length > 45 ? data.name.slice(0, 45) + " ...." : data.name}</p>
                            <div className='flex items-center py-2'>
                                <IoMdStar size={22} color='orange' className='mr-1' />
                                <IoMdStar size={22} color='orange' className='mr-1' />
                                <IoMdStar size={22} color='orange' className='mr-1' />
                                <IoMdStar size={22} color='orange' className='mr-1' />
                                <IoMdStarOutline size={22} color='orange' className='mr-1' />
                            </div>
                            <div className='flex items-center justify-between py-1'>
                                <div className='flex'>
                                    <p className='text-xl font-medium text-gray-600'>{data.originalPrice === 0 ? data.originalPrice : data.discountPrice}$</p>
                                    <p className='text-sm font-medium text-red-600 px-2 line-through'>{data.originalPrice ? data.originalPrice + "$" : null}</p>
                                </div>
                                <p className='font-medium text-green-600'>{data.sold_out} sold</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div>
                    {click ? <IoMdHeart size={25} color="red" onClick={() => handleRemoveFromWishList(data)} title='Remove from wishlist' className='absolute top-5 right-2 cursor-pointer' /> :
                        <IoMdHeartEmpty size={25} color="black" onClick={() => handleAddToWishList(data)} title='Add to wishlist' className='absolute top-5 right-2 cursor-pointer' />}

                    <IoEyeOutline size={25} color="black" onClick={() => setOpen(!open)} title='Quick view' className='absolute top-14 right-2 cursor-pointer' />

                    <IoCartOutline size={25} color="black" title='Add to cart' className='absolute top-24 right-2 cursor-pointer' onClick={() => addToCartHandler(data?._id)} />
                    {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
                </div>
            </div>
        </div>
    );
};

export default ProductCart;