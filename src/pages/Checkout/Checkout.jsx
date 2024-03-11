import React, { useEffect, useState } from 'react';
import Header from '../../components/Shared/Header/Header';
import Footer from '../../components/Shared/Footer/Footer';
import CheckoutBar from '../../components/Checkout/CheckoutBar';
import Shipping from '../../components/Checkout/Shipping';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Payment from '../../components/Checkout/Payment';
import { CardNumberElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Complete from '../../components/Checkout/Complete';
import { emptyCart } from '../../redux/features/cartSlice';

const Checkout = () => {
    const { user } = useSelector(state => state.user);
    const { cart } = useSelector(state => state.cart);



    const [active, setActive] = useState(1);
    const [name, setName] = useState(user?.user.name);
    const [email, setEmail] = useState(user?.user.email);
    const [phoneNumber, setPhoneNumber] = useState(user?.user.phoneNumber);
    const [zipCode, setZipCode] = useState();
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [couponCode, setCouponCode] = useState();
    const [couponCodeData, setCouponCodeData] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [orderData, setOrderData] = useState();
    const [shippingData, setShippingData] = useState();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("latestOrder"));
        setOrderData(data.orderData);
        setShippingData(data.shippingAddress);
    }, [active]);

    console.log(shippingData);

    const location = useLocation();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCode = async (e) => {
        e.preventDefault();
        const name = couponCode;

        const res = await axios.get(`http://localhost:3000/api/coupon-code/get-coupon-value/${name}`);

        const shopId = res.data.couponCode?.shopId;
        const couponCodeValue = res.data.couponCode?.value

        if (res.data.couponCode !== null) {
            const isCouponValid = cart && cart.filter(i => i.shopId === shopId);

            if (isCouponValid.length === 0) {
                toast.error("Coupon code not valid for this shop");
                setCouponCode("");
            } else {
                const eligiblePrice = isCouponValid.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)
                const discountPrice = (eligiblePrice * couponCodeValue) / 100;
                setDiscountPrice(discountPrice);
                setCouponCodeData(res.data.couponCode);
            }
        }

        if (res.data.couponCode === null) {
            toast.error("Coupon code doesn't exits");
            setCouponCode("");
        }
    }

    const subTotal = location.state.subTotal;


    const shipping = (subTotal * 0.1);

    const discountPercentage = couponCodeData ? discountPrice : "";

    const totalPrice = couponCodeData ? (subTotal + shipping - discountPercentage).toFixed(2) : (subTotal + shipping).toFixed(2);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleGoToPayment = (e) => {
        e.preventDefault();

        const shippingAddress = {
            country,
            city,
            zipCode,
            address1,
            address2
        };

        const orderData = {
            subTotal,
            shipping,
            discountPrice,
            discountPercentage,
            totalPrice,
            user,
            cart
        };

        localStorage.setItem("latestOrder", JSON.stringify({ shippingAddress, orderData }));
        setActive(2);
    };

    const order = {
        cart: orderData?.cart,
        shippingAddress: shippingData,
        user: user && user.user,
        totalPrice: orderData?.totalPrice
    };

    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "Sunflower",
                        amount: {
                            currency_code: "USD",
                            value: orderData?.totalPrice,
                        },
                    },
                ],
                // not needed if a shipping address is actually needed
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderID) => {
                return orderID;
            });
    };

    const onApprove = async (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;

            let paymentInfo = payer;

            if (paymentInfo !== undefined) {
                paypalPaymentHandler(paymentInfo);
            }
        });
    };


    const paypalPaymentHandler = async (paymentInfo) => {
        order.paymentInfo = {
            id: paymentInfo.payer_id,
            status: "succeeded",
            type: "Paypal",
        };

        try {
            const res = await axios.post("http://localhost:3000/api/order/create-order", order);
            toast.success("order successfully");
            console.log(res.data)
            setActive(3);
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
        } catch (err) {
            toast.error(err);
        }

    };

    const paymentData = {
        amount: Math.round(orderData?.totalPrice * 100)
    };



    const paymentHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/api/payment/process", paymentData);

            const client_secret = res.data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                },
            });

            if (result.error) {
                toast.error(result.error.message);
            } else {
                console.log(result);
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                        type: "Credit Card"
                    };

                    const res = await axios.post("http://localhost:3000/api/order/create-order", order);
                    toast.success("order successfully");
                    console.log(res.data)
                    setActive(3);
                    localStorage.setItem("cartItems", JSON.stringify([]));
                    localStorage.setItem("latestOrder", JSON.stringify([]));
                    dispatch(emptyCart());
                    // setTimeout(() => {

                    //     navigate("/");
                    //     window.location.reload();

                    // }, 5000);
                }
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const cashOnDelivery = async (e) => {
        e.preventDefault();

        order.paymentInfo = {
            type: "Cash on Delivery",
        };

        try {
            const res = await axios.post("http://localhost:3000/api/order/create-order", order);
            toast.success("order successfully");
            console.log(res.data)
            setActive(3);
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            dispatch(emptyCart());
            // setTimeout(() => {

            //     navigate("/");
            //     window.location.reload();

            // }, 5000);
        } catch (err) {
            toast.error(err);
        }

    };

    return (
        <div className='bg-gray-100'>
            <Header />
            <CheckoutBar active={active} />
            {
                active === 1 && <Shipping setActive={setActive} name={name} setName={setName} email={email} setEmail={setEmail} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} zipCode={zipCode} setZipCode={setZipCode} country={country} setCountry={setCountry} city={city} setCity={setCity} address1={address1} setAddress1={setAddress1} address2={address2} setAddress2={setAddress2} user={user}
                    handleCode={handleCode}
                    subTotal={subTotal}
                    shipping={shipping}
                    discountPercentage={discountPercentage}
                    totalPrice={totalPrice}
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                    handleGoToPayment={handleGoToPayment} />

            }
            {
                active === 2 && <Payment
                    orderData={orderData}
                    user={user}
                    open={open}
                    setOpen={setOpen}
                    onApprove={onApprove}
                    createOrder={createOrder}
                    paypalPaymentHandler={paypalPaymentHandler}
                    paymentHandler={paymentHandler}
                    cashOnDelivery={cashOnDelivery}

                />
            }

            {
                active === 3 && <Complete />
            }
            <Footer />
        </div>
    );
};

export default Checkout;