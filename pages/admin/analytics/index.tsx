import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Users, BookOpen } from "lucide-react";

const REVENUE_DATA = [
  { month: 'Jan', value: 30 },
  { month: 'Feb', value: 45 },
  { month: 'Mar', value: 40 },
  { month: 'Apr', value: 65 },
  { month: 'May', value: 55 },
  { month: 'Jun', value: 85 },
  { month: 'Jul', value: 100 }, // max
];

const USER_DATA = [
  { month: 'Jan', value: 20 },
  { month: 'Feb', value: 35 },
  { month: 'Mar', value: 50 },
  { month: 'Apr', value: 60 },
  { month: 'May', value: 75 },
  { month: 'Jun', value: 90 },
  { month: 'Jul', value: 120 },
];

export default function AdminAnalytics() {
  return (
    <AdminDashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Track platform growth, revenue, and engagement.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Total Revenue", val: "₹12.4M", inc: "+15.2%", icon: TrendingUp, color: "blue" },
            { title: "Active Users", val: "45,210", inc: "+5.1%", icon: Users, color: "emerald" },
            { title: "Course Enrollments", val: "12,890", inc: "+22.4%", icon: BookOpen, color: "indigo" },
            { title: "Avg. Session Time", val: "42m", inc: "+2.3%", icon: ArrowUpRight, color: "amber" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 bg-${stat.color}-50 text-${stat.color}-600 rounded-lg`}>
                  <stat.icon size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{stat.inc}</span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Revenue Bar Chart (Custom Tailwind) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Growth (YTD)</h3>
            <div className="flex-1 flex items-end gap-2 sm:gap-4 h-64 relative">
              {/* Y-axis labels (Mock) */}
              <div className="absolute left-0 inset-y-0 w-8 flex flex-col justify-between text-[10px] text-slate-400 font-medium pb-6">
                <span>100k</span>
                <span>75k</span>
                <span>50k</span>
                <span>25k</span>
                <span>0</span>
              </div>
              
              <div className="ml-10 flex-1 flex items-end justify-between h-full pb-6 border-b border-slate-100">
                {REVENUE_DATA.map((d, i) => (
                  <div key={i} className="relative flex flex-col items-center w-full group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${d.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      className="w-4 sm:w-8 bg-blue-600 hover:bg-[#C9A227] rounded-t-sm transition-colors relative z-10"
                    >
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap transition-opacity pointer-events-none">
                        ₹{d.value}k
                      </div>
                    </motion.div>
                    <span className="absolute -bottom-6 text-[10px] sm:text-xs font-semibold text-slate-500">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Growth Line/Area Chart (Custom Tailwind + SVG) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-6">User Acquisition</h3>
            <div className="flex-1 h-64 relative">
              <div className="absolute left-0 inset-y-0 w-8 flex flex-col justify-between text-[10px] text-slate-400 font-medium pb-6">
                <span>120k</span>
                <span>90k</span>
                <span>60k</span>
                <span>30k</span>
                <span>0</span>
              </div>
              
              <div className="ml-10 h-[calc(100%-24px)] relative border-b border-slate-100">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M 0,80 L 16,65 L 33,50 L 50,40 L 66,25 L 83,10 L 100,0"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />
                  <motion.path 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    d="M 0,80 L 16,65 L 33,50 L 50,40 L 66,25 L 83,10 L 100,0 L 100,100 L 0,100 Z"
                    fill="url(#areaGradient)"
                  />
                  {/* Data Points */}
                  {[
                    { cx: 0, cy: 80, val: 20 }, { cx: 16, cy: 65, val: 35 }, { cx: 33, cy: 50, val: 50 },
                    { cx: 50, cy: 40, val: 60 }, { cx: 66, cy: 25, val: 75 }, { cx: 83, cy: 10, val: 90 }, { cx: 100, cy: 0, val: 120 }
                  ].map((pt, i) => (
                    <motion.circle 
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + (i * 0.1) }}
                      cx={`${pt.cx}%`} cy={`${pt.cy}%`} r="4" 
                      fill="#fff" stroke="#10b981" strokeWidth="2"
                      className="hover:r-6 hover:fill-[#10b981] transition-all cursor-pointer"
                    >
                      <title>{pt.val}k users</title>
                    </motion.circle>
                  ))}
                </svg>

                {/* X-axis labels */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] sm:text-xs font-semibold text-slate-500">
                  {USER_DATA.map((d, i) => (
                    <span key={i}>{d.month}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
