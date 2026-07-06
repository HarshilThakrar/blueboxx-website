import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { MessageSquare, Calendar, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Badge } from "../../../src/components/ui/Badge";
import { useState } from "react";

const MOCK_SESSIONS = [
  { id: 1, student: "Priya Patel", mentor: "Ankit Sharma", topic: "UX Strategy Review", date: "Nov 02, 2025", time: "04:00 PM", amount: "₹1,500", status: "Upcoming" },
  { id: 2, student: "Rahul Verma", mentor: "Ankit Sharma", topic: "React Native Setup", date: "Oct 28, 2025", time: "02:00 PM", amount: "₹2,000", status: "Completed" },
  { id: 3, student: "Sneha Reddy", mentor: "Amit Kumar", topic: "Placement Prep", date: "Oct 25, 2025", time: "11:00 AM", amount: "₹1,200", status: "Completed" },
];

export default function AdminSessionsPage() {
  const [sessions, setSessions] = useState(MOCK_SESSIONS);

  const handleCancelSession = (id: number) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setSessions(prev => prev.map(s => s.id === id ? { ...s, status: "Cancelled" } : s));
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 mb-1">Consultation Bookings</h1>
        <p className="text-slate-500 font-medium text-sm">Monitor expert mentorship sessions and consulting transactions.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Session Details</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Scheduled Date</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Billing Amount</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{session.topic}</p>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">
                          {session.student} with <span className="text-[#1B2A6B] font-bold">{session.mentor}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5"><Calendar size={14}/> {session.date}</p>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5"><Clock size={14}/> {session.time}</p>
                  </td>
                  <td className="py-4 px-6 text-sm font-black text-slate-700">{session.amount}</td>
                  <td className="py-4 px-6">
                    {session.status === "Upcoming" && <Badge className="bg-blue-50 text-blue-700 border-none font-bold">Upcoming</Badge>}
                    {session.status === "Completed" && <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold">Completed</Badge>}
                    {session.status === "Cancelled" && <Badge className="bg-rose-50 text-rose-700 border-none font-bold">Cancelled</Badge>}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {session.status === "Upcoming" && (
                      <button 
                        onClick={() => handleCancelSession(session.id)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/70 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Cancel Session
                      </button>
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
