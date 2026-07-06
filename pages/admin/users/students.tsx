import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { Search, Filter, MoreHorizontal, UserPlus, Download, Mail, Check, X, ShieldAlert, Trash2 } from "lucide-react";
import { Badge } from "../../../src/components/ui/Badge";
import { useState } from "react";

const INITIAL_STUDENTS = [
  { id: 1, name: "Priya Patel", email: "priya@example.com", course: "B.Tech Computer Science", status: "Active", joinDate: "Oct 15, 2025", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 2, name: "Rahul Verma", email: "rahul.v@example.com", course: "BCA", status: "Suspended", joinDate: "Oct 20, 2025", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: 3, name: "Neha Gupta", email: "neha.g@example.com", course: "M.Tech AI/ML", status: "Active", joinDate: "Oct 24, 2025", avatar: "https://i.pravatar.cc/150?u=7" },
];

export default function AdminStudentsPage() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold">{status}</Badge>;
      case "Suspended": return <Badge className="bg-rose-50 text-rose-700 border-none font-bold">{status}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const handleExportCSV = () => {
    const headers = "ID,Name,Email,Course,Status,JoinDate\n";
    const csvContent = students.map(u => `${u.id},"${u.name}","${u.email}","${u.course}",${u.status},"${u.joinDate}"`).join("\n");
    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSuspend = (id: number) => {
    setStudents(prev => prev.map(u => u.id === id ? { ...u, status: "Suspended" } : u));
    setOpenDropdownId(null);
  };

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Student Management</h1>
          <p className="text-slate-500 font-medium text-sm">Manage enrolled students across the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportCSV} className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download size={16} /> Export Students
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible flex flex-col min-h-[500px]">
        {/* Top Controls */}
        <div className="border-b border-slate-100">
          <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search students..." 
                  className="w-full sm:w-64 pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] focus:bg-white transition-all"
                />
              </div>
              <button className="bg-white border border-slate-200 text-slate-700 p-2 rounded-lg shadow-sm hover:bg-slate-50">
                <Filter size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/90 backdrop-blur-sm shadow-sm z-10">
              <tr>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Student Details</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Degree / Course</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Join Date</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-200 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-[#1B2A6B] transition-colors">{user.name}</p>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5"><Mail size={12}/> {user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-slate-700">
                    {user.course}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-slate-600">{user.joinDate}</td>
                  <td className="py-4 px-6">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="py-4 px-6 text-right relative overflow-visible">
                    <button 
                      onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                      className="p-2 text-slate-400 hover:text-[#1B2A6B] hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    {openDropdownId === user.id && (
                      <>
                        <div className="fixed inset-0 z-20" onClick={() => setOpenDropdownId(null)} />
                        <div className="absolute right-6 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 overflow-hidden text-left">
                          <button onClick={() => handleSuspend(user.id)} className="w-full px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                            <ShieldAlert size={16} className="text-amber-500" />
                            Suspend Student
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
