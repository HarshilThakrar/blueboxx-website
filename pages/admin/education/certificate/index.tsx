import React, { useState } from 'react';
import Head from 'next/head';
import { AdminDashboardLayout } from '../../../../src/layout/AdminDashboardLayout';
import { CertificateApiService } from '../../../../src/lib/api/admin/CertificateApiService';
import { Award, CheckCircle, Clock, XCircle, Download, FileCheck, Search, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CertificateListPage() {
  const { data: stats } = CertificateApiService.useStats();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  
  const { data: certificates, meta, mutate, isLoading } = CertificateApiService.useCertificates({
    search,
    status: statusFilter,
    page
  });

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await CertificateApiService.updateStatus(id, status);
      toast.success(`Status updated to ${status}`);
      mutate();
    } catch (e) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      try {
        await CertificateApiService.deleteCertificate(id);
        toast.success('Certificate deleted');
        mutate();
      } catch (e) {
        toast.error('Failed to delete certificate');
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <Head>
        <title>Certificates | BlueBoxx DA</title>
      </Head>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard title="Total Issued" value={stats?.total_issued || 0} icon={<Award />} color="text-blue-600" bg="bg-blue-50" />
          <StatCard title="Pending" value={stats?.pending || 0} icon={<Clock />} color="text-yellow-600" bg="bg-yellow-50" />
          <StatCard title="Verified" value={stats?.verified || 0} icon={<CheckCircle />} color="text-green-600" bg="bg-green-50" />
          <StatCard title="Downloaded" value={stats?.downloaded || 0} icon={<Download />} color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard title="Revoked" value={stats?.revoked || 0} icon={<XCircle />} color="text-red-600" bg="bg-red-50" />
          <StatCard title="Expired" value={stats?.expired || 0} icon={<FileCheck />} color="text-gray-600" bg="bg-gray-50" />
        </div>

        {/* Main Table Area */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
            <h2 className="text-lg font-black text-gray-800">Issued Certificates</h2>
            
            <div className="flex items-center gap-3">
              <select 
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-[#1B2A6B]"
              >
                <option value="All">All Statuses</option>
                <option value="Issued">Issued</option>
                <option value="Pending">Pending</option>
                <option value="Revoked">Revoked</option>
                <option value="Expired">Expired</option>
              </select>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by ID or Name..." 
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] w-64" 
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100 bg-white">
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Cert ID</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Student</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Issue Date</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr><td colSpan={6} className="py-12 text-center text-sm font-bold text-gray-400">Loading...</td></tr>
                ) : certificates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FileText size={48} className="text-gray-200 mb-4"/>
                        <p className="text-sm font-bold text-gray-400">No Certificates Found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  certificates.map((cert: any) => (
                    <tr key={cert.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-[#1B2A6B]">{cert.certificate_number}</td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-bold text-gray-800">{cert.user?.first_name} {cert.user?.last_name}</div>
                        <div className="text-xs text-gray-500">{cert.user?.email}</div>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-600">{cert.course?.title || '-'}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
                          ${cert.status === 'Issued' ? 'bg-emerald-100 text-emerald-700' : 
                            cert.status === 'Revoked' ? 'bg-red-100 text-red-700' : 
                            cert.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-gray-100 text-gray-700'}
                        `}>
                          {cert.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500">
                        {new Date(cert.issued_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {cert.pdf_path && (
                            <a href={`/storage/${cert.pdf_path}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline">Download PDF</a>
                          )}
                          {cert.status === 'Issued' && <button onClick={() => handleUpdateStatus(cert.id, 'Revoked')} className="text-xs font-bold text-red-600 hover:underline">Revoke</button>}
                          {cert.status === 'Revoked' && <button onClick={() => handleUpdateStatus(cert.id, 'Issued')} className="text-xs font-bold text-emerald-600 hover:underline">Re-issue</button>}
                          <button onClick={() => handleDelete(cert.id)} className="text-xs font-bold text-gray-400 hover:text-red-600">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {meta?.last_page > 1 && (
            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <span className="text-sm font-medium text-gray-500">Page {meta.current_page} of {meta.last_page}</span>
              <div className="flex gap-2">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-3 py-1 bg-white border border-gray-200 rounded text-sm font-bold disabled:opacity-50"
                >Prev</button>
                <button 
                  disabled={page === meta.last_page}
                  onClick={() => setPage(p => p + 1)}
                  className="px-3 py-1 bg-white border border-gray-200 rounded text-sm font-bold disabled:opacity-50"
                >Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}

function StatCard({ title, value, icon, color, bg }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg} ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-black text-gray-800">{value}</div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</div>
      </div>
    </div>
  );
}
