import { useState, useEffect } from "react";
import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { Button } from "../../../src/components/ui/Button";
import { Search, Filter, ShieldCheck, XCircle, FileText, CheckCircle2, User, Building2, Briefcase } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminVerificationsPage() {
  const [filter, setFilter] = useState("all");

  const [applications, setApplications] = useState([
    { id: 1, name: "Rahul Sharma", role: "expert", type: "Industry Expert", date: "2 mins ago", status: "pending" },
    { id: 2, name: "Acme Corp", role: "company", type: "Company", date: "1 hr ago", status: "pending" },
    { id: 3, name: "VIT University", role: "college", type: "College", date: "3 hrs ago", status: "pending" },
  ]);

  const handleApprove = (id: number, name: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    toast.success(`${name} has been approved.`);
  };

  const handleReject = (id: number, name: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    toast.error(`${name}'s application was rejected.`);
  };

  return (
    <AdminDashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Verifications</h1>
            <p className="text-slate-500 font-medium">Review and approve pending accounts to ensure platform quality.</p>
          </div>
          <div className="flex gap-3">
            <Button className="h-10 px-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2">
              <Filter size={16} /> Filter
            </Button>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search applications..." className="h-10 pl-9 pr-4 rounded-xl border border-slate-200 focus:border-[#1B2A6B] focus:ring-2 outline-none text-sm font-semibold" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgba(27,42,107,0.04)] overflow-hidden">
          <div className="flex border-b border-slate-100 p-2">
            {["all", "expert", "company", "college"].map((f) => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-colors ${filter === f ? "bg-blue-50 text-[#1B2A6B]" : "text-slate-500 hover:bg-slate-50"}`}
              >
                {f === "all" ? "All Pending" : `${f}s`}
              </button>
            ))}
          </div>

          <div className="divide-y divide-slate-100">
            {applications.filter(app => filter === "all" || app.role === filter).map((app) => (
              <div key={app.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    app.role === "expert" ? "bg-purple-50 text-purple-600" :
                    app.role === "company" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                  }`}>
                    {app.role === "expert" && <User size={24} />}
                    {app.role === "company" && <Building2 size={24} />}
                    {app.role === "college" && <Briefcase size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{app.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mt-1">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-600">{app.type}</span>
                      <span>•</span>
                      <span>Applied {app.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={() => toast("Opening document viewer...", { icon: '📄' })}
                    className="h-10 px-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-xs"
                  >
                    <FileText size={16} /> View Docs
                  </Button>
                  <Button 
                    onClick={() => handleApprove(app.id, app.name)}
                    className="h-10 px-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold rounded-xl transition-all flex items-center gap-2 text-xs"
                  >
                    <CheckCircle2 size={16} /> Approve
                  </Button>
                  <Button 
                    onClick={() => handleReject(app.id, app.name)}
                    className="h-10 px-4 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold rounded-xl transition-all flex items-center gap-2 text-xs"
                  >
                    <XCircle size={16} /> Reject
                  </Button>
                </div>
              </div>
            ))}
            
            {applications.filter(app => filter === "all" || app.role === filter).length === 0 && (
              <div className="p-12 text-center text-slate-400 font-medium flex flex-col items-center">
                <ShieldCheck size={48} className="mb-4 text-slate-300" />
                <p>No pending applications in this category.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </AdminDashboardLayout>
  );
}
