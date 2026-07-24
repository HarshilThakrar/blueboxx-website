import { CollegeDashboardLayout } from "../../../src/layout/CollegeDashboardLayout";
import { Users, GraduationCap, Briefcase, Building, ChevronRight, AlertCircle, PlusCircle, Calendar, Bell } from "lucide-react";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import Link from "next/link";
import useSWR from "swr";
import api from "../../../src/lib/axios";
import { useState } from "react";

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function CollegeDashboardPage() {
  const { data, isLoading } = useSWR("/college/dashboard", fetcher);

  const kpis = data?.data?.kpis || { total_students: 0, active_placement_drives: 0, active_internship_drives: 0, connected_companies: 0 };
  const recentDrives = data?.data?.recent_drives || [];
  const alerts = data?.data?.alerts || [];

  return (
    <CollegeDashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Placement Cell Dashboard</h1>
          <p className="text-slate-500 font-medium text-sm">Monitor student placements, active drives, and company partnerships.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/college/placement-drives/create" className="flex items-center gap-2 h-10 px-5 bg-[#1B2A6B] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0d1635] transition-colors">
            <PlusCircle size={15} /> New Placement Drive
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Students", value: kpis.total_students, icon: Users, color: "text-[#1B2A6B] bg-blue-50" },
          { label: "Active Placement Drives", value: kpis.active_placement_drives, icon: Briefcase, color: "text-emerald-600 bg-emerald-50" },
          { label: "Active Internship Drives", value: kpis.active_internship_drives, icon: GraduationCap, color: "text-[#C9A227] bg-[#C9A227]/10" },
          { label: "Connected Companies", value: kpis.connected_companies, icon: Building, color: "text-[#0d1635] bg-slate-100" },
        ].map((stat, i) => (
          <AnimatedContent key={i} direction="up" delay={i * 0.07} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color} mb-4`}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-black text-slate-800 mb-0.5">{stat.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
          </AnimatedContent>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Drives Table */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-sm font-black text-slate-800">Recent Placement Drives</h2>
              <Link href="/college/placement-drives" className="text-[11px] font-bold text-[#1B2A6B] hover:underline flex items-center">
                View All <ChevronRight size={12} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="py-3 px-5">Drive Title</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    <tr><td colSpan={3} className="py-8 text-center text-slate-400 text-xs">Loading drives...</td></tr>
                  ) : recentDrives.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-12 text-center">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Briefcase size={20} className="text-slate-300" />
                        </div>
                        <p className="text-sm font-bold text-slate-500">No active drives</p>
                        <p className="text-xs text-slate-400 mt-1">Create a placement drive to start hiring.</p>
                      </td>
                    </tr>
                  ) : (
                    recentDrives.map((drive: any) => (
                      <tr key={drive.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                              <Briefcase size={14} className="text-[#1B2A6B]" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">{drive.title}</p>
                              <p className="text-[10px] text-slate-500">{drive.job_type || 'Full Time'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            drive.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            'bg-slate-50 text-slate-600 border-slate-200'
                          }`}>
                            {drive.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-semibold text-slate-600">
                          {drive.application_deadline ? new Date(drive.application_deadline).toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </AnimatedContent>
        </div>

        {/* Sidebar: Alerts / Updates */}
        <div className="space-y-6">
          <AnimatedContent direction="up" delay={0.25} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
              <AlertCircle size={16} className="text-[#C9A227]" />
              <h2 className="text-sm font-black text-slate-800">System Alerts</h2>
            </div>
            <div className="p-2">
              {alerts.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs font-semibold">
                  <Bell size={24} className="mx-auto mb-2 opacity-50" />
                  No alerts right now.
                </div>
              ) : (
                alerts.map((alert: any, i: number) => (
                  <div key={i} className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-[#1B2A6B] transition-colors">
                      <AlertCircle size={14} className="text-[#1B2A6B] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">{alert.title}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{alert.message}</p>
                      <span className="text-[9px] font-black text-slate-400 mt-1 block uppercase tracking-wider">{alert.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </AnimatedContent>
        </div>
      </div>
    </CollegeDashboardLayout>
  );
}
