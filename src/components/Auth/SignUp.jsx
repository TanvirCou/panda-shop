/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdLockOutline, MdOutlineEmail, MdPersonOutline } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { toast } from "react-toastify";

const InputWrapper = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
      {label}
    </label>
    {children}
  </div>
);

const SignUp = ({ setActive }) => {
  const [passShow, setPassShow] = useState(false);
  const [confirmPassShow, setConfirmPassShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      const data = { name, email, password, avatar: file };
      try {
        const res = await axios.post(
          "https://panda-shop-server-production.up.railway.app/api/user/register",
          data
        );
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAvatar();
        setActive(true);
      } catch (err) {
        console.log(err);
        
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-3.5">
      
      <InputWrapper label="Full Name">
        <div className="relative">
          <MdPersonOutline
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Doe"
            className="w-full h-11 bg-white border border-gray-200 text-gray-800 placeholder:text-gray-300 text-sm pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 shadow-sm transition-all duration-200"
          />
        </div>
      </InputWrapper>

      
      <InputWrapper label="Email Address">
        <div className="relative">
          <MdOutlineEmail
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full h-11 bg-white border border-gray-200 text-gray-800 placeholder:text-gray-300 text-sm pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 shadow-sm transition-all duration-200"
          />
        </div>
      </InputWrapper>

      
      <InputWrapper label="Password">
        <div className="relative">
          <MdLockOutline
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type={!passShow ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            placeholder="Min. 6 characters"
            className="w-full h-11 bg-white border border-gray-200 text-gray-800 placeholder:text-gray-300 text-sm pl-10 pr-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 shadow-sm transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setPassShow(!passShow)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-emerald-500 transition-colors duration-200"
            tabIndex={-1}
          >
            {!passShow ? <IoEye size={18} /> : <IoEyeOff size={18} />}
          </button>
        </div>
      </InputWrapper>

      
      <InputWrapper label="Confirm Password">
        <div className="relative">
          <MdLockOutline
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type={!confirmPassShow ? "password" : "text"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Re-enter your password"
            className="w-full h-11 bg-white border border-gray-200 text-gray-800 placeholder:text-gray-300 text-sm pl-10 pr-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 shadow-sm transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setConfirmPassShow(!confirmPassShow)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-emerald-500 transition-colors duration-200"
            tabIndex={-1}
          >
            {!confirmPassShow ? <IoEye size={18} /> : <IoEyeOff size={18} />}
          </button>
        </div>
      </InputWrapper>

      
      <div className="pt-1">
        <label className="block text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-1.5">
          Profile Photo
        </label>
        <div className="flex items-center gap-3">
          
          <div className="flex-shrink-0 w-11 h-11 rounded-full ring-2 ring-offset-2 ring-gray-200 bg-gray-100 flex items-center justify-center overflow-hidden">
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <RxAvatar className="w-6 h-6 text-gray-400" />
            )}
          </div>

          
          <label htmlFor="file-input" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2 h-11 px-4 bg-white hover:bg-emerald-50/60 border border-dashed border-gray-200 hover:border-emerald-400 rounded-xl transition-all duration-200 text-gray-400 hover:text-emerald-500 text-[13px] font-medium shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <span className="truncate">
                {avatar ? avatar.name : "Click to upload a photo"}
              </span>
            </div>
            <input
              type="file"
              name="avatar"
              id="file-input"
              className="sr-only"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      
      <div className="relative pt-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100" />
        </div>
      </div>

      
      <button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-200/60 hover:shadow-emerald-300/70 active:scale-[0.985] transition-all duration-200 tracking-wide"
      >
        Create Account →
      </button>
    </form>
  );
};

export default SignUp;
