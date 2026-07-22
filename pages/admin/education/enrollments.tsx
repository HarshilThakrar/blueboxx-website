import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AdminDashboardLayout } from '../../../src/layout/AdminDashboardLayout';
import { 
  Users, CheckCircle2, Clock, XCircle, RefreshCw, 
  Search, Filter, Download, Plus, MoreVertical, 
  Eye, Edit2, Check, X, ShieldAlert, FileText, ArrowUpDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import api from '../../../src/lib/axios';

const fetcher = (url: string) => api.get(url).then(r => r.data);

interface Enrollment {
  id: number;
  user: { name: string; email: string };
  course: { title: string; instructor?: { name: string } };
  created_at: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled' | 'refunded';
}

export default function CourseEnrollmentsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [courseId, setCourseId] = useState('');
  const [page, setPage] = useState(1);
  
  // Modals
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const queryKey = `/admin/enrollments?page=${page}&status=${activeTab}&search=${searchQuery}&course_id=${courseId}`;
  const { data, mutate, isLoading } = useSWR(queryKey, fetcher);
  const { data: coursesData } = useSWR('/admin/courses?per_page=100', fetcher);

  const enrollments: Enrollment[] = data?.data || [];
  const meta = data || {};
  const courses = coursesData?.data || [];

  // Actions
  const handleApprove = async (id: number) => {
    try {
      await api.put(`/admin/enrollments/${id}/status`, { status: 'active', payment_status: 'Paid' });
      toast.success('Enrollment Approved');
      mutate();
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Failed to approve');
    }
  };

  const handleProcessRefund = async () => {
    if (selectedEnrollment) {
      try {
        await api.put(`/admin/enrollments/${selectedEnrollment.id}/status`, { status: 'refunded', payment_status: 'Refunded' });
        toast.success(`Refund processed for ${selectedEnrollment.user.name}`);
        setIsRefundModalOpen(false);
        setIsViewDrawerOpen(false);
        mutate();
      } catch (e: any) {
        toast.error(e.response?.data?.message || 'Failed to process refund');
      }
    }
  };

  const handleCancelEnrollment = async () => {
    if (selectedEnrollment) {
      try {
        await api.put(`/admin/enrollments/${selectedEnrollment.id}/status`, { status: 'cancelled' });
        toast.success(`Enrollment cancelled for ${selectedEnrollment.user.name}`);
        setIsCancelModalOpen(false);
        setIsViewDrawerOpen(false);
        mutate();
      } catch (e: any) {
        toast.error(e.response?.data?.message || 'Failed to cancel enrollment');
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this enrollment permanently?')) {
      try {
        await api.delete(`/admin/enrollments/${id}`);
        toast.success('Enrollment deleted successfully');
        mutate();
      } catch (e: any) {
        toast.error(e.response?.data?.message || 'Failed to delete');
      }
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get('/admin/enrollments/export', {
        params: { status: activeTab, course_id: courseId },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `enrollments_export_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const stats = {
    total: meta.total || 0,
    active: 0, pending: 0, completed: 0, cancelled: 0, refunded: 0,
  };

  return (
    <AdminDashboardLayout>
      <Head>
        <title>Course Enrollments | BlueBoxx DA</title>
      </Head>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#0d1635] flex items-center gap-2">Course Enrollments</h1>
          <p className="text-slate-500 text-sm mt-1 font-semibold">Manage course enrollments, payments, and refunds centrally.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors">
            <Download size={16} /> Export Excel
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
        
        {/* Status Tabs & Filters */}
        <div className="px-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
          
          <div className="flex overflow-x-auto admin-scrollbar">
            {['All', 'Pending', 'Active', 'Completed', 'Cancelled', 'Refunded'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-4 text-sm font-black whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-[#1B2A6B] text-[#1B2A6B]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 pb-4 md:pb-0">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search student or course..." className="w-full md:w-64 pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#1B2A6B]" />
            </div>
            <div className="relative w-full md:w-48 shrink-0">
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
              <select value={courseId} onChange={e => { setCourseId(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:ring-2 focus:ring-[#1B2A6B] outline-none shadow-sm appearance-none">
                <option value="">All Courses</option>
                {courses.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto admin-scrollbar flex-1">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-white border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="p-4 w-12"><input type="checkbox" className="rounded border-slate-300 text-[#1B2A6B] focus:ring-[#1B2A6B]" /></th>
                <th className="p-4">Enrollment ID</th>
                <th className="p-4"><div className="flex items-center gap-1.5 cursor-pointer">Student <ArrowUpDown size={12}/></div></th>
                <th className="p-4">Course & Instructor</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Progress</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-4"><div className="w-4 h-4 bg-slate-200 rounded"></div></td>
                    <td className="p-4"><div className="w-16 h-4 bg-slate-200 rounded"></div></td>
                    <td className="p-4"><div className="w-32 h-4 bg-slate-200 rounded mb-1"></div><div className="w-24 h-3 bg-slate-200 rounded"></div></td>
                    <td className="p-4"><div className="w-40 h-4 bg-slate-200 rounded mb-1"></div><div className="w-20 h-3 bg-slate-200 rounded"></div></td>
                    <td className="p-4"><div className="w-24 h-4 bg-slate-200 rounded"></div></td>
                    <td className="p-4"><div className="w-12 h-4 bg-slate-200 rounded mx-auto"></div></td>
                    <td className="p-4"><div className="w-16 h-5 bg-slate-200 rounded-full"></div></td>
                    <td className="p-4"><div className="w-16 h-5 bg-slate-200 rounded-full"></div></td>
                    <td className="p-4"><div className="w-8 h-8 bg-slate-200 rounded ml-auto"></div></td>
                  </tr>
                ))
              ) : enrollments.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4"><FileText size={32}/></div>
                    <h3 className="text-lg font-black text-slate-800 mb-1">No enrollments found</h3>
                    <p className="text-sm font-medium text-slate-500">Adjust your search or filter settings to find what you're looking for.</p>
                  </td>
                </tr>
              ) : (
                enrollments.map(enrollment => (
                  <tr key={enrollment.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4"><input type="checkbox" className="rounded border-slate-300 text-[#1B2A6B] focus:ring-[#1B2A6B]" /></td>
                    <td className="p-4 text-xs font-black text-slate-500 uppercase">ENR-{enrollment.id}</td>
                    <td className="p-4">
                      <div className="font-black text-slate-800">{enrollment.user?.name}</div>
                      <div className="text-xs font-medium text-slate-500">{enrollment.user?.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#1B2A6B] line-clamp-1 max-w-[200px]">{enrollment.course?.title}</div>
                      <div className="text-xs font-semibold text-slate-500">by {enrollment.course?.instructor?.name || 'System'}</div>
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-600">{new Date(enrollment.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-black bg-blue-50 text-blue-600`}>
                        0%
                      </span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={enrollment.status === 'active' || enrollment.status === 'completed' ? 'Paid' : (enrollment.status === 'refunded' ? 'Refunded' : 'Pending')} type="payment" />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={enrollment.status} type="enrollment" />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setSelectedEnrollment(enrollment); setIsViewDrawerOpen(true); }} className="p-1.5 text-slate-400 hover:text-[#1B2A6B] hover:bg-slate-100 rounded-lg tooltip" title="View"><Eye size={16}/></button>
                        {enrollment.status === 'pending' && <button onClick={() => handleApprove(enrollment.id)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg tooltip" title="Approve"><Check size={16}/></button>}
                        <div className="relative group/dropdown">
                          <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg"><MoreVertical size={16}/></button>
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-10 py-1">
                            {enrollment.status !== 'refunded' && <button onClick={() => { setSelectedEnrollment(enrollment); setIsRefundModalOpen(true); }} className="w-full text-left px-4 py-2 text-sm font-bold text-amber-600 hover:bg-amber-50 flex items-center gap-2"><RefreshCw size={14}/> Process Refund</button>}
                            {enrollment.status !== 'cancelled' && <button onClick={() => { setSelectedEnrollment(enrollment); setIsCancelModalOpen(true); }} className="w-full text-left px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"><XCircle size={14}/> Cancel Enrollment</button>}
                            <div className="h-px bg-slate-100 my-1"></div>
                            <button onClick={() => handleDelete(enrollment.id)} className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2Icon size={14}/> Delete</button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!isLoading && enrollments.length > 0 && meta.last_page > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-semibold text-slate-500">Showing <span className="font-bold text-slate-700">{meta.from}</span> to <span className="font-bold text-slate-700">{meta.to}</span> of <span className="font-bold text-slate-700">{meta.total}</span> entries</p>
            <div className="flex gap-1.5">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-400 hover:bg-slate-50 disabled:opacity-50">Prev</button>
              <button className="px-3 py-1.5 bg-[#1B2A6B] text-white rounded-lg text-sm font-black shadow-sm">{page}</button>
              <button disabled={page === meta.last_page} onClick={() => setPage(page + 1)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-400 hover:bg-slate-50 disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* View Enrollment Drawer */}
      {isViewDrawerOpen && selectedEnrollment && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity animate-in fade-in" onClick={() => setIsViewDrawerOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-black text-slate-800">Enrollment Details</h2>
              <button onClick={() => setIsViewDrawerOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-200 rounded-lg"><X size={20}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Header Profile */}
              <div className="text-center pb-6 border-b border-slate-100">
                <div className="w-16 h-16 bg-[#1B2A6B] text-white rounded-full flex items-center justify-center text-xl font-black mx-auto mb-3">
                  {selectedEnrollment.user?.name?.charAt(0) || 'S'}
                </div>
                <h3 className="text-xl font-black text-slate-800">{selectedEnrollment.user?.name}</h3>
                <p className="text-sm font-semibold text-slate-500">{selectedEnrollment.user?.email}</p>
                <div className="mt-3 inline-flex items-center gap-2">
                  <StatusBadge status={selectedEnrollment.status} type="enrollment" />
                </div>
              </div>

              {/* Course Info */}
              <div>
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Course Information</h4>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-0.5">Course Name</p>
                    <p className="text-sm font-bold text-slate-800">{selectedEnrollment.course?.title}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-0.5">Instructor</p>
                    <p className="text-sm font-bold text-slate-800">{selectedEnrollment.course?.instructor?.name || 'System'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-0.5">Enrollment ID & Date</p>
                    <p className="text-sm font-bold text-slate-800 uppercase">ENR-{selectedEnrollment.id} • {new Date(selectedEnrollment.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Drawer Actions */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-3">
              {selectedEnrollment.status !== 'refunded' && (
                <button onClick={() => setIsRefundModalOpen(true)} className="flex-1 py-2.5 bg-white border border-amber-200 text-amber-600 text-sm font-bold rounded-xl hover:bg-amber-50 shadow-sm transition-all">Refund</button>
              )}
              {selectedEnrollment.status !== 'cancelled' && (
                <button onClick={() => setIsCancelModalOpen(true)} className="flex-1 py-2.5 bg-white border border-rose-200 text-rose-600 text-sm font-bold rounded-xl hover:bg-rose-50 shadow-sm transition-all">Cancel</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Refund Confirmation Modal */}
      {isRefundModalOpen && selectedEnrollment && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4"><RefreshCw size={32} /></div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Process Refund?</h3>
            <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to refund <span className="font-bold text-slate-800">{selectedEnrollment.user?.name}</span> for <span className="font-bold text-slate-800">{selectedEnrollment.course?.title}</span>? This will revoke access.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setIsRefundModalOpen(false)} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all">No, Keep It</button>
              <button onClick={handleProcessRefund} className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all">Yes, Refund</button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && selectedEnrollment && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4"><ShieldAlert size={32} /></div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Cancel Enrollment?</h3>
            <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to cancel the enrollment for <span className="font-bold text-slate-800">{selectedEnrollment.user?.name}</span> without a refund?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setIsCancelModalOpen(false)} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all">Go Back</button>
              <button onClick={handleCancelEnrollment} className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-md transition-all">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}

    </AdminDashboardLayout>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string, value: number, icon: any, color: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{title}</p>
        <h3 className="text-xl font-black text-slate-800 leading-none">{value}</h3>
      </div>
    </div>
  );
}

function StatusBadge({ status, type }: { status: string, type: 'payment' | 'enrollment' }) {
  let colors = 'bg-slate-100 text-slate-600';
  let displayStatus = status;
  
  if (status.toLowerCase() === 'active' || status.toLowerCase() === 'completed' || status.toLowerCase() === 'paid') {
    colors = 'bg-emerald-100 text-emerald-700';
  } else if (status.toLowerCase() === 'pending') {
    colors = 'bg-amber-100 text-amber-700';
  } else if (status.toLowerCase() === 'refunded') {
    colors = 'bg-rose-100 text-rose-700';
  } else if (status.toLowerCase() === 'cancelled') {
    colors = 'bg-slate-200 text-slate-700';
  }

  return (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${colors}`}>
      {displayStatus}
    </span>
  );
}

const Trash2Icon = ({size}: {size:number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
