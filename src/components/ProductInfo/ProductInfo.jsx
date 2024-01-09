import { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";


const ProductInfo = ({ data }) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);

    const handleIncrementCount = () => {
        setCount((prev) => prev + 1);
    };

    const handleDecrementCount = () => {
        setCount((prev) => (prev > 1) ? (prev - 1) : prev);
    };

    return (
        <>
            {
                data ?
                    <div className='py-6 w-full flex justify-center'>
                        <div className='w-[90%]'>
                            <div className='block md:flex w-full'>
                                <div className='w-full md:w-1/2 flex flex-col items-center '>
                                    <img src={data.image_Url[select].url} alt="" className="w-[60%]" />
                                    <div className="flex justify-center items-center pt-2">
                                        <div className={`${select === 0 ? "border-2 border-gray-200 shadow-sm rounded-md" : null} cursor-pointer pr-2`} onClick={() => setSelect(0)}>
                                            <img src={data.image_Url[0].url} alt="" className="w-[200px]" />
                                        </div>
                                        <div className={`${select === 1 ? "border-2 border-gray-200 shadow-sm rounded-md" : null} cursor-pointer pl-2`} onClick={() => setSelect(1)}>
                                            <img src={data.image_Url[1].url} alt="" className="w-[200px]" />
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full md:w-1/2 pt-8 px-6'>
                                    <p className='text-2xl font-semibold '>{data.name}</p>
                                    <p className='text-base font-medium py-2 text-gray-600'>{data.description}</p>
                                    <div className='flex py-2'>
                                        <p className='text-2xl font-medium'>{data.price === 0 ? data.price : data.discount_price}$</p>
                                        <p className='text-base font-medium text-red-600 px-2 line-through'>{data.price ? data.price + "$" : null}</p>
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
                                            {click ? <IoMdHeart size={30} color="red" onClick={() => setClick(!click)} title='Remove from wishlist' className='cursor-pointer' /> :
                                                <IoMdHeartEmpty size={30} color="black" onClick={() => setClick(!click)} title='Add to wishlist' className='cursor-pointer' />}
                                        </div>
                                    </div>

                                    <div className='flex items-center bg-black w-fit px-4 py-2 rounded-md cursor-pointer my-6'>
                                        <p className='text-white font-medium mr-2'>Add to Cart</p>
                                        <IoCartOutline size={20} color='white' />
                                    </div>

                                    <div className="flex items-center">
                                        
                                    <div className='flex items-center py-2 mr-6'>
                                    <img src={data.shop.shop_avatar.url} alt="" className='w-12 h-12 rounded-full object-cover'/>
                                    <div>
                                    <p className='text-md font-medium text-teal-600 px-2'>{data.shop.name}</p>
                                    <p className='text-sm font-medium px-2'>({data.shop.ratings}) Ratings</p>
                                    </div>
                                </div>
                                <div className='flex items-center bg-teal-600 w-fit px-4 py-2 rounded-md cursor-pointer'>
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