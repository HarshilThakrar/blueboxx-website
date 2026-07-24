import { JobseekerDashboardLayout } from "../../../src/layout/JobseekerDashboardLayout";
import { Search, Filter, MoreHorizontal, Briefcase, Building, MapPin, CheckCircle2, Clock, XCircle, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { Badge } from "../../../src/components/ui/Badge";

import { useState } from "react";
import useSWR from "swr";
import api from "../../../src/lib/axios";

const fetcher = (url: string) => api.get(url).then(res => res.data);

const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'interviewing':
    case 'interview': return <Badge className="bg-blue-50 text-blue-700 border-none font-bold gap-1"><Clock size={12}/> Interviewing</Badge>;
    case 'applied': return <Badge className="bg-slate-100 text-slate-700 border-none font-bold gap-1"><Briefcase size={12}/> Applied</Badge>;
    case 'offered':
    case 'offer': return <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold gap-1"><CheckCircle2 size={12}/> Offered</Badge>;
    case 'rejected': return <Badge className="bg-red-50 text-red-700 border-none font-bold gap-1"><XCircle size={12}/> Rejected</Badge>;
    default: return <Badge>{status || 'Applied'}</Badge>;
  }
};

export default function JobseekerApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search term before making API call
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  import("react").then((React) => {
    React.useEffect(() => {
      const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
      return () => clearTimeout(timer);
    }, [searchTerm]);
  });

  const queryParams = new URLSearchParams();
  if (debouncedSearch) queryParams.append("search", debouncedSearch);
  if (statusFilter && statusFilter !== "All Status") queryParams.append("status", statusFilter);

  const { data, isLoading } = useSWR(`/jobseeker/applications?${queryParams.toString()}`, fetcher);
  const applications = data?.data || [];
  
  return (
    <JobseekerDashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Jobs Applied</h1>
          <p className="text-slate-500 font-medium text-sm">Track your job applications and interview statuses.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role or company..." 
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] w-64 shadow-sm"
            />
          </div>
          <div className="relative">
            <button onClick={() => setShowFilters(!showFilters)} className={`bg-white border border-slate-200 text-slate-700 p-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition-colors ${showFilters || statusFilter !== 'All Status' ? 'border-[#1B2A6B] text-[#1B2A6B]' : ''}`}>
              <Filter size={18} />
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-10 py-2">
                <div className="px-3 py-2 border-b border-slate-100 mb-2">
                  <p className="text-xs font-black text-slate-800 uppercase tracking-wider">Status Filter</p>
                </div>
                {['All Status', 'Applied', 'Interviewing', 'Offered', 'Rejected'].map(status => (
                  <button 
                    key={status}
                    onClick={() => { setStatusFilter(status); setShowFilters(false); }}
                    className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-slate-50 transition-colors ${statusFilter === status ? 'text-[#1B2A6B] bg-blue-50/50' : 'text-slate-600'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Role & Company</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date Applied</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500 font-medium">Loading applications...</td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500 font-medium">No applications found.</td>
                </tr>
              ) : (
              applications.map((app: any) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1.5 shadow-sm flex items-center justify-center">
                        <img src={app.logo} alt={app.company} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-[#1B2A6B] transition-colors">{app.role}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-1">
                          <span className="flex items-center gap-1"><Building size={12}/> {app.company}</span>
                          <span className="flex items-center gap-1"><MapPin size={12}/> {app.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-slate-600">{app.date}</td>
                  <td className="py-4 px-6">
                    {getStatusBadge(app.status)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => toast.success(`Viewing details for ${app.role} at ${app.company}`)} className="p-2 text-slate-400 hover:text-[#1B2A6B] hover:bg-slate-100 rounded-lg transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </JobseekerDashboardLayout>
  );
}
