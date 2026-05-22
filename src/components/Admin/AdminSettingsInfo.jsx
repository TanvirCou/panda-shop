import axios from "axios";
import { useState } from "react";
import { MdOutlinePermMedia } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUser } from "../../redux/features/userSlice";
import LoadingAnimation from "../Loader/LoadingAnimation";

const Field = ({ label, type, value, onChange, placeholder, readOnly }) => (
  <div className='flex flex-col gap-1.5'>
    <label className='text-xs font-bold text-gray-500 uppercase tracking-wide'>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`h-11 px-4 rounded-xl border text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
        readOnly
          ? "bg-gray-100 border-gray-100 text-gray-500 cursor-not-allowed"
          : "bg-gray-50 border-gray-200"
      }`}
    />
  </div>
);

const AdminSettingsInfo = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.user?.name || "");
  const [email] = useState(user?.user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.user?.phoneNumber || "");
  const [password, setPassword] = useState("");
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
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      phoneNumber,
      password,
      avatar: file,
    };
    try {
      const res = await axios.put(
        "https://panda-shop-server-production-v3.up.railway.app/api/user/update-user-info",
        userData,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      dispatch(fetchUser());
      setAvatar(null);
      setFile(null);
      setPassword("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-200'>
          <span className='text-white text-lg'>⚙️</span>
        </div>
        <div>
          <h1 className='text-base font-black text-gray-900'>Admin Settings</h1>
          <p className='text-xs text-gray-400 font-medium'>
            Manage your admin account
          </p>
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
        <div className='flex items-center gap-5'>
          <div className='relative flex-shrink-0'>
            <img
              src={avatar ? URL.createObjectURL(avatar) : user?.user?.avatar}
              alt={user?.user?.name}
              className='w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-50'
            />
            <label
              htmlFor='admin-avatar'
              className='absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center justify-center cursor-pointer transition-colors shadow-md shadow-indigo-200'
            >
              <MdOutlinePermMedia size={14} />
              <input
                type='file'
                name='admin-avatar'
                id='admin-avatar'
                className='sr-only'
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </label>
          </div>
          <div>
            <p className='font-bold text-gray-900 text-lg'>
              {user?.user?.name}
            </p>
            <p className='text-sm text-gray-500'>{user?.user?.email}</p>
            <span className='inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200'>
              {user?.user?.role}
            </span>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
        <h2 className='text-sm font-bold text-gray-700 mb-5'>
          Account Information
        </h2>
        <form
          onSubmit={handleUpdate}
          className='grid grid-cols-1 md:grid-cols-2 gap-5'
        >
          <Field
            label='Full Name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your full name'
          />
          <Field
            label='Email Address'
            type='email'
            value={email}
            readOnly
            placeholder='Admin email'
          />
          <Field
            label='Phone Number'
            type='number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='Enter phone number'
          />
          <Field
            label='Password (to confirm changes)'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter current password'
          />
          <div className='md:col-span-2 pt-1'>
            <button
              type='submit'
              className='px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-md shadow-indigo-200 hover:shadow-indigo-300'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettingsInfo;
