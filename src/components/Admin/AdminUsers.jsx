import axios from "axios";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllUser } from "../../redux/features/userSlice";
import LoadingAnimation from "../Loader/LoadingAnimation";

const RoleBadge = ({ role }) => {
  const isAdmin = role === "admin";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border
            ${
              isAdmin
                ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                : "bg-gray-50 text-gray-500 border-gray-200"
            }`}
    >
      {role}
    </span>
  );
};

const AdminUsers = () => {
  const { allUsers, allUsersLoading } = useSelector((state) => state.user);
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `https://panda-shop-server-production-v2.up.railway.app/api/user/delete-user/${userId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setOpen(false);
      dispatch(fetchAllUser());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (allUsersLoading) return <LoadingAnimation />;
  const users = allUsers?.users || [];

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='p-4 md:p-6 space-y-5'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-md shadow-violet-200'>
          <FaUserFriends size={18} className='text-white' />
        </div>
        <div>
          <h1 className='text-base font-black text-gray-900'>All Users</h1>
          <p className='text-xs text-gray-400 font-medium'>
            {users.length} registered users
          </p>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-3'>
        <div className='relative flex-1 max-w-md'>
          <FiSearch
            size={15}
            className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
          />
          <input
            type='text'
            placeholder='Search by User Name or Email…'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full h-10 pl-9 pr-4 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400 shadow-sm transition-all'
          />
        </div>
      </div>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        {filtered.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 gap-2'>
            <span className='text-4xl text-gray-300 animate-bounce'>👤</span>
            <p className='text-sm font-semibold text-gray-400'>
              No users found
            </p>
            <p className='text-xs text-gray-300'>Try changing your search</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide border-b border-gray-100'>
                  <th className='px-5 py-3.5 text-left'>#</th>
                  <th className='px-5 py-3.5 text-left'>User</th>
                  <th className='px-5 py-3.5 text-left'>Email</th>
                  <th className='px-5 py-3.5 text-left'>Phone</th>
                  <th className='px-5 py-3.5 text-left'>Role</th>
                  <th className='px-5 py-3.5 text-center'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {filtered.map((user, index) => (
                  <tr
                    key={index}
                    className='hover:bg-gray-50/60 transition-colors duration-150'
                  >
                    <td className='px-5 py-3.5 text-xs font-bold text-gray-400'>
                      {index + 1}
                    </td>
                    <td className='px-5 py-3.5'>
                      <div className='flex items-center gap-2.5'>
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className='w-8 h-8 rounded-lg object-cover flex-shrink-0 ring-1 ring-gray-100'
                          />
                        ) : (
                          <div className='w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-black flex-shrink-0'>
                            {user.name?.[0]?.toUpperCase()}
                          </div>
                        )}
                        <p className='text-sm font-semibold text-gray-800'>
                          {user.name}
                        </p>
                      </div>
                    </td>
                    <td className='px-5 py-3.5 text-gray-500 text-xs'>
                      {user?.email}
                    </td>
                    <td className='px-5 py-3.5 text-gray-400 text-xs'>
                      {user?.phoneNumber || "—"}
                    </td>
                    <td className='px-5 py-3.5'>
                      <RoleBadge role={user.role} />
                    </td>
                    <td className='px-5 py-3.5'>
                      <div className='flex items-center justify-center'>
                        <button
                          onClick={() => {
                            setOpen(true);
                            setUserId(user._id);
                          }}
                          className='w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors duration-150'
                        >
                          <AiOutlineDelete size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open &&
        ReactDOM.createPortal(
          <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] flex items-center justify-center p-4'>
            <div className='bg-white rounded-2xl shadow-2xl w-full max-sm p-6 relative'>
              <button
                onClick={() => setOpen(false)}
                className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors'
              >
                <FiX size={16} />
              </button>

              <div className='flex flex-col items-center gap-4 text-center pt-2'>
                <div className='w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center'>
                  <AiOutlineDelete size={22} className='text-red-500' />
                </div>
                <div>
                  <h3 className='text-base font-black text-gray-900'>
                    Delete User?
                  </h3>
                  <p className='text-sm text-gray-400 mt-1'>
                    This action cannot be undone. The user account will be
                    permanently removed.
                  </p>
                </div>
                <div className='flex gap-3 w-full mt-1'>
                  <button
                    onClick={() => setOpen(false)}
                    className='flex-1 h-10 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className='flex-1 h-10 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-sm font-semibold text-white hover:from-red-400 hover:to-rose-400 transition-all shadow-md shadow-red-200'
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default AdminUsers;
