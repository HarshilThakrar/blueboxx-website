import { CollegeDashboardLayout } from "../../../src/layout/CollegeDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { BarChart4, TrendingUp, Users, Award, ArrowUp, ArrowDown, Download } from "lucide-react";
import toast from "react-hot-toast";

const DEPT_STATS = [
  { dept: "B.Tech CSE", enrolled: 450, avgCGPA: 8.4, placed: 92, completed: 65 },
  { dept: "B.Tech IT", enrolled: 320, avgCGPA: 8.1, placed: 87, completed: 85 },
  { dept: "MBA", enrolled: 180, avgCGPA: 7.9, placed: 78, completed: 42 },
  { dept: "B.Com", enrolled: 300, avgCGPA: 7.5, placed: 70, completed: 28 },
  { dept: "B.Tech ECE", enrolled: 210, avgCGPA: 8.0, placed: 82, completed: 12 },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const COMPLETIONS = [12, 28, 38, 52, 61, 68];
const MAX_COMP = 100;

export default function CollegePerformancePage() {
  return (
    <CollegeDashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Performance Analytics</h1>
          <p className="text-slate-500 font-medium text-sm">Track completion rates, CGPA distribution, and placement performance.</p>
        </div>
        <button
          onClick={() => toast.success("Generating report...")}
          className="flex items-center gap-2 h-10 px-4 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors"
        >
          <Download size={15} /> Export Report
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {[
          { label: "Avg. Completion", value: "62%", change: "+8%", up: true, icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
          { label: "Avg. CGPA", value: "8.2", change: "+0.3", up: true, icon: Award, color: "text-[#C9A227] bg-[#C9A227]/10" },
          { label: "Placement Rate", value: "84%", change: "+5%", up: true, icon: BarChart4, color: "text-[#1B2A6B] bg-blue-50" },
          { label: "Dropout Rate", value: "3.2%", change: "-1.1%", up: false, icon: Users, color: "text-rose-600 bg-rose-50" },
        ].map((s, i) => (
          <AnimatedContent key={i} direction="up" delay={i * 0.07} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color} mb-4`}>
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-black text-slate-800 mb-0.5">{s.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{s.label}</p>
            <p className={`text-[11px] font-bold flex items-center gap-0.5 ${s.up ? "text-emerald-600" : "text-rose-500"}`}>
              {s.up ? <ArrowUp size={11} /> : <ArrowDown size={11} />} {s.change} vs last term
            </p>
          </AnimatedContent>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Bar Chart */}
        <div className="lg:col-span-2 space-y-5">
          <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp size={16} className="text-[#1B2A6B]" /> Completion Trend (2026)
            </h2>
            {/* Inline Bar Chart using CSS */}
            <div className="flex items-end gap-3 h-48">
              {MONTHS.map((m, i) => (
                <div key={m} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-black text-slate-500">{COMPLETIONS[i]}%</span>
                  <div className="w-full bg-slate-100 rounded-xl overflow-hidden relative" style={{ height: "140px" }}>
                    <div
                      className="absolute bottom-0 w-full bg-[#1B2A6B] rounded-xl transition-all"
                      style={{ height: `${(COMPLETIONS[i] / MAX_COMP) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{m}</span>
                </div>
              ))}
            </div>
          </AnimatedContent>

          {/* Department Table */}
          <AnimatedContent direction="up" delay={0.25} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-sm font-black text-slate-800">Department-wise Performance</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[500px]">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="py-2.5 px-5">Department</th>
                    <th className="py-2.5 px-4 text-center">Enrolled</th>
                    <th className="py-2.5 px-4 text-center">Avg. CGPA</th>
                    <th className="py-2.5 px-4 text-center">Placed %</th>
                    <th className="py-2.5 px-5">Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {DEPT_STATS.map((d, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-5 text-sm font-bold text-slate-800">{d.dept}</td>
                      <td className="py-3.5 px-4 text-center text-sm font-semibold text-slate-600">{d.enrolled}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`text-sm font-black ${d.avgCGPA >= 8 ? "text-emerald-600" : "text-amber-600"}`}>{d.avgCGPA}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`text-sm font-black ${d.placed >= 85 ? "text-emerald-600" : d.placed >= 75 ? "text-[#1B2A6B]" : "text-amber-600"}`}>{d.placed}%</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#1B2A6B] rounded-full" style={{ width: `${d.completed}%` }} />
                          </div>
                          <span className="text-[11px] font-bold text-slate-500 w-8 shrink-0">{d.completed}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedContent>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* CGPA Distribution */}
          <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-black text-slate-800 mb-4">CGPA Distribution</h2>
            <div className="space-y-3">
              {[
                { range: "9.0+", pct: 12, color: "bg-[#C9A227]" },
                { range: "8.0–8.9", pct: 35, color: "bg-[#1B2A6B]" },
                { range: "7.0–7.9", pct: 31, color: "bg-blue-400" },
                { range: "6.0–6.9", pct: 16, color: "bg-slate-300" },
                { range: "< 6.0", pct: 6, color: "bg-rose-300" },
              ].map((r, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                    <span>{r.range}</span><span>{r.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedContent>

          {/* Top Performing Cohort */}
          <AnimatedContent direction="up" delay={0.35} className="bg-[#0d1635] rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C9A227] to-transparent" />
            <div className="w-10 h-10 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-xl flex items-center justify-center mb-3">
              <Award size={18} className="text-[#C9A227]" />
            </div>
            <h3 className="font-black text-sm mb-1">Top Cohort</h3>
            <p className="text-white font-black text-lg mb-0.5">B.Tech IT — Final Year</p>
            <p className="text-white/50 text-xs font-semibold mb-3">Data Structures & Algorithms</p>
            <div className="flex justify-between text-[11px] font-bold mb-1">
              <span className="text-white/60">Progress</span>
              <span className="text-[#C9A227]">85%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#C9A227] rounded-full" style={{ width: "85%" }} />
            </div>
          </AnimatedContent>
        </div>
      </div>
    </CollegeDashboardLayout>
  );
}
