import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Search, Filter, Download, ExternalLink, Check, X } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { Badge } from "../../../src/components/ui/Badge";
import { useState } from "react";

const INITIAL_APPLICATIONS = [
  { id: 1, name: "Rahul Sharma", email: "rahul.s@example.com", appliedFor: "Frontend Developer Intern", type: "Internship", company: "Stripe", date: "Oct 27, 2026", status: "Pending", resume: "#" },
  { id: 2, name: "Priya Patel", email: "priya.p@example.com", appliedFor: "Backend Engineer", type: "Job", company: "Zomato", date: "Oct 26, 2026", status: "Reviewed", resume: "#" },
  { id: 3, name: "Amit Kumar", email: "amit.k@example.com", appliedFor: "Product Design Intern", type: "Internship", company: "TechNova", date: "Oct 25, 2026", status: "Accepted", resume: "#" },
  { id: 4, name: "Neha Gupta", email: "neha.g@example.com", appliedFor: "Data Scientist", type: "Job", company: "Google", date: "Oct 24, 2026", status: "Rejected", resume: "#" },
];

export default function JobsApplicationsPage() {
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const updateStatus = (id: number, newStatus: string) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      app.appliedFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    const matchesType = typeFilter === "All" || app.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Job Applications (ATS)</h1>
            <p className="text-slate-500 text-sm">Track and manage student applications for all active listings.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 bg-white"><Download size={16}/> Export CSV</Button>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by applicant name, job title, or company..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none transition-all"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)} 
              className={`gap-2 shrink-0 ${showFilters ? 'bg-slate-100 border-slate-300' : ''}`}
            >
              <Filter size={16}/> Filters
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#1B2A6B]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type</label>
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#1B2A6B]"
                >
                  <option value="All">All Types</option>
                  <option value="Job">Job</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
          )}
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Applied For</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Resume</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-medium">No applications found matching filters.</td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{app.name}</p>
                        <p className="text-xs text-slate-500">{app.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800">{app.appliedFor}</p>
                        <p className="text-xs font-medium text-slate-500">{app.company} &bull; {app.type}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{app.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <a 
                            href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            View PDF <ExternalLink size={12} />
                          </a>
                          <a 
                            href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" 
                            download="resume.pdf"
                            className="p-1.5 text-slate-400 hover:text-[#1B2A6B] hover:bg-slate-100 rounded-lg transition-colors"
                            title="Download PDF"
                          >
                            <Download size={14} />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={
                          app.status === 'Accepted' ? 'success' : 
                          app.status === 'Rejected' ? 'danger' : 
                          app.status === 'Reviewed' ? 'warning' : 'secondary'
                        }>
                          {app.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {app.status === 'Pending' || app.status === 'Reviewed' ? (
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => updateStatus(app.id, 'Rejected')} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Reject"><X size={16}/></button>
                            <button onClick={() => updateStatus(app.id, 'Accepted')} className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Accept"><Check size={16}/></button>
                          </div>
                        ) : (
                          <span className="text-xs font-medium text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </AnimatedContent>
      </div>
    </AdminDashboardLayout>
  );
}
