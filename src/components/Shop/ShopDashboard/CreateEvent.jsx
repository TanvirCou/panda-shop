import axios from "axios";
import { useState } from "react";
import { FiCalendar, FiX } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineEvent } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllEvent, fetchEvent } from "../../../redux/features/eventSlice";
import { categoriesData } from "../../../static/data";

const inputClass =
  "w-full h-10 px-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 shadow-sm transition-all";
const labelClass =
  "block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5";

const FormField = ({ label, required, children }) => (
  <div>
    <label className={labelClass}>
      {label} {required && <span className='text-red-400'>*</span>}
    </label>
    {children}
  </div>
);

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(new Date(startDate).getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  const handleFile = (file) => {
    setImages(file);
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "panda-shop");
    data.append("cloud_name", "ddcn60bx4");
    fetch("https://api.cloudinary.com/v1_1/ddcn60bx4/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImgUrl(data.url.toString());
        setUploading(false);
      })
      .catch((err) => {
        console.error(err);
        setUploading(false);
      });
  };

  const removeImage = () => {
    setImages(null);
    setImgUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !discountPrice ||
      !stock ||
      !category ||
      !startDate ||
      !endDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    if (uploading) {
      toast.error("Please wait for the image to finish uploading");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(
        "https://panda-shop-server-v4.up.railway.app/api/event/create-event",
        {
          name,
          description,
          category,
          tags,
          originalPrice,
          discountPrice,
          stock,
          start_date: startDate,
          end_date: endDate,
          images: imgUrl,
          shopId: shop.shop._id,
        }
      );
      toast.success("Event created successfully!");
      dispatch(fetchAllEvent());
      dispatch(fetchEvent(shop.shop._id));
      setName("");
      setDescription("");
      setCategory("");
      setTags("");
      setOriginalPrice("");
      setDiscountPrice("");
      setStock("");
      setImages(null);
      setImgUrl(null);
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='p-4 md:p-6'>
      <div className='mb-6'>
        <h1 className='text-xl font-black text-gray-900'>Create Event</h1>
        <p className='text-sm text-gray-400 mt-0.5'>
          Set up a limited-time sale event for your shop
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          <div className='lg:col-span-2 space-y-4'>
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4'>
              <div className='flex items-center gap-2 pb-2 border-b border-gray-100'>
                <div className='w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center'>
                  <MdOutlineEvent size={14} className='text-cyan-600' />
                </div>
                <p className='text-sm font-bold text-gray-800'>Event Details</p>
              </div>

              <FormField label='Event Name' required>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Enter event name'
                  className={inputClass}
                />
              </FormField>

              <FormField label='Description' required>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Describe this event…'
                  rows={4}
                  className={`${inputClass} h-auto py-2.5 resize-none`}
                />
              </FormField>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <FormField label='Category' required>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value=''>Choose a category</option>
                    {categoriesData?.map((i) => (
                      <option value={i.title} key={i.title}>
                        {i.title}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label='Tags'>
                  <input
                    type='text'
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder='e.g. flash-sale, summer'
                    className={inputClass}
                  />
                </FormField>
              </div>
            </div>

            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4'>
              <div className='flex items-center gap-2 pb-2 border-b border-gray-100'>
                <div className='w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center'>
                  <FiCalendar size={14} className='text-cyan-600' />
                </div>
                <p className='text-sm font-bold text-gray-800'>
                  Event Duration
                </p>
                <span className='text-[10px] text-gray-400 ml-1'>
                  (min 3 days)
                </span>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <FormField label='Start Date' required>
                  <input
                    type='date'
                    required
                    value={startDate || ""}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setEndDate("");
                    }}
                    min={today}
                    className={inputClass}
                  />
                </FormField>
                <FormField label='End Date' required>
                  <input
                    type='date'
                    required
                    value={endDate || ""}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={minEndDate}
                    disabled={!startDate}
                    className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </FormField>
              </div>
              {startDate && endDate && (
                <div className='flex items-center gap-2 px-3 py-2 bg-cyan-50 rounded-xl border border-cyan-100'>
                  <FiCalendar size={12} className='text-cyan-500' />
                  <span className='text-xs text-cyan-600 font-semibold'>
                    Duration:{" "}
                    {Math.ceil(
                      (new Date(endDate) - new Date(startDate)) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </span>
                </div>
              )}
            </div>

            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4'>
              <div className='flex items-center gap-2 pb-2 border-b border-gray-100'>
                <div className='w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center'>
                  <LuImagePlus size={14} className='text-cyan-600' />
                </div>
                <p className='text-sm font-bold text-gray-800'>Event Image</p>
                {uploading && (
                  <span className='text-[10px] text-amber-500 font-semibold ml-auto animate-pulse'>
                    Uploading…
                  </span>
                )}
              </div>
              <div className='flex flex-wrap gap-3'>
                {images ? (
                  <div className='relative w-28 h-28 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 group'>
                    <img
                      src={URL.createObjectURL(images)}
                      alt=''
                      className='w-full h-full object-cover'
                    />
                    <button
                      type='button'
                      onClick={removeImage}
                      className='absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      <FiX size={11} />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor='upload'
                    className='w-28 h-28 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-cyan-400 hover:bg-cyan-50 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 gap-1.5'
                  >
                    <LuImagePlus size={22} className='text-gray-400' />
                    <span className='text-[10px] text-gray-400 font-medium'>
                      Upload Image
                    </span>
                    <input
                      type='file'
                      id='upload'
                      onChange={(e) => handleFile(e.target.files[0])}
                      className='hidden'
                      accept='image/*'
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4'>
              <p className='text-sm font-bold text-gray-800 pb-2 border-b border-gray-100'>
                Pricing & Stock
              </p>

              <FormField label='Original Price'>
                <div className='relative'>
                  <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold'>
                    $
                  </span>
                  <input
                    type='number'
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder='0.00'
                    className={`${inputClass} pl-7`}
                    min='0'
                  />
                </div>
              </FormField>

              <FormField label='Event Price (Discount)' required>
                <div className='relative'>
                  <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold'>
                    $
                  </span>
                  <input
                    type='number'
                    required
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder='0.00'
                    className={`${inputClass} pl-7`}
                    min='0'
                  />
                </div>
              </FormField>

              {originalPrice &&
                discountPrice &&
                Number(originalPrice) > Number(discountPrice) && (
                  <div className='flex items-center justify-between px-3 py-2 bg-emerald-50 rounded-xl border border-emerald-100'>
                    <span className='text-xs text-emerald-600 font-semibold'>
                      Savings
                    </span>
                    <span className='text-xs font-black text-emerald-700'>
                      {Math.round(
                        ((originalPrice - discountPrice) / originalPrice) * 100
                      )}
                      % OFF
                    </span>
                  </div>
                )}

              <FormField label='Stock Quantity' required>
                <input
                  type='number'
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder='0'
                  className={inputClass}
                  min='0'
                />
              </FormField>
            </div>

            <button
              type='submit'
              disabled={submitting || uploading}
              className='w-full h-11 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 disabled:opacity-60 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-cyan-200/50 transition-all duration-200 active:scale-[0.98]'
            >
              {submitting ? "Creating…" : "Launch Event"}
            </button>

            <p className='text-[11px] text-gray-300 text-center px-2'>
              Fields marked with <span className='text-red-400'>*</span> are
              required
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
