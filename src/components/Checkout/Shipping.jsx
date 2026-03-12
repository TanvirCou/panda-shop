/* eslint-disable react/prop-types */
import { Country, State } from 'country-state-city';
import { useState } from 'react';
import { IoCallOutline, IoChevronDownOutline, IoLocationOutline, IoMailOutline, IoMapOutline, IoPersonOutline, IoTicketOutline } from 'react-icons/io5';

const InputBox = ({ label, value, onChange, placeholder, type = "text", icon: Icon, required = true }) => (
    <div className="flex flex-col gap-1.5 flex-1 min-w-[280px]">
        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                <Icon size={18} />
            </div>
            <input 
                type={type} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder}
                required={required}
                className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm shadow-gray-100/50"
            />
        </div>
    </div>
);

const Shipping = ({ name, setName, email, setEmail, phoneNumber, setPhoneNumber, zipCode, setZipCode, country, setCountry, city, setCity, address1, setAddress1, address2, setAddress2, user, handleCode, subTotal, shipping, discountPercentage, totalPrice, couponCode, setCouponCode, handleGoToPayment }) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl shadow-gray-200/20">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <IoLocationOutline size={22} />
                            </div>
                            <h2 className="text-xl font-black text-gray-900 tracking-tight">Shipping Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputBox label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="User Name" icon={IoPersonOutline} />
                            <InputBox label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" type="email" icon={IoMailOutline} />
                            <InputBox label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+1 234 567 890" type="tel" icon={IoCallOutline} />
                            <InputBox label="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="00000" icon={IoMapOutline} />
                            
                            
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Country <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                        <IoMapOutline size={18} />
                                    </div>
                                    <select 
                                        value={country} 
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="w-full h-11 pl-10 pr-10 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm appearance-none"
                                    >
                                        <option value="">Choose country</option>
                                        {Country && Country.getAllCountries().map(i => (
                                            <option key={i.isoCode} value={i.isoCode}>{i.name}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                        <IoChevronDownOutline size={16} />
                                    </div>
                                </div>
                            </div>

                            
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">City / State <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                        <IoLocationOutline size={18} />
                                    </div>
                                    <select 
                                        value={city} 
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full h-11 pl-10 pr-10 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm appearance-none"
                                    >
                                        <option value="">Choose city</option>
                                        {State && State.getStatesOfCountry(country).map(i => (
                                            <option key={i.isoCode} value={i.isoCode}>{i.name}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                        <IoChevronDownOutline size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <InputBox label="Primary Address" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Street name, house number..." icon={IoLocationOutline} />
                            </div>
                            <div className="md:col-span-2">
                                <InputBox label="Secondary Address (Optional)" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Apartment, suite, unit..." icon={IoLocationOutline} required={false} />
                            </div>
                        </div>

                        
                        {user?.user?.addresses?.length > 0 && (
                            <div className="mt-8 border-t border-gray-50 pt-8">
                                <button 
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-500 transition-colors uppercase tracking-widest"
                                >
                                    {open ? '− Hide Saved Addresses' : '＋ Use Saved Address'}
                                </button>
                                
                                {open && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        {user.user.addresses.map((i, index) => (
                                            <div 
                                                key={index}
                                                onClick={() => {
                                                    setCountry(i.country);
                                                    setCity(i.city);
                                                    setZipCode(i.zipCode);
                                                    setAddress1(i.address1);
                                                    setAddress2(i.address2);
                                                }}
                                                className="p-4 rounded-2xl border-2 border-gray-100 hover:border-emerald-500 hover:bg-emerald-50/30 cursor-pointer transition-all flex items-start gap-3 group"
                                            >
                                                <div className="mt-1 w-4 h-4 rounded-full border-2 border-gray-300 group-hover:border-emerald-500 flex items-center justify-center transition-colors">
                                                    {address1 === i.address1 && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900">{i.addressType}</p>
                                                    <p className="text-xs text-gray-500 font-medium mt-0.5">{i.address1}, {i.city}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-gray-200/20 sticky top-24">
                        <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6">Order Summary</h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Subtotal</span>
                                <span className="text-sm font-black text-gray-900">${subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Shipping</span>
                                <span className="text-sm font-black text-gray-900">${shipping.toFixed(2)}</span>
                            </div>
                            {discountPercentage > 0 && (
                                <div className="flex justify-between items-center py-2 px-3 bg-emerald-50 rounded-xl">
                                    <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Discount</span>
                                    <span className="text-sm font-black text-emerald-600">−${discountPercentage.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                                <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Grand Total</span>
                                <span className="text-2xl font-black text-emerald-600 tracking-tighter">${totalPrice}</span>
                            </div>
                        </div>

                        
                        <div className="space-y-3 mb-8">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Have a coupon?</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <IoTicketOutline size={18} />
                                    </div>
                                    <input 
                                        type="text" 
                                        value={couponCode} 
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="PANDA2024"
                                        className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm"
                                    />
                                </div>
                                <button 
                                    onClick={handleCode}
                                    className="px-4 h-11 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={handleGoToPayment}
                            className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            Continue to Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;