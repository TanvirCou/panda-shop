import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingAnimation from '../Loader/LoadingAnimation';
import { GoPencil } from "react-icons/go";
import { RxCross1 } from 'react-icons/rx';

const AllWithdraw = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [withdrawData, setWithdrawData] = useState();
    const [status, setStatus] = useState();

    const fetchAllWithdraw = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:3000/api/withdraw/get-all-withdraw-request", { withCredentials: true });
            setData(res.data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllWithdraw();
    }, []);

    console.log(status);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (status === "Processing") {
            toast.error("You need to update your status for update");
        } else {
            try {
                const res = await axios.put(`http://localhost:3000/api/withdraw//update-withdraw-request/${withdrawData._id}`, { sellerId: withdrawData?.shop._id }, { withCredentials: true });
                console.log(res.data);
                toast.success("Status updated successfully");
                setOpen(false);
                setStatus();
                fetchAllWithdraw();
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <div>
            {
                loading ? <LoadingAnimation />
                    :

                    <div className='px-4 py-2 w-full'>
                        <p className='text-lg font-semibold py-2'>All Withdraw Request</p>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className="bg-gray-200 rounded-[4px]">
                                        <th>Serial</th>
                                        <th>Shop Name</th>
                                        <th>Shop Id</th>
                                        <th>Amount</th>
                                        <th>Request time:</th>
                                        <th>Status</th>
                                        <th>Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data?.withdraws?.map((data, index) => (
                                            <tr key={index} className=''>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {data?.shop.name}
                                                </td>
                                                <td>
                                                    {data?.shop._id}
                                                </td>
                                                <td>
                                                    ${data.amount}
                                                </td>
                                                <td>
                                                    {data.createdAt.slice(0, 10)}
                                                </td>
                                                <td>
                                                    {data.status}
                                                </td>
                                                <th>
                                                    {
                                                        data.status === "Processing" &&
                                                        <GoPencil size={25} className='cursor-pointer' onClick={() => setOpen(true) || setWithdrawData(data)} />
                                                    }
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {
                                open &&
                                <div className='fixed w-full h-screen bg-[#00000030] z-40 top-0 left-0 flex items-center justify-center'>
                                    <div className='w-[90%] md:w-[50%] h-[90vh] md:h-[65vh] webkit bg-white rounded-md shadow-sm relative p-4 overflow-y-scroll'>
                                        <RxCross1 size={25} onClick={() => setOpen(false)} className='absolute right-3 top-3 z-50' />
                                        <div className='my-2 mx-2 flex flex-col items-center justify-center h-full'>
                                            <p className='text-xl font-semibold'>Status update</p>
                                            <select value={status} onChange={(e) => setStatus(e.target.value)} className='w-[30%] h-[6vh] border-2 rounder my-3'>
                                                <option value={withdrawData.status}>{withdrawData.status}</option>
                                                <option value="Succeed">Succeed</option>
                                            </select>
                                            <button onClick={handleUpdate} className='py-1.5 px-4 rounded bg-black text-white font-medium mt-2'>Update</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default AllWithdraw;