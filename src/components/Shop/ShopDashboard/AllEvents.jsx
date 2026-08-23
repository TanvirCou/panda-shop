import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiArrowRight, FiEye, FiPlus, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchEvent } from "../../../redux/features/eventSlice";
import LoadingAnimation from "../../Loader/LoadingAnimation";

const EVENT_STATUS_STYLES = {
  Running: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Expired: "bg-red-50 text-red-500 border-red-100",
  Upcoming: "bg-blue-50 text-blue-600 border-blue-100",
};

const AllEvents = () => {
  const { events, isEventLoading } = useSelector((state) => state.event);
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    dispatch(fetchEvent(shop.shop._id));
  }, [dispatch, shop]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://panda-shop-server-v4.up.railway.app/api/event/delete-event/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      dispatch(fetchEvent(shop.shop._id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setConfirmId(null);
    }
  };

  if (isEventLoading) return <LoadingAnimation />;

  const allEvents = events?.events || [];
  const filtered = allEvents.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='p-4 md:p-6 space-y-5'>
      <div className='flex items-center justify-between flex-wrap gap-3'>
        <div>
          <h1 className='text-xl font-black text-gray-900'>All Events</h1>
          <p className='text-sm text-gray-400 mt-0.5'>
            {allEvents.length} event{allEvents.length !== 1 ? "s" : ""} in your
            shop
          </p>
        </div>
        <Link to='/shop/dashboard/create-event'>
          <button className='flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]'>
            <FiPlus size={15} /> Create Event
          </button>
        </Link>
      </div>

      <div className='relative max-w-sm'>
        <FiSearch
          size={15}
          className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
        />
        <input
          type='text'
          placeholder='Search events…'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full h-10 pl-9 pr-4 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 shadow-sm transition-all'
        />
      </div>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        {filtered.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 gap-2'>
            <span className='text-4xl'>🎪</span>
            <p className='text-sm font-semibold text-gray-400'>
              {allEvents.length === 0 ? "No events yet" : "No results found"}
            </p>
            <p className='text-xs text-gray-300'>
              {allEvents.length === 0
                ? "Create your first event to boost sales"
                : "Try a different search term"}
            </p>
            {allEvents.length === 0 && (
              <Link to='/shop/dashboard/create-event' className='mt-2'>
                <button className='flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-500 transition-colors'>
                  Create Event <FiArrowRight size={12} />
                </button>
              </Link>
            )}
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide border-b border-gray-100'>
                  <th className='px-5 py-3.5 text-left'>#</th>
                  <th className='px-5 py-3.5 text-left'>Event</th>
                  <th className='px-5 py-3.5 text-left'>Price</th>
                  <th className='px-5 py-3.5 text-left'>Stock</th>
                  <th className='px-5 py-3.5 text-left'>Sold</th>
                  <th className='px-5 py-3.5 text-left'>Dates</th>
                  <th className='px-5 py-3.5 text-left'>Status</th>
                  <th className='px-5 py-3.5 text-right'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {filtered.map((event, index) => {
                  const statusCls =
                    EVENT_STATUS_STYLES[event.status] ||
                    "bg-gray-50 text-gray-500 border-gray-100";
                  return (
                    <tr
                      key={event._id}
                      className='hover:bg-gray-50/50 transition-colors duration-150'
                    >
                      <td className='px-5 py-4 text-xs text-gray-400 font-medium'>
                        {index + 1}
                      </td>
                      <td className='px-5 py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0'>
                            {event?.images ? (
                              <img
                                src={event.images}
                                alt={event.name}
                                className='w-full h-full object-contain p-0.5'
                              />
                            ) : (
                              <div className='w-full h-full flex items-center justify-center text-lg'>
                                🎪
                              </div>
                            )}
                          </div>
                          <p className='font-semibold text-gray-800 line-clamp-1 max-w-[180px]'>
                            {event.name}
                          </p>
                        </div>
                      </td>
                      <td className='px-5 py-4 font-bold text-gray-900'>
                        ${event.discountPrice}
                      </td>
                      <td className='px-5 py-4'>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                            event.stock > 0
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : "bg-red-50 text-red-500 border-red-100"
                          }`}
                        >
                          {event.stock > 0 ? event.stock : "Out"}
                        </span>
                      </td>
                      <td className='px-5 py-4 text-gray-500 font-medium'>
                        {event.sold_out}
                      </td>
                      <td className='px-5 py-4'>
                        <div className='text-xs text-gray-400 space-y-0.5'>
                          {event.start_date && (
                            <p>
                              Start:{" "}
                              {new Date(event.start_date).toLocaleDateString()}
                            </p>
                          )}
                          {event.end_date && (
                            <p>
                              End:{" "}
                              {new Date(event.end_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className='px-5 py-4'>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusCls}`}
                        >
                          {event.status || "—"}
                        </span>
                      </td>
                      <td className='px-5 py-4'>
                        <div className='flex items-center justify-end gap-2'>
                          <Link to={`/product/${event._id}?isEvent=true`}>
                            <button
                              title='Preview'
                              className='w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-cyan-50 text-gray-400 hover:text-cyan-600 border border-gray-100 hover:border-cyan-200 transition-all duration-200'
                            >
                              <FiEye size={14} />
                            </button>
                          </Link>
                          {confirmId === event._id ? (
                            <div className='flex items-center gap-1'>
                              <button
                                onClick={() => handleDelete(event._id)}
                                className='px-2 py-1 text-[10px] font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setConfirmId(null)}
                                className='px-2 py-1 text-[10px] font-bold bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors'
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              title='Delete'
                              onClick={() => setConfirmId(event._id)}
                              className='w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-100 hover:border-red-200 transition-all duration-200'
                            >
                              <AiOutlineDelete size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
