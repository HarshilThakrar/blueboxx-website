import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Award, Plus, Download, Edit3, Eye, Search, Filter, X } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { Badge } from "../../../src/components/ui/Badge";
import { useState } from "react";

const INITIAL_CERTIFICATES = [
  { id: 1, student: "Rahul Sharma", course: "Frontend Web Development", date: "Oct 28, 2026", cid: "CX-8932-FR", status: "Issued" },
  { id: 2, student: "Priya Patel", course: "AI/ML Basic (Python)", date: "Oct 25, 2026", cid: "CX-4110-AI", status: "Issued" },
  { id: 3, student: "Amit Kumar", course: "Advanced Figma Pro", date: "Oct 20, 2026", cid: "CX-9021-FG", status: "Revoked" },
];

export default function AdminCertificatePage() {
  const [certificates, setCertificates] = useState(INITIAL_CERTIFICATES);
  const [isDesignerOpen, setIsDesignerOpen] = useState(false);
  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [newCert, setNewCert] = useState({ student: "", course: "" });

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.student.trim() || !newCert.course.trim()) return;

    setCertificates([
      { 
        id: Date.now(), 
        student: newCert.student, 
        course: newCert.course, 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
        cid: `CX-${Math.floor(1000 + Math.random() * 9000)}-NW`, 
        status: "Issued" 
      },
      ...certificates
    ]);
    setNewCert({ student: "", course: "" });
    setIsIssueOpen(false);
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
               <p className="text-5xl font-black mb-4">8,450</p>
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
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
             <h2 className="text-lg font-black text-slate-800 ml-2">Recent Credentials</h2>
             <div className="flex gap-2 w-full sm:w-auto">
               <div className="relative flex-1 sm:w-64">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search by name or ID..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1B2A6B] focus:bg-white" />
               </div>
               <Button variant="outline" className="shrink-0"><Filter size={16}/></Button>
             </div>
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
                {certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-[#1B2A6B] font-bold">{cert.cid}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{cert.student}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">{cert.course}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{cert.date}</td>
                    <td className="px-6 py-4">
                       <Badge variant={cert.status === 'Issued' ? 'success' : 'danger'}>{cert.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <Button variant="outline" className="text-xs py-1.5 h-8 gap-1.5 bg-white"><Download size={14}/> PDF</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedContent>
      </div>

      {isIssueOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AnimatedContent direction="up" className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Award size={20} className="text-[#1B2A6B]" /> Issue Certificate</h2>
              <button onClick={() => setIsIssueOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleIssue} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</label>
                <input 
                  required
                  type="text" 
                  value={newCert.student}
                  onChange={(e) => setNewCert(prev => ({...prev, student: e.target.value}))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none" 
                  placeholder="e.g. John Doe" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Completed</label>
                <select
                  value={newCert.course}
                  onChange={(e) => setNewCert(prev => ({...prev, course: e.target.value}))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                >
                  <option value="" disabled>Select Course</option>
                  <option value="Frontend Web Development">Frontend Web Development</option>
                  <option value="AI/ML Basic (Python)">AI/ML Basic (Python)</option>
                  <option value="Advanced Figma Pro">Advanced Figma Pro</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsIssueOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" className="flex-1 shadow-md gap-2">Issue Credential</Button>
              </div>
            </form>
          </AnimatedContent>
        </div>
      )}

      {(isDesignerOpen || isPreviewOpen) && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AnimatedContent direction="up" className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {isDesignerOpen ? <Edit3 size={20} className="text-[#1B2A6B]" /> : <Eye size={20} className="text-[#1B2A6B]" />} 
                {isDesignerOpen ? "Template Designer" : "Certificate Preview"}
              </h2>
              <button onClick={() => { setIsDesignerOpen(false); setIsPreviewOpen(false); }} className="text-slate-400 hover:text-slate-600 transition-colors">
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
                 <h2 className="text-2xl font-script text-slate-800 mb-4 border-b border-slate-300 pb-2 px-12">[ Student Name ]</h2>
                 <p className="text-[10px] text-slate-500 mb-4 max-w-[80%]">has successfully completed the requirements for the course</p>
                 <h3 className="font-bold text-slate-800 mb-8">[ Course Title ]</h3>
                 
                 <div className="w-full flex justify-between px-8 text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                    <div className="border-t border-slate-300 pt-2 w-24">Date: [Issue Date]</div>
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 border border-amber-200"><Award size={24}/></div>
                    <div className="border-t border-slate-300 pt-2 w-24">BlueBoxx Verified</div>
                 </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white flex justify-end">
               <Button variant="primary" onClick={() => { setIsDesignerOpen(false); setIsPreviewOpen(false); }}>Close</Button>
            </div>
          </AnimatedContent>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
