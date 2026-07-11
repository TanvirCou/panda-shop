import axios from "axios";
import { useEffect, useState } from "react";
import { FiArrowRight, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const ShopActivationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const activateShop = async () => {
        try {
          await axios.post(
            "https://panda-shop-server-v3.up.railway.app/api/shop/shop-activation",
            {
              activation_token: token,
            }
          );
          setError(false);
        } catch (err) {
          console.log(err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      activateShop();
    }
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-100 opacity-50 blur-3xl' />
        <div className='absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-100 opacity-50 blur-3xl' />
      </div>

      <div className='relative z-10 bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-md w-full text-center'>
        {loading ? (
          /* Loading state */
          <div className='flex flex-col items-center gap-5'>
            <div className='w-16 h-16 rounded-full border-4 border-cyan-100 border-t-cyan-500 animate-spin' />
            <div>
              <h1 className='text-xl font-black text-gray-900'>
                Activating Your Shop…
              </h1>
              <p className='text-sm text-gray-400 mt-1'>
                Please wait while we verify your account
              </p>
            </div>
          </div>
        ) : error ? (
          /* Error state */
          <div className='flex flex-col items-center gap-6'>
            <div className='w-20 h-20 rounded-full bg-red-50 flex items-center justify-center'>
              <FiXCircle size={40} className='text-red-500' />
            </div>
            <div>
              <h1 className='text-2xl font-black text-gray-900'>
                Activation Failed
              </h1>
              <p className='text-sm text-gray-400 mt-2 leading-relaxed'>
                Your activation link has expired or is invalid. Please register
                again to get a new link.
              </p>
            </div>
            <button
              onClick={() => navigate("/shop-auth")}
              className='w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold text-sm rounded-xl shadow-md shadow-red-200 hover:shadow-red-300 transition-all duration-200'
            >
              Back to Shop Registration <FiArrowRight size={16} />
            </button>
          </div>
        ) : (
          /* Success state */
          <div className='flex flex-col items-center gap-6'>
            <div className='relative'>
              <div className='w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 flex items-center justify-center shadow-xl shadow-cyan-200'>
                <FiCheckCircle size={38} className='text-white' />
              </div>
              <span className='absolute -top-1 -right-1 text-2xl animate-bounce'>
                🎉
              </span>
            </div>

            <div>
              <h1 className='text-2xl font-black text-gray-900'>
                Shop Activated!
              </h1>
              <p className='text-sm text-gray-400 mt-2 leading-relaxed'>
                Congratulations! Your shop has been successfully created and is
                ready to start selling.
              </p>
            </div>

            <div className='w-full h-px bg-gray-100' />

            <div className='w-full grid grid-cols-3 gap-3 text-center'>
              {[
                { emoji: "🛍️", label: "List Products" },
                { emoji: "📦", label: "Manage Orders" },
                { emoji: "💰", label: "Track Revenue" },
              ].map(({ emoji, label }) => (
                <div
                  key={label}
                  className='bg-cyan-50 rounded-xl p-3 flex flex-col items-center gap-1'
                >
                  <span className='text-xl'>{emoji}</span>
                  <p className='text-[11px] font-semibold text-cyan-700'>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/shop-auth")}
              className='w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold text-sm rounded-xl shadow-md shadow-cyan-200 hover:shadow-cyan-300 hover:from-cyan-500 hover:to-sky-500 transition-all duration-200'
            >
              Go to Shop Login <FiArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopActivationPage;
