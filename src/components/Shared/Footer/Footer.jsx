import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillYoutube,
    AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from 'react-router-dom';
import { footerProductLinks, footerSupportLinks, footercompanyLinks } from '../../../static/data';

const Footer = () => {
    return (
        <div className="w-full bg-gray-950">
            
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-500 w-full">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 px-8 md:px-12 py-10">
                    <div>
                        <p className="text-white text-2xl md:text-3xl font-black tracking-tight leading-tight">
                            Subscribe for news,<br className="hidden md:block" /> events &amp; offers
                        </p>
                        <p className="text-emerald-100 text-sm mt-1 font-medium">Join thousands of happy customers.</p>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 md:w-64 h-11 px-4 rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all duration-200"
                        />
                        <button className="h-11 px-5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold rounded-xl transition-colors duration-200 whitespace-nowrap active:scale-95">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            
            <div className="max-w-7xl mx-auto px-8 md:px-12 pt-14 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-800">
                    
                    <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <p className="text-2xl font-black text-white tracking-tight">
                            Panda<span className="text-emerald-400">Shop</span>
                        </p>
                        <p className="text-gray-400 text-sm mt-3 mb-5 leading-relaxed max-w-sm">
                            The home and elements needed to create beautiful products.
                        </p>
                        <div className="flex items-center justify-center lg:justify-start gap-3">
                            {[
                                { Icon: AiFillFacebook, label: "Facebook" },
                                { Icon: AiOutlineTwitter, label: "Twitter" },
                                { Icon: AiFillInstagram, label: "Instagram" },
                                { Icon: AiFillYoutube, label: "YouTube" },
                            ].map(({ Icon, label }) => (
                                <button
                                    key={label}
                                    title={label}
                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-800 hover:bg-emerald-500 text-gray-400 hover:text-white transition-all duration-200"
                                >
                                    <Icon size={18} />
                                </button>
                            ))}
                        </div>
                    </div>

                    
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
                        {[
                            { heading: "Company", links: footerProductLinks },
                            { heading: "Shop", links: footercompanyLinks },
                            { heading: "Support", links: footerSupportLinks },
                        ].map(({ heading, links }) => (
                            <div key={heading}>
                                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
                                    {heading}
                                </h3>
                                <ul className="space-y-2.5">
                                    {links && links.map((i, index) => (
                                        <li key={index}>
                                            <Link
                                                to={i.link}
                                                className="text-gray-400 hover:text-emerald-400 text-sm font-medium transition-colors duration-150"
                                            >
                                                {i.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-7 text-center md:text-left">
                    
                    <img
                        src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
                        alt="Payment methods"
                        className="h-8 object-contain opacity-60"
                    />
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Terms · Privacy Policy</p>
                        <p className="text-gray-500 text-sm font-medium">
                            © {new Date().getFullYear()} PandaShop, All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;