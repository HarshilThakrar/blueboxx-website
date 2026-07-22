import { CollegeDashboardLayout } from "../../../src/layout/CollegeDashboardLayout";
import { Users, GraduationCap, TrendingUp, Briefcase, Upload, Bell, ChevronRight, Award, BarChart4, Clock, CheckCircle2, AlertCircle, BookOpen, Building } from "lucide-react";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import useSWR from "swr";
import api from "../../../src/lib/axios";

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function CollegeDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data, isLoading } = useSWR("/college/dashboard", fetcher);

  const kpis = data?.data?.kpis || { total_enrolled: 0, active_cohorts: 0, avg_completion: 0, placements: 0 };
  const cohorts = data?.data?.cohorts || [];
  const topStudents = data?.data?.top_students || [];
  const placements = data?.data?.placements || [];
  const alerts = data?.data?.alerts || [];

  const handleBulkImport = () => toast("Opening bulk import wizard...", { icon: "📥" });

  return (
    <CollegeDashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">University Dashboard</h1>
          <p className="text-slate-500 font-medium text-sm">Monitor student cohorts, placement stats, and live performance metrics.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleBulkImport}
            className="flex items-center gap-2 h-10 px-5 bg-[#1B2A6B] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0d1635] transition-colors"
          >
            <Upload size={15} /> Bulk Import Students
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Enrolled", value: kpis.total_enrolled.toLocaleString(), icon: Users, color: "text-[#1B2A6B] bg-blue-50", trend: "" },
          { label: "Active Cohorts", value: kpis.active_cohorts, icon: GraduationCap, color: "text-[#0d1635] bg-slate-100", trend: "" },
          { label: "Avg. Completion", value: `${kpis.avg_completion}%`, icon: TrendingUp, color: "text-emerald-600 bg-emerald-50", trend: "" },
          { label: "Placements", value: `${kpis.placements}`, icon: Briefcase, color: "text-[#C9A227] bg-[#C9A227]/10", trend: "" },
        ].map((stat, i) => (
          <AnimatedContent key={i} direction="up" delay={i * 0.07} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color} mb-4`}>
              <stat.icon size={20} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-0.5">{stat.value}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-[10px] font-semibold text-slate-500">{stat.trend}</p>
          </AnimatedContent>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
        {[
          { key: "overview", label: "Overview" },
          { key: "cohorts", label: "Cohorts" },
          { key: "placements", label: "Placements" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === tab.key ? "bg-white text-[#1B2A6B] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left */}
          <div className="xl:col-span-2 space-y-6">
            {/* Cohort Progress Overview */}
            <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                  <BookOpen size={16} className="text-[#1B2A6B]" /> Active Cohorts
                </h2>
                <button onClick={() => setActiveTab("cohorts")} className="text-xs font-bold text-[#1B2A6B] flex items-center gap-1 hover:underline">View All <ChevronRight size={14} /></button>
              </div>
              {isLoading ? (
                <div className="py-8 text-center text-slate-400 text-sm">Loading cohorts...</div>
              ) : (
                <div className="space-y-4">
                  {cohorts.slice(0, 3).map((cohort: any, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${cohort.color} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-bold text-slate-800 truncate">{cohort.name}</p>
                        <span className="text-xs font-black text-slate-600 ml-2 shrink-0">{cohort.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${cohort.color} rounded-full`} style={{ width: `${cohort.progress}%` }} />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 shrink-0">{cohort.students} students</span>
                  </div>
                ))}
              </div>
            )}
            </AnimatedContent>

            {/* Alerts */}
            <AnimatedContent direction="up" delay={0.25} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-base font-black text-slate-800 mb-4 flex items-center gap-2">
                <Bell size={16} className="text-amber-500" /> Alerts & Notifications
              </h2>
              {isLoading ? (
                <div className="py-4 text-center text-slate-400 text-sm">Loading alerts...</div>
              ) : (
                <div className="space-y-2">
                  {alerts.map((a: any, i: number) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${a.type === "warn" ? "bg-amber-50 border border-amber-100" : a.type === "success" ? "bg-emerald-50 border border-emerald-100" : "bg-blue-50 border border-blue-100"}`}>
                    {a.type === "warn" && <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />}
                    {a.type === "success" && <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />}
                    {a.type === "info" && <Clock size={15} className="text-blue-600 shrink-0 mt-0.5" />}
                    <p className="text-xs font-semibold text-slate-700">{a.msg}</p>
                  </div>
                ))}
              </div>
              )}
            </AnimatedContent>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Top Performers */}
            <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <Award size={15} className="text-[#C9A227]" /> Top Performers
                </h2>
              </div>
              {isLoading ? (
                <div className="py-8 text-center text-slate-400 text-sm">Loading performers...</div>
              ) : (
                <>
                  <div className="divide-y divide-slate-100">
                    {topStudents.map((s: any, i: number) => (
                  <div key={i} className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${i === 0 ? "bg-[#C9A227]/20 text-[#C9A227]" : i === 1 ? "bg-slate-200 text-slate-600" : "bg-orange-100 text-orange-700"}`}>
                        {s.rank}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-tight">{s.name}</p>
                        <p className="text-[10px] font-medium text-slate-400">{s.id} · {s.dept}</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-emerald-600">{s.score}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-100">
                <button className="w-full py-2 text-xs font-bold text-[#1B2A6B] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                  View Full Leaderboard
                </button>
              </div>
            </>
          )}
        </AnimatedContent>

            {/* Quick Actions */}
            <AnimatedContent direction="up" delay={0.35} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h2 className="text-sm font-black text-slate-800 mb-3">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { label: "View All Students", icon: Users, href: "/college/students" },
                  { label: "Generate Report", icon: BarChart4, href: "#" },
                  { label: "Schedule Session", icon: Clock, href: "#" },
                ].map((action, i) => (
                  <Link key={i} href={action.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#1B2A6B] flex items-center justify-center transition-colors">
                      <action.icon size={15} className="text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 group-hover:text-[#1B2A6B] transition-colors">{action.label}</span>
                    <ChevronRight size={14} className="ml-auto text-slate-300 group-hover:text-[#1B2A6B] transition-colors" />
                  </Link>
                ))}
              </div>
            </AnimatedContent>
          </div>
        </div>
      )}

      {activeTab === "cohorts" && (
        isLoading ? (
          <div className="py-12 text-center text-slate-400">Loading cohorts...</div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cohorts.map((cohort: any, i: number) => (
            <AnimatedContent key={i} direction="up" delay={i * 0.08} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-base font-black text-slate-800">{cohort.name}</h3>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">{cohort.course}</p>
                </div>
                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{cohort.students} students</span>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5">
                  <span>Completion Progress</span><span className="text-[#1B2A6B]">{cohort.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${cohort.color} rounded-full`} style={{ width: `${cohort.progress}%` }} />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 h-9 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors">View Students</button>
                <button className="flex-1 h-9 bg-[#1B2A6B] text-white text-xs font-bold rounded-xl hover:bg-[#0d1635] transition-colors">Progress Report</button>
              </div>
            </AnimatedContent>
          ))}
        </div>
        )
      )}

      {activeTab === "placements" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
            {[
              { label: "Students Placed", value: "0" },
              { label: "Companies Recruited", value: "0" },
              { label: "Avg. Package", value: "TBD" },
              { label: "Highest Package", value: "TBD" },
            ].map((s, i) => (
              <AnimatedContent key={i} direction="up" delay={i * 0.07} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <h3 className="text-2xl font-black text-slate-800 mb-1">{s.value}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
              </AnimatedContent>
            ))}
          </div>
          <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                <Building size={16} className="text-[#1B2A6B]" /> Recruiting Companies
              </h2>
            </div>
            {isLoading ? (
              <div className="py-8 text-center text-slate-400 text-sm">Loading placements...</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {placements.map((p: any, i: number) => (
                <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1B2A6B] flex items-center justify-center text-white font-black text-lg">
                      {p.logo}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{p.company}</p>
                      <p className="text-xs font-semibold text-slate-400">{p.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-[#1B2A6B]">{p.count}</p>
                    <p className="text-[10px] font-bold text-slate-400">students hired</p>
                  </div>
                </div>
              ))}
            </div>
            )}
          </AnimatedContent>
        </div>
      )}
    </CollegeDashboardLayout>
  );
}
