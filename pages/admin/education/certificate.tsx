import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Award, Plus, Download, Edit3, Eye, Search, Filter, X, Trash2 } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { Badge } from "../../../src/components/ui/Badge";
import { useState } from "react";
import useSWR from "swr";
import api from "../../../src/lib/axios";
import toast from "react-hot-toast";
import { CertificateApiService } from "../../../src/lib/api/admin/CertificateApiService";

const fetcher = (url: string) => api.get(url).then(r => r.data);

export default function AdminCertificatePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  
  const { data: stats } = CertificateApiService.useStats();
  const { data: certificates, meta, mutate, isLoading } = CertificateApiService.useCertificates({
    search: searchQuery,
    status: statusFilter,
    page
  });
  const { data: templates } = CertificateApiService.useTemplates();

  // Load real courses for the dropdown
  const { data: coursesData } = useSWR('/admin/courses?per_page=100', fetcher);
  const courseOptions: any[] = coursesData?.data || [];

  const [isDesignerOpen, setIsDesignerOpen] = useState(false);
  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const [showFilters, setShowFilters] = useState(false);
  
  const [activePreviewCert, setActivePreviewCert] = useState<any>(null);
  
  // Issue Form State
  const [newCert, setNewCert] = useState({ 
    user_id: "", 
    course_id: "",
    certificate_number: "",
    template_id: "",
    completion_percentage: "",
    grade: "",
    remarks: "",
    issued_at: "",
    expires_at: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.user_id) return toast.error('Student is required');

    setIsSubmitting(true);
    try {
      await CertificateApiService.issueCertificate(newCert);
      toast.success('Certificate issued successfully');
      mutate();
      setNewCert({ user_id: "", course_id: "", certificate_number: "", template_id: "", completion_percentage: "", grade: "", remarks: "", issued_at: "", expires_at: "" });
      setIsIssueOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to issue certificate');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevoke = async (id: number) => {
    try {
      await CertificateApiService.updateStatus(id, 'Revoked');
      toast.success('Certificate revoked');
      mutate();
    } catch (e) {
      toast.error('Failed to revoke certificate');
    }
  };

  const handleDelete = async (id: number) => {
    if(confirm('Are you sure you want to delete this certificate?')) {
      try {
        await CertificateApiService.deleteCertificate(id);
        toast.success('Certificate deleted');
        mutate();
      } catch (e) {
        toast.error('Failed to delete');
      }
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Certificate Manager</h1>
            <p className="text-slate-500 text-sm">Design templates and issue course completion certificates.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 bg-white" onClick={() => setIsDesignerOpen(true)}>
              <Edit3 size={16}/> Edit Template
            </Button>
            <Button variant="primary" className="shadow-md gap-2" onClick={() => setIsIssueOpen(true)}>
              <Plus size={18}/> Issue Certificate
            </Button>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#1B2A6B] to-[#2B44A8] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
             <div className="absolute -right-10 -bottom-10 text-white/10">
                <Award size={180} />
             </div>
             <div className="relative z-10">
               <h3 className="text-lg font-bold text-white/80 uppercase tracking-widest mb-1">Total Issued</h3>
               <p className="text-5xl font-black mb-4">{stats?.total_issued || 0}</p>
               <p className="text-sm font-medium text-blue-100 max-w-[250px]">Students have successfully completed courses and received their credentials.</p>
             </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
             <div>
                <h3 className="text-lg font-black text-slate-800 mb-2">Active Certificate Template</h3>
                <p className="text-sm text-slate-500 font-medium mb-4">Preview how the current credential looks when issued to a student.</p>
             </div>
             
             <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="w-16 h-12 bg-white border border-slate-200 shadow-sm rounded flex items-center justify-center shrink-0">
                   <Award size={20} className="text-[#1B2A6B]" />
                </div>
                <div className="flex-1">
                   <p className="font-bold text-sm text-slate-900">Modern Professional Theme</p>
                   <p className="text-xs text-slate-500">Updated 2 weeks ago</p>
                </div>
                <Button variant="outline" className="gap-2 shrink-0 bg-white" onClick={() => setIsPreviewOpen(true)}>
                  <Eye size={16}/> Preview
                </Button>
             </div>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col gap-4">
             <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-lg font-black text-slate-800 ml-2">Recent Credentials</h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                     <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input 
                       type="text" 
                       placeholder="Search by name or ID..." 
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1B2A6B] focus:bg-white" 
                     />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowFilters(!showFilters)} 
                    className={`shrink-0 ${showFilters ? 'bg-slate-100 border-slate-300' : ''}`}
                  >
                    <Filter size={16}/>
                  </Button>
                </div>
             </div>

             {showFilters && (
               <div className="grid grid-cols-1 gap-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                 <div className="space-y-1.5">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
                   <select 
                     value={statusFilter}
                     onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                     className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#1B2A6B]"
                   >
                     <option value="All">All Statuses</option>
                     <option value="Issued">Issued</option>
                     <option value="Pending">Pending</option>
                     <option value="Revoked">Revoked</option>
                     <option value="Expired">Expired</option>
                   </select>
                 </div>
               </div>
             )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Certificate ID</th>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Issue Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-medium">Loading certificates...</td>
                  </tr>
                ) : certificates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-medium">No certificates found matching filters.</td>
                  </tr>
                ) : (
                  certificates.map((cert: any) => (
                    <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-sm text-[#1B2A6B] font-bold">{cert.certificate_number}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{cert.user?.first_name} {cert.user?.last_name}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">{cert.course?.title || '-'}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-500">{cert.issued_at ? new Date(cert.issued_at).toLocaleDateString() : '-'}</td>
                      <td className="px-6 py-4">
                         <Badge variant={cert.status === 'Issued' ? 'success' : cert.status === 'Revoked' ? 'danger' : 'warning'}>{cert.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                         <Button 
                           variant="outline" 
                           onClick={() => {
                             setActivePreviewCert(cert);
                             setIsPreviewOpen(true);
                           }} 
                           className="text-xs py-1.5 h-8 gap-1.5 bg-white"
                         >
                           <Eye size={14}/> View / PDF
                         </Button>
                         {cert.status === 'Issued' && (
                           <Button variant="outline" className="text-xs py-1.5 h-8 bg-red-50 text-red-600 border-red-200" onClick={() => handleRevoke(cert.id)}>Revoke</Button>
                         )}
                         <Button variant="outline" className="text-xs py-1.5 h-8 text-slate-400" onClick={() => handleDelete(cert.id)}><Trash2 size={14}/></Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {meta?.last_page > 1 && (
            <div className="p-4 border-t border-slate-100 flex justify-between bg-slate-50">
              <span className="text-sm font-medium text-slate-500">Page {meta.current_page} of {meta.last_page}</span>
              <div className="flex gap-2">
                <Button variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
                <Button variant="outline" disabled={page === meta.last_page} onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </div>
          )}
        </AnimatedContent>
      </div>

      {isIssueOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AnimatedContent direction="up" className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Award size={20} className="text-[#1B2A6B]" /> Issue Certificate</h2>
              <button onClick={() => setIsIssueOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleIssue} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student ID</label>
                <input 
                  required
                  type="text" 
                  value={newCert.user_id}
                  onChange={(e) => setNewCert(prev => ({...prev, user_id: e.target.value}))}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none" 
                  placeholder="e.g. 1" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Completed</label>
                <select
                  value={newCert.course_id}
                  onChange={(e) => setNewCert(prev => ({...prev, course_id: e.target.value}))}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                >
                  <option value="">Select Course</option>
                  {courseOptions.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completion %</label>
                  <input 
                    type="number" 
                    value={newCert.completion_percentage}
                    onChange={(e) => setNewCert(prev => ({...prev, completion_percentage: e.target.value}))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#1B2A6B]" 
                    placeholder="e.g. 100" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Grade</label>
                  <input 
                    type="text" 
                    value={newCert.grade}
                    onChange={(e) => setNewCert(prev => ({...prev, grade: e.target.value}))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#1B2A6B]" 
                    placeholder="e.g. A+" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Issue Date</label>
                  <input 
                    type="date" 
                    value={newCert.issued_at}
                    onChange={(e) => setNewCert(prev => ({...prev, issued_at: e.target.value}))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#1B2A6B]" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry Date</label>
                  <input 
                    type="date" 
                    value={newCert.expires_at}
                    onChange={(e) => setNewCert(prev => ({...prev, expires_at: e.target.value}))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#1B2A6B]" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Template Override</label>
                <select
                  value={newCert.template_id}
                  onChange={(e) => setNewCert(prev => ({...prev, template_id: e.target.value}))}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#1B2A6B]"
                >
                  <option value="">Use Default Template</option>
                  {templates?.map((t: any) => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsIssueOpen(false)} disabled={isSubmitting}>Cancel</Button>
                <Button type="submit" variant="primary" className="flex-1 shadow-md gap-2" disabled={isSubmitting}>
                  {isSubmitting ? 'Issuing...' : 'Issue Credential'}
                </Button>
              </div>
            </form>
          </AnimatedContent>
        </div>
      )}

      {(isDesignerOpen || isPreviewOpen) && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AnimatedContent direction="up" className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {isDesignerOpen ? <Edit3 size={20} className="text-[#1B2A6B]" /> : <Eye size={20} className="text-[#1B2A6B]" />} 
                {isDesignerOpen ? "Template Designer" : "Certificate Preview"}
              </h2>
              <button onClick={() => { setIsDesignerOpen(false); setIsPreviewOpen(false); setActivePreviewCert(null); }} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-4 bg-slate-100 flex flex-col items-center">
              {/* Simulated Certificate Graphic */}
              <div className="w-full aspect-[1.414] bg-white border border-slate-300 shadow-sm p-8 flex flex-col items-center justify-center text-center relative">
                 <div className="absolute inset-2 border-2 border-slate-200"></div>
                 <div className="absolute inset-3 border border-slate-100"></div>
                 <h1 className="text-3xl font-serif text-[#1B2A6B] mb-4">Certificate of Completion</h1>
                 <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-6">This is to certify that</p>
                 <h2 className="text-2xl font-script text-slate-800 mb-4 border-b border-slate-300 pb-2 px-12">
                   {activePreviewCert ? `${activePreviewCert.user?.first_name} ${activePreviewCert.user?.last_name}` : "[ Student Name ]"}
                 </h2>
                 <p className="text-[10px] text-slate-500 mb-4 max-w-[80%]">has successfully completed the requirements for the course</p>
                 <h3 className="font-bold text-slate-800 mb-8">
                   {activePreviewCert ? activePreviewCert.course?.title : "[ Course Title ]"}
                 </h3>
                 
                 <div className="w-full flex justify-between px-8 text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                    <div className="border-t border-slate-300 pt-2 w-24">Date: {activePreviewCert?.issued_at ? new Date(activePreviewCert.issued_at).toLocaleDateString() : "[Issue Date]"}</div>
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 border border-amber-200"><Award size={24}/></div>
                    <div className="border-t border-slate-300 pt-2 w-24">ID: {activePreviewCert ? activePreviewCert.certificate_number : "BlueBoxx Verified"}</div>
                 </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
               <a 
                 href={activePreviewCert?.pdf_path ? `/storage/${activePreviewCert.pdf_path}` : '#'} 
                 download={`${activePreviewCert ? activePreviewCert.certificate_number : 'Certificate'}_Certificate.pdf`}
                 className="inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all h-11 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                 target="_blank" rel="noreferrer"
               >
                 <Download size={16} className="mr-2"/> Download PDF
               </a>
               <Button variant="outline" onClick={() => { setIsDesignerOpen(false); setIsPreviewOpen(false); setActivePreviewCert(null); }}>Close</Button>
            </div>
          </AnimatedContent>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
