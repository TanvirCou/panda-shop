/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp, IoIosSearch, IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { RxAvatar, RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import Dropdown from "./Dropdown";
import Navbar from "./Navbar";

const Header = ({ activeHeading }) => {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const [mobileSidebar, setMobileSidebar] = useState(false);

    const { shop } = useSelector(state => state.shop);
    const { cart } = useSelector(state => state.cart);
    const { allProducts } = useSelector(state => state.product);
    const { wishList } = useSelector(state => state.wishList);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearch(term);
        const filteredData = allProducts && allProducts.allProducts.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchData(filteredData);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 70) {
                setActive(true);
            } else {
                setActive(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { user, isAuthenticated } = useSelector(state => state.user);
    console.log(user);

    return (
        <div>
            
            <div className="w-full top-0 left-0 relative z-[110]">
                <div className="hidden md:flex items-center justify-between bg-white h-[70px] md:px-12 border-b border-gray-100 shadow-sm">
                    
                    <Link to="/">
                        <div className="flex items-center gap-1 cursor-pointer select-none">
                            <span className="text-2xl font-black text-gray-900 tracking-tight">
                                Panda<span className="text-emerald-500">Shop</span>
                            </span>
                        </div>
                    </Link>

                    
                    <div className="w-[48%] relative">
                        <div className="relative flex items-center">
                            <IoIosSearch
                                size={18}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                            <input
                                type="search"
                                value={search}
                                onChange={handleSearch}
                                className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 shadow-sm transition-all duration-200"
                                placeholder="Search for products…"
                            />
                        </div>
                        
                        {search && (
                            <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-[120] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden text-center md:text-left">
                                {searchData && searchData.length !== 0 ? (
                                    searchData.map((i, index) => (
                                        <Link to={`/product/${i._id}`} key={index}>
                                            <div className="flex items-center justify-center md:justify-start gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors duration-150 border-b border-gray-50 last:border-0">
                                                <img src={i.images[0]} alt="" className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                                                <p className="text-sm text-gray-700 font-medium truncate">{i.name}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center md:justify-start gap-2 px-4 py-4 text-gray-400">
                                        <span className="text-xl">🔍</span>
                                        <p className="text-sm font-medium">No products found for <span className="text-gray-600 font-semibold">&ldquo;{search}&rdquo;</span></p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    
                    <Link to="/shop-auth">
                        <div className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 rounded-xl px-4 py-2.5 cursor-pointer transition-colors duration-200 group">
                            <p className="text-sm font-semibold text-white">
                                {shop && shop?.shop ? "Go to Shop" : "Become Seller"}
                            </p>
                            <IoIosArrowForward size={13} className="text-gray-400 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </div>
                    </Link>
                </div>
            </div>

            
            <div
                className={`${active ? "shadow-lg fixed top-0 left-0 z-[100]" : "relative z-[100]"
                    } transition-all duration-300 w-full h-[60px] bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-500 hidden md:flex items-center justify-between`}
            >
                <div className="flex w-full justify-between px-4 lg:px-12 items-center h-full">
                    
                    <div
                        onClick={() => setDropdown(!dropdown)}
                        className="cursor-pointer relative flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm px-4 h-10 rounded-xl border border-white/20 transition-all duration-200"
                    >
                        <BiMenuAltLeft size={22} className="text-white" />
                        <p className="font-medium text-sm text-white hidden lg:block">All Categories</p>
                        <span className="hidden lg:block text-white/70">
                            {!dropdown
                                ? <IoIosArrowDown size={16} className="transition-transform duration-300" />
                                : <IoIosArrowUp size={16} className="transition-transform duration-300" />
                            }
                        </span>
                        {dropdown && <Dropdown data={categoriesData} setDropdown={setDropdown} />}
                    </div>

                    
                    <div>
                        <Navbar active={activeHeading} />
                    </div>

                    
                    <div className="flex items-center gap-1">
                        
                        <button
                            onClick={() => setWishlistOpen(!wishlistOpen)}
                            className="relative flex items-center justify-center w-10 h-10 rounded-xl text-white hover:bg-white/15 transition-colors duration-200"
                        >
                            <IoMdHeartEmpty size={22} />
                            {wishList && wishList.length > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                    {wishList.length}
                                </span>
                            )}
                        </button>

                        
                        <button
                            onClick={() => setCartOpen(!cartOpen)}
                            className="relative flex items-center justify-center w-10 h-10 rounded-xl text-white hover:bg-white/15 transition-colors duration-200"
                        >
                            <IoCartOutline size={22} />
                            {cart && cart.length > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                    {cart.length}
                                </span>
                            )}
                        </button>

                        
                        <div className="flex items-center justify-center w-10 h-10 ml-1">
                            {isAuthenticated ? (
                                <Link to="/profile">
                                    <img
                                        src={user.user.avatar}
                                        alt=""
                                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white/50 hover:ring-white transition-all duration-200"
                                    />
                                </Link>
                            ) : (
                                <Link to="/auth">
                                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 transition-colors duration-200">
                                        <RxAvatar size={20} className="text-white" />
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            
            {cartOpen && <Cart setCartOpen={setCartOpen} />}
            {wishlistOpen && <Wishlist setWishlistOpen={setWishlistOpen} />}

            
            <div className="w-full h-[60px] fixed top-0 left-0 bg-white block md:hidden z-[100] border-b border-gray-100 shadow-sm">
                <div className="flex items-center justify-between px-4 h-full">
                    
                    <button
                        className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setMobileSidebar(true)}
                    >
                        <BiMenuAltLeft size={26} className="text-gray-700" />
                    </button>

                    
                    <Link to="/">
                        <span className="text-xl font-black text-gray-900 tracking-tight">
                            Panda<span className="text-emerald-500">Shop</span>
                        </span>
                    </Link>

                    
                    <button
                        onClick={() => setCartOpen(!cartOpen)}
                        className="relative flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                        <IoCartOutline size={22} className="text-gray-700" />
                        {cart && cart.length > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            
            {mobileSidebar &&
                ReactDOM.createPortal(
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[130]" onClick={() => setMobileSidebar(false)}>
                        <div
                            className="absolute top-0 left-0 h-full w-[72%] max-w-[300px] bg-white shadow-2xl flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            
                            <div className="relative flex items-center justify-center px-5 py-4 border-b border-gray-100">
                            <span className="text-lg font-black text-gray-900 tracking-tight">
                                Panda<span className="text-emerald-500">Shop</span>
                            </span>
                            <button
                                onClick={() => setMobileSidebar(false)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                            >
                                <RxCross2 size={18} className="text-gray-600" />
                            </button>
                        </div>

                            
                            <div className="px-4 py-3 border-b border-gray-50">
                                <div className="relative">
                                    <IoIosSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input
                                        type="search"
                                        value={search}
                                        onChange={handleSearch}
                                        className="w-full h-10 pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 transition-all duration-200"
                                        placeholder="Search products…"
                                    />
                                </div>
                                {search && (
                                    <div className="mt-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden max-h-[35vh] overflow-y-auto text-center">
                                        {searchData && searchData.length !== 0 ? (
                                            searchData.map((i, index) => (
                                                <Link to={`/product/${i._id}`} key={index}>
                                                    <div className="flex items-center justify-center gap-3 px-3 py-2.5 hover:bg-emerald-50 border-b border-gray-50 last:border-0">
                                                        <img src={i?.images[0]} alt="" className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                                                        <p className="text-sm text-gray-700 font-medium truncate">{i?.name}</p>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="flex items-center justify-center gap-2 px-3 py-3.5 text-gray-400">
                                                <span className="text-lg">🔍</span>
                                                <p className="text-sm font-medium">No products found for <span className="text-gray-600 font-semibold">&ldquo;{search}&rdquo;</span></p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            
                            <div className="flex-1 overflow-y-auto py-2">
                                <Navbar active={activeHeading} />
                            </div>

                            
                            <div className="p-4 border-t border-gray-100 space-y-3">
                                
                                <button
                                    onClick={() => { setWishlistOpen(!wishlistOpen); setMobileSidebar(false); }}
                                    className="flex items-center justify-center gap-3 w-full px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <div className="relative">
                                        <IoMdHeartEmpty size={22} className="text-gray-600" />
                                        {wishList && wishList.length > 0 && (
                                            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                                {wishList.length}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Wishlist</span>
                                </button>

                                
                                <Link to="/shop-auth">
                                <div className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 rounded-xl px-4 py-2.5 cursor-pointer transition-colors duration-200 group">
                                    <p className="text-sm font-semibold text-white">
                                        {shop && shop?.shop ? "Go to Shop" : "Become Seller"}
                                    </p>
                                    <IoIosArrowForward size={13} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </Link>

                                
                                <div className="flex justify-center pt-1 pb-2">
                                    {isAuthenticated ? (
                                        <Link to="/profile">
                                            <img src={user.user.avatar} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-200" />
                                        </Link>
                                    ) : (
                                        <Link to="/auth" className="w-full">
                                            <div className="flex items-center justify-center gap-2 w-full h-10 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-colors duration-200">
                                                <RxAvatar size={18} className="text-white" />
                                                <span className="text-sm font-semibold text-white">Login / Register</span>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )
            }
        </div>
    );
};

export default Header;
