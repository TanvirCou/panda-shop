/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const Dropdown = ({ data, setDropdown }) => {
  const navigate = useNavigate();

  const handleCategory = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropdown(false);
  };

  return (
    <div className="absolute top-[calc(100%+4px)] left-0 w-[260px] bg-white rounded-2xl shadow-xl border border-gray-100 z-[115] overflow-hidden py-2">
      {data &&
        data.map((i, index) => (
          <div
            key={index}
            onClick={() => handleCategory(i)}
            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-emerald-50 transition-colors duration-150 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-100 transition-colors duration-150">
              <img src={i.image_Url} alt="" className="w-6 h-6 object-cover" />
            </div>
            <p className="text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors duration-150">
              {i.title}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Dropdown;
