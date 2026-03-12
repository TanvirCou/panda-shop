import axios from 'axios';
import { useState } from 'react';
import { IoArrowBackOutline, IoEyeOffOutline, IoEyeOutline, IoLockClosedOutline } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PasswordField = ({ label, value, onChange, placeholder }) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
            <div className="relative">
                <IoLockClosedOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    required
                    placeholder={placeholder}
                    minLength={6}
                    className="w-full h-11 pl-10 pr-10 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 shadow-sm transition-all duration-200"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                >
                    {show ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
                </button>
            </div>
        </div>
    );
};

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            await axios.post(`http://localhost:3000/api/user/reset-password/${token}`, { password, confirmPassword });
            setDone(true);
            setTimeout(() => navigate('/auth'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. The link may have expired.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-full flex overflow-hidden">
            
            <div className="hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col justify-between bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-12 relative overflow-hidden flex-shrink-0 h-full">
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                />
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

                
                <div className="relative z-10">
                    <span className="text-2xl font-black text-white tracking-tight">
                        Panda<span className="text-emerald-200">Shop</span>
                    </span>
                </div>

                <div className="relative z-10 space-y-4">
                    <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
                        🔑
                    </div>
                    <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight">
                        Set a new<br /><span className="text-emerald-200">password.</span>
                    </h2>
                    <p className="text-emerald-100/80 text-base leading-relaxed max-w-xs">
                        Choose a strong password with at least 6 characters to keep your account secure.
                    </p>
                </div>

                <div className="relative z-10">
                    <p className="text-xs text-emerald-200/60 font-medium">
                        © {new Date().getFullYear()} PandaShop · All rights reserved
                    </p>
                </div>
            </div>

            
            <div className="flex-1 h-full overflow-y-auto flex flex-col items-center bg-gray-50 px-6 py-12 sm:px-10">
                
                <div className="lg:hidden mb-8 text-center">
                    <span className="text-2xl font-black text-gray-800 tracking-tight">
                        Panda<span className="text-emerald-500">Shop</span>
                    </span>
                </div>

                <div className="w-full max-w-[440px] my-auto">
                    <Link to="/auth" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-emerald-600 transition-colors mb-6">
                        <IoArrowBackOutline size={16} /> Back to Sign In
                    </Link>

                    {done ? (
                        <div className="text-center space-y-4 py-8">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl">
                                ✅
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Password Updated! ✅</h2>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Your account password has been reset successfully.<br />
                                Redirecting you to sign in…
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-7">
                                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create a new password</h1>
                                <p className="text-sm text-gray-400 mt-1">Must be at least 6 characters long.</p>
                            </div>

                            <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mb-6" />

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <PasswordField
                                    label="New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                />
                                <PasswordField
                                    label="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter password"
                                />

                                {error && (
                                    <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
                                        ⚠️ {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-60 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg hover:shadow-emerald-200/50 transition-all duration-300 active:scale-[0.98]"
                                >
                                    {loading ? 'Updating…' : 'Reset Password'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;