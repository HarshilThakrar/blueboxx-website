import { CollegeDashboardLayout } from "../../../../src/layout/CollegeDashboardLayout";
import { BookOpen, Plus, Search, Filter, MoreVertical } from "lucide-react";
import { AnimatedContent } from "../../../../src/components/reactbits/AnimatedContent";
import useSWR from "swr";
import api from "../../../../src/lib/axios";

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function InternshipDrivesPage() {
  const { data, isLoading } = useSWR("/college/internship-drives", fetcher);
  const drives = data?.data || [];

  return (
    <CollegeDashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Internship Drives</h1>
          <p className="text-slate-500 font-medium text-sm">Manage on-campus internship drives and student applications.</p>
        </div>
        <button className="flex items-center gap-2 h-10 px-5 bg-[#1B2A6B] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0d1635] transition-colors">
          <Plus size={15} /> Create Internship
        </button>
      </div>

      <AnimatedContent direction="up" delay={0.1} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search internship drives..." className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none transition-all" />
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
                      <BookOpen size={20} className="text-slate-300" />
                    </div>
                    <p className="text-sm font-bold text-slate-500">No internship drives found</p>
                    <p className="text-xs text-slate-400 mt-1">Create your first internship drive to start recruiting.</p>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </AnimatedContent>
    </CollegeDashboardLayout>
  );
}
