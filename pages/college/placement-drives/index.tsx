import { CollegeDashboardLayout } from "../../../../src/layout/CollegeDashboardLayout";
import { Briefcase, Plus, Search, Filter, MoreVertical, Pencil, Trash2, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { AnimatedContent } from "../../../../src/components/reactbits/AnimatedContent";
import Link from "next/link";
import useSWR from "swr";
import api from "../../../../src/lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/router";

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function PlacementDrivesPage() {
  const { data, isLoading, mutate } = useSWR("/college/placement-drives", fetcher);
  const drives = data?.data || [];
  const router = useRouter();

  const deleteDrive = async (id: string) => {
    if (!confirm("Are you sure you want to delete this drive?")) return;
    try {
      await api.delete(`/college/placement-drives/${id}`);
      mutate();
      toast.success("Drive deleted successfully.");
    } catch {
      toast.error("Failed to delete drive.");
    }
  };

  return (
    <CollegeDashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Placement Drives</h1>
          <p className="text-slate-500 font-medium text-sm">Manage on-campus placement drives and student applications.</p>
        </div>
        <Link href="/college/placement-drives/create" className="flex items-center gap-2 h-10 px-5 bg-[#1B2A6B] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0d1635] transition-colors">
          <Plus size={15} /> Create Drive
        </Link>
      </div>

      <AnimatedContent direction="up" delay={0.1} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search placement drives..." className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none transition-all" />
          </div>
          <button className="flex items-center justify-center gap-2 h-10 px-4 bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors shrink-0">
            <Filter size={15} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="py-3 px-4">Drive Details</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Applications</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr><td colSpan={6} className="py-8 text-center text-slate-400 text-xs">Loading drives...</td></tr>
              ) : drives.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Briefcase size={20} className="text-slate-300" />
                    </div>
                    <p className="text-sm font-bold text-slate-500">No placement drives found</p>
                    <p className="text-xs text-slate-400 mt-1">Create your first placement drive to start recruiting.</p>
                  </td>
                </tr>
              ) : (
                drives.map((drive: any) => (
                  <tr key={drive.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="text-sm font-bold text-slate-800">{drive.title}</p>
                      <p className="text-xs text-slate-500">{drive.job_type || 'Full Time'}</p>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-slate-600">{drive.company?.name || drive.company_name || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        drive.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        drive.status === 'closed' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {drive.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-bold text-[#1B2A6B]">{drive.applications_count || 0}</td>
                    <td className="py-3 px-4 text-xs font-semibold text-slate-600">
                      {drive.application_deadline ? new Date(drive.application_deadline).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/college/placement-drives/${drive.id}/edit`} className="p-1.5 text-slate-400 hover:text-[#1B2A6B] hover:bg-blue-50 rounded-lg transition-colors">
                          <Pencil size={15} />
                        </Link>
                        <button onClick={() => deleteDrive(drive.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AnimatedContent>
    </CollegeDashboardLayout>
  );
}
