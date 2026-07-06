import React, { useState } from "react";
import { CompanyDashboardLayout } from "../../../src/layout/CompanyDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Search, Filter, Mail, Phone, ExternalLink, Calendar, ChevronRight, ChevronLeft, Briefcase, X, Clock } from "lucide-react";
import { useApplicantStore, type AppStage, type Applicant } from "../../../src/store/useApplicantStore";
import { useInterviewStore } from "../../../src/store/useInterviewStore";
import { useCompanyStore } from "../../../src/store/useCompanyStore";
import Link from "next/link";

const STAGES: AppStage[] = ["Applied", "In Review", "Interview", "Offer"];

export default function ApplicantsPage() {
  const companyProfile = useCompanyStore((s) => s.profile);
  const allApplicants = useApplicantStore((s) => s.applicants);
  const updateStage = useApplicantStore((s) => s.updateStage);
  const addInterview = useInterviewStore((s) => s.addInterview);

  // Show applicants for "this" company (matches profile name) + seeded demo data
  const applicants = allApplicants.filter(
    (a) =>
      a.company.toLowerCase() === companyProfile.name.toLowerCase() ||
      a.company.toLowerCase() === "google" ||
      a.company.toLowerCase() === "acme corp"
  );

  const [selectedJob, setSelectedJob] = useState("All Roles");
  const [search, setSearch] = useState("");
  const [selectedExp, setSelectedExp] = useState("All Experience");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [scheduleModal, setScheduleModal] = useState<Applicant | null>(null);
  const [scheduleForm, setScheduleForm] = useState({ date: "", time: "", type: "Technical Round" });
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  const roles = Array.from(new Set(applicants.map((a) => a.role)));

  const filtered = applicants.filter(
    (a) =>
      (selectedJob === "All Roles" || a.role === selectedJob) &&
      (selectedExp === "All Experience" || a.exp === selectedExp) &&
      a.name.toLowerCase().includes(search.toLowerCase())
  );

  const moveApplicant = (id: string, direction: "next" | "prev") => {
    const app = applicants.find((a) => a.id === id);
    if (!app) return;
    const currentIndex = STAGES.indexOf(app.stage);
    const newIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, STAGES.length - 1)
        : Math.max(currentIndex - 1, 0);
    updateStage(id, STAGES[newIndex]);
  };

  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleModal) return;
    addInterview({
      name: scheduleModal.name,
      role: scheduleModal.role,
      date: scheduleForm.date || "Tomorrow",
      time: scheduleForm.time || "10:00 AM",
      type: scheduleForm.type,
      match: scheduleModal.match,
      applicantId: scheduleModal.id,
    });
    // Move to Interview stage
    updateStage(scheduleModal.id, "Interview");
    setScheduleModal(null);
    setScheduleSuccess(true);
    setTimeout(() => setScheduleSuccess(false), 4000);
  };

  return (
    <CompanyDashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Applicant Tracking</h1>
          <p className="text-slate-500 font-medium text-sm">
            Manage your pipeline and review candidates.{" "}
            <span className="font-black text-[#1B2A6B]">{applicants.length} total applicants</span>
          </p>
        </div>
        {scheduleSuccess && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-emerald-200 shadow-sm">
            <Calendar size={14} /> Interview scheduled! Check your <Link href="/company/interviews" className="underline ml-1">Interviews page</Link>.
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-[#1B2A6B] outline-none shadow-sm"
        >
          <option>All Roles</option>
          {roles.map((r) => <option key={r}>{r}</option>)}
        </select>

        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search candidates by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none shadow-sm"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 bg-white border rounded-xl text-sm font-bold transition-colors shadow-sm ${filterMenuOpen || selectedExp !== "All Experience" ? "text-[#1B2A6B] border-[#1B2A6B]" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            <Filter size={15} /> {selectedExp === "All Experience" ? "Filters" : selectedExp}
          </button>
          {filterMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setFilterMenuOpen(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-2">
                <div className="px-4 py-2 text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">Experience Level</div>
                {["All Experience", "Fresher", "1 Year", "2 Years", "3+ Years"].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => { setSelectedExp(exp); setFilterMenuOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm font-bold transition-colors ${selectedExp === exp ? "bg-blue-50 text-[#1B2A6B]" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-4 admin-scrollbar min-h-[60vh]">
        {STAGES.map((stage, stageIdx) => (
          <div key={stage} className="flex-1 min-w-[280px] flex flex-col bg-slate-100/50 rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-black text-slate-700 text-sm">{stage}</h3>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-500">
                {filtered.filter((a) => a.stage === stage).length}
              </span>
            </div>

            <div className="flex-1 space-y-3">
              {filtered.filter((a) => a.stage === stage).map((app, i) => (
                <AnimatedContent
                  key={app.id}
                  direction="up"
                  delay={i * 0.05}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
                  onClick={() => setSelectedApplicant(app)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B2A6B]/10 to-[#2E45A3]/10 flex items-center justify-center text-[#1B2A6B] font-black text-xs shrink-0">
                        {app.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-800 leading-tight">{app.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400">{app.appliedDate}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-black rounded-sm ${app.match >= 90 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {app.match}% Match
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs font-semibold text-slate-600 mb-0.5 flex items-center gap-1.5">
                      <Briefcase size={12} className="text-slate-400" /> {app.role}
                    </p>
                    <p className="text-[10px] font-semibold text-slate-400 ml-4">{app.exp} Experience</p>
                  </div>

                  <div className="flex gap-1 border-t border-slate-100 pt-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      disabled={stageIdx === 0}
                      onClick={() => moveApplicant(app.id, "prev")}
                      className="flex-1 flex justify-center items-center py-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-30"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      disabled={stageIdx === STAGES.length - 1}
                      onClick={() => moveApplicant(app.id, "next")}
                      className="flex-1 flex justify-center items-center py-1.5 text-slate-400 hover:text-[#1B2A6B] hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-30"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedApplicant(null)} />
          <AnimatedContent direction="up" className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1B2A6B]/10 to-[#2E45A3]/10 flex items-center justify-center text-[#1B2A6B] font-black text-2xl shrink-0">
                  {selectedApplicant.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-800 mb-1">{selectedApplicant.name}</h2>
                  <p className="text-sm font-semibold text-slate-500 mb-2">{selectedApplicant.role}</p>
                  <div className="flex gap-2">
                    <a href={`mailto:${selectedApplicant.email}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50">
                      <Mail size={12} /> {selectedApplicant.email}
                    </a>
                    <a href={`tel:${selectedApplicant.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50">
                      <Phone size={12} /> Call
                    </a>
                    {selectedApplicant.portfolio && (
                      <a href={selectedApplicant.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B2A6B]/10 border border-transparent rounded-lg text-[10px] font-bold text-[#1B2A6B] hover:bg-[#1B2A6B]/20">
                        <ExternalLink size={12} /> Portfolio
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedApplicant(null)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-white">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm font-bold text-slate-800">{selectedApplicant.stage}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">AI Match</p>
                  <p className={`text-sm font-black ${selectedApplicant.match >= 90 ? "text-emerald-600" : "text-amber-600"}`}>{selectedApplicant.match}%</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                  <p className="text-sm font-bold text-slate-800">{selectedApplicant.exp}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Education</h3>
                <div className="relative pl-4 border-l-2 border-slate-200">
                  <div className="absolute w-2 h-2 bg-slate-300 rounded-full -left-[5px] top-1.5"></div>
                  <h4 className="text-sm font-bold text-slate-800">B.Tech in Computer Science</h4>
                  <p className="text-[10px] font-bold text-slate-500">NIT Trichy • 2022 - 2026</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center gap-4">
              <button
                onClick={() => {
                  updateStage(selectedApplicant.id, "Rejected" as AppStage);
                  setSelectedApplicant(null);
                }}
                className="px-6 py-2.5 text-red-600 font-bold text-sm hover:bg-red-50 rounded-xl transition-colors"
              >
                Reject Candidate
              </button>
              <button
                onClick={() => {
                  setScheduleModal(selectedApplicant);
                  setSelectedApplicant(null);
                }}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#1B2A6B] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#1B2A6B]/20 hover:bg-[#0d1635] transition-all"
              >
                <Calendar size={16} /> Schedule Interview
              </button>
            </div>
          </AnimatedContent>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setScheduleModal(null)} />
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md shadow-2xl z-50 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
              <div>
                <h2 className="text-lg font-black text-slate-800">Schedule Interview</h2>
                <p className="text-xs text-slate-500 font-medium">with {scheduleModal.name} for {scheduleModal.role}</p>
              </div>
              <button onClick={() => setScheduleModal(null)} className="text-slate-400 hover:text-slate-800"><X size={20} /></button>
            </div>
            <form onSubmit={handleScheduleInterview} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Date</label>
                <input
                  type="date"
                  required
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Time</label>
                <input
                  type="time"
                  required
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Interview Type</label>
                <select
                  value={scheduleForm.type}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, type: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                >
                  <option>Technical Round</option>
                  <option>Portfolio Review</option>
                  <option>System Design</option>
                  <option>Culture Fit</option>
                  <option>HR Round</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setScheduleModal(null)} className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#1B2A6B] text-white rounded-xl text-sm font-bold hover:bg-[#0d1635] flex items-center justify-center gap-2">
                  <Clock size={14} /> Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `.admin-scrollbar::-webkit-scrollbar{width:6px;height:6px}.admin-scrollbar::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.1);border-radius:10px}`}} />
    </CompanyDashboardLayout>
  );
}
