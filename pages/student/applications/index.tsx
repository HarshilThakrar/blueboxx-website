import React, { useState } from "react";
import Link from "next/link";
import { StudentDashboardLayout } from "../../../src/layout/StudentDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import {
  Briefcase, MapPin, Calendar, CheckCircle2, Clock,
  XCircle, ChevronDown, ChevronUp, Plus, ExternalLink,
  FileText, TrendingUp
} from "lucide-react";
import toast from "react-hot-toast";

import api from "../../../src/lib/axios";

type AppStatus = "applied" | "review" | "interview" | "offer" | "rejected";

interface TimelineStep {
  step: string;
  date: string;
  done: boolean;
}

interface Application {
  id: number;
  role: string;
  company: string;
  location: string;
  type: string;
  appliedDate: string;
  status: AppStatus;
  timeline: TimelineStep[];
  notes?: string;
}

const STATUS_STYLES: Record<AppStatus, { label: string; pill: string; border: string }> = {
  applied:   { label: "Applied",    pill: "bg-blue-50 text-blue-700",    border: "border-blue-200" },
  review:    { label: "In Review",  pill: "bg-amber-50 text-amber-700",  border: "border-amber-200" },
  interview: { label: "Interview",  pill: "bg-purple-50 text-purple-700",border: "border-purple-200" },
  offer:     { label: "Offer",  pill: "bg-emerald-50 text-emerald-700",border: "border-emerald-300" },
  rejected:  { label: "Rejected",   pill: "bg-red-50 text-red-600",      border: "border-red-200" },
};

const FILTER_TABS: Array<"all" | AppStatus> = ["all", "applied", "review", "interview", "offer", "rejected"];

export default function ApplicationsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | AppStatus>("all");
  const [editNoteId, setEditNoteId] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    api.get("/student/applications")
      .then((res) => {
        const mapped = res.data.data.map((app: any) => {
          let status: AppStatus = "applied";
          if (["shortlisted", "interview", "in consideration"].includes(app.status)) status = "interview";
          else if (["rejected", "failed"].includes(app.status)) status = "rejected";
          else if (["hired", "offer", "awarded", "scholarship awarded"].includes(app.status)) status = "offer";
          else if (app.status === "review" || app.status === "in_review" || app.status === "application under review") status = "review";

          return {
            id: app.id,
            role: app.role,
            company: app.company,
            location: "Remote (Hybrid)",
            type: app.id.toString().startsWith("sch_") ? "Scholarship" : "Internship",
            appliedDate: app.appliedDate || "Just now",
            status: status,
            notes: "",
            timeline: [
              { step: "Applied", date: app.appliedDate || "Just now", done: true },
              { step: "Under Review", date: "Pending", done: status !== "applied" },
              { step: "Interview / Shortlist", date: "Pending", done: status === "interview" || status === "offer" },
              { step: "Final Decision", date: "Pending", done: status === "offer" || status === "rejected" }
            ]
          };
        });
        setApplications(mapped);
        
        const notesMap: Record<string, string> = {};
        mapped.forEach((a: any) => {
          notesMap[a.id] = a.notes || "";
        });
        setNotes(notesMap);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const filtered = filter === "all" ? applications : applications.filter(a => a.status === filter);

  const toggleExpand = (id: number) => setExpanded(prev => prev === id ? null : id);

  const successRate = applications.length > 0 
    ? Math.round((applications.filter(a => a.status === "offer" || a.status === "interview").length / applications.length) * 100)
    : 0;

  return (
    <StudentDashboardLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">My Applications</h1>
          <p className="text-slate-500 text-sm font-medium">
            Track every application from submission to final decision.
          </p>
        </div>
        <Link
          href="/student/internships"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1B2A6B] text-white font-bold rounded-xl hover:bg-[#0d1635] transition-colors text-sm shrink-0"
        >
          <Plus size={16} /> Find More
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {(["all", "applied", "review", "interview", "offer", "rejected"] as const).map((key, i) => {
          const count = key === "all" ? applications.length : applications.filter(a => a.status === key).length;
          const s = key === "all" ? null : STATUS_STYLES[key];
          return (
            <AnimatedContent key={key} direction="up" delay={i * 0.06}>
              <button
                onClick={() => setFilter(key)}
                className={`w-full rounded-2xl border p-3 text-center transition-all shadow-sm hover:shadow-md ${
                  filter === key
                    ? "bg-[#1B2A6B] border-[#1B2A6B] text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <p className={`text-xl font-black mb-0.5 ${filter === key ? "text-white" : ""}`}>{count}</p>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${filter === key ? "text-blue-200" : "text-slate-400"}`}>
                  {key === "all" ? "Total" : STATUS_STYLES[key].label}
                </p>
              </button>
            </AnimatedContent>
          );
        })}
      </div>

      {/* Progress banner */}
      <AnimatedContent direction="up" delay={0.3} className="bg-gradient-to-r from-[#1B2A6B] to-[#2E45A3] rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center gap-4 text-white">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-[#C9A227]" />
            <span className="text-sm font-black">Application Progress</span>
          </div>
          <p className="text-xs text-blue-200 font-semibold">{applications.length} applications sent · {successRate}% advancing to interview stage</p>
        </div>
        <div className="w-full sm:w-48">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-blue-200">Success rate</span>
            <span className="text-white">{successRate}%</span>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-[#C9A227] rounded-full transition-all" style={{ width: `${successRate}%` }} />
          </div>
        </div>
      </AnimatedContent>

      {/* Application cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <FileText size={32} className="text-slate-300 mx-auto mb-3" />
            <p className="font-black text-slate-600">No applications in this category</p>
            <Link href="/student/internships" className="text-sm text-[#1B2A6B] font-bold hover:underline mt-2 inline-block">Browse Internships →</Link>
          </div>
        )}

        {filtered.map((app, i) => {
          const s = STATUS_STYLES[app.status];
          const isOpen = expanded === app.id;
          return (
            <AnimatedContent key={app.id} direction="up" delay={i * 0.06}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${isOpen ? `border-l-4 ${s.border}` : "border-slate-200 hover:shadow-md"}`}
            >
              {/* Card header – click to toggle */}
              <div
                className="p-5 flex items-center gap-4 cursor-pointer select-none hover:bg-slate-50/50 transition-colors"
                onClick={() => toggleExpand(app.id)}
              >
                {/* Company avatar */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1B2A6B] to-[#2E45A3] text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                  {app.company[0]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-0.5">
                    <h3 className="font-black text-slate-800 text-sm">{app.role}</h3>
                    <span className={`px-2.5 py-0.5 text-[10px] font-black rounded-full ${s.pill}`}>
                      {s.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-400 font-semibold">
                    <span className="flex items-center gap-1"><Briefcase size={10} /> {app.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={10} /> {app.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={10} /> Applied {app.appliedDate}</span>
                  </div>
                </div>

                <div className={`text-slate-400 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                  <ChevronDown size={18} />
                </div>
              </div>

              {/* Expanded content */}
              {isOpen && (
                <div className="border-t border-slate-100">
                  {/* Timeline */}
                  <div className="px-6 py-5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">Application Timeline</p>
                    <div className="relative flex gap-0">
                      {app.timeline.map((step, idx) => {
                        const isLast = idx === app.timeline.length - 1;
                        const isRejectedLast = app.status === "rejected" && isLast;
                        const isDone = step.done;
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center relative">
                            {/* connector line */}
                            {!isLast && (
                              <div className={`absolute top-4 left-1/2 w-full h-0.5 z-0 ${isDone ? "bg-[#1B2A6B]" : "bg-slate-200"}`} />
                            )}
                            {/* icon circle */}
                            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center mb-2 border-2 ${
                              isRejectedLast
                                ? "bg-red-50 border-red-300 text-red-500"
                                : isDone
                                  ? "bg-[#1B2A6B] border-[#1B2A6B] text-white"
                                  : "bg-white border-slate-200 text-slate-400"
                            }`}>
                              {isRejectedLast ? <XCircle size={14} /> : isDone ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                            </div>
                            <p className={`text-[10px] font-black text-center ${isDone ? "text-slate-800" : "text-slate-400"}`}>{step.step}</p>
                            <p className="text-[9px] text-slate-400 font-semibold text-center">{step.date}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="px-6 pb-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">My Notes</p>
                      <button
                        onClick={() => setEditNoteId(editNoteId === app.id ? null : app.id)}
                        className="text-[10px] font-black text-[#1B2A6B] hover:underline"
                      >
                        {editNoteId === app.id ? "Save" : "Edit"}
                      </button>
                    </div>
                    {editNoteId === app.id ? (
                      <textarea
                        value={notes[app.id]}
                        onChange={e => setNotes(p => ({ ...p, [app.id]: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1B2A6B] outline-none resize-none"
                        placeholder="Add notes about this application..."
                      />
                    ) : (
                      <p className="text-xs text-slate-600 font-semibold bg-slate-50 rounded-xl px-4 py-3 italic">
                        {notes[app.id] || "No notes yet. Click Edit to add."}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="px-6 pb-5 flex gap-2 flex-wrap">
                    <Link href="/student/resume-builder" className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors">
                      <FileText size={12} /> View Resume
                    </Link>
                    {app.status !== "rejected" && (
                      <button onClick={(e) => { e.preventDefault(); toast.success("Opening Job Posting..."); }} className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors">
                        <ExternalLink size={12} /> View Job Posting
                      </button>
                    )}
                  </div>
                </div>
              )}
            </AnimatedContent>
          );
        })}
      </div>
    </StudentDashboardLayout>
  );
}
