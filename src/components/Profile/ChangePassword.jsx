import axios from "axios";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const PasswordField = ({ label, value, onChange, placeholder }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full h-11 pr-11 pl-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <button
                    type="button"
                    onClick={() => setShow(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    {show ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                </button>
            </div>
        </div>
    );
};

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }
        setLoading(true);
        try {
            await axios.put(
                "http://localhost:3000/api/user/update-user-password",
                { oldPassword, newPassword },
                { withCredentials: true }
            );
            toast.success("Password changed successfully");
            setOldPassword(""); setNewPassword(""); setConfirmPassword("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>

            <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
                <div className="md:col-span-2">
                    <PasswordField
                        label="Current Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter your current password"
                    />
                </div>
                <PasswordField
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                />
                <PasswordField
                    label="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                />
                <div className="md:col-span-2 pt-2">
                    <p className="text-xs text-gray-400 mb-4">
                        Use 8 or more characters with a mix of letters, numbers &amp; symbols.
                    </p>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-gray-900 hover:bg-emerald-600 disabled:bg-gray-300 text-white text-sm font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200/50"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
