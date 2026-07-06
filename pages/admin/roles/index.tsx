import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { Shield, Check, X, ShieldAlert } from "lucide-react";
import { useState } from "react";

const INITIAL_ROLES = [
  { id: 1, role: "Super Admin", access: "Full Control", users: 3, permissions: ["Users CRUD", "Courses CRUD", "Payments", "Settings", "Developer SMTP"] },
  { id: 2, role: "Admin Staff", access: "Limited Write", users: 5, permissions: ["Users CRUD", "Courses CRUD", "Payments"] },
  { id: 3, role: "Expert Mentor", access: "Portal Access", users: 890, permissions: ["Courses CRUD", "Create Sessions"] },
  { id: 4, role: "Company Recruiter", access: "Portal Access", users: 342, permissions: ["Jobs CRUD"] },
  { id: 5, role: "College Admin", access: "Portal Access", users: 15, permissions: ["Students CRUD", "View Placements"] },
];

export default function AdminRolesPage() {
  const [roles, setRoles] = useState(INITIAL_ROLES);

  const handleTogglePermission = (roleId: number, permission: string) => {
    setRoles(prev => prev.map(r => {
      if (r.id === roleId) {
        const permissions = r.permissions.includes(permission)
          ? r.permissions.filter(p => p !== permission)
          : [...r.permissions, permission];
        return { ...r, permissions };
      }
      return r;
    }));
  };

  const handleExportLogs = () => {
    const headers = "Action,User,Date\n";
    const csvContent = auditLogs.map(l => `"${l.action}","${l.user}","${l.date}"`).join("\n");
    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminDashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 mb-1">Roles & Permissions</h1>
        <p className="text-slate-500 font-medium text-sm">Configure system access matrices and role constraints.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Access Matrix */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-black text-slate-800 mb-6">Access Matrix</h2>
          
          <div className="space-y-6">
            {roles.map(role => (
              <div key={role.id} className="pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                      <Shield size={16} className="text-[#C9A227]" /> {role.role}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">{role.access} • {role.users} Active Users</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["Users CRUD", "Courses CRUD", "Payments", "Settings", "Developer SMTP", "Students CRUD"].map(perm => {
                    const isGranted = role.permissions.includes(perm);
                    return (
                      <button
                        key={perm}
                        onClick={() => handleTogglePermission(role.id, perm)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isGranted 
                            ? "bg-[#1B2A6B]/5 text-[#1B2A6B] border border-[#1B2A6B]/15" 
                            : "bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {isGranted ? <Check size={12} /> : <X size={12} />}
                        {perm}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Overview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-[#0d1635] to-[#1B2A6B] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <h3 className="font-black text-lg mb-4 flex items-center gap-2">
              <ShieldAlert size={20} className="text-[#C9A227]" /> Security Guard
            </h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed mb-6">
              Roles define access restrictions. Toggling permissions takes effect immediately across all active platform sessions.
            </p>
            <button 
              onClick={handleExportLogs}
              className="w-full bg-[#C9A227] text-[#0d1635] hover:bg-amber-400 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm"
            >
              Export Security Audit Logs
            </button>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
