/* eslint-disable react/prop-types */
import { IoBagHandleOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import SingleCart from './SingleCart';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../redux/features/cartSlice';
import { Link } from 'react-router-dom';

const Cart = ({ setCartOpen }) => {
    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data._id));

    };

    localStorage.setItem("cartItems", JSON.stringify([...cart]));

    const quantityChangeHandler = (data) => {
        dispatch(addToCart(data));

    }


    const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);

    return (
        <div className='fixed top-0 left-0 w-full h-screen bg-[#0000004d] z-10'>
            <div className='transition duration-500 ease-in fixed top-0 right-0 bg-white min-h-full w-[70%] md:w-[25%] shadow-sm '>
                {
                    cart && cart.length === 0 ? (
                        <div className="w-full h-screen">
                            <div className='flex justify-end pt-3 pr-3'>
                                <RxCross2 size={25} className='cursor-pointer' onClick={() => setCartOpen(false)} />
                            </div>
                            <div className="w-full h-screen flex items-center justify-center">
                                <p className="text-ms font-medium">Cart item is empty</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-between h-screen w-full">
                            <div>
                                <div className='flex justify-end pt-3 pr-3'>
                                    <RxCross2 size={25} className='cursor-pointer' onClick={() => setCartOpen(false)} />
                                </div>

                                <div className='flex items-center p-4'>
                                    <IoBagHandleOutline size={25} />
                                    <p className='font-medium pl-2'>{cart && cart.length} Items</p>
                                </div>

                                <div className='w-full border-t'>
                                    {cart && cart.map((i, index) => <SingleCart data={i} key={index} quantityChangeHandler={quantityChangeHandler} removeFromCartHandler={removeFromCartHandler} />)}
                                </div>

                            </div>

                            <Link to="/checkout" state={{ subTotal: totalPrice }}>
                                <button className=' w-full bg-red-600 mx-4 my-2 py-2 rounded-md text-white font-medium hover:bg-red-700 hover:text-gray-300'>Checkout now (US${totalPrice})</button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Cart;