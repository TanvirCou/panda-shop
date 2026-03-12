import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const buildMonthlyData = (orders) => {
    const map = {};
    MONTHS.forEach((m, i) => {
        map[i] = { month: m, orders: 0, revenue: 0 };
    });
    orders.forEach((order) => {
        const d = new Date(order.createdAt);
        const mo = d.getMonth();
        const total = order.cart.reduce((acc, i) => acc + i.discountPrice * i.qty, 0);
        map[mo].orders += 1;
        map[mo].revenue += total;
    });
    return Object.values(map);
};

const CustomBarTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-2 text-xs">
            <p className="font-bold text-gray-700 mb-1">{label}</p>
            <p className="text-indigo-600 font-semibold">{payload[0].value} orders</p>
        </div>
    );
};

const CustomAreaTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-2 text-xs">
            <p className="font-bold text-gray-700 mb-1">{label}</p>
            <p className="text-emerald-600 font-semibold">${payload[0].value.toFixed(2)}</p>
        </div>
    );
};

const AdminDashboardCharts = ({ orders }) => {
    const monthlyData = buildMonthlyData(orders);
    const currentMonth = new Date().getMonth();
    const last6 = monthlyData.slice(Math.max(0, currentMonth - 5), currentMonth + 1);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="mb-4">
                    <h2 className="text-sm font-bold text-gray-900">Monthly Orders</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Last 6 months of order volume</p>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={last6} barSize={28} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip content={<CustomBarTooltip />} cursor={{ fill: '#eef2ff', radius: 8 }} />
                        <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
                            {last6.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === last6.length - 1
                                        ? 'url(#barGradient)'
                                        : '#e0e7ff'}
                                />
                            ))}
                        </Bar>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="mb-4">
                    <h2 className="text-sm font-bold text-gray-900">Revenue Trend</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Total sales revenue (last 6 months)</p>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={last6} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <Tooltip content={<CustomAreaTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10b981"
                            strokeWidth={2.5}
                            fill="url(#revenueGradient)"
                            dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }}
                            activeDot={{ r: 6, fill: '#10b981', strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminDashboardCharts;
