import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { Terminal, ShieldAlert, CheckCircle, Search, Download, Trash } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../../src/components/ui/Badge";

const MOCK_LOGS = [
  { id: 1, type: "Security", message: "Failed login attempt from IP 192.168.1.45", user: "System", time: "2 mins ago", level: "High" },
  { id: 2, type: "Admin", message: "Verified Company: InnovateTech", user: "admin@blueboxx.in", time: "15 mins ago", level: "Low" },
  { id: 3, type: "User", message: "Dr. R. Krishnan suspended Student: Rahul Verma", user: "admin@nitt.edu", time: "1 hour ago", level: "Medium" },
  { id: 4, type: "System", message: "Automated backup completed (5.4GB)", user: "Cron Job", time: "3 hours ago", level: "Low" },
  { id: 5, type: "Security", message: "API key admin_key_v2 generated", user: "admin@blueboxx.in", time: "5 hours ago", level: "High" },
];

export default function AdminLogsPage() {
  const [logs, setLogs] = useState(MOCK_LOGS);

  const handleClearLogs = () => {
    if (confirm("Are you sure you want to clear all activity logs?")) {
      setLogs([]);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Activity Logs</h1>
          <p className="text-slate-500 font-medium text-sm">System audit log, logins, and administrative operations.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleClearLogs}
            className="bg-white border border-rose-200 text-rose-600 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-rose-50 transition-colors flex items-center gap-2"
          >
            <Trash size={16} /> Clear Logs
          </button>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download size={16} /> Export JSON
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Table Controls */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]"
            />
          </div>
          <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none">
            <option>All Severity Levels</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        {/* Logs List */}
        <div className="overflow-x-auto">
          {logs.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-medium">No system logs available.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Severity</th>
                  <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Message</th>
                  <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Initiator</th>
                  <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      {log.level === "High" && <Badge className="bg-rose-50 text-rose-700 border-none font-bold gap-1"><ShieldAlert size={12}/> High</Badge>}
                      {log.level === "Medium" && <Badge className="bg-amber-50 text-amber-700 border-none font-bold">Medium</Badge>}
                      {log.level === "Low" && <Badge className="bg-slate-100 text-slate-600 border-none font-bold">Low</Badge>}
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-semibold">{log.message}</td>
                    <td className="py-4 px-6 text-slate-500 font-bold">{log.user}</td>
                    <td className="py-4 px-6 text-slate-400 text-right">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
