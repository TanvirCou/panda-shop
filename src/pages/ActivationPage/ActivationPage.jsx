import axios from "axios";
import { useEffect, useState } from "react";
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

const ActivationPage = () => {
  const { token } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const activationId = async () => {
        try {
          await axios.post(
            "https://panda-shop-server-production-v2.up.railway.app/api/user/activation",
            { activation_token: token }
          );
          setLoading(false);
        } catch (err) {
          console.log(err);
          setError(true);
          setLoading(false);
        }
      };
      activationId();
    }
  }, [token]);

  return (
    <div className='h-screen w-full flex justify-center items-center bg-gray-50 px-4'>
      <div className='max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 text-center transition-all duration-300'>
        {loading ? (
          <div className='flex flex-col items-center gap-4'>
            <div className='w-16 h-16 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin' />
            <div>
              <h2 className='text-xl font-black text-gray-900 tracking-tight'>
                Activating Account
              </h2>
              <p className='text-sm text-gray-400 mt-1 font-medium'>
                Please wait while we verify your token...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className='flex flex-col items-center'>
            <div className='w-20 h-20 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6'>
              <IoAlertCircleOutline size={48} />
            </div>
            <h2 className='text-2xl font-black text-gray-900 tracking-tight'>
              Token Expired
            </h2>
            <p className='text-gray-500 mt-3 font-medium leading-relaxed'>
              It looks like your activation link has expired or is invalid.
              Please try signing up again.
            </p>
            <Link
              to='/auth'
              className='mt-8 w-full h-11 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold rounded-xl flex items-center justify-center transition-all duration-200 active:scale-[0.98]'
            >
              Return to Sign Up
            </Link>
          </div>
        ) : (
          <div className='flex flex-col items-center'>
            <div className='w-20 h-20 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6'>
              <IoCheckmarkCircleOutline size={48} />
            </div>
            <h2 className='text-2xl font-black text-gray-900 tracking-tight'>
              Account Activated!
            </h2>
            <p className='text-gray-500 mt-3 font-medium leading-relaxed'>
              Welcome to{" "}
              <span className='text-emerald-500 font-bold'>PandaShop</span>.
              Your account has been successfully created and is ready for use.
            </p>
            <Link
              to='/auth'
              className='mt-8 w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-200/50 flex items-center justify-center transition-all duration-200 active:scale-[0.98]'
            >
              Login Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivationPage;
