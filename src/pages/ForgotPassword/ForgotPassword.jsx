import axios from "axios";
import { useState } from "react";
import { IoArrowBackOutline, IoMailOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post(
        "https://panda-shop-server-production-v3.up.railway.app/api/user/forgot-password",
        { email }
      );
      setSent(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 w-full h-full flex overflow-hidden'>
      <div className='hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col justify-between bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-12 relative overflow-hidden flex-shrink-0 h-full'>
        <div
          className='absolute inset-0 opacity-[0.07]'
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className='absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none' />
        <div className='absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none' />

        <div className='relative z-10'>
          <Link
            to='/'
            className='text-2xl font-black text-white tracking-tight'
          >
            Panda<span className='text-emerald-200'>Shop</span>
          </Link>
        </div>

        <div className='relative z-10 space-y-4'>
          <div className='w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl'>
            🔐
          </div>
          <h2 className='text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight'>
            Forgot your
            <br />
            <span className='text-emerald-200'>password?</span>
          </h2>
          <p className='text-emerald-100/80 text-base leading-relaxed max-w-xs'>
            No worries — we'll send a secure reset link to your registered email
            address.
          </p>
        </div>

        <div className='relative z-10'>
          <p className='text-xs text-emerald-200/60 font-medium'>
            © {new Date().getFullYear()} PandaShop · All rights reserved
          </p>
        </div>
      </div>

      <div className='flex-1 h-full overflow-y-auto flex flex-col items-center bg-gray-50 px-6 py-12 sm:px-10'>
        <div className='lg:hidden mb-8 text-center'>
          <Link
            to='/'
            className='text-2xl font-black text-gray-800 tracking-tight'
          >
            Panda<span className='text-emerald-500'>Shop</span>
          </Link>
        </div>

        <div className='w-full max-w-[440px] my-auto'>
          <Link
            to='/auth'
            className='inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-emerald-600 transition-colors mb-6'
          >
            <IoArrowBackOutline size={16} /> Back to Sign In
          </Link>

          {sent ? (
            /* ── Success state ── */
            <div className='text-center space-y-4 py-8'>
              <div className='w-16 h-16 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl'>
                📬
              </div>
              <h2 className='text-2xl font-bold text-gray-900'>
                Check your email 📬
              </h2>
              <p className='text-sm text-gray-400 leading-relaxed'>
                We sent a password reset link to{" "}
                <span className='font-semibold text-gray-700'>{email}</span>.
                <br />
                The link expires in 30 minutes.
              </p>
              <p className='text-xs text-gray-300 pt-2'>
                Didn't receive it?{" "}
                <button
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                  }}
                  className='text-emerald-500 hover:text-emerald-600 font-semibold transition-colors'
                >
                  Try again
                </button>
              </p>
            </div>
          ) : (
            <>
              <div className='mb-7'>
                <h1 className='text-2xl font-bold text-gray-900 tracking-tight'>
                  Reset your password
                </h1>
                <p className='text-sm text-gray-400 mt-1'>
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              <div className='h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mb-6' />

              <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                  <label className='block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5'>
                    Email Address
                  </label>
                  <div className='relative'>
                    <IoMailOutline
                      size={16}
                      className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    />
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='you@example.com'
                      className='w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 shadow-sm transition-all duration-200'
                    />
                  </div>
                </div>

                {error && (
                  <div className='flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3 rounded-xl'>
                    ⚠️ {error}
                  </div>
                )}

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-60 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg hover:shadow-emerald-200/50 transition-all duration-300 active:scale-[0.98]'
                >
                  {loading ? "Sending…" : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
