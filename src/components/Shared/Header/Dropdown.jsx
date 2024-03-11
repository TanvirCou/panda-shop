/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const Dropdown = ({ data, setDropdown }) => {
    const navigate = useNavigate();

    const handleCategory = (i) => {
        navigate(`/products?category=${i.title}`);
        setDropdown(false);
    };
    return (
        <div className='absolute w-[270px] bg-slate-50 z-30 rounded-b-md top-[60px] left-0 pb-2 transition ease-in duration-700'>
            {data && data.map((i, index) => (
                <div key={index}
                    onClick={() => handleCategory(i)}
                    className='flex items-center px-2 py-2 cursor-pointer'
                >
                    <img src={i.image_Url} alt="" className='w-8 h-8 object-cover' />
                    <p className='font-medium px-2'>{i.title}</p>
                </div>
            ))}
        </div>
    );
};

export default Dropdown;