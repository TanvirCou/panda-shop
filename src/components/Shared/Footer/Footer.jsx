import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillYoutube,
    AiOutlineTwitter,
} from "react-icons/ai";
import { footerProductLinks, footerSupportLinks, footercompanyLinks } from '../../../static/data';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-black w-full'>
            <div className='bg-teal-500 w-full block md:flex justify-between items-center py-10 px-8'>
                <p className='text-white text-3xl font-medium leading-10'><span className='text-gray-800'>Subscribe</span> us for get news <br /> events and offers</p>
                <div>
                    <input type="email" placeholder='Enter your email' className='h-10 w-60 px-2 rounded-md placeholder:font-medium focus:outline-gray-600' />
                    <button className='w-fit px-3 py-2 mx-2 rounded-md bg-black text-white font-medium'>Submit</button>
                </div>
            </div>

            <div className='w-full px-8 pt-12 pb-12 lg:pb-8 '>
                <div className='block lg:flex'>
                    <div className='w-full lg:w-1/4 text-white text-center lg:text-start lg:px-4 px-0 pb-10 lg:pb-0'>
                        <p className='text-3xl font-bold'>Panda-Chat</p>
                        <p className='text-sm pt-5 pb-4'>The home and elements needed to <br /> create beautiful products.</p>
                        <div className='flex items-center justify-center lg:justify-start'>
                            <AiFillFacebook size={25} className="cursor-pointer" />
                            <AiOutlineTwitter size={25} className='ml-[15px] cursor-pointer' />
                            <AiFillInstagram size={25} className='ml-[15px] cursor-pointer' />
                            <AiFillYoutube size={25} className='ml-[15px] cursor-pointer' />
                        </div>
                    </div>

                    <div className='w-full lg:w-3/4'>
                        <div className='block lg:flex justify-around'>
                            <ul className='text-center lg:text-start pb-10 lg:pb-0'>
                                <h1 className='text-lg font-semibold text-white'>Company</h1>
                                {footerProductLinks && footerProductLinks.map((i, index) => (
                                    <li key={index}>
                                        <Link to={i.link} className='text-gray-500 leading-6 text-sm font-medium'>
                                            {i.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <ul className='text-center lg:text-start pb-10 lg:pb-0'>
                                <h1 className='text-lg font-semibold text-white'>Shop</h1>
                                {footercompanyLinks && footercompanyLinks.map((i, index) => (
                                    <li key={index}>
                                        <Link to={i.link} className='text-gray-500 leading-6 text-sm font-medium'>
                                            {i.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <ul className='text-center lg:text-start pb-10 lg:pb-0'>
                                <h1 className='text-lg font-semibold text-white'>Support</h1>
                                {footerSupportLinks && footerSupportLinks.map((i, index) => (
                                    <li key={index}>
                                        <Link to={i.link} className='text-gray-500 leading-6 text-sm font-medium'>
                                            {i.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='block lg:flex justify-around items-center pt-6 lg:pt-[56px] text-center lg:text-start'>
                    <div className='pb-4 lg:pb-0 flex justify-center'>
                        <img src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75" alt="" className='' />
                    </div>
                    <p className='text-gray-500 text-sm font-medium py-2 lg:py-0'>Terms · Privacy Policy</p>
                    <p className='text-gray-500 text-sm font-medium py-2 lg:py-0'>© {new Date().getFullYear()} No-One, All rights reserved.</p>

                </div>
            </div>
        </div>
    );
};

export default Footer;