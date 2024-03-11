/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Country, State } from 'country-state-city';

const Shipping = ({ name, setName, email, setEmail, phoneNumber, setPhoneNumber, zipCode, setZipCode, country, setCountry, city, setCity, address1, setAddress1, address2, setAddress2, user, handleCode, subTotal, shipping, discountPercentage, totalPrice, couponCode, setCouponCode, handleGoToPayment }) => {

    const [open, setOpen] = useState(false);

    return (
        <div className='w-full flex flex-col items-center my-6'>
            <div className='w-10/12 md:w-9/12 md:flex '>
                <div className='w-full md:w-8/12 bg-white px-4 pt-2 pb-6 rounded-md'>
                    <p className='text-lg font-semibold text-center md:text-left'>Shipping Address</p>

                    <div className='flex flex-wrap justify-between'>
                        <div className='flex flex-col pt-3 pl-1 md:pl-0'>
                            <label className='text-sm text-gray-500 font-medium'>Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-[300px] md:w-[300px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your full name' />
                        </div>

                        <div className='flex flex-col pt-3 pl-1 md:pl-0'>
                            <label className='text-sm text-gray-500 font-medium'>Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-[300px] md:w-[300px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your email address' />
                        </div>

                        <div className='flex flex-col pt-3 pl-1 md:pl-0'>
                            <label className='text-sm text-gray-500 font-medium'>Phone Number</label>
                            <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='w-[300px] md:w-[300px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your phone number' />
                        </div>
                        <div className='flex flex-col pt-3 pl-1 md:pl-0'>
                            <label className='text-sm text-gray-500 font-medium'>Zip code</label>
                            <input type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className='w-[300px] md:w-[300px] h-9 border border-solid border-gray-300 rounded-md placeholder:text-sm text-sm font-medium px-2 focus:outline-none focus:border-teal-500 focus:ring-sky-500 my-1' placeholder='Enter your phone number' />
                        </div>

                        <div className='flex flex-col pt-3 pl-1 md:pl-0'>
                            <label className='text-sm text-gray-500 font-medium'>Country</label>

                            <select value={country} onChange={(e) => setCountry(e.target.value)} className='w-[300px] mt-1 h-8 border-gray-200 rounded-md border-2 focus:border-teal-500 '>
                                <option value="" className='pb-2'>Choose your country</option>
                                {
                                    Country && Country.getAllCountries().map(i => (
                                        <option className='pb-2' value={i.isoCode} key={i.isoCode}>{i.name}</option>
                                    ))
                                }
                            </select>
                        </div>


                        <div className='flex flex-col pt-3 pl-1 md:pl-0'>
                            <label className='text-sm text-gray-500 font-medium'>City</label>

                            <select value={city} onChange={(e) => setCity(e.target.value)} className='w-[300px] mt-1 h-8 border-gray-200 rounded-md border-2 focus:border-teal-500 '>
                                <option value="" className='pb-2'>Choose your city</option>
                                {
                                    State && State.getStatesOfCountry(country).map(i => (
                                        <option className='pb-2' value={i.isoCode} key={i.isoCode}>{i.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='flex flex-col pt-3 pl-1 md:pl-0'>
                            <label htmlFor="" className="text-sm text-gray-500 font-medium">Address 1</label>

                            <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Enter your address" className="w-[300px] border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                        </div>
                        <br />

                        <div className='flex flex-col pt-3 pl-1 md:pl-0'>
                            <label htmlFor="" className="text-sm text-gray-500 font-medium">Address 2</label>

                            <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Enter your address" className="w-[300px] border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                        </div>
                    </div>

                    <div className='my-3 text-md font-medium cursor-pointer pl-1 md:pl-0' onClick={() => setOpen(!open)}>
                        <p>Use Save Addresses</p>
                    </div>

                    <div>
                        {
                            open ? user && user.user.addresses.map((i, index) => (
                                <div key={index} className='flex items-center'>
                                    <input type="checkbox" className='cursor-pointer' onClick={() => setCountry(i.country) || setCity(i.city) || setZipCode(i.zipCode) || setAddress1(i.address1) || setAddress2(i.address2)} />
                                    <label className='ml-1.5 text-sm font-medium'>{i.addressType}</label>
                                </div>
                            )) : ""
                        }
                    </div>
                </div>
                <div className='w-full md:w-4/12 h-fit bg-white md:ml-4 px-2 pt-6 pb-6 rounded-md mt-8 md:mt-0'>
                    <div className='flex justify-between items-center font-medium shadow-sm bg-gray-100 px-2 py-1 rounded-md'>
                        <p>Sub-Total</p>
                        <p>${subTotal}</p>
                    </div>
                    <div className='flex justify-between items-center font-medium shadow-sm bg-gray-100 px-2 py-1 rounded-md my-2'>
                        <p>Shipping</p>
                        <p>${shipping.toFixed(2)}</p>
                    </div>
                    <div className='flex justify-between items-center font-medium shadow-sm bg-gray-100 px-2 py-1 rounded-md mb-2'>
                        <p>Discount</p>
                        <p>{discountPercentage ? `- $${discountPercentage.toString()}` : ""}</p>
                    </div>
                    <div className='flex justify-end items-center font-medium shadow-sm bg-gray-100 px-2 py-1 rounded-md'>
                        <p>${totalPrice}</p>
                    </div>

                    <input type="text" className='border-2 border-gray-200 w-full h-8 mt-6 rounded-md text-sm px-2 font-medium focus:border-teal-600' value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder='Enter Coupon Code' />

                    <button onClick={handleCode} className='w-full bg-black text-white  py-1.5 px-8 mt-6 rounded-md font-medium'>Apply code</button>

                </div>
            </div>
            <div>
                <button onClick={handleGoToPayment} className="bg-black text-white py-1.5 px-8 my-6 rounded-md font-medium">Go to payment</button>
            </div>
        </div>
    );
};

export default Shipping;