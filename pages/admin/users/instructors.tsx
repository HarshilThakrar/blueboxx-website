import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { Search, Filter, Download, Mail, Star } from "lucide-react";
import { Badge } from "../../../src/components/ui/Badge";
import { useState } from "react";

const INITIAL_INSTRUCTORS = [
  { id: 1, name: "Dr. Vikram Singh", email: "vikram@example.com", expertise: "Data Science, Python", status: "Active", rating: "4.9", students: 1250, avatar: "https://i.pravatar.cc/150?u=vikram" },
  { id: 2, name: "Ankit Sharma", email: "ankit@example.com", expertise: "Full Stack Web Dev", status: "Active", rating: "4.8", students: 840, avatar: "https://i.pravatar.cc/150?u=ankit" },
];

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState(INITIAL_INSTRUCTORS);

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Instructor Directory</h1>
          <p className="text-slate-500 font-medium text-sm">Manage course creators and mentors.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download size={16} /> Export Data
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible flex flex-col min-h-[500px]">
        <div className="border-b border-slate-100 p-4 flex gap-4 justify-end">
           <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search instructors..." 
                className="w-full sm:w-64 pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] focus:bg-white transition-all"
              />
           </div>
        </div>

        <div className="flex-1 overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/90 backdrop-blur-sm shadow-sm z-10">
              <tr>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Instructor</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Expertise</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Rating & Reach</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {instructors.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1"><Mail size={12}/> {user.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-slate-700">{user.expertise}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-slate-600">
                    <div className="flex items-center gap-2">
                       <span className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded text-xs font-bold"><Star size={12} fill="currentColor"/> {user.rating}</span>
                       <span className="text-xs text-slate-500">{user.students} students</span>
                    </div>
                  </td>
                  <td className="py-4 px-6"><Badge className="bg-emerald-50 text-emerald-700">{user.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
