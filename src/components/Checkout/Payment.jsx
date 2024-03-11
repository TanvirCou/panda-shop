/* eslint-disable react/prop-types */
import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../../App.css";
import LoadingAnimation from "../Loader/LoadingAnimation";

import { CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { RxCross1 } from 'react-icons/rx';

const Payment = ({ orderData, user, open, setOpen, onApprove, createOrder, paymentHandler, cashOnDelivery }) => {

    const [active, setActive] = useState(null);

    return (
        <>
            {
                !orderData ? <LoadingAnimation /> :
                    <div className='w-full flex flex-col items-center my-6'>
                        <div className='w-11/12 md:w-9/12 md:flex'>
                            <div className='w-full md:w-8/12 bg-white px-4 pt-2 pb-6 rounded-md h-fit'>
                                <div className='py-3 px-2'>
                                    <div>
                                        <input type="radio" id='debit-credit' onClick={() => setActive(1)} name='payment' />
                                        <label htmlFor="debit-credit" className='text-base font-medium ml-4'>Pay with debit/credit card</label>
                                        {
                                            active === 1 &&
                                            <div>
                                                <div className='flex flex-wrap justify-between'>
                                                    <div className='flex flex-col pt-3 '>
                                                        <label className='text-sm text-gray-500 font-medium'>Name on Card</label>
                                                        <input type="text" value={user?.user.name} className='w-[300px] md:w-[300px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your card number' />
                                                    </div>

                                                    <div className='flex flex-col pt-3 '>
                                                        <label className='text-sm text-gray-500 font-medium'>Exp Date</label>
                                                        <CardExpiryElement
                                                            className='w-[300px] md:w-[300px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 py-1.5 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1'
                                                            options={{
                                                                style: {
                                                                    base: {
                                                                        fontSize: "15px",
                                                                        lineHeight: 1.5,
                                                                        color: "#444",
                                                                    },
                                                                    empty: {
                                                                        color: "3a120a",
                                                                        backgroundColor: "transparent",
                                                                        "::placeholder": {
                                                                            color: "#444",
                                                                        },
                                                                    },
                                                                }
                                                            }}
                                                        />
                                                        {/* <input type="text"   placeholder='Enter your exp date' /> */}
                                                    </div>

                                                    <div className='flex flex-col pt-3 '>
                                                        <label className='text-sm text-gray-500 font-medium'>Card Number</label>
                                                        <CardNumberElement
                                                            className='w-[300px] md:w-[300px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 py-1.5 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1'
                                                            options={{
                                                                style: {
                                                                    base: {
                                                                        fontSize: "15px",
                                                                        lineHeight: 1.5,
                                                                        color: "#444",
                                                                    },
                                                                    empty: {
                                                                        color: "3a120a",
                                                                        backgroundColor: "transparent",
                                                                        "::placeholder": {
                                                                            color: "#444",
                                                                        },
                                                                    },
                                                                }
                                                            }}
                                                        />
                                                    </div>

                                                    <div className='flex flex-col pt-3 '>
                                                        <label className='text-sm text-gray-500 font-medium'>CVV</label>
                                                        <CardCvcElement
                                                            className='w-[300px] md:w-[300px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 py-1.5 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1'
                                                            options={{
                                                                style: {
                                                                    base: {
                                                                        fontSize: "15px",
                                                                        lineHeight: 1.5,
                                                                        color: "#444",
                                                                    },
                                                                    empty: {
                                                                        color: "3a120a",
                                                                        backgroundColor: "transparent",
                                                                        "::placeholder": {
                                                                            color: "#444",
                                                                        },
                                                                    },
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <button onClick={paymentHandler} className='py-1.5 px-4 bg-teal-600 text-white text-md font-medium rounded-md mt-3'>Submit</button>
                                            </div>
                                        }
                                    </div>

                                    {/* <div className='mt-3'>
                            <input type="radio" id='paypal' onClick={() => setActive(2)} name='payment' />
                            <label htmlFor="paypal" className='text-base font-medium ml-4'>Pay with Paypal</label>
                            {
                                active === 2 &&
                                <div>
                                    <button onClick={() => setOpen(true)} className='py-1.5 px-4 bg-teal-600 text-white text-md font-medium rounded-md mt-3'>Pay with Paypal</button>
                                </div>
                            }
                        </div> */}

                                    {
                                        open &&
                                        <div className='fixed w-full h-screen bg-[#00000030] z-40 top-0 left-0 flex items-center justify-center'>
                                            <div className='w-[90%] md:w-[40%] h-[90vh] md:h-[70vh] bg-white rounded-md shadow-sm relative p-4 overflow-y-scroll webkit'>
                                                <RxCross1 size={25} onClick={() => setOpen(false)} className='absolute right-3 top-3 z-50' />
                                                <PayPalScriptProvider
                                                    options={{
                                                        "client-id":
                                                            "ARmcBNbGK01E-Dg0IBdUrxTvQXjfUwflz2x9ibfvOb5fRRTS5Te3U3cnHrJkQV7vigmUqE6ndm5rHfaG", components: "buttons"
                                                    }}
                                                >
                                                    <PayPalButtons
                                                        style={{ layout: "vertical" }}
                                                        onApprove={onApprove}
                                                        createOrder={createOrder}
                                                    />
                                                </PayPalScriptProvider>
                                            </div>
                                        </div>
                                    }

                                    <div className='mt-3'>
                                        <input type="radio" id='paypal' onClick={() => setActive(3)} name='payment' />
                                        <label htmlFor="paypal" className='text-base font-medium ml-4'>Cash on Delivery</label>
                                        {
                                            active === 3 &&
                                            <div>
                                                <button onClick={cashOnDelivery} className='py-1.5 px-4 bg-teal-600 text-white text-md font-medium rounded-md mt-3'>Confirm</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='w-full md:w-4/12 h-fit bg-white mt-8 md:mt-0 md:ml-4 px-2 pt-6 pb-6 rounded-md'>
                                <div className='flex justify-between items-center font-medium shadow-sm bg-gray-100 px-2 py-1 rounded-md'>
                                    <p>Sub-Total</p>
                                    <p>${orderData?.subTotal}</p>
                                </div>
                                <div className='flex justify-between items-center font-medium shadow-sm bg-gray-100 px-2 py-1 rounded-md my-2'>
                                    <p>Shipping</p>
                                    <p>${orderData?.shipping.toFixed(2)}</p>
                                </div>
                                <div className='flex justify-between items-center font-medium shadow-sm bg-gray-100 px-2 py-1 rounded-md mb-2'>
                                    <p>Discount</p>
                                    <p>{orderData?.discountPercentage ? `- $${orderData?.discountPercentage.toString()}` : ""}</p>
                                </div>
                                <div className='flex justify-end items-center font-medium shadow-sm bg-gray-100 px-2 py-1 rounded-md'>
                                    <p>${orderData?.totalPrice}</p>
                                </div>

                                {/* <input type="text" className='border-2 border-gray-200 w-full h-8 mt-6 rounded-md text-sm px-2 font-medium focus:border-teal-600' value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder='Enter Coupon Code' />

                    <button onClick={handleCode} className='w-full bg-black text-white  py-1.5 px-8 mt-6 rounded-md font-medium'>Apply code</button> */}

                            </div>
                        </div>
                    </div>
            }
        </>

    );
};

export default Payment;