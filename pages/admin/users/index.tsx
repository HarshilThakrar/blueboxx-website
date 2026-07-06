import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { Search, Filter, MoreHorizontal, UserPlus, Shield, GraduationCap, Building, Download, Mail, Check, X, ShieldAlert, Trash2 } from "lucide-react";
import { Badge } from "../../../src/components/ui/Badge";
import { useState } from "react";

const INITIAL_USERS = [
  { id: 1, name: "Ankit Sharma", email: "ankit@example.com", role: "Expert", status: "Active", joinDate: "Oct 12, 2025", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Priya Patel", email: "priya@example.com", role: "Student", status: "Active", joinDate: "Oct 15, 2025", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Google India", email: "careers@google.in", role: "Company", status: "Verified", joinDate: "Sep 22, 2025", avatar: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" },
  { id: 4, name: "Rahul Verma", email: "rahul.v@example.com", role: "Student", status: "Suspended", joinDate: "Oct 20, 2025", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "NIT Trichy", email: "admin@nitt.edu", role: "College", status: "Active", joinDate: "Aug 10, 2025", avatar: "https://i.pravatar.cc/150?u=5" },
];

const ROLES = ["All Users", "Students", "Experts", "Companies", "Colleges", "Admins"];

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState("All Users");
  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  
  // Add Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Student");

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Company": return <Building size={12} />;
      case "College": return <GraduationCap size={12} />;
      case "Expert": return <Shield size={12} />;
      case "Student": return <Users size={12} />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": 
      case "Verified": return <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold">{status}</Badge>;
      case "Suspended": return <Badge className="bg-rose-50 text-rose-700 border-none font-bold">{status}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const handleVerify = (id: number) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: u.role === "Company" ? "Verified" : "Active" } : u));
    setOpenDropdownId(null);
  };

  const handleSuspend = (id: number) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: "Suspended" } : u));
    setOpenDropdownId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsersList(prev => prev.filter(u => u.id !== id));
    }
    setOpenDropdownId(null);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserName && newUserEmail && newUserRole) {
      const newUser = {
        id: Date.now(),
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
        status: "Active",
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        avatar: `https://i.pravatar.cc/150?u=${newUserName}`
      };
      setUsersList(prev => [newUser, ...prev]);
      // Reset state & close
      setNewUserName("");
      setNewUserEmail("");
      setNewUserRole("Student");
      setIsAddModalOpen(false);
    }
  };

  // Filter users based on active tab
  const filteredUsers = usersList.filter(user => {
    if (activeTab === "All Users") return true;
    if (activeTab === "Students" && user.role === "Student") return true;
    if (activeTab === "Experts" && user.role === "Expert") return true;
    if (activeTab === "Companies" && user.role === "Company") return true;
    if (activeTab === "Colleges" && user.role === "College") return true;
    // Admins is empty in mock data, but let's keep it safe
    return false;
  });

  const handleExportCSV = () => {
    const headers = "ID,Name,Email,Role,Status,JoinDate\n";
    const csvContent = usersList.map(u => `${u.id},"${u.name}","${u.email}",${u.role},${u.status},"${u.joinDate}"`).join("\n");
    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Universal User Management</h1>
          <p className="text-slate-500 font-medium text-sm">Manage, verify, and monitor all entities across the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportCSV} className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-[#1B2A6B] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[#0d1635] transition-colors flex items-center gap-2">
            <UserPlus size={16} /> Add Entity
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible flex flex-col min-h-[500px]">
        {/* Top Controls & Tabs */}
        <div className="border-b border-slate-100">
          <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex space-x-1 overflow-x-auto w-full sm:w-auto admin-scrollbar pb-2 sm:pb-0">
              {ROLES.map(role => (
                <button
                  key={role}
                  onClick={() => setActiveTab(role)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                    activeTab === role 
                      ? "bg-[#1B2A6B] text-white" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search email, name..." 
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
        <div className="flex-1 overflow-x-auto pb-24">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-50/90 backdrop-blur-sm shadow-sm z-10">
              <tr>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Entity Details</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Role & Access</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Join Date</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                        {user.role === "Company" ? (
                           <img src={user.avatar} alt={user.name} className="w-6 h-6 object-contain" />
                        ) : (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-[#1B2A6B] transition-colors">{user.name}</p>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5"><Mail size={12}/> {user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md w-fit text-xs font-bold text-slate-700">
                      {getRoleIcon(user.role)} {user.role}
                    </div>
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

                    {/* Action Dropdown Menu */}
                    {openDropdownId === user.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-20" 
                          onClick={() => setOpenDropdownId(null)}
                        />
                        <div className="absolute right-6 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 overflow-hidden text-left animate-in fade-in slide-in-from-top-1 duration-150">
                          <button 
                            onClick={() => handleVerify(user.id)}
                            className="w-full px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Check size={16} className="text-emerald-500" />
                            {user.role === "Company" ? "Verify Company" : "Activate User"}
                          </button>
                          <button 
                            onClick={() => handleSuspend(user.id)}
                            className="w-full px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <ShieldAlert size={16} className="text-amber-500" />
                            Suspend Account
                          </button>
                          <div className="border-t border-slate-100 my-1" />
                          <button 
                            onClick={() => handleDelete(user.id)}
                            className="w-full px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 size={16} className="text-red-500" />
                            Delete Entity
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

      {/* Add Entity Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md shadow-2xl p-6 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black text-slate-800">Add New Entity</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 p-1.5 rounded-xl"><X size={18} /></button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. name@example.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</label>
                <select 
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-[#1B2A6B]"
                >
                  <option value="Student">Student</option>
                  <option value="Expert">Expert</option>
                  <option value="Company">Company</option>
                  <option value="College">College</option>
                </select>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1B2A6B] hover:bg-[#0d1635] text-white text-sm font-bold rounded-xl shadow-md transition-all"
                >
                  Create Entity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminDashboardLayout>
  );
}

// Needed for getRoleIcon
import { Users } from "lucide-react";
