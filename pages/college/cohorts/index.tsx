import { CollegeDashboardLayout } from "../../../src/layout/CollegeDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { GraduationCap, Users, BookOpen, TrendingUp, Clock, ChevronRight, Plus } from "lucide-react";
import toast from "react-hot-toast";

const COHORTS = [
  { id: 1, name: "B.Tech CSE — 3rd Year", students: 450, course: "Full Stack Web Development", progress: 65, mentor: "Dr. Kapoor", started: "Jan 2026", ends: "Dec 2026", status: "active" },
  { id: 2, name: "B.Tech IT — Final Year", students: 320, course: "Data Structures & Algorithms", progress: 85, mentor: "Prof. Sharma", started: "Feb 2026", ends: "Nov 2026", status: "active" },
  { id: 3, name: "MBA — 1st Year", students: 180, course: "Digital Marketing Essentials", progress: 42, mentor: "Dr. Mehta", started: "Mar 2026", ends: "Jan 2027", status: "active" },
  { id: 4, name: "B.Com — 2nd Year", students: 300, course: "Accounting & Tally Prime", progress: 28, mentor: "Prof. Nair", started: "Apr 2026", ends: "Mar 2027", status: "active" },
  { id: 5, name: "B.Tech ECE — 2nd Year", students: 210, course: "IoT & Embedded Systems", progress: 12, mentor: "Dr. Reddy", started: "Jun 2026", ends: "May 2027", status: "upcoming" },
];

const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  upcoming: "bg-amber-50 text-amber-700 border-amber-100",
  completed: "bg-slate-100 text-slate-600 border-slate-200",
};

const getProgressColor = (pct: number) => pct >= 70 ? "bg-emerald-500" : pct >= 40 ? "bg-[#1B2A6B]" : "bg-[#C9A227]";

export default function CollegeCohortsPage() {
  return (
    <CollegeDashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Cohorts</h1>
          <p className="text-slate-500 font-medium text-sm">Monitor and manage all active learning cohorts.</p>
        </div>
        <button
          onClick={() => toast("Create cohort modal coming soon.", { icon: "✨" })}
          className="flex items-center gap-2 h-10 px-5 bg-[#1B2A6B] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0d1635] transition-colors"
        >
          <Plus size={15} /> New Cohort
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {[
          { label: "Total Cohorts", value: "5", icon: BookOpen, color: "text-[#1B2A6B] bg-blue-50" },
          { label: "Total Students", value: "1,460", icon: Users, color: "text-slate-600 bg-slate-100" },
          { label: "Avg. Progress", value: "46%", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
          { label: "Completing Soon", value: "2", icon: Clock, color: "text-amber-600 bg-amber-50" },
        ].map((s, i) => (
          <AnimatedContent key={i} direction="up" delay={i * 0.07} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color} shrink-0`}>
              <s.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800">{s.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
            </div>
          </AnimatedContent>
        ))}
      </div>

      {/* Cohort Cards */}
      <div className="space-y-4">
        {COHORTS.map((cohort, i) => (
          <AnimatedContent key={cohort.id} direction="up" delay={0.1 + i * 0.07} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#1B2A6B]/5 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap size={20} className="text-[#1B2A6B]" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-800">{cohort.name}</h3>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">{cohort.course}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${STATUS_COLORS[cohort.status]}`}>
                    {cohort.status}
                  </span>
                  <button
                    onClick={() => toast(`Viewing ${cohort.name}`, { icon: "📋" })}
                    className="text-xs font-bold text-[#1B2A6B] border border-[#1B2A6B]/20 px-3 h-8 rounded-xl hover:bg-[#1B2A6B]/5 transition-colors flex items-center gap-1"
                  >
                    Details <ChevronRight size={13} />
                  </button>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {[
                  { label: "Students", val: cohort.students },
                  { label: "Mentor", val: cohort.mentor },
                  { label: "Started", val: cohort.started },
                  { label: "Ends", val: cohort.ends },
                ].map((info, j) => (
                  <div key={j} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">{info.label}</p>
                    <p className="text-sm font-bold text-slate-700">{info.val}</p>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1.5">
                  <span>Completion Progress</span>
                  <span className={cohort.progress >= 70 ? "text-emerald-600" : cohort.progress >= 40 ? "text-[#1B2A6B]" : "text-[#C9A227]"}>{cohort.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${getProgressColor(cohort.progress)}`}
                    style={{ width: `${cohort.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </CollegeDashboardLayout>
  );
}
