/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { navItems } from "../../../static/data";

const Navbar = ({ active }) => {
  return (
    <div className="block md:flex items-center">
      {navItems &&
        navItems.map((i, index) => (
          <div key={index} className="py-1 md:py-0">
            <Link
              to={i.url}
              className={`relative inline-block px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200
                ${active === index + 1
                  ? "text-emerald-600 bg-white md:text-white md:bg-white/20"
                  : "text-gray-700 hover:text-emerald-600 md:text-white/80 md:hover:text-white md:hover:bg-white/10"
                }`}
            >
              {i.title}
              
              {active === index + 1 && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-full md:hidden" />
              )}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
