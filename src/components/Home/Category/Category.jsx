import { categoriesData } from '../../../static/data';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const navigate = useNavigate();
    const handleClick = (i) => {
        navigate(`/products?category=${i.title}`);
    }
    return (
        <div className='grid grid-cols-1 gap-[5px] sm:grid-cols-2 sm:gap-[10px] md:grid-cols-3 md:gap-[15px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px] bg-white mx-[60px] my-8 p-4 rounded-md shadow-sm'>
            {categoriesData && categoriesData.map((i, index) => (
                <div key={index} onClick={() => handleClick(i)} >
                    <div className='flex items-center h-[100px] w-full justify-center cursor-pointer'>
                        <p className='text-center text-sm md:text-base font-medium w-28'>{i.title}</p>
                        <img src={i.image_Url} alt="" className='w-24 h-24 ml-3' />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Category;