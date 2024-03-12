import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingAnimation from '../../Loader/LoadingAnimation';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';
import "../../../App.css";
import axios from 'axios';
import { fetchProduct } from '../../../redux/features/productSlice';

const CouponCode = () => {
    const { shop } = useSelector(state => state.shop);
    const { products } = useSelector(state => state.product);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [value, setValue] = useState();
    const [minAmount, setMinAmount] = useState();
    const [maxAmount, setMaxAmount] = useState();
    const [selectedProduct, setSelectedProduct] = useState("");
    const [couponCodes, setCouponCodes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCouponCodes = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`https://panda-shop.onrender.com/api/coupon-code/all-coupon-codes/${shop.shop._id}`, { withCredentials: true });
            console.log(res.data);
            setCouponCodes(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error);
        }
    }


    useEffect(() => {
        fetchCouponCodes();
        dispatch(fetchProduct(shop?.shop._id));
    }, []);

    console.log(products);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`https://panda-shop.onrender.com/api/coupon-code/delete-coupon-code/${id}`, { withCredentials: true });
            toast.success(res.data.message);
            fetchCouponCodes();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleCreateCouponCode = async (e) => {
        e.preventDefault();

        const couponCodeData = {
            name,
            value,
            minAmount,
            maxAmount,
            selectedProduct,
            shopId: shop.shop._id
        };
        try {
            await axios.post("https://panda-shop.onrender.com/api/coupon-code/create-coupon-code", couponCodeData, { withCredentials: true });
            toast.success("Coupon code created successfully");
            setOpen(false);
            setName("");
            setValue(null);
            setMinAmount(null);
            setMaxAmount(null);
            setSelectedProduct("");
            fetchCouponCodes();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            {
                loading ? <LoadingAnimation />
                    :

                    <div className='px-4 py-2 w-full'>
                        <p className='text-lg font-semibold pt-2'>Coupon Codes</p>
                        <div className='w-full flex md:justify-end mb-3 mt-2 md:mt-0'>
                            <button onClick={() => setOpen(true)} className='bg-black text-white px-4 py-2 rounded-md'>Create Coupon Code</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className="bg-gray-200 rounded-[4px]">
                                        <th>Serial</th>
                                        <th>Name</th>
                                        <th>Discount percentage</th>
                                        <th>Selected Product</th>
                                        <th>Preview</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        couponCodes.couponCodes && couponCodes?.couponCodes.map((i, index) => (
                                            <tr key={index} className=''>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {i.name}
                                                </td>
                                                <td>
                                                    {i.value} %
                                                </td>
                                                <td>
                                                    {i.selectedProduct === "" ? "All Product" : i.selectedProduct}
                                                </td>
                                                <th>
                                                    <AiOutlineEye size={25} className='cursor-pointer' />
                                                </th>
                                                <th>
                                                    <AiOutlineDelete size={25} className='cursor-pointer' onClick={() => handleDelete(i._id)} />
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
            {
                open ?
                    <div className='fixed w-full h-screen bg-[#00000030] z-40 top-0 left-0 flex items-center justify-center'>
                        <div className='w-[90%] md:w-[40%] h-[90vh] md:h-[80vh] bg-white rounded-md shadow-sm relative p-4 overflow-y-scroll webkit'>
                            <RxCross1 size={25} onClick={() => setOpen(false)} className='absolute right-3 top-3 z-50 cursor-pointer' />

                            <div className='w-full py-2'>
                                <p className="text-xl font-semibold text-center mb-2">Create Coupon Code</p>
                                <div>
                                    <div>
                                        <label htmlFor="" className="font-medium text-sm">Coupon code name <span className="text-red-600">*</span></label>
                                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your coupon code name" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="" className="font-medium text-sm">Discount percentage <span className="text-red-600">*</span></label>
                                        <input type="number" required value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter your discount percentage" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="" className="font-medium text-sm">Minimum amount</label>
                                        <input type="number" required value={minAmount} onChange={(e) => setMinAmount(e.target.value)} placeholder="Enter your minimum amount" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="" className="font-medium text-sm">Maximum amount</label>
                                        <input type="number" required value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} placeholder="Enter your maximum amount" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="" className="font-medium text-sm">Selected Product</label>
                                        <select value={selectedProduct} required onChange={(e) => setSelectedProduct(e.target.value)} className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600 cursor-pointer">
                                            <option value="Choose your product" className="bg-gray-300">Choose a product</option>
                                            {
                                                products && products.products.map(i => (
                                                    <option value={i.name} key={i.name} className="bg-gray-300">{i.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <button onClick={handleCreateCouponCode} className="bg-black text-white py-1.5 px-4 my-4 rounded-md font-medium">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    );
};

export default CouponCode;