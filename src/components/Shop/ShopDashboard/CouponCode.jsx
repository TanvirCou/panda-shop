import axios from "axios";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineDelete, AiOutlineGift } from "react-icons/ai";
import { FiArrowRight, FiPercent, FiPlus, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProduct } from "../../../redux/features/productSlice";
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
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative'>
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

const CouponCode = () => {
  const { shop } = useSelector((state) => state.shop);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [couponCodes, setCouponCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const fetchCouponCodes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://panda-shop-server-production-v2.up.railway.app/api/coupon-code/all-coupon-codes/${shop.shop._id}`,
        { withCredentials: true }
      );
      setCouponCodes(res.data);
    } catch (error) {
      toast.error("Failed to load coupon codes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCouponCodes();
    dispatch(fetchProduct(shop?.shop._id));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://panda-shop-server-production-v2.up.railway.app/api/coupon-code/delete-coupon-code/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      fetchCouponCodes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setConfirmId(null);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://panda-shop-server-production-v2.up.railway.app/api/coupon-code/create-coupon-code",
        {
          name,
          value,
          minAmount,
          maxAmount,
          selectedProduct,
          shopId: shop.shop._id,
        },
        { withCredentials: true }
      );
      toast.success("Coupon code created!");
      setOpen(false);
      setName("");
      setValue("");
      setMinAmount("");
      setMaxAmount("");
      setSelectedProduct("");
      fetchCouponCodes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Create failed");
    }
  };

  if (loading) return <LoadingAnimation />;

  const codes = couponCodes?.couponCodes || [];

  return (
    <div className='p-4 md:p-6 space-y-5'>
      <div className='flex items-center justify-between flex-wrap gap-3'>
        <div>
          <h1 className='text-xl font-black text-gray-900'>Discount Codes</h1>
          <p className='text-sm text-gray-400 mt-0.5'>
            {codes.length} coupon{codes.length !== 1 ? "s" : ""} active
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className='flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]'
        >
          <FiPlus size={15} /> Create Coupon
        </button>
      </div>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        {codes.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 gap-2'>
            <span className='text-4xl'>🎟️</span>
            <p className='text-sm font-semibold text-gray-400'>
              No coupon codes yet
            </p>
            <p className='text-xs text-gray-300'>
              Create your first discount code to attract more buyers
            </p>
            <button
              onClick={() => setOpen(true)}
              className='mt-2 flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-500 transition-colors'
            >
              Create Coupon <FiArrowRight size={12} />
            </button>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide border-b border-gray-100'>
                  <th className='px-5 py-3.5 text-left'>#</th>
                  <th className='px-5 py-3.5 text-left'>Code</th>
                  <th className='px-5 py-3.5 text-left'>Discount</th>
                  <th className='px-5 py-3.5 text-left'>Min/Max</th>
                  <th className='px-5 py-3.5 text-left'>Product</th>
                  <th className='px-5 py-3.5 text-right'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {codes.map((coupon, index) => (
                  <tr
                    key={coupon._id}
                    className='hover:bg-gray-50/50 transition-colors duration-150'
                  >
                    <td className='px-5 py-4 text-xs text-gray-400 font-medium'>
                      {index + 1}
                    </td>
                    <td className='px-5 py-4'>
                      <span className='font-mono font-bold text-sm text-gray-800 bg-cyan-50 border border-cyan-100 px-2.5 py-1 rounded-lg'>
                        {coupon.name}
                      </span>
                    </td>
                    <td className='px-5 py-4'>
                      <div className='flex items-center gap-1'>
                        <div className='w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center'>
                          <FiPercent size={12} className='text-emerald-600' />
                        </div>
                        <span className='font-bold text-emerald-600'>
                          {coupon.value}%
                        </span>
                      </div>
                    </td>
                    <td className='px-5 py-4 text-xs text-gray-400 font-medium'>
                      {coupon.minAmount ? `$${coupon.minAmount}` : "—"} /{" "}
                      {coupon.maxAmount ? `$${coupon.maxAmount}` : "—"}
                    </td>
                    <td className='px-5 py-4 text-sm text-gray-600'>
                      {coupon.selectedProduct || (
                        <span className='text-gray-300 italic'>
                          All Products
                        </span>
                      )}
                    </td>
                    <td className='px-5 py-4'>
                      <div className='flex items-center justify-end gap-2'>
                        {confirmId === coupon._id ? (
                          <div className='flex items-center gap-1'>
                            <button
                              onClick={() => handleDelete(coupon._id)}
                              className='px-2 py-1 text-[10px] font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setConfirmId(null)}
                              className='px-2 py-1 text-[10px] font-bold bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors'
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            title='Delete'
                            onClick={() => setConfirmId(coupon._id)}
                            className='w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-100 hover:border-red-200 transition-all duration-200'
                          >
                            <AiOutlineDelete size={15} />
                          </button>
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

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className='p-6'>
            <div className='flex items-center gap-2 mb-1'>
              <div className='w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center'>
                <AiOutlineGift size={16} className='text-cyan-600' />
              </div>
              <h2 className='text-lg font-black text-gray-900'>
                Create Coupon Code
              </h2>
            </div>
            <p className='text-xs text-gray-400 mb-5'>
              Set up a discount code for your customers
            </p>

            <form onSubmit={handleCreate} className='space-y-4'>
              <FormField label='Coupon Code Name' required>
                <input
                  type='text'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  placeholder='e.g. SUMMER20'
                  className={inputClass}
                />
              </FormField>

              <FormField label='Discount Percentage' required>
                <div className='relative'>
                  <input
                    type='number'
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='20'
                    min='1'
                    max='100'
                    className={`${inputClass} pr-8`}
                  />
                  <span className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm'>
                    %
                  </span>
                </div>
              </FormField>

              <div className='grid grid-cols-2 gap-3'>
                <FormField label='Min Order Amount'>
                  <div className='relative'>
                    <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm'>
                      $
                    </span>
                    <input
                      type='number'
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder='0.00'
                      className={`${inputClass} pl-7`}
                      min='0'
                    />
                  </div>
                </FormField>
                <FormField label='Max Order Amount'>
                  <div className='relative'>
                    <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm'>
                      $
                    </span>
                    <input
                      type='number'
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder='0.00'
                      className={`${inputClass} pl-7`}
                      min='0'
                    />
                  </div>
                </FormField>
              </div>

              <FormField label='Apply to Specific Product'>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value=''>All Products</option>
                  {products?.products?.map((p) => (
                    <option value={p.name} key={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </FormField>

              {value > 0 && (
                <div className='flex items-center gap-2 px-3 py-2 bg-cyan-50 rounded-xl border border-cyan-100'>
                  <AiOutlineGift size={13} className='text-cyan-500' />
                  <span className='text-xs text-cyan-600 font-semibold'>
                    Customers save {value}%{" "}
                    {selectedProduct
                      ? `on "${selectedProduct}"`
                      : "on all products"}
                    {minAmount ? ` (min $${minAmount})` : ""}
                  </span>
                </div>
              )}

              <button
                type='submit'
                className='w-full h-11 bg-gradient-to-r from-cyan-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]'
              >
                Create Coupon Code
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CouponCode;
