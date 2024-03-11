/* eslint-disable react/prop-types */
import { navItems } from '../../../static/data';
import { Link } from 'react-router-dom';

const Navbar = ({ active }) => {

    return (
        <div className='block md:flex items-center mt-2 md:mt-0'>
            {navItems && navItems.map((i, index) => (
                <div key={index} className='py-3 md:py-0'>
                    <Link to={i.url} className={`${active === index + 1 ? "text-teal-600 md:text-black" : "text-black md:text-white"} font-medium  px-6 md:px-3 hover:text-gray-500`}>
                        {i.title}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Navbar;