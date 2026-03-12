const AdminDashboardStatus = ({ orders }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="mb-4">
                <h2 className="text-sm font-bold text-gray-900">Order Status Breakdown</h2>
                <p className="text-xs text-gray-400 mt-0.5">Distribution of all-time orders by status</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {[
                    { label: 'Processing',   color: '#f59e0b', bg: '#fef3c7', value: orders.filter(o => o.status === 'Processing').length },
                    { label: 'On the Way',   color: '#3b82f6', bg: '#dbeafe', value: orders.filter(o => o.status === 'Transferred to delivery partner' || o.status === 'Shipping').length },
                    { label: 'Delivered',    color: '#10b981', bg: '#d1fae5', value: orders.filter(o => o.status === 'Delivered').length },
                    { label: 'Refund Success', color: '#8b5cf6', bg: '#ede9fe', value: orders.filter(o => o.status === 'Refund Success').length },
                    { label: 'Total',        color: '#6366f1', bg: '#e0e7ff', value: orders.length },
                ].map(({ label, color, bg, value }) => (
                    <div key={label} className="rounded-xl p-4 flex flex-col gap-1" style={{ backgroundColor: bg }}>
                        <p className="text-2xl font-black" style={{ color }}>{value}</p>
                        <p className="text-xs font-semibold text-gray-500">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboardStatus;
