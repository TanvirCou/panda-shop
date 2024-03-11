import { useEffect, useState } from 'react';
import ShopLogin from '../../components/Shop/ShopAuth/ShopLogin';
import ShopRegister from '../../components/Shop/ShopAuth/ShopRegister';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ShopAuth = () => {
    const [active, setActive] = useState(true);
    const { isShop, loading } = useSelector(state => state.shop);

    const navigate = useNavigate();

    useEffect(() => {
        if (isShop === true) {
            navigate(`/shop/dashboard`);
        }
    }, [isShop, loading]);

    return (
        <div>
            <div className={`bg-gray-100 ${active ? "h-screen" : "h-[900px]"} w-full flex flex-col justify-center items-center`}>
                <div className="bg-white w-[90%] sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 shadow-md rounded-md px-3 pt-4 pb-6">
                    <p className='font-[Poppins] font-bold text-3xl text-center'>Panda-Food</p>
                    <div className="w-full flex px-2 py-4">
                        <p onClick={() => setActive(true)} className={`w-1/2 text-center text-lg font-semibold rounded-3xl py-2 cursor-pointer ${active ? "bg-teal-400" : "bg-white"}`}>Login</p>
                        <p onClick={() => setActive(false)} className={`w-1/2 text-center text-lg font-semibold rounded-3xl py-2 cursor-pointer ${!active ? "bg-teal-400" : "bg-white"}`}>Register</p>
                    </div>
                    <div>
                        {active ? <ShopLogin /> : <ShopRegister setActive={setActive} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopAuth;