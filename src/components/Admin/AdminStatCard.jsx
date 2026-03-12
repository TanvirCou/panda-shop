import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";


const AdminStatCard = ({ icon: Icon, iconBg, label, value, linkTo, linkLabel }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
                <Icon size={20} className="text-white" />
            </div>
        </div>
        <div>
            <p className="text-2xl font-black text-gray-900">{value}</p>
            <p className="text-xs font-medium text-gray-400 mt-0.5">{label}</p>
        </div>
        {linkTo && (
            <Link to={linkTo} className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors mt-auto">
                {linkLabel} <FiArrowRight size={12} />
            </Link>
        )}
    </div>
);

export default AdminStatCard;
