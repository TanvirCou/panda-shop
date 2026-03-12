/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { navItems } from "../../../static/data";

const Navbar = ({ active }) => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      {navItems &&
        navItems.map((i, index) => (
          <div key={index} className="py-1.5 md:py-0 w-full md:w-auto text-center">
            <Link
              to={i.url}
              className={`relative inline-block px-6 md:px-4 py-1.5 text-sm font-semibold md:font-medium rounded-xl md:rounded-lg transition-all duration-200
                ${active === index + 1
                  ? "text-emerald-600 bg-emerald-50 md:text-white md:bg-white/20"
                  : "text-gray-600 hover:text-emerald-600 md:text-white/80 md:hover:text-white md:hover:bg-white/10"
                }`}
            >
              {i.title}
              
              {active === index + 1 && (
                <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-emerald-500 rounded-full md:hidden" />
              )}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
