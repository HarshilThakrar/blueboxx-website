import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Card, CardContent } from "../../../src/components/ui/Card";
import { MapPin, Building2, CheckCircle2, XCircle, Plus, X, Briefcase, GraduationCap, Trash2 } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { useState } from "react";
import { useJobStore } from "../../../src/store/useJobStore";

export default function AdminJobsPage() {
  const jobs = useJobStore((s) => s.jobs);
  const updateJobStatus = useJobStore((s) => s.updateJobStatus);
  const addJob = useJobStore((s) => s.addJob);
  const [activeFilter, setActiveFilter] = useState("Pending");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewJobModal, setViewJobModal] = useState<any>(null);
  const [newJob, setNewJob] = useState({
    category: "Job" as "Job" | "Internship",
    title: "",
    company: "BlueBoxx (Internal)",
    type: "Full-time",
    location: "",
    logo: "",
    tags: "",
    salary: "",
    experience: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setNewJob(prev => ({ ...prev, [field]: value }));
  };

  const handleApprove = (id: string) => {
    updateJobStatus(id, "Active");
  };

  const handleReject = (id: string) => {
    updateJobStatus(id, "Rejected");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to permanently close this listing?")) {
      updateJobStatus(id, "Closed");
    }
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (newJob.title && newJob.location) {
      addJob({
        title: newJob.title,
        company: newJob.company,
        category: newJob.category,
        type: newJob.type,
        locationType: newJob.location === "Remote" ? "Remote" : "On-site",
        location: newJob.location,
        salary: newJob.salary || "Not Specified",
        description: `${newJob.title} at ${newJob.company}. Skills: ${newJob.tags}`,
        skills: newJob.tags ? newJob.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
        postedBy: newJob.company,
      });
      // Admin-created jobs are auto-approved
      const latestJobs = useJobStore.getState().jobs;
      if (latestJobs.length > 0) {
        updateJobStatus(latestJobs[0].id, "Active");
      }

      setActiveFilter("Active");
      setNewJob({
        category: "Job",
        title: "",
        company: "BlueBoxx (Internal)",
        type: "Full-time",
        location: "",
        logo: "",
        tags: "",
        salary: "",
        experience: ""
      });
      setIsAddModalOpen(false);
    }
  };

  // Map store statuses to admin filter tabs
  const getFilterStatus = (filter: string) => {
    if (filter === "Pending") return "Pending";
    if (filter === "Active") return "Active";
    if (filter === "Rejected") return "Rejected";
    return filter;
  };

  const filteredJobs = jobs.filter(job => {
    if (activeFilter === "Active") return job.status === "Active";
    if (activeFilter === "Pending") return job.status === "Pending";
    if (activeFilter === "Rejected") return job.status === "Rejected" || job.status === "Closed";
    return true;
  });

  const pendingCount = jobs.filter(j => j.status === "Pending").length;
  const activeCount = jobs.filter(j => j.status === "Active").length;
  const rejectedCount = jobs.filter(j => j.status === "Rejected" || j.status === "Closed").length;

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Job & Internship Board</h1>
            <p className="text-slate-500 text-sm">Review company submissions, approve or reject postings.</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} variant="primary" className="shadow-md gap-2">
            <Plus size={18}/> Post Listing
          </Button>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="flex gap-2 border-b border-slate-200 pb-4">
          <button 
            onClick={() => setActiveFilter("Pending")}
            className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
              activeFilter === "Pending" ? "bg-[#1B2A6B] text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Pending Review ({pendingCount})
          </button>
          <button 
            onClick={() => setActiveFilter("Active")}
            className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
              activeFilter === "Active" ? "bg-[#1B2A6B] text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Approved & Active ({activeCount})
          </button>
          <button 
            onClick={() => setActiveFilter("Rejected")}
            className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
              activeFilter === "Rejected" ? "bg-[#1B2A6B] text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Rejected ({rejectedCount})
          </button>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.3} className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center text-slate-400 font-medium py-12">No listings in this category.</div>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="border border-slate-200 shadow-sm overflow-hidden bg-white relative">
                <button onClick={() => handleDelete(job.id)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors z-10" title="Delete Listing">
                   <Trash2 size={18} />
                </button>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl border border-slate-200 flex items-center justify-center bg-gradient-to-br from-[#1B2A6B]/10 to-[#2E45A3]/10 p-2 shrink-0">
                        <Building2 size={24} className="text-[#1B2A6B]" />
                      </div>
                      <div className="pr-8">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            job.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            job.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {job.status}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            job.category === 'Internship' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {job.category}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 font-medium mb-3">
                          <span className="flex items-center gap-1.5 text-slate-700"><Building2 size={14}/> {job.company}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={14}/> {job.locationType === "Remote" ? "Remote" : job.location || "Remote"}</span>
                          <span className="px-2 py-0.5 bg-slate-100 rounded-md text-xs font-bold text-[#1B2A6B]">{job.type}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                           {job.skills.map((tag, i) => (
                              <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-600">{tag}</span>
                           ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold">
                           <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{job.salary}</span>
                           <span className="text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{job.applicants} Applicants</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium mt-3 border-t border-slate-100 pt-3">
                          Posted by <span className="text-blue-600">{job.postedBy}</span> • {job.postedAt}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0 flex-shrink-0">
                      {job.status === 'Pending' ? (
                        <>
                          <Button onClick={() => handleReject(job.id)} variant="outline" className="flex-1 sm:flex-none text-red-600 border-red-200 hover:bg-red-50 gap-2"><XCircle size={16}/> Reject</Button>
                          <Button onClick={() => handleApprove(job.id)} variant="primary" className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 border-emerald-600 shadow-md gap-2"><CheckCircle2 size={16}/> Approve</Button>
                        </>
                      ) : job.status === 'Active' ? (
                        <>
                          <Button onClick={() => updateJobStatus(job.id, "Pending")} variant="outline" className="flex-1 sm:flex-none text-sm bg-white shadow-sm border-slate-200">Revoke</Button>
                          <Button onClick={() => setViewJobModal(job)} variant="outline" className="flex-1 sm:flex-none text-sm bg-white shadow-sm border-slate-200 text-[#1B2A6B]">View</Button>
                        </>
                      ) : (
                        <>
                          <Button onClick={() => updateJobStatus(job.id, "Active")} variant="outline" className="flex-1 sm:flex-none text-sm bg-white shadow-sm border-slate-200 text-emerald-600">Re-Approve</Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </AnimatedContent>

      </div>

      {/* View Job Modal */}
      {viewJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setViewJobModal(null)} />
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg shadow-2xl z-50 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-800">{viewJobModal.title}</h2>
              <button onClick={() => setViewJobModal(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl"><X size={20}/></button>
            </div>
            <p className="text-sm text-slate-600">{viewJobModal.description}</p>
            <div className="flex flex-wrap gap-2">
              {viewJobModal.skills.map((s: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-700">{s}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="font-bold text-slate-400 text-xs uppercase">Company</span><p className="font-bold text-slate-800">{viewJobModal.company}</p></div>
              <div><span className="font-bold text-slate-400 text-xs uppercase">Type</span><p className="font-bold text-slate-800">{viewJobModal.type}</p></div>
              <div><span className="font-bold text-slate-400 text-xs uppercase">Salary</span><p className="font-bold text-slate-800">{viewJobModal.salary}</p></div>
              <div><span className="font-bold text-slate-400 text-xs uppercase">Location</span><p className="font-bold text-slate-800">{viewJobModal.locationType === "Remote" ? "Remote" : viewJobModal.location}</p></div>
            </div>
          </div>
        </div>
      )}

      {/* Create Job/Internship Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-2xl shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50 shrink-0">
              <div>
                 <h2 className="text-xl font-black text-slate-800">Post Listing</h2>
                 <p className="text-xs font-semibold text-slate-500 mt-1">Admin-created listings are auto-approved and go live immediately.</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-800 bg-white shadow-sm border border-slate-200 p-2 rounded-xl transition-colors"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
               <form id="create-job-form" onSubmit={handleCreateJob} className="space-y-6">
                 
                 <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-black text-[#1B2A6B] uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center gap-2">
                      <Briefcase size={16}/> Primary Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-1.5 md:col-span-2">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Listing Category</label>
                         <div className="flex gap-4 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                            <button 
                              type="button"
                              onClick={() => handleInputChange('category', 'Job')}
                              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${newJob.category === 'Job' ? 'bg-white shadow-sm text-[#1B2A6B]' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Job
                            </button>
                            <button 
                              type="button"
                              onClick={() => handleInputChange('category', 'Internship')}
                              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${newJob.category === 'Internship' ? 'bg-white shadow-sm text-[#1B2A6B]' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Internship
                            </button>
                         </div>
                       </div>
                       <div className="space-y-1.5 md:col-span-2">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title</label>
                         <input 
                           type="text" required placeholder={newJob.category === 'Internship' ? "e.g. Frontend Developer Intern" : "e.g. Senior Frontend Developer"}
                           value={newJob.title} onChange={(e) => handleInputChange('title', e.target.value)}
                           className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none transition-all"
                         />
                       </div>
                       <div className="space-y-1.5">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
                         <input 
                           type="text" required placeholder="e.g. TechNova Solutions"
                           value={newJob.company} onChange={(e) => handleInputChange('company', e.target.value)}
                           className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                         />
                       </div>
                       <div className="space-y-1.5">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Employment Type</label>
                         <select 
                           value={newJob.type} onChange={(e) => handleInputChange('type', e.target.value)}
                           className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-[#1B2A6B]"
                         >
                           <option value="Full-time">Full-time</option>
                           <option value="Part-time">Part-time</option>
                           <option value="Contract">Contract</option>
                         </select>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-black text-[#1B2A6B] uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center gap-2">
                      <GraduationCap size={16}/> Details & Requirements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                         <input 
                           type="text" required placeholder="e.g. Remote or Bangalore"
                           value={newJob.location} onChange={(e) => handleInputChange('location', e.target.value)}
                           className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                         />
                       </div>
                       <div className="space-y-1.5">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{newJob.category === 'Internship' ? 'Stipend' : 'Salary'}</label>
                         <input 
                           type="text" placeholder={newJob.category === 'Internship' ? "e.g. ₹15,000 /mo" : "e.g. ₹6-8 LPA"}
                           value={newJob.salary} onChange={(e) => handleInputChange('salary', e.target.value)}
                           className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                         />
                       </div>
                       <div className="space-y-1.5 md:col-span-2">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tags / Tech Stack (Comma separated)</label>
                         <input 
                           type="text" placeholder="e.g. React, Node.js, MongoDB"
                           value={newJob.tags} onChange={(e) => handleInputChange('tags', e.target.value)}
                           className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                         />
                       </div>
                    </div>
                 </div>
               </form>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white shrink-0 flex gap-4 justify-end">
              <button 
                type="button" onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" form="create-job-form"
                className="px-8 py-2.5 bg-[#1B2A6B] hover:bg-[#0d1635] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Plus size={16} /> Post Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
