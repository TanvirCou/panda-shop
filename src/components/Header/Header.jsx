import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp, IoIosSearch, IoMdHeartEmpty } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import {productData, categoriesData} from "../../static/data";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Navbar from "../Navbar/Navbar";
import { IoCartOutline } from "react-icons/io5";
import { RxAvatar, RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/features/userSlice";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";


const Header = ({activeHeading}) => {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const [mobileSidebar, setMobileSidebar] = useState(false);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearch(term);

        const filteredData = productData && productData.filter((product) => product.name.toLowerCase().includes(term.toLowerCase()));
        setSearchData(filteredData);
    }

    window.addEventListener("scroll", () => {
        if(window.scrollY > 70) {
            setActive(true);
        } else {
            setActive(false);
        }
    });

    const {user, isAuthenticated} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, [])
    
    return (
        <div>
        <div className='w-full top-0 left-0'>
            <div className='hidden md:flex items-center justify-between bg-white h-[65px] md:px-12'>
                <div className='font-bold text-3xl cursor-pointer items-center font-[Poppins] 
                text-gray-800'>
                    Panda-Shop
                </div>

                <div className='w-[50%] relative '>
                    <input type="search" value={search} onChange={handleSearch} className='border border-teal-500 border-solid rounded-md w-full h-10 placeholder:font-medium px-2 focus:outline-teal-600' placeholder='Search product....'/>
                    <IoIosSearch size={25} className='absolute mx-1 right-0 top-2' />
                    <div className="absolute min-h-[30vh] z-[9] shadow-sm bg-slate-50">
                    {
                        (searchData && searchData.length !== 0) ? searchData.map((i, index) => {
                            return (
                                <Link to={`/product/${i.id}`} key={index}>
                                    <div className="w-full flex items-start py-3 px-3">
                                        <img src={i.image_Url[0].url} alt="" className="w-8 h-8 mr-3 object-cover"/>
                                        <p>{i.name}</p>
                                    </div>
                                </Link>
                            )
                        }) : null
                    }
                    </div>
                </div>

                <div className='flex items-center bg-black rounded-md px-3 py-2 cursor-pointer'>
                    <p className='font-medium text-white'>Become Seller</p>
                    <IoIosArrowForward size={15} className='text-white ml-1'/>
                </div>
                

            </div>
            </div>

        <div className={`${active ? "shadow-sm fixed top-0 left-0 z-10" : null} transition ease-in duration-500 w-full h-[70px] bg-teal-500 hidden md:flex items-center justify-between`}>
                    <div className="flex w-full justify-between px-20 items-center">
                        <div onClick={() => setDropdown(!dropdown)} className="relative px-3 hidden lg:flex h-[60px] w-[270px] bg-white mt-[10px] rounded-t-md">
                        <div className="absolute top-0 bottom-0 flex items-center">
                            <BiMenuAltLeft size={28}></BiMenuAltLeft>
                            <p className="font-medium text-lg px-1">All Categories</p>
                        </div>
                        {!dropdown ? <IoIosArrowDown size={25} className="absolute top-4 right-1 transition ease-in-out duration-500"/> :
                        <IoIosArrowUp size={25} className="absolute top-4 right-1"/>
                        }
                            {dropdown ? <Dropdown data={categoriesData} setDropdown={setDropdown}/>: null}
                            
                        </div>

                        <div>
                            <Navbar active={activeHeading}/>
                        </div>

                        <div className="flex items-center">
                            <div className="relative px-3 cursor-pointer" onClick={(() => setWishlistOpen(!wishlistOpen))}>
                                <IoMdHeartEmpty size={30} className="text-white"/>
                                <span className="absolute top-0 right-2 rounded-full bg-black text-white text-[12px] w-4 h-4 text-center p-0 m-0 leading-snug font-mono">0</span>
                            </div>
                            <div className="relative px-3 cursor-pointer" onClick={() => setCartOpen(!cartOpen)}>
                                <IoCartOutline size={30} className="text-white"/>
                                <span className="absolute top-0 right-2 rounded-full bg-black text-white text-[12px] w-4 h-4 text-center p-0 m-0 leading-snug font-mono">0</span>
                            </div>
                            <div className="relative px-3">
                                {
                                    isAuthenticated ? 
                                    <Link to="/profile">
                                    <img src={user.user.avatar} alt="" className="w-8 h-8 rounded-full object-cover"/>
                                    </Link> : 
                                    <Link to="/auth">
                                    <RxAvatar size={30} className="text-white"/>
                                    </Link>
                                }
                                
                                
                            </div>

                            {
                                cartOpen ? <Cart setCartOpen={setCartOpen}/> : null
                            }
                            {
                                wishlistOpen ? <Wishlist setWishlistOpen={setWishlistOpen}/> : null
                            }
                        </div>
                    </div>
        </div>

        <div className="w-full h-[65px] fixed top-0 left-0 bg-white block md:hidden">
            <div className="flex items-center justify-between px-4 h-full">
                <div>
                    <BiMenuAltLeft size={35} className="cursor-pointer" onClick={() => setMobileSidebar(true)}/>
                </div>
                <p className="text-3xl font-semibold font-[poppins]">Panda-Shop</p>
                <div className="relative px-3 cursor-pointer" onClick={() => setCartOpen(!cartOpen)}>
                    <IoCartOutline size={30} className="text-black"/>
                    <span className="absolute top-0 right-2 rounded-full bg-teal-500 text-white text-[12px] w-4 h-4 text-center p-0 m-0 leading-snug font-mono">0</span>
                </div>

            {
                mobileSidebar ? 
                <div className='fixed top-0 left-0 w-full h-screen bg-[#0000004d] z-10'>
                    <div className='transition duration-500 ease-in fixed top-0 left-0 bg-white min-h-full w-[65%] shadow-sm flex flex-col overflow-y-scroll '>
                        <div className="flex items-center justify-between w-full px-2 py-2">
                    <div className="relative cursor-pointer" onClick={(() => setWishlistOpen(!wishlistOpen))}>
                                <IoMdHeartEmpty size={30} color="black"/>
                                <span className="absolute top-0 right-0 rounded-full bg-teal-500 text-white text-[12px] w-4 h-4 text-center p-0 m-0 leading-snug font-mono">0</span>
                            </div>
                    <div className=''>
                            <RxCross2 size={30} className='cursor-pointer' onClick={() => setMobileSidebar(false)} />
                        </div>
                        </div>
                        <div className="py-2 flex justify-center">
                        <div className='w-[90%] relative'>
                    <input type="search" value={search} onChange={handleSearch} className='border border-teal-500 border-solid rounded-md w-full h-10 placeholder:font-medium px-2 focus:outline-teal-600' placeholder='Search product....'/>
                    <IoIosSearch size={25} className='absolute mx-1 right-0 top-2' />
                    <div className="absolute min-h-[30vh] z-[9] shadow-sm bg-slate-50">
                    {
                        (searchData && searchData.length !== 0) ? searchData.map((i, index) => {
                            return (
                                <Link to={`/product/${i.id}`} key={index}>
                                    <div className="w-full flex items-center py-2">
                                        <img src={i.image_Url[0].url} alt="" className="w-12 h-12 mr-3 object-cover"/>
                                        <p className="w-3/4 ">{i.name}</p>
                                    </div>
                                </Link>
                            )
                        }) : null
                    }
                    </div>
                </div>
                        </div>
                        <Navbar active={activeHeading}/>
                        <div className='flex items-center bg-black rounded-md px-4 py-2 mx-4 my-3 w-fit cursor-pointer'>
                            <p className='font-medium text-white'>Become Seller</p>
                            <IoIosArrowForward size={15} className='text-white ml-1'/>
                        </div>
                    </div> 
                </div>
                
                : null
            }

            
            </div>
        </div>
    </div>
    );
};

export default Header;