import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { Users, BookOpen, Briefcase, DollarSign, TrendingUp, TrendingDown, Activity, GraduationCap, Building } from "lucide-react";


const CHART_DATA = [
  { name: 'Jan', revenue: 4000000 },
  { name: 'Feb', revenue: 5500000 },
  { name: 'Mar', revenue: 4500000 },
  { name: 'Apr', revenue: 7000000 },
  { name: 'May', revenue: 6500000 },
  { name: 'Jun', revenue: 8500000 },
  { name: 'Jul', revenue: 8000000 },
  { name: 'Aug', revenue: 9500000 },
  { name: 'Sep', revenue: 9000000 },
  { name: 'Oct', revenue: 11000000 },
  { name: 'Nov', revenue: 10000000 },
  { name: 'Dec', revenue: 12000000 },
];

export default function SuperAdminDashboard() {
  return (
    <AdminDashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 mb-1">Command Center</h1>
        <p className="text-slate-500 font-medium text-sm">Real-time overview of the entire BlueBoxx platform.</p>
      </div>

      {/* High Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Revenue", value: "₹45.2M", trend: "+12.5%", isUp: true, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active Users", value: "142,504", trend: "+5.2%", isUp: true, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Course Enrollments", value: "85,210", trend: "+18.1%", isUp: true, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Active Jobs", value: "4,120", trend: "-2.4%", isUp: false, icon: Briefcase, color: "text-rose-600", bg: "bg-rose-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150`}></div>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} shrink-0`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${stat.isUp ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                {stat.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-black text-slate-800">Revenue Growth</h2>
              <p className="text-xs font-medium text-slate-500">Monthly revenue across all platform services</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-3 py-2 outline-none">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="h-80 w-full pt-8 flex items-end justify-between gap-2 relative">
            {/* Y-Axis labels */}
            <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-[10px] font-bold text-slate-400">
              <span>₹12M</span>
              <span>₹8M</span>
              <span>₹4M</span>
              <span>₹0</span>
            </div>
            
            {/* Grid lines */}
            <div className="absolute left-14 right-0 top-2 bottom-8 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-t border-dashed border-slate-200"></div>
              <div className="w-full border-t border-dashed border-slate-200"></div>
              <div className="w-full border-t border-dashed border-slate-200"></div>
              <div className="w-full border-t border-solid border-slate-200"></div>
            </div>

            <div className="ml-14 w-full h-[calc(100%-2rem)] flex items-end justify-between gap-1 sm:gap-2 z-10">
              {CHART_DATA.map((item, idx) => (
                <div key={idx} className="w-full h-full flex flex-col justify-end items-center group">
                  <div 
                    className="w-full bg-[#C9A227] rounded-t-md relative group-hover:bg-[#1B2A6B] transition-colors"
                    style={{ height: `${(item.revenue / 12000000) * 100}%`, minHeight: '4px' }}
                  >
                    {/* Custom Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                      ₹{(item.revenue / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 mt-2">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="xl:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Activity size={20} className="text-[#1B2A6B]" /> Platform Pulse
            </h2>
            <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Log Item 1 */}
            <div className="flex gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 z-10 border-4 border-white">
                <Building size={12} className="text-blue-600" />
              </div>
              <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-slate-100"></div>
              <div>
                <p className="text-sm text-slate-800"><span className="font-bold">Google India</span> posted a new job: <span className="font-semibold text-blue-600">Senior React Developer</span></p>
                <p className="text-xs text-slate-400 font-medium mt-1">2 mins ago</p>
              </div>
            </div>

            {/* Log Item 2 */}
            <div className="flex gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 z-10 border-4 border-white">
                <DollarSign size={12} className="text-emerald-600" />
              </div>
              <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-slate-100"></div>
              <div>
                <p className="text-sm text-slate-800">Payment of <span className="font-bold text-emerald-600">₹45,000</span> received for <span className="font-semibold">Enterprise Bulk Plan</span></p>
                <p className="text-xs text-slate-400 font-medium mt-1">15 mins ago</p>
              </div>
            </div>

            {/* Log Item 3 */}
            <div className="flex gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 z-10 border-4 border-white">
                <GraduationCap size={12} className="text-indigo-600" />
              </div>
              <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-slate-100"></div>
              <div>
                <p className="text-sm text-slate-800"><span className="font-bold">NIT Trichy</span> onboarded <span className="font-semibold text-indigo-600">450 new students</span> via bulk upload</p>
                <p className="text-xs text-slate-400 font-medium mt-1">1 hour ago</p>
              </div>
            </div>
            
            {/* Log Item 4 */}
            <div className="flex gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 z-10 border-4 border-white">
                <Users size={12} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-800"><span className="font-bold">12 Users</span> completed the <span className="font-semibold">Full Stack Bootcamp</span> course.</p>
                <p className="text-xs text-slate-400 font-medium mt-1">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
