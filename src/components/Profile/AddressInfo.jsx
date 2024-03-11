import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import "../../App.css";
import { Country, State } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/features/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddressInfo = () => {
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState();
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const addressTypeData = [
        {
            name: "Default"
        },
        {
            name: "Home"
        },
        {
            name: "Office"
        },
    ];

    const handleCreateAddress = async (e) => {
        e.preventDefault();

        const address = {
            country,
            city,
            zipCode,
            address1,
            address2,
            addressType
        };

        try {
            await axios.put("http://localhost:3000/api/user/update-user-addresses", address, { withCredentials: true });
            toast.success("Address updated successfully");
            dispatch(fetchUser());
            setCountry("");
            setCity("");
            setZipCode(null);
            setAddress1("");
            setAddress2("");
            setAddressType("");
            setOpen(false);
        } catch (error) {
            toast.error(error.response.data.message);
        }

    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/user/delete-user-address/${id}`, { withCredentials: true });
            toast.success("Address deleted successfully");
            dispatch(fetchUser());
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='pr-8 pl-4 md:pl-0 md:pr-0 py-6 md:py-4 w-full'>
            <div className='flex items-center justify-between'>
                <p className='text-lg md:text-2xl font-semibold'>My Addresses</p>
                <button onClick={() => setOpen(true)} className='w-fit px-4 py-2 bg-black text-white rounded-md font-medium'>Add New</button>
            </div>
            {
                user && user.user.addresses.length === 0 &&
                <div className='w-full h-[400px] flex items-center justify-center'>
                    <p className='text-lg font-medium'>No Address found</p>

                </div>
            }
            {
                user && user?.user?.addresses.map((i, index) => (
                    <div key={index} className='block lg:flex items-center justify-between bg-white shadow-sm rounded-sm w-full py-5 px-5 md:px-10 my-4'>
                        <div className='flex items-center'>
                            <p className='font-medium'>{i.addressType}</p>
                        </div>
                        <div className='flex items-center my-1 md:my-0'>
                            <p className='font-medium'>{i.address1} + {i.address2}</p>
                        </div>
                        <div className='flex items-center my-1 md:my-0'>
                            <p className='font-medium'>{user.user.phoneNumber}</p>
                        </div>
                        <div className='mt-1 md:mt-0'>
                            <AiOutlineDelete size={22} className='cursor-pointer' onClick={() => handleDelete(i._id)} />
                        </div>
                    </div>
                ))
            }
            {
                open ? (
                    <div className='fixed w-full h-screen bg-[#00000030] z-40 top-0 left-0 flex items-center justify-center'>
                        <div className='w-[90%] md:w-[40%] h-[90vh] md:h-[85vh] bg-white rounded-md shadow-sm relative p-4 overflow-y-scroll webkit'>
                            <RxCross1 size={25} onClick={() => setOpen(false)} className='absolute cursor-pointer right-3 top-3 z-50' />
                            <div className='py-4'>
                                <p className='text-xl font-semibold text-center'>Add New Address</p>
                                <br />

                                <div>
                                    <label className='text-sm font-medium'>Country</label>
                                    <br />
                                    <select required value={country} onChange={(e) => setCountry(e.target.value)} className='w-full mt-1 h-8 border-gray-200 rounded-md border-2 focus:border-teal-500 '>
                                        <option value="" className='pb-2'>Choose your country</option>
                                        {
                                            Country && Country.getAllCountries().map(i => (
                                                <option className='pb-2' value={i.isoCode} key={i.isoCode}>{i.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <br />

                                <div>
                                    <label className='text-sm font-medium'>City</label>
                                    <br />
                                    <select required value={city} onChange={(e) => setCity(e.target.value)} className='w-full mt-1 h-8 border-gray-200 rounded-md border-2 focus:border-teal-500 '>
                                        <option value="" className='pb-2'>Choose your city</option>
                                        {
                                            State && State.getStatesOfCountry(country).map(i => (
                                                <option className='pb-2' value={i.isoCode} key={i.isoCode}>{i.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <br />

                                <div className="">
                                    <label htmlFor="" className="text-sm font-medium">Zip Code</label>
                                    <input required type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Enter your zip code" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                </div>
                                <br />

                                <div className="">
                                    <label htmlFor="" className="text-sm font-medium">Address 1</label>
                                    <input required type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Enter your address" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                </div>
                                <br />

                                <div className="">
                                    <label htmlFor="" className="text-sm font-medium">Address 2</label>
                                    <input required type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Enter your address" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                                </div>
                                <br />

                                <div>
                                    <label className='text-sm font-medium'>Address Type</label>
                                    <br />
                                    <select required value={addressType} onChange={(e) => setAddressType(e.target.value)} className='w-full mt-1 h-8 border-gray-200 rounded-md border-2 focus:border-teal-500 '>
                                        <option value="" className='pb-2'>Choose your address type</option>
                                        {
                                            addressTypeData && addressTypeData.map(i => (
                                                <option className='pb-2' value={i.name} key={i.name}>{i.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <button onClick={handleCreateAddress} className="bg-black text-white py-1.5 px-4 my-3 rounded-md font-medium">Create Address</button>
                            </div>
                        </div>
                    </div>
                ) : ""
            }
        </div>
    );
};

export default AddressInfo;