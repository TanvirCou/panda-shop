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

const STATUS_CONFIG = [
    { key: 'Processing',                     label: 'Processing',   color: 'bg-amber-100 text-amber-700',     dot: 'bg-amber-400'   },
    { key: 'Transferred to delivery partner',label: 'In Transit',   color: 'bg-sky-100 text-sky-700',         dot: 'bg-sky-400'     },
    { key: 'Shipping',                        label: 'Shipping',     color: 'bg-cyan-100 text-cyan-700',       dot: 'bg-cyan-500'    },
    { key: 'Delivered',                       label: 'Delivered',    color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
    { key: 'Refund Success',                  label: 'Refunded',     color: 'bg-green-100 text-green-700',     dot: 'bg-green-400'   },
    { key: 'Refund Rejected',                 label: 'Rej. Refund',  color: 'bg-red-100 text-red-700',         dot: 'bg-red-400'     },
];


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
            <p className="text-cyan-600 font-semibold">{payload[0].value} orders</p>
        </div>
    );
};


const CustomAreaTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-2 text-xs">
            <p className="font-bold text-gray-700 mb-1">{label}</p>
            <p className="text-cyan-600 font-semibold">${payload[0].value.toFixed(2)}</p>
        </div>
    );
};

const ShopDashboardCharts = ({ orders }) => {
    const monthlyData = buildMonthlyData(orders);
    const currentMonth = new Date().getMonth();
    const last6 = monthlyData.slice(Math.max(0, currentMonth - 5), currentMonth + 1);

    const statusCounts = STATUS_CONFIG.map((cfg) => ({
        ...cfg,
        count: orders.filter((o) => o.status === cfg.key).length,
    }));

    return (
        <div className="space-y-4">
            
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
                            <Tooltip content={<CustomBarTooltip />} cursor={{ fill: '#ecfeff', radius: 8 }} />
                            <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
                                {last6.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index === last6.length - 1
                                            ? 'url(#shopBarGradient)'
                                            : '#a5f3fc'}
                                    />
                                ))}
                            </Bar>
                            <defs>
                                <linearGradient id="shopBarGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#0891b2" />
                                    <stop offset="100%" stopColor="#0ea5e9" />
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
                        <AreaChart data={last6} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="shopRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
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
                                width={50}
                            />
                            <Tooltip content={<CustomAreaTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#0891b2"
                                strokeWidth={2.5}
                                fill="url(#shopRevenueGradient)"
                                dot={{ r: 4, fill: '#0891b2', strokeWidth: 0 }}
                                activeDot={{ r: 6, fill: '#0891b2', strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="mb-4">
                    <h2 className="text-sm font-bold text-gray-900">Order Status Breakdown</h2>
                    <p className="text-xs text-gray-400 mt-0.5">All-time count per status</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {statusCounts.map(({ key, label, color, dot, count }) => (
                        <div key={key} className={`rounded-xl px-3 py-3 flex flex-col gap-1.5 ${color}`}>
                            <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                                <span className="text-[10px] font-bold uppercase tracking-wider leading-tight">{label}</span>
                            </div>
                            <p className="text-2xl font-black leading-none">{count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopDashboardCharts;
