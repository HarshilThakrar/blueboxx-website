import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Card, CardContent } from "../../../src/components/ui/Card";
import { MapPin, Building2, CheckCircle2, XCircle, Plus, Briefcase, Trash2 } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const INITIAL_INTERNSHIPS = [
  { id: 2, title: "Product Design Intern", company: "Stripe", type: "Part-time", location: "Remote", status: "Pending", postedBy: "recruiting@stripe.com", date: "Oct 27, 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg", tags: ["Figma", "UI/UX"], stipend: "₹20,000 /mo", duration: "6 Months" },
  { id: 4, title: "Frontend Developer Intern", company: "TechNova Solutions", type: "Full-time", location: "Remote", status: "Rejected", postedBy: "talent@technova.in", date: "Oct 24, 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", tags: ["HTML", "CSS", "React"], stipend: "₹15,000 - ₹20,000 /mo", duration: "6 Months" },
];

export default function AdminInternshipsPage() {
  const [internships, setInternships] = useState(INITIAL_INTERNSHIPS);
  const [activeFilter, setActiveFilter] = useState("Pending");
  const router = useRouter();

  const handleApprove = (id: number) => {
    setInternships(prev => prev.map(j => j.id === id ? { ...j, status: "Approved" } : j));
  };

  const handleReject = (id: number) => {
    setInternships(prev => prev.map(j => j.id === id ? { ...j, status: "Rejected" } : j));
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to permanently delete this listing?")) {
      setInternships(prev => prev.filter(j => j.id !== id));
    }
  };

  const filteredInternships = internships.filter(job => job.status === activeFilter);

  const pendingCount = internships.filter(j => j.status === "Pending").length;
  const approvedCount = internships.filter(j => j.status === "Approved").length;
  const rejectedCount = internships.filter(j => j.status === "Rejected").length;

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Internships Board</h1>
            <p className="text-slate-500 text-sm">Review incoming internship posts or add new listings.</p>
          </div>
          <Link href="/admin/internships/add">
            <Button variant="primary" className="shadow-md gap-2">
              <Plus size={18}/> Post Internship
            </Button>
          </Link>
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
            onClick={() => setActiveFilter("Approved")}
            className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
              activeFilter === "Approved" ? "bg-[#1B2A6B] text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Approved & Active ({approvedCount})
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
          {filteredInternships.length === 0 ? (
            <div className="text-center text-slate-400 font-medium py-12">No internships in this category.</div>
          ) : (
            filteredInternships.map((job) => (
              <Card key={job.id} className="border border-slate-200 shadow-sm overflow-hidden bg-white relative">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl border border-slate-200 flex items-center justify-center bg-white p-2 shrink-0">
                        <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="pr-8">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            job.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            job.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {job.status}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
                            Internship
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 font-medium mb-3">
                          <span className="flex items-center gap-1.5 text-slate-700"><Building2 size={14}/> {job.company}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={14}/> {job.location}</span>
                          <span className="px-2 py-0.5 bg-slate-100 rounded-md text-xs font-bold text-[#1B2A6B]">{job.type}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                           {job.tags.map((tag, i) => (
                              <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-600">{tag}</span>
                           ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold">
                           <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{job.stipend}</span>
                           <span className="text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{job.duration}</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium mt-3 border-t border-slate-100 pt-3">
                          Posted by <span className="text-blue-600">{job.postedBy}</span> on {job.date}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0 flex-shrink-0">
                      {job.status === 'Pending' ? (
                        <>
                          <Button onClick={() => handleReject(job.id)} variant="outline" className="flex-1 sm:flex-none text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 gap-2"><XCircle size={16}/> Reject</Button>
                          <Button onClick={() => handleApprove(job.id)} variant="primary" className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 border-emerald-600 shadow-md gap-2"><CheckCircle2 size={16}/> Approve</Button>
                        </>
                      ) : (
                        <>
                          <Button onClick={() => router.push(`/admin/internships/add`)} variant="outline" className="flex-1 sm:flex-none text-sm bg-white shadow-sm border-slate-200">Edit</Button>
                        </>
                      )}
                      <Button onClick={() => handleDelete(job.id)} variant="outline" className="text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600 p-2.5 h-11 w-11 shadow-sm shrink-0" title="Delete Listing">
                         <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </AnimatedContent>

      </div>
    </AdminDashboardLayout>
  );
}
