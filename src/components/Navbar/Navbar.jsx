import React from 'react';
import { navItems } from '../../static/data';
import { Link } from 'react-router-dom';

const Navbar = ({active}) => {
    
    return (
        <div className='flex items-center'>
            {navItems && navItems.map((i, index) => (
                <div key={index} className=''>
                    <Link to={i.url} className={`${active === index + 1 ? "text-black" : "text-white"} font-medium px-3 hover:text-gray-500`}>
                        {i.title}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Navbar;