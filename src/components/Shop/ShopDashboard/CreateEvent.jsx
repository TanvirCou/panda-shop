import { useState } from "react";
import "../../../App.css";
import { categoriesData } from "../../../static/data";
import { LuPlusCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvent, fetchEvent } from "../../../redux/features/eventSlice";
import { toast } from "react-toastify";
import axios from "axios";

const CreateEvent = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [originalPrice, setOriginalPrice] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [stock, setStock] = useState();
    const [images, setImages] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // const endDateRef = useRef();

    const { shop } = useSelector(state => state.shop);
    // const { error, events } = useSelector(state => state.event);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if(error) {
    //         toast.error(error);
    //     }
    //     if(events?.success) {
    //         toast.success("Event created successfully");
    //         window.location.reload();
    //     }
    // }, [dispatch, error, events])


    const handleFile = (pics) => {
        setImages(pics);

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
                setImgUrl(data.url.toString());
            })
            .catch((err) => {
                console.log(err);

            });
    };

    console.log(imgUrl);

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        // const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        setStartDate(startDate);
        setEndDate(null);
        // endDateRef.current.min = minEndDate.toISOString().slice(0, 10);
    };

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    };

    const today = new Date().toISOString().slice(0, 10);

    const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : "";

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        const newEvent = {
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
            shopId: shop.shop._id
        };
        try {
            await axios.post("http://localhost:3000/api/event/create-event", newEvent);
            toast.success("Event created successfully");
            dispatch(fetchAllEvent());
            dispatch(fetchEvent(shop.shop._id));
            setName("");
            setDescription("");
            setCategory("");
            setTags("");
            setOriginalPrice("");
            setDiscountPrice("");
            setStock("");
            setImgUrl(null);
            setImages(null);
            setStartDate(null);
            setEndDate(null);
        } catch (error) {
            toast.error(error.response.data.message);
        }

        // dispatch(createEvent(newEvent));
    };

    return (
        <div className='py-4 flex justify-center rounded-md '>
            <div className='w-[90%] md:w-[50%] py-2 bg-white h-[89vh] md:h-[85vh] overflow-y-scroll webkit'>
                <p className="text-xl font-semibold text-center mb-2">Create Event</p>
                <div>
                    <div className="px-4">
                        <label htmlFor="" className="font-medium text-sm">Name <span className="text-red-600">*</span></label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your product name" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                    </div>
                    <br />
                    <div className="px-4">
                        <label htmlFor="" className="font-medium text-sm">Description <span className="text-red-600">*</span></label>
                        <textarea type="text" required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter your product description" className="w-full border h-24 border-gray-300 rounded-md mt-1 px-2 focus:outline-teal-600" />
                    </div>
                    <br />
                    <div className="px-4">
                        <label htmlFor="" className="font-medium text-sm">Description <span className="text-red-600">*</span></label>
                        <select value={category} required onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600 cursor-pointer">
                            <option value="Choose a category" className="bg-gray-300">Choose a Category</option>
                            {
                                categoriesData && categoriesData.map(i => (
                                    <option value={i.title} key={i.title} className="bg-gray-300">{i.title}</option>
                                ))
                            }
                        </select>
                    </div>
                    <br />
                    <div className="px-4">
                        <label htmlFor="" className="font-medium text-sm">Tags <span className="text-red-600">*</span></label>
                        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Enter your product Tag" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                    </div>
                    <br />
                    <div className="px-4">
                        <label htmlFor="" className="font-medium text-sm">Original price</label>
                        <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="Enter your product price" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                    </div>
                    <br />
                    <div className="px-4">
                        <label htmlFor="" className="font-medium text-sm">Price(Discount price) <span className="text-red-600">*</span></label>
                        <input type="number" required value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} placeholder="Enter your product discount price" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                    </div>
                    <br />
                    <div className="px-4">
                        <label htmlFor="" className="font-medium text-sm">Stock <span className="text-red-600">*</span></label>
                        <input type="number" required value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Enter your product stock" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                    </div>
                    <br />
                    <div className="px-4">
                        <label htmlFor="" className="font-medium text-sm">Event start date <span className="text-red-600">*</span></label>
                        <input type="date" required value={startDate ? startDate.toISOString().slice(0, 10) : ""} onChange={handleStartDateChange} min={today} placeholder="Enter your event start date" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                    </div>
                    <br />
                    <div className="px-4">
                        <label htmlFor="" className="font-medium text-sm">Event end date <span className="text-red-600">*</span></label>
                        <input type="date" required value={endDate ? endDate.toISOString().slice(0, 10) : ""} onChange={handleEndDateChange} min={minEndDate} placeholder="Enter your event end date" className="w-full border border-gray-300 h-8 rounded-md mt-1 px-2 focus:outline-teal-600" />
                    </div>
                    <br />
                    <div className="px-4">
                        <label htmlFor="" className="font-medium text-sm">Upload Images <span className="text-red-600">*</span></label>
                        <div className="flex items-start flex-wrap my-1">
                            <label htmlFor="upload">
                                <LuPlusCircle size={28} className="cursor-pointer" />
                                <input type="file" required onChange={(e) => handleFile(e.target.files[0])} id="upload" multiple className="hidden" />
                            </label>
                            {images && <img src={URL.createObjectURL(images)} alt="" className="w-24 h-24 ml-2 object-cover rounded-md" />}
                        </div>
                    </div>
                    <button onClick={handleCreateProduct} className="bg-black text-white py-1.5 px-4 my-3 mx-4 rounded-md font-medium">Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;