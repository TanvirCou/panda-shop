import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../../../static/data';

const Category = () => {
    const navigate = useNavigate();
    const handleClick = (i) => {
        navigate(`/products?category=${i.title}`);
    };

    return (
        <div className="mx-4 md:mx-12 my-10">
            
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Shop by Category</h2>
                    <p className="text-sm text-gray-400 mt-0.5">Browse from our wide range of categories</p>
                </div>
                <div className="h-1 flex-1 mx-6 bg-gradient-to-r from-emerald-100 to-transparent rounded-full hidden sm:block" />
            </div>

            
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {categoriesData && categoriesData.map((i, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(i)}
                        className="group flex flex-col items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-200 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                    >
                        
                        <div className="w-14 h-14 rounded-xl bg-gray-50 group-hover:bg-emerald-50 flex items-center justify-center overflow-hidden transition-colors duration-200 border border-gray-100 group-hover:border-emerald-200">
                            <img src={i.image_Url} alt={i.title} className="w-10 h-10 object-contain" />
                        </div>
                        
                        <p className="text-xs font-semibold text-gray-600 group-hover:text-emerald-600 text-center leading-snug transition-colors duration-200">
                            {i.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;