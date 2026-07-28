import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AdminDashboardLayout } from '../../../src/layout/AdminDashboardLayout';
import {
  ArrowLeft, UserPlus, ListTodo, Award, CheckCircle, XCircle,
  Search, ChevronLeft, ChevronRight, Loader2, Briefcase
} from 'lucide-react';
import toast from 'react-hot-toast';
import { InternshipService } from '../../../src/lib/api/admin/InternshipService';

const statusColors: Record<string, string> = {
  pending:      'bg-yellow-100 text-yellow-700',
  under_review: 'bg-blue-100 text-blue-700',
  approved:     'bg-emerald-100 text-emerald-700',
  rejected:     'bg-red-100 text-red-700',
  completed:    'bg-purple-100 text-purple-700',
  cancelled:    'bg-gray-100 text-gray-600',
};

function Pagination({ meta, page, setPage }: { meta: any; page: number; setPage: (p: number) => void }) {
  if (!meta?.last_page || meta.last_page <= 1) return null;
  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 text-sm">
      <span className="text-gray-500 font-medium">Showing {meta.from}–{meta.to} of {meta.total}</span>
      <div className="flex gap-1">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-40"><ChevronLeft size={16} /></button>
        {Array.from({ length: Math.min(meta.last_page, 5) }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => setPage(p)}
            className={`w-8 h-8 rounded text-sm font-bold ${p === page ? 'bg-[#1B2A6B] text-white' : 'hover:bg-gray-100 text-gray-600'}`}>{p}</button>
        ))}
        <button disabled={page >= meta.last_page} onClick={() => setPage(page + 1)}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-40"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

export default function InternshipApplications() {
  const router = useRouter();
  const [searchQuery, setSearchQuery]   = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage]                 = useState(1);

  // Determine if viewing a specific internship's applications, or all
  const internshipId = router.query.internshipId as string | undefined;

  const specificAppResponse = InternshipService.useInternshipApplications(internshipId || '', {
    search: searchQuery || undefined,
    status: filterStatus || undefined,
    page,
    per_page: 15,
  });

  const allAppResponse = InternshipService.useAllApplications({
    search: searchQuery || undefined,
    status: filterStatus || undefined,
    page,
    per_page: 15,
  });

  const { data: apps, meta, isLoading, mutate } = internshipId ? specificAppResponse : allAppResponse;

  const handleStatusChange = async (id: number, status: string) => {
    toast.loading('Updating…', { id: 'app-status' });
    try {
      await InternshipService.updateApplicationStatus(id, status);
      toast.success(`Marked as ${status.replace('_', ' ')}`, { id: 'app-status' });
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Action failed', { id: 'app-status' });
    }
  };

  return (
    <AdminDashboardLayout>
      <Head><title>Internship Applications | BlueBoxx DA</title></Head>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}
            className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-[#1B2A6B] hover:bg-gray-50 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-800">Internship Applications</h1>
            <p className="text-sm text-gray-500 mt-0.5 font-medium">
              {internshipId ? `Applications for Internship #${internshipId}` : 'All internship applications across the platform'}
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex flex-wrap gap-3 items-center shadow-sm">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by name…" value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B] focus:outline-none" />
          </div>
          <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            className="py-2 px-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B] focus:outline-none text-gray-700 font-semibold bg-white">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 size={36} className="animate-spin text-[#1B2A6B]" />
            </div>
          ) : apps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Briefcase size={48} className="text-gray-200 mb-3" />
              <p className="text-gray-500 font-semibold">
                {searchQuery || filterStatus ? 'No applications match your criteria.' : 'No applications found.'}
              </p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3.5 text-[11px] font-black text-gray-400 uppercase tracking-widest">#</th>
                  <th className="px-6 py-3.5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Intern Name</th>
                  <th className="px-6 py-3.5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Internship Program</th>
                  <th className="px-6 py-3.5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Applied</th>
                  <th className="px-6 py-3.5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-3.5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {apps.map((app: any, idx: number) => {
                  const name = `${app.user?.first_name || ''} ${app.user?.last_name || ''}`.trim();
                  return (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-400 font-bold">
                        {((meta?.current_page ?? 1) - 1) * (meta?.per_page ?? 15) + idx + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1B2A6B] text-white flex items-center justify-center text-xs font-black">
                            {name ? name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : '??'}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{name || 'Unknown'}</p>
                            <p className="text-xs text-gray-400">{app.user?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#1B2A6B] text-sm">{app.internship?.title}</p>
                        <p className="text-xs text-gray-400">{app.internship?.mode || '–'}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                        {app.applied_at ? new Date(app.applied_at).toLocaleDateString() : new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase ${statusColors[app.status] || 'bg-gray-100 text-gray-600'}`}>
                          {app.status?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1.5 flex-wrap">
                          {app.status === 'pending' && (
                            <button onClick={() => handleStatusChange(app.id, 'approved')}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve">
                              <CheckCircle size={16} />
                            </button>
                          )}
                          {app.status === 'approved' && (
                            <button onClick={() => handleStatusChange(app.id, 'completed')}
                              className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Mark Completed">
                              <Award size={16} />
                            </button>
                          )}
                          {(app.status === 'pending' || app.status === 'approved') && (
                            <button onClick={() => handleStatusChange(app.id, 'rejected')}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                              <XCircle size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <Pagination meta={meta} page={page} setPage={setPage} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
