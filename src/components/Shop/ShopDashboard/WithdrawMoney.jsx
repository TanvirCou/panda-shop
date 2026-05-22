import axios from "axios";
import { useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FiArrowRight, FiX } from "react-icons/fi";
import { IoCardOutline } from "react-icons/io5";
import { PiBankLight, PiMoney } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchShop } from "../../../redux/features/shopSlice";
import LoadingAnimation from "../../Loader/LoadingAnimation";

const inputClass =
  "w-full h-10 px-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 shadow-sm transition-all";
const labelClass =
  "block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5";

const FormField = ({ label, required, children }) => (
  <div>
    <label className={labelClass}>
      {label} {required && <span className='text-red-400'>*</span>}
    </label>
    {children}
  </div>
);

const Modal = ({ onClose, children }) =>
  ReactDOM.createPortal(
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors z-10'
        >
          <FiX size={16} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );

const WithdrawMoney = () => {
  const { shop, loading } = useSelector((state) => state.shop);
  const [open, setOpen] = useState(false);
  const [showBankForm, setShowBankForm] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });
  const dispatch = useDispatch();

  const balance = shop?.shop?.availableBalance || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "https://panda-shop-server-production-v3.up.railway.app/api/shop/update-payment-methods",
        { bankInfo },
        { withCredentials: true }
      );
      toast.success("Payment method saved successfully!");
      setShowBankForm(false);
      setOpen(false);
      setBankInfo({
        bankName: "",
        bankCountry: "",
        bankSwiftCode: null,
        bankAccountNumber: null,
        bankHolderName: "",
        bankAddress: "",
      });
      dispatch(fetchShop());
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        "https://panda-shop-server-production-v3.up.railway.app/api/shop/delete-withdraw-method",
        { withCredentials: true }
      );
      toast.success("Payment method removed");
      dispatch(fetchShop());
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (withdrawAmount < 50 || withdrawAmount > balance) {
      toast.error("Invalid withdraw amount (min $50, max available balance)");
      return;
    }
    try {
      await axios.post(
        "https://panda-shop-server-production-v3.up.railway.app/api/withdraw/create-withdraw-request",
        { amount: withdrawAmount },
        { withCredentials: true }
      );
      toast.success("Withdraw request submitted!");
      dispatch(fetchShop());
      setOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
    }
  };

  if (loading) return <LoadingAnimation />;

  const maskedAccount = shop?.shop?.withdrawMethod?.bankAccountNumber
    ? "*".repeat(
        String(shop.shop.withdrawMethod.bankAccountNumber).length - 3
      ) + String(shop.shop.withdrawMethod.bankAccountNumber).slice(-3)
    : "";

  return (
    <div className='p-4 md:p-6 space-y-5'>
      <div>
        <h1 className='text-xl font-black text-gray-900'>Withdraw Money</h1>
        <p className='text-sm text-gray-400 mt-0.5'>
          Manage your payout method and request withdrawals
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='bg-gradient-to-br from-cyan-600 via-sky-600 to-cyan-700 rounded-2xl p-6 relative overflow-hidden'>
          <div
            className='absolute inset-0 opacity-[0.06]'
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className='relative z-10'>
            <div className='w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center mb-4'>
              <PiMoney size={20} className='text-white' />
            </div>
            <p className='text-purple-200 text-xs font-semibold uppercase tracking-wide'>
              Available Balance
            </p>
            <p className='text-3xl font-black text-white mt-1'>
              ${balance.toFixed(2)}
            </p>
            <p className='text-purple-200/70 text-xs mt-1'>
              After 10% service charge
            </p>
            <button
              onClick={() =>
                balance < 50
                  ? toast.error("You need at least $50 to withdraw")
                  : (setOpen(true), setShowBankForm(false))
              }
              className='mt-5 flex items-center gap-2 px-4 py-2 bg-white text-cyan-700 text-sm font-bold rounded-xl hover:bg-sky-50 transition-colors duration-200 active:scale-[0.98]'
            >
              Withdraw <FiArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center'>
              <PiBankLight size={16} className='text-cyan-600' />
            </div>
            <p className='text-sm font-bold text-gray-800'>Payout Method</p>
          </div>

          {shop?.shop?.withdrawMethod ? (
            <div className='space-y-3'>
              <div className='bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-1.5'>
                <div className='flex items-center gap-2'>
                  <IoCardOutline size={14} className='text-gray-400' />
                  <p className='text-xs text-gray-400 font-medium uppercase tracking-wide'>
                    Account
                  </p>
                </div>
                <p className='font-mono text-sm font-bold text-gray-800'>
                  {maskedAccount}
                </p>
                <p className='text-sm text-gray-500'>
                  {shop.shop.withdrawMethod.bankName}
                </p>
              </div>
              <button
                onClick={handleDelete}
                className='flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors'
              >
                <AiOutlineDelete size={14} /> Remove Method
              </button>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-6 gap-2 text-center'>
              <span className='text-3xl'>🏦</span>
              <p className='text-sm font-semibold text-gray-400'>
                No payout method
              </p>
              <p className='text-xs text-gray-300'>
                Add a bank account to receive withdrawals
              </p>
              <button
                onClick={() => {
                  setOpen(true);
                  setShowBankForm(true);
                }}
                className='mt-2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-sky-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all duration-200 hover:shadow-cyan-200/50 active:scale-[0.98]'
              >
                Add Bank Account
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'>
        <p className='text-sm font-bold text-gray-800 mb-1'>
          Transaction History
        </p>
        <p className='text-xs text-gray-400'>
          Past withdrawal requests will appear here.
        </p>
        {shop?.shop?.transactions?.length > 0 ? (
          <div className='mt-4 overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide border-b border-gray-100'>
                  <th className='px-4 py-3 text-left'>Amount</th>
                  <th className='px-4 py-3 text-left'>Status</th>
                  <th className='px-4 py-3 text-left'>Date</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {shop.shop.transactions.map((tx, i) => (
                  <tr key={i} className='hover:bg-gray-50/50 transition-colors'>
                    <td className='px-4 py-3 font-bold text-gray-900'>
                      ${tx.amount}
                    </td>
                    <td className='px-4 py-3'>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                          tx.status === "succeed"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-gray-400 text-xs'>
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='mt-4 text-center py-8'>
            <span className='text-2xl'>📄</span>
            <p className='text-xs text-gray-300 mt-1'>No transactions yet</p>
          </div>
        )}
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className='p-6'>
            {showBankForm ? (
              <>
                <h2 className='text-lg font-black text-gray-900 mb-1'>
                  Add Bank Account
                </h2>
                <p className='text-xs text-gray-400 mb-5'>
                  Your details are securely stored
                </p>
                <div className='space-y-4'>
                  <div className='grid grid-cols-2 gap-3'>
                    <FormField label='Bank Name' required>
                      <input
                        type='text'
                        value={bankInfo.bankName}
                        onChange={(e) =>
                          setBankInfo({ ...bankInfo, bankName: e.target.value })
                        }
                        placeholder='e.g. Citibank'
                        className={inputClass}
                      />
                    </FormField>
                    <FormField label='Bank Country' required>
                      <input
                        type='text'
                        value={bankInfo.bankCountry}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankCountry: e.target.value,
                          })
                        }
                        placeholder='e.g. USA'
                        className={inputClass}
                      />
                    </FormField>
                  </div>
                  <FormField label='Account Holder Name' required>
                    <input
                      type='text'
                      value={bankInfo.bankHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankHolderName: e.target.value,
                        })
                      }
                      placeholder='Full legal name'
                      className={inputClass}
                    />
                  </FormField>
                  <FormField label='Account Number' required>
                    <input
                      type='text'
                      value={bankInfo.bankAccountNumber || ""}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      placeholder='Account number'
                      className={inputClass}
                    />
                  </FormField>
                  <div className='grid grid-cols-2 gap-3'>
                    <FormField label='SWIFT Code' required>
                      <input
                        type='text'
                        value={bankInfo.bankSwiftCode || ""}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankSwiftCode: e.target.value,
                          })
                        }
                        placeholder='SWIFT/BIC'
                        className={inputClass}
                      />
                    </FormField>
                    <FormField label='Bank Address' required>
                      <input
                        type='text'
                        value={bankInfo.bankAddress}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankAddress: e.target.value,
                          })
                        }
                        placeholder='Branch address'
                        className={inputClass}
                      />
                    </FormField>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className='w-full h-11 bg-gradient-to-r from-cyan-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]'
                  >
                    Save Bank Account
                  </button>
                  <button
                    onClick={() => setShowBankForm(false)}
                    className='w-full h-9 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors'
                  >
                    ← Back
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className='text-lg font-black text-gray-900 mb-1'>
                  Withdraw Funds
                </h2>
                <p className='text-xs text-gray-400 mb-5'>
                  Minimum withdrawal: $50
                </p>

                {shop?.shop?.withdrawMethod ? (
                  <div className='space-y-4'>
                    <div className='bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-between'>
                      <div>
                        <p className='text-xs text-gray-400 font-medium'>
                          Payout to
                        </p>
                        <p className='font-bold text-gray-800 text-sm'>
                          {shop.shop.withdrawMethod.bankName}
                        </p>
                        <p className='font-mono text-xs text-gray-500'>
                          {maskedAccount}
                        </p>
                      </div>
                      <IoCardOutline size={20} className='text-gray-300' />
                    </div>

                    <div className='bg-cyan-50 rounded-xl border border-cyan-100 px-4 py-2.5 flex items-center justify-between'>
                      <p className='text-xs text-cyan-600 font-semibold'>
                        Available
                      </p>
                      <p className='font-black text-cyan-700'>
                        ${balance.toFixed(2)}
                      </p>
                    </div>

                    <FormField label='Withdraw Amount' required>
                      <div className='relative'>
                        <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm'>
                          $
                        </span>
                        <input
                          type='number'
                          value={withdrawAmount}
                          onChange={(e) =>
                            setWithdrawAmount(Number(e.target.value))
                          }
                          min={50}
                          max={balance}
                          className={`${inputClass} pl-7`}
                        />
                      </div>
                    </FormField>

                    <button
                      onClick={handleWithdraw}
                      className='w-full h-11 bg-gradient-to-r from-cyan-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]'
                    >
                      Request Withdrawal
                    </button>
                  </div>
                ) : (
                  <div className='text-center py-8 space-y-2'>
                    <span className='text-3xl'>🏦</span>
                    <p className='text-sm font-semibold text-gray-400'>
                      No payout method configured
                    </p>
                    <button
                      onClick={() => setShowBankForm(true)}
                      className='mt-2 px-4 py-2 text-xs font-bold text-cyan-600 border border-cyan-200 rounded-xl hover:bg-cyan-50 transition-colors'
                    >
                      Add Bank Account
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WithdrawMoney;
