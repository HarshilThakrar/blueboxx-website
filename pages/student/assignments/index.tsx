import React, { useState } from "react";
import { StudentDashboardLayout } from "../../../src/layout/StudentDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { FileText, Clock, CheckCircle2, AlertCircle, Upload, Eye } from "lucide-react";
import toast from "react-hot-toast";

const ASSIGNMENTS = [
  { id: 1, title: "Build a React To-Do App", course: "Advanced React Patterns", dueDate: "Today 11:59 PM", status: "pending", points: 100, submitted: false },
  { id: 2, title: "Figma Prototype – E-commerce App", course: "UI/UX Design Masterclass", dueDate: "Jul 8, 2026", status: "pending", points: 150, submitted: false },
  { id: 3, title: "EDA with Pandas", course: "Python for Data Science", dueDate: "Jun 30, 2026", status: "graded", grade: "92/100", submitted: true },
  { id: 4, title: "SEO Audit Report", course: "Digital Marketing Pro", dueDate: "Jun 25, 2026", status: "graded", grade: "88/100", submitted: true },
  { id: 5, title: "REST API Design", course: "Node.js & Backend APIs", dueDate: "Jul 12, 2026", status: "upcoming", points: 120, submitted: false },
  { id: 6, title: "Responsive Landing Page", course: "Advanced React Patterns", dueDate: "Jul 15, 2026", status: "upcoming", points: 80, submitted: false },
];

const STATUS_MAP: Record<string, { label: string; color: string; icon: typeof FileText }> = {
  pending: { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  graded: { label: "Graded", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  upcoming: { label: "Upcoming", color: "bg-blue-50 text-blue-700 border-blue-200", icon: FileText },
};

export default function AssignmentsPage() {
  const [filter, setFilter] = useState("all");
  const [submitting, setSubmitting] = useState<number | null>(null);

  const filtered = filter === "all" ? ASSIGNMENTS : ASSIGNMENTS.filter(a => a.status === filter);

  const handleSubmit = (id: number) => {
    setSubmitting(id);
    setTimeout(() => setSubmitting(null), 1500);
  };

  return (
    <StudentDashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 mb-1">Assignments</h1>
        <p className="text-slate-500 text-sm font-medium">Stay on top of your assignments and submit before the deadline.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Pending", value: ASSIGNMENTS.filter(a => a.status === "pending").length, color: "text-amber-600", bg: "bg-amber-50", icon: AlertCircle },
          { label: "Upcoming", value: ASSIGNMENTS.filter(a => a.status === "upcoming").length, color: "text-blue-600", bg: "bg-blue-50", icon: Clock },
          { label: "Graded", value: ASSIGNMENTS.filter(a => a.status === "graded").length, color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 },
        ].map((s, i) => (
          <AnimatedContent key={i} direction="up" delay={i * 0.1} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800">{s.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
            </div>
          </AnimatedContent>
        ))}
      </div>

      {/* Filters */}
      <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1 w-fit mb-6">
        {["all", "pending", "upcoming", "graded"].map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all capitalize ${filter === t ? "bg-[#1B2A6B] text-white shadow" : "text-slate-500 hover:text-slate-800"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Assignment list */}
      <div className="space-y-4">
        {filtered.map((asgn, i) => {
          const s = STATUS_MAP[asgn.status];
          const isUrgent = asgn.status === "pending" && asgn.dueDate.includes("Today");
          return (
            <AnimatedContent key={asgn.id} direction="up" delay={i * 0.07}
              className={`bg-white rounded-2xl border shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-all ${isUrgent ? "border-amber-300 bg-amber-50/30" : "border-slate-200"}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${s.color} border`}>
                <s.icon size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-black text-slate-800 text-sm">{asgn.title}</h3>
                  {isUrgent && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded-full">DUE TODAY</span>}
                </div>
                <p className="text-xs text-slate-500 font-semibold mb-1">{asgn.course}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] ${s.color}`}>
                    {s.label}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1"><Clock size={10} /> Due: {asgn.dueDate}</span>
                  {asgn.status === "graded" && <span className="text-emerald-600 font-black">{asgn.grade}</span>}
                  {asgn.points && <span className="text-slate-400">{asgn.points} pts</span>}
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                {asgn.status === "graded" && (
                  <button onClick={() => toast.success("Loading instructor feedback...")} className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 text-xs transition-colors">
                    <Eye size={13} /> View Feedback
                  </button>
                )}
                {(asgn.status === "pending") && (
                  <button
                    onClick={() => handleSubmit(asgn.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 font-bold rounded-xl text-xs transition-colors ${submitting === asgn.id ? "bg-emerald-500 text-white" : "bg-[#1B2A6B] text-white hover:bg-[#0d1635]"}`}
                  >
                    <Upload size={13} /> {submitting === asgn.id ? "Submitted!" : "Submit"}
                  </button>
                )}
                {asgn.status === "upcoming" && (
                  <button onClick={() => toast.success("Opening assignment details...")} className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 text-xs transition-colors">
                    <FileText size={13} /> Start Early
                  </button>
                )}
              </div>
            </AnimatedContent>
          );
        })}
      </div>
    </StudentDashboardLayout>
  );
}
