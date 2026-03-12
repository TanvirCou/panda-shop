/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { IoCallOutline, IoCloudUploadOutline, IoCodeSlashOutline, IoEye, IoEyeOff, IoLocationOutline, IoLockClosedOutline, IoMailOutline, IoStorefrontOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { toast } from "react-toastify";

const ShopRegister = ({ setActive }) => {
    const [passShow, setPassShow] = useState(false);
    const [confirmPassShow, setConfirmPassShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [file, setFile] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const handleFile = (pics) => {
        setAvatar(pics);
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "panda-shop");
        data.append("cloud_name", "ddcn60bx4");
        fetch("https://api.cloudinary.com/v1_1/ddcn60bx4/image/upload", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setFile(data.url.toString());
                console.log(data.url.toString());
            })
            .catch((err) => console.log(err));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password don't match!");
        } else {
            const data = { name, email, password, phoneNumber, address, zipCode, avatar: file };
            try {
                const res = await axios.post("http://localhost:3000/api/shop/shop-register", data);
                toast.success(res.data.message);
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setAvatar();
                setPhoneNumber();
                setAddress("");
                setZipCode();
                setActive(true);
            } catch (err) {
                toast.error(err.response.data.message);
            }
        }
    };

    const inputClass = "w-full h-11 bg-white border border-gray-200 rounded-xl pl-10 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200";

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Shop Name</label>
                <div className="relative">
                    <IoStorefrontOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your shop name" className={inputClass} />
                </div>
            </div>

            
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                    <IoMailOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" className={inputClass} />
                </div>
            </div>

            
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                    <IoCallOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required placeholder="Enter your phone number" className={inputClass} />
                </div>
            </div>

            
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Address</label>
                <div className="relative">
                    <IoLocationOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Enter your address" className={inputClass} />
                </div>
            </div>

            
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Zip Code</label>
                <div className="relative">
                    <IoCodeSlashOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required placeholder="Enter your zip code" className={inputClass} />
                </div>
            </div>

            
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                <div className="relative">
                    <IoLockClosedOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type={passShow ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" placeholder="Enter your password" className={`${inputClass} pr-10`} />
                    <button type="button" onClick={() => setPassShow(!passShow)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {passShow ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                    </button>
                </div>
            </div>

            
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                    <IoLockClosedOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type={confirmPassShow ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Enter your password again" className={`${inputClass} pr-10`} />
                    <button type="button" onClick={() => setConfirmPassShow(!confirmPassShow)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {confirmPassShow ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                    </button>
                </div>
            </div>

            
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Shop Logo</label>
                <div className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                        {avatar ? (
                            <img src={URL.createObjectURL(avatar)} alt="" className="h-full w-full object-cover" />
                        ) : (
                            <RxAvatar className="w-7 h-7 text-gray-400" />
                        )}
                    </div>
                    <label htmlFor="shop-file-input" className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-cyan-600 hover:text-cyan-500 transition-colors">
                        <IoCloudUploadOutline size={18} />
                        {avatar ? avatar.name?.slice(0, 20) + "..." : "Upload shop logo"}
                        <input type="file" name="avatar" id="shop-file-input" className="sr-only" onChange={(e) => handleFile(e.target.files[0])} />
                    </label>
                </div>
            </div>

            
            <button
                type="submit"
                className="w-full h-11 mt-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]"
            >
                Create My Shop
            </button>
        </form>
    );
};

export default ShopRegister;
