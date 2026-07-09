import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { GraduationCap, Search, Plus, ShieldCheck, X, Check, ShieldAlert, Trash2 } from "lucide-react";
import { Badge } from "../../../src/components/ui/Badge";
import { useState } from "react";

const MOCK_COLLEGES = [
  { id: 1, name: "NIT Trichy", email: "contact@nitt.edu", students: 1450, placements: "88%", status: "Active", logo: "https://upload.wikimedia.org/wikipedia/en/c/c5/NIT_Trichy_logo.png" },
  { id: 2, name: "BITS Pilani", email: "admin@bits-pilani.ac.in", students: 2300, placements: "92%", status: "Active", logo: "https://upload.wikimedia.org/wikipedia/en/d/d3/BITS_Pilani-Logo.svg" },
  { id: 3, name: "VIT University", email: "info@vit.ac.in", students: 4890, placements: "75%", status: "Active", logo: "https://upload.wikimedia.org/wikipedia/en/c/c5/Vellore_Institute_of_Technology_seal_2017.svg" },
];

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState(MOCK_COLLEGES);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCollegeName, setNewCollegeName] = useState("");
  const [newCollegeEmail, setNewCollegeEmail] = useState("");
  const [newCollegeStudents, setNewCollegeStudents] = useState("");
  const [newCollegePlacements, setNewCollegePlacements] = useState("");
  const [newCollegeLogo, setNewCollegeLogo] = useState("");

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this college?")) {
      setColleges(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleAddCollege = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollegeName && newCollegeEmail && newCollegeStudents && newCollegePlacements) {
      const newCollege = {
        id: Date.now(),
        name: newCollegeName,
        email: newCollegeEmail,
        students: parseInt(newCollegeStudents) || 0,
        placements: newCollegePlacements.endsWith("%") ? newCollegePlacements : `${newCollegePlacements}%`,
        status: "Active",
        logo: newCollegeLogo || "https://upload.wikimedia.org/wikipedia/commons/b/b8/Logo_de_la_Rep%C3%BAblica.svg"
      };
      setColleges(prev => [...prev, newCollege]);
      
      // Reset & close
      setNewCollegeName("");
      setNewCollegeEmail("");
      setNewCollegeStudents("");
      setNewCollegePlacements("");
      setNewCollegeLogo("");
      setIsAddModalOpen(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold gap-1"><ShieldCheck size={12}/> Active</Badge>;
      case "Suspended": return <Badge className="bg-rose-50 text-rose-700 border-none font-bold gap-1"><ShieldAlert size={12}/> Suspended</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Partner Colleges</h1>
          <p className="text-slate-500 font-medium text-sm">Manage educational institutions onboarded on BlueBoxx.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#1B2A6B] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[#0d1635] transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Add Institution
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[400px] w-full max-w-full overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search colleges..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]"
            />
          </div>
        </div>

        <div className="overflow-x-auto w-full custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Institution Details</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Students Enrolled</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Placement Rate</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {colleges.map((college) => (
                <tr key={college.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1.5 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                        {college.logo ? (
                           <img src={college.logo} alt={college.name} className="w-full h-full object-contain" />
                        ) : (
                           <GraduationCap size={20} className="text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-[#1B2A6B] transition-colors">{college.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{college.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-slate-600">{college.students} Students</td>
                  <td className="py-4 px-6 text-sm font-semibold text-slate-600">{college.placements}</td>
                  <td className="py-4 px-6">
                    {getStatusBadge(college.status)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => handleDelete(college.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center justify-center"
                      title="Delete College"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add College Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md shadow-2xl p-6 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black text-slate-800">Add College Partner</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 p-1.5 rounded-xl"><X size={18} /></button>
            </div>
            <form onSubmit={handleAddCollege} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Institution Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. IIT Delhi"
                  value={newCollegeName}
                  onChange={(e) => setNewCollegeName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Domain / Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. admin@iitd.ac.in"
                  value={newCollegeEmail}
                  onChange={(e) => setNewCollegeEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logo URL</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  value={newCollegeLogo}
                  onChange={(e) => setNewCollegeLogo(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Students count</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 1500"
                    value={newCollegeStudents}
                    onChange={(e) => setNewCollegeStudents(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Placement Rate</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 85%"
                    value={newCollegePlacements}
                    onChange={(e) => setNewCollegePlacements(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B]"
                  />
                </div>
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
                  Add Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #94a3b8; }
      `}} />
    </AdminDashboardLayout>
  );
}
