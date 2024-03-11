import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingAnimation from '../../Loader/LoadingAnimation';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { fetchShop } from '../../../redux/features/shopSlice';
import { AiOutlineDelete } from 'react-icons/ai';

const WithdrawMoney = () => {
    const { shop, loading } = useSelector(state => state.shop);
    const [open, setOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState(50);
    const [bankInfo, setBankInfo] = useState({
        bankName: "",
        bankCountry: "",
        bankSwiftCode: null,
        bankAccountNumber: null,
        bankHolderName: "",
        bankAddress: ""
    });

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put("http://localhost:3000/api/shop/update-payment-methods", { bankInfo }, { withCredentials: true });
            toast.success("Payment Method added");
            setPaymentMethod(false);
            setOpen(false);
            setBankInfo({
                bankName: "",
                bankCountry: "",
                bankSwiftCode: null,
                bankAccountNumber: null,
                bankHolderName: "",
                bankAddress: ""
            });
            dispatch(fetchShop());
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await axios.delete("http://localhost:3000/api/shop/delete-withdraw-method", { withCredentials: true });
            toast.success("Payment Method deleted");
            dispatch(fetchShop());
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleWithdraw = async (e) => {
        e.preventDefault();

        if (withdrawAmount < 50 || withdrawAmount > shop?.shop.availableBalance) {
            toast.error("You can't withdraw this amount of money");
        } else {
            try {
                const res = await axios.post("http://localhost:3000/api/withdraw/create-withdraw-request", { amount: withdrawAmount }, { withCredentials: true });
                toast.success("Withdraw request successfully done");
                dispatch(fetchShop());
                setOpen(false);
                console.log(res.data);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    };

    const error = () => {
        toast.error("You don't have enough money to withdraw");
    };

    return (
        <>
            {
                loading ? <LoadingAnimation /> :
                    <div className='bg-white h-[93vh] md:h-[90vh] w-full flex flex-col items-center justify-center'>
                        <p className='text-lg font-medium'>Available Balance: {shop?.shop.availableBalance.toFixed(2)}</p>
                        <button onClick={() => shop?.shop.availableBalance < 50 ? error() : (setOpen(true) || setPaymentMethod(false))} className='bg-black text-white font-medium py-1.5 px-4 rounded-md mt-4'>Withdraw</button>

                        {
                            open &&
                            <div className='fixed w-full h-screen bg-[#00000030] z-40 top-0 left-0 flex items-center justify-center'>
                                <div className={`w-[90%] h-[90vh] ${paymentMethod ? "md:w-[50%] md:h-[75vh]" : "md:w-[50%] md:h-[45vh]"} bg-white rounded-md shadow-sm relative p-4 overflow-y-scroll webkit`}>
                                    <RxCross1 size={25} onClick={() => setOpen(false)} className='absolute right-3 top-3 z-50 cursor-pointer' />

                                    {
                                        paymentMethod ?
                                            <div>
                                                <p className='text-2xl font-semibold text-center'>Add new Withdraw Methods</p>
                                                <div className='mt-2'>
                                                    <div className="px-2">
                                                        <label htmlFor="" className="font-medium text-sm">Bank Name <span className="text-red-600">*</span></label>
                                                        <input type="text" value={bankInfo.bankName} onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })} required placeholder="Enter your bank name" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                                    </div>
                                                    <br />
                                                    <div className="px-2">
                                                        <label htmlFor="" className="font-medium text-sm">Bank Country <span className="text-red-600">*</span></label>
                                                        <input type="text" value={bankInfo.bankCountry} onChange={(e) => setBankInfo({ ...bankInfo, bankCountry: e.target.value })} required placeholder="Enter your bank country" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                                    </div>
                                                    <br />
                                                    <div className="px-2">
                                                        <label htmlFor="" className="font-medium text-sm">Bank Swift Code <span className="text-red-600">*</span></label>
                                                        <input type="number" value={bankInfo.bankSwiftCode} onChange={(e) => setBankInfo({ ...bankInfo, bankSwiftCode: e.target.value })} required placeholder="Enter your bank swift code" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                                    </div>
                                                    <br />
                                                    <div className="px-2">
                                                        <label htmlFor="" className="font-medium text-sm">Bank Account number <span className="text-red-600">*</span></label>
                                                        <input type="text" required value={bankInfo.bankAccountNumber} onChange={(e) => setBankInfo({ ...bankInfo, bankAccountNumber: e.target.value })} placeholder="Enter your bank account number" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                                    </div>
                                                    <br />
                                                    <div className="px-2">
                                                        <label htmlFor="" className="font-medium text-sm">Bank Holder Name <span className="text-red-600">*</span></label>
                                                        <input type="text" required value={bankInfo.bankHolderName} onChange={(e) => setBankInfo({ ...bankInfo, bankHolderName: e.target.value })} placeholder="Enter your bank holder name" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                                    </div>
                                                    <br />
                                                    <div className="px-2">
                                                        <label htmlFor="" className="font-medium text-sm">Bank Address <span className="text-red-600">*</span></label>
                                                        <input type="text" required value={bankInfo.bankAddress} onChange={(e) => setBankInfo({ ...bankInfo, bankAddress: e.target.value })} placeholder="Enter your bank address" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                                    </div>
                                                    <button onClick={handleSubmit} className='bg-black text-white font-medium py-1.5 px-4 rounded mx-2 mt-4'>Submit</button>
                                                </div>
                                            </div> :
                                            <div className=' my-4'>
                                                <p className='text-2xl font-semibold text-center'>Withdraw Methods</p>
                                                {
                                                    shop && shop?.shop.withdrawMethod ?
                                                        <div className=''>
                                                            <div className='py-2 px-2 shadow-sm bg-gray-100 md:flex justify-between items-center'>
                                                                <div className='font-medium'>
                                                                    <p>Account number: {" "} {"*".repeat(shop?.shop.withdrawMethod.bankAccountNumber.length - 3) + shop?.shop.withdrawMethod.bankAccountNumber.slice(-3)}</p>
                                                                    <p>Bank name: {shop?.shop.withdrawMethod.bankName}</p>
                                                                </div>
                                                                <AiOutlineDelete size={28} className='cursor-pointer' onClick={handleDelete} />
                                                            </div>
                                                            <p className='mt-4 font-medium'>Available Balance: ${shop?.shop.availableBalance.toFixed(2)}</p>
                                                            <div className='mt-4'>
                                                                <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} required className='w-28 rounded border py-1.5 px-2' placeholder='Amount' />
                                                                <button className='bg-black text-white font-medium py-1.5 px-4 rounded ml-3' onClick={handleWithdraw}>Withdraw</button>
                                                            </div>
                                                        </div> :
                                                        <div className='mt-2 flex flex-col items-center'>
                                                            <p className='font-medium text-gray-600'>No withdraw method available</p>
                                                            <button onClick={() => setPaymentMethod(true)} className='bg-black text-white font-medium py-1.5 px-4 rounded mt-4'>Add new</button>
                                                        </div>
                                                }
                                            </div>
                                    }

                                </div>
                            </div>
                        }


                    </div>
            }
        </>
    );
};

export default WithdrawMoney;