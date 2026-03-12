import axios from "axios";
import { Country, State } from "country-state-city";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../../App.css";
import { fetchUser } from "../../redux/features/userSlice";

const ADDRESS_TYPE_ICONS = { Default: "⭐", Home: "🏠", Office: "🏢" };
const ADDRESS_TYPE_COLORS = {
    Default: "bg-purple-50 text-purple-700",
    Home: "bg-emerald-50 text-emerald-700",
    Office: "bg-blue-50 text-blue-700",
};

const selectClass = "w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all";
const inputClass = "w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all";
const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wide";

const AddressInfo = () => {
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const addressTypeData = [{ name: "Default" }, { name: "Home" }, { name: "Office" }];

    const handleCreateAddress = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(
                "http://localhost:3000/api/user/update-user-addresses",
                { country, city, zipCode, address1, address2, addressType },
                { withCredentials: true }
            );
            toast.success("Address added successfully");
            dispatch(fetchUser());
            setCountry(""); setCity(""); setZipCode(""); setAddress1(""); setAddress2(""); setAddressType("");
            setOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/user/delete-user-address/${id}`, { withCredentials: true });
            toast.success("Address deleted successfully");
            dispatch(fetchUser());
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all duration-300"
                >
                    <span>+</span> Add New
                </button>
            </div>

            
            {user?.user?.addresses?.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-100 rounded-2xl text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 text-2xl">📍</div>
                    <p className="font-semibold text-gray-400">No addresses yet</p>
                    <p className="text-sm text-gray-300 mt-1">Add a delivery address to speed up checkout</p>
                </div>
            )}

            
            {user?.user?.addresses?.length > 0 && (
                <div className="space-y-3">
                    {user.user.addresses.map((addr, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-gray-50/70 border border-gray-100 hover:bg-gray-50 transition-colors">
                            
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0 ${ADDRESS_TYPE_COLORS[addr.addressType] || "bg-gray-100 text-gray-600"}`}>
                                {ADDRESS_TYPE_ICONS[addr.addressType] || "📌"} {addr.addressType}
                            </span>
                            
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    {addr.address1}{addr.address2 ? `, ${addr.address2}` : ""}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {addr.city && `${addr.city}, `}{addr.country}{addr.zipCode ? ` · ZIP: ${addr.zipCode}` : ""}
                                </p>
                            </div>
                            
                            <p className="hidden md:block text-sm text-gray-500 font-medium flex-shrink-0">
                                📞 {user.user.phoneNumber}
                            </p>
                            
                            <button
                                onClick={() => handleDelete(addr._id)}
                                className="self-start sm:self-center w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                            >
                                <AiOutlineDelete size={17} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            
            {open && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors z-10"
                        >
                            <RxCross1 size={14} />
                        </button>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Add New Address</h2>
                            <p className="text-sm text-gray-500 mb-6">Fill in the details for your new delivery address.</p>
                            <form onSubmit={handleCreateAddress} className="space-y-4">
                                <div>
                                    <label className={`${labelClass} block mb-2`}>Country</label>
                                    <select required value={country} onChange={(e) => setCountry(e.target.value)} className={selectClass}>
                                        <option value="">Choose your country</option>
                                        {Country.getAllCountries().map((c) => (
                                            <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={`${labelClass} block mb-2`}>City / State</label>
                                    <select required value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
                                        <option value="">Choose your city</option>
                                        {State.getStatesOfCountry(country).map((s) => (
                                            <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={`${labelClass} block mb-2`}>Zip Code</label>
                                    <input required type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Enter your zip code" className={inputClass} />
                                </div>
                                <div>
                                    <label className={`${labelClass} block mb-2`}>Address Line 1</label>
                                    <input required type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Street address, house no." className={inputClass} />
                                </div>
                                <div>
                                    <label className={`${labelClass} block mb-2`}>Address Line 2 <span className="text-gray-400 normal-case font-medium">(Optional)</span></label>
                                    <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Apartment, suite, floor, etc." className={inputClass} />
                                </div>
                                <div>
                                    <label className={`${labelClass} block mb-2`}>Address Type</label>
                                    <select required value={addressType} onChange={(e) => setAddressType(e.target.value)} className={selectClass}>
                                        <option value="">Choose address type</option>
                                        {addressTypeData.map((t) => (
                                            <option key={t.name} value={t.name}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-gray-900 hover:bg-emerald-600 disabled:bg-gray-300 text-white text-sm font-bold rounded-xl transition-all duration-300 mt-2"
                                >
                                    {loading ? "Saving..." : "Save Address"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressInfo;
