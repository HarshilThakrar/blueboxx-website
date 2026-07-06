import React, { useState } from "react";
import { CompanyDashboardLayout } from "../../../src/layout/CompanyDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Calendar, Video, Search, User, X, CalendarDays, ArrowRight } from "lucide-react";
import { useInterviewStore } from "../../../src/store/useInterviewStore";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CompanyInterviewsPage() {
  const { interviews, updateInterview } = useInterviewStore();
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [search, setSearch] = useState("");
  const [rescheduleModal, setRescheduleModal] = useState<{ id: number; date: string; time: string } | null>(null);
  const [feedbackModal, setFeedbackModal] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  const filtered = interviews.filter(
    (i) =>
      i.status === (activeTab === "Past" ? "Completed" : "Upcoming") &&
      (i.name.toLowerCase().includes(search.toLowerCase()) || i.role.toLowerCase().includes(search.toLowerCase()))
  );

  const handleReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (rescheduleModal) {
      updateInterview(rescheduleModal.id, {
        date: rescheduleModal.date,
        time: rescheduleModal.time,
      });
      setRescheduleModal(null);
    }
  };

  const handleFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackModal !== null) {
      updateInterview(feedbackModal, { status: "Completed" });
      setFeedbackModal(null);
      setFeedbackText("");
    }
  };

  return (
    <CompanyDashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Interviews</h1>
          <p className="text-slate-500 font-medium text-sm">
            {interviews.filter((i) => i.status === "Upcoming").length} upcoming interviews scheduled.
          </p>
        </div>
        <Link href="/company/applicants" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-colors text-sm shrink-0">
          <CalendarDays size={16} /> View All Applicants
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1">
              {["Upcoming", "Past"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === t ? "bg-[#1B2A6B] text-white shadow" : "text-slate-500 hover:text-slate-800"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search candidates or roles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <p className="text-slate-500 font-medium">No {activeTab.toLowerCase()} interviews found.</p>
                {activeTab === "Upcoming" && (
                  <Link href="/company/applicants" className="inline-block mt-3 text-[#1B2A6B] font-bold text-sm hover:underline">
                    Schedule one from your Applicant Board →
                  </Link>
                )}
              </div>
            ) : (
              filtered.map((interview, i) => (
                <AnimatedContent
                  key={interview.id}
                  direction="up"
                  delay={i * 0.05}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row items-start sm:items-center p-5 gap-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-32 flex flex-col items-center sm:items-start border-b sm:border-b-0 sm:border-r border-slate-100 pb-4 sm:pb-0 sm:pr-6">
                    <p className={`text-sm font-black mb-1 ${interview.date === "Today" ? "text-amber-600" : "text-slate-800"}`}>
                      {interview.date}
                    </p>
                    <p className="text-xl font-black text-slate-800">{interview.time}</p>
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-600 text-sm">
                          {interview.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <h3 className="text-base font-black text-slate-800 leading-tight">{interview.name}</h3>
                          <p className="text-xs font-bold text-[#1B2A6B]">{interview.role}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded ${interview.match >= 90 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {interview.match}% Match
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 ml-13">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-slate-400" /> {interview.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-full sm:w-auto flex sm:flex-col gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
                    {activeTab === "Upcoming" ? (
                      <>
                        <button
                          onClick={() => toast.success(`Starting video call with ${interview.name}...`)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#1B2A6B] text-white font-bold text-xs rounded-lg hover:bg-[#0d1635] transition-colors shadow-sm"
                        >
                          <Video size={14} /> Join Call
                        </button>
                        <button
                          onClick={() => setRescheduleModal({ id: interview.id, date: interview.date, time: interview.time })}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Reschedule
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setFeedbackModal(interview.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Submit Feedback
                      </button>
                    )}
                  </div>
                </AnimatedContent>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 mb-4 border-b border-slate-100 pb-3">Interview Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Total Scheduled</span>
                <span className="text-slate-800">{interviews.length}</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Upcoming</span>
                <span className="text-amber-600">{interviews.filter((i) => i.status === "Upcoming").length}</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Completed</span>
                <span className="text-emerald-600">{interviews.filter((i) => i.status === "Completed").length}</span>
              </div>
            </div>
          </AnimatedContent>

          <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-800 mb-4 border-b border-slate-100 pb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/company/applicants" className="w-full flex items-center justify-between p-3 text-xs font-bold text-slate-600 hover:text-[#1B2A6B] hover:bg-blue-50 rounded-xl transition-colors">
                <span>Schedule from Applicants</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setRescheduleModal(null)} />
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm shadow-2xl z-50 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-black text-slate-800">Reschedule Interview</h2>
              <button onClick={() => setRescheduleModal(null)} className="text-slate-400 hover:text-slate-800"><X size={20} /></button>
            </div>
            <form onSubmit={handleReschedule} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">New Date</label>
                <input
                  type="date"
                  value={rescheduleModal.date}
                  onChange={(e) => setRescheduleModal({ ...rescheduleModal, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">New Time</label>
                <input
                  type="time"
                  value={rescheduleModal.time}
                  onChange={(e) => setRescheduleModal({ ...rescheduleModal, time: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setRescheduleModal(null)} className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#1B2A6B] text-white rounded-xl text-sm font-bold hover:bg-[#0d1635]">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setFeedbackModal(null)} />
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm shadow-2xl z-50 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-black text-slate-800">Submit Feedback</h2>
              <button onClick={() => setFeedbackModal(null)} className="text-slate-400 hover:text-slate-800"><X size={20} /></button>
            </div>
            <form onSubmit={handleFeedback} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Your Feedback</label>
                <textarea
                  rows={4}
                  required
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Strong candidate with good problem-solving skills..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none resize-none"
                />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setFeedbackModal(null)} className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#1B2A6B] text-white rounded-xl text-sm font-bold hover:bg-[#0d1635]">Submit & Mark Done</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CompanyDashboardLayout>
  );
}
