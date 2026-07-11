import axios from "axios";
import { useState } from "react";
import { MdOutlinePermMedia } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUser } from "../../redux/features/userSlice";
import LoadingAnimation from "../Loader/LoadingAnimation";

const Field = ({ label, type, value, onChange, placeholder }) => (
  <div className='flex flex-col gap-1.5'>
    <label className='text-xs font-bold text-gray-500 uppercase tracking-wide'>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className='h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
    />
  </div>
);

const ProfileInfo = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.user?.name);
  const [email, setEmail] = useState(user?.user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.user?.phoneNumber);
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
    const userData = { name, email, phoneNumber, password, avatar: file };
    try {
      const res = await axios.put(
        "https://panda-shop-server-v3.up.railway.app/api/user/update-user-info",
        userData,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      dispatch(fetchUser());
      setAvatar(null);
      setFile(null);
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8'>
      <h2 className='text-xl font-bold text-gray-900 mb-6'>My Profile</h2>

      <div className='flex items-center gap-5 mb-8 pb-8 border-b border-gray-100'>
        <div className='relative flex-shrink-0'>
          <img
            src={avatar ? URL.createObjectURL(avatar) : user?.user?.avatar}
            alt={user?.user?.name}
            className='w-24 h-24 rounded-2xl object-cover ring-4 ring-emerald-50'
          />
          <label
            htmlFor='avatar'
            className='absolute -bottom-2 -right-2 w-8 h-8 bg-gray-900 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center cursor-pointer transition-colors shadow-md'
          >
            <MdOutlinePermMedia size={14} />
            <input
              type='file'
              name='avatar'
              id='avatar'
              className='sr-only'
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </label>
        </div>
        <div>
          <p className='font-bold text-gray-900 text-lg'>{user?.user?.name}</p>
          <p className='text-sm text-gray-500'>{user?.user?.email}</p>
          <p className='text-xs text-gray-400 mt-1'>
            Click the camera icon to update your photo
          </p>
        </div>
      </div>

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
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
        />
        <Field
          label='Phone Number'
          type='number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder='Enter your phone number'
        />
        <Field
          label='Password (to confirm changes)'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
        />
        <div className='md:col-span-2 pt-2'>
          <button
            type='submit'
            className='px-8 py-3 bg-gray-900 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200/50'
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
