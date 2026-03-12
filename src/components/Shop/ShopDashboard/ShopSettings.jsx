import axios from "axios";
import { useState } from "react";
import { FiAlignLeft, FiCamera, FiMapPin, FiPhone, FiSave, FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchShop } from "../../../redux/features/shopSlice";
import LoadingAnimation from "../../Loader/LoadingAnimation";

const inputClass = "w-full h-10 px-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 shadow-sm transition-all";
const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5";

const FormField = ({ label, children }) => (
    <div>
        <label className={labelClass}>{label}</label>
        {children}
    </div>
);

const ShopSettings = () => {
    const { shop, loading } = useSelector(state => state.shop);
    const dispatch = useDispatch();

    const [name, setName]               = useState(shop?.shop?.name || "");
    const [description, setDescription] = useState(shop?.shop?.description || "");
    const [address, setAddress]         = useState(shop?.shop?.address || "");
    const [phoneNumber, setPhoneNumber] = useState(shop?.shop?.phoneNumber || "");
    const [zipCode, setZipCode]         = useState(shop?.shop?.zipCode || "");
    const [avatar, setAvatar]           = useState(null);   // local File object for preview
    const [avatarUrl, setAvatarUrl]     = useState(null);   // uploaded Cloudinary URL
    const [uploading, setUploading]     = useState(false);
    const [saving, setSaving]           = useState(false);

    const handleAvatarChange = (file) => {
        setAvatar(file);
        setUploading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "panda-shop");
        data.append("cloud_name", "ddcn60bx4");
        fetch("https://api.cloudinary.com/v1_1/ddcn60bx4/image/upload", { method: "POST", body: data })
            .then(res => res.json())
            .then(data => { setAvatarUrl(data.url.toString()); setUploading(false); })
            .catch(err => { console.error(err); setUploading(false); });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (uploading) { toast.error("Please wait for the avatar to finish uploading"); return; }
        setSaving(true);
        try {
            const res = await axios.put(
                "http://localhost:3000/api/shop/update-shop-info",
                { name, description, address, phoneNumber, zipCode, avatar: avatarUrl || undefined },
                { withCredentials: true }
            );
            toast.success(res.data.message || "Shop updated successfully!");
            dispatch(fetchShop());
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingAnimation />;

    const previewSrc = avatar ? URL.createObjectURL(avatar) : shop?.shop?.avatar;

    return (
        <div className="p-4 md:p-6">
            <div className="mb-6">
                <h1 className="text-xl font-black text-gray-900">Shop Settings</h1>
                <p className="text-sm text-gray-400 mt-0.5">Update your shop's public profile and contact info</p>
            </div>

            <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    
                    <div className="lg:col-span-2 space-y-4">

                        
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
                                <div className="w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center">
                                    <FiShoppingBag size={14} className="text-cyan-600" />
                                </div>
                                <p className="text-sm font-bold text-gray-800">Shop Identity</p>
                            </div>

                            <div className="flex items-center gap-5">
                                
                                <div className="relative flex-shrink-0">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-100 bg-gray-50">
                                        {previewSrc ? (
                                            <img src={previewSrc} alt="Shop avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-2xl">🏪</div>
                                        )}
                                    </div>
                                    <label
                                        htmlFor="avatar"
                                        className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-cyan-600 flex items-center justify-center cursor-pointer shadow-md hover:bg-cyan-500 transition-colors"
                                    >
                                        <FiCamera size={13} className="text-white" />
                                        <input type="file" id="avatar" accept="image/*" className="hidden" onChange={e => handleAvatarChange(e.target.files[0])} />
                                    </label>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{shop?.shop?.name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Click the camera icon to change your shop photo</p>
                                    {uploading && <p className="text-xs text-amber-500 font-semibold mt-1 animate-pulse">Uploading…</p>}
                                    {avatarUrl && !uploading && <p className="text-xs text-emerald-500 font-semibold mt-1">✓ New photo ready</p>}
                                </div>
                            </div>
                        </div>

                        
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                <div className="w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center">
                                    <FiAlignLeft size={14} className="text-cyan-600" />
                                </div>
                                <p className="text-sm font-bold text-gray-800">Shop Details</p>
                            </div>

                            <FormField label="Shop Name">
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Your shop name"
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Shop Description">
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Tell customers what your shop is about…"
                                    rows={4}
                                    className={`${inputClass} h-auto py-2.5 resize-none`}
                                />
                            </FormField>
                        </div>
                    </div>

                    
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                <div className="w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center">
                                    <FiMapPin size={14} className="text-cyan-600" />
                                </div>
                                <p className="text-sm font-bold text-gray-800">Contact & Location</p>
                            </div>

                            <FormField label="Shop Address">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    placeholder="Street address"
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="ZIP / Postal Code">
                                <input
                                    type="text"
                                    value={zipCode}
                                    onChange={e => setZipCode(e.target.value)}
                                    placeholder="ZIP code"
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Phone Number">
                                <div className="relative">
                                    <FiPhone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e.target.value)}
                                        placeholder="+1 000 000 0000"
                                        className={`${inputClass} pl-9`}
                                    />
                                </div>
                            </FormField>
                        </div>

                        
                        <div className="bg-cyan-50 border border-cyan-100 rounded-xl px-4 py-3">
                            <p className="text-xs text-cyan-600 font-semibold">💡 Tip</p>
                            <p className="text-xs text-cyan-500 mt-1 leading-relaxed">
                                A complete profile with a logo and description helps build customer trust and improves your shop's visibility.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={saving || uploading}
                            className="w-full h-11 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 disabled:opacity-60 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-cyan-200/50 transition-all duration-200 active:scale-[0.98]"
                        >
                            <FiSave size={15} />
                            {saving ? "Saving…" : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ShopSettings;
