import axios from "axios";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FiCheck, FiClock, FiEdit2, FiX } from "react-icons/fi";
import { PiMoney } from "react-icons/pi";
import { toast } from "react-toastify";
import LoadingAnimation from "../Loader/LoadingAnimation";

const StatusBadge = ({ status }) => {
  const isSucceed = status === "Succeed";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
        isSucceed
          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
          : "bg-amber-50 text-amber-600 border-amber-200"
      }`}
    >
      {isSucceed ? <FiCheck size={10} /> : <FiClock size={10} />}
      {status}
    </span>
  );
};

const AllWithdraw = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState(null);
  const [status, setStatus] = useState("");

  const fetchAllWithdraw = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://panda-shop-server-production-v3.up.railway.app/api/withdraw/get-all-withdraw-request",
        { withCredentials: true }
      );
      setData(res.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch withdrawals"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllWithdraw();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!status || status === "Processing") {
      toast.error("Please select a new status before updating");
      return;
    }
    try {
      await axios.put(
        `https://panda-shop-server-production-v3.up.railway.app/api/withdraw//update-withdraw-request/${withdrawData._id}`,
        { sellerId: withdrawData?.shop._id },
        { withCredentials: true }
      );
      toast.success("Status updated successfully");
      setOpen(false);
      setStatus("");
      fetchAllWithdraw();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <LoadingAnimation />;

  const withdraws = data?.withdraws || [];

  return (
    <div className='p-4 md:p-6 space-y-5'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-200'>
          <PiMoney size={18} className='text-white' />
        </div>
        <div>
          <h1 className='text-base font-black text-gray-900'>
            Withdraw Requests
          </h1>
          <p className='text-xs text-gray-400 font-medium'>
            {withdraws.length} requests
          </p>
        </div>
      </div>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        {withdraws.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 gap-2'>
            <span className='text-4xl text-gray-300 animate-bounce'>💸</span>
            <p className='text-sm font-semibold text-gray-400'>
              No withdrawal requests
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide border-b border-gray-100'>
                  <th className='px-5 py-3.5 text-left'>#</th>
                  <th className='px-5 py-3.5 text-left'>Shop</th>
                  <th className='px-5 py-3.5 text-left'>Shop ID</th>
                  <th className='px-5 py-3.5 text-left'>Amount</th>
                  <th className='px-5 py-3.5 text-left'>Requested</th>
                  <th className='px-5 py-3.5 text-left'>Status</th>
                  <th className='px-5 py-3.5 text-center'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {withdraws.map((item, index) => (
                  <tr
                    key={index}
                    className='hover:bg-gray-50/60 transition-colors duration-150'
                  >
                    <td className='px-5 py-3.5 text-xs font-bold text-gray-400'>
                      {index + 1}
                    </td>
                    <td className='px-5 py-3.5 font-semibold text-gray-800'>
                      {item?.shop?.name}
                    </td>
                    <td className='px-5 py-3.5'>
                      <span className='font-mono text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg'>
                        {item?.shop?._id?.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className='px-5 py-3.5 font-bold text-gray-900'>
                      ${item.amount?.toFixed(2)}
                    </td>
                    <td className='px-5 py-3.5 text-xs text-gray-400'>
                      {item.createdAt?.slice(0, 10)}
                    </td>
                    <td className='px-5 py-3.5'>
                      <StatusBadge status={item.status} />
                    </td>
                    <td className='px-5 py-3.5'>
                      <div className='flex justify-center'>
                        {item.status === "Processing" ? (
                          <button
                            onClick={() => {
                              setOpen(true);
                              setWithdrawData(item);
                            }}
                            className='w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors duration-150'
                          >
                            <FiEdit2 size={13} />
                          </button>
                        ) : (
                          <span className='text-xs text-gray-300'>—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open &&
        withdrawData &&
        ReactDOM.createPortal(
          <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] flex items-center justify-center p-4'>
            <div className='bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative'>
              <button
                onClick={() => setOpen(false)}
                className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors'
              >
                <FiX size={16} />
              </button>

              <div className='space-y-4'>
                <div>
                  <h3 className='text-base font-black text-gray-900'>
                    Update Withdrawal
                  </h3>
                  <p className='text-xs text-gray-400 mt-0.5'>
                    Shop:{" "}
                    <span className='font-semibold text-gray-600'>
                      {withdrawData?.shop?.name}
                    </span>{" "}
                    · Amount:{" "}
                    <span className='font-semibold text-indigo-600'>
                      ${withdrawData?.amount?.toFixed(2)}
                    </span>
                  </p>
                </div>

                <div>
                  <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5'>
                    New Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className='w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition-all'
                  >
                    <option value=''>Select status…</option>
                    <option value='Processing' disabled>
                      {withdrawData.status} (current)
                    </option>
                    <option value='Succeed'>Succeed</option>
                  </select>
                </div>

                <div className='flex gap-3 pt-1'>
                  <button
                    onClick={() => setOpen(false)}
                    className='flex-1 h-10 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className='flex-1 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-sm font-semibold text-white hover:from-indigo-500 hover:to-blue-500 transition-all shadow-md shadow-indigo-200'
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default AllWithdraw;
