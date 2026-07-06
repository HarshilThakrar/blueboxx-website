import { InternDashboardLayout } from "../../../src/layout/InternDashboardLayout";
import { FileText, UploadCloud, CheckCircle2, File, ExternalLink, RefreshCw, Loader2, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

export default function InternResumePage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [resumeName, setResumeName] = useState("Ankit_Sharma_Resume_2025.pdf");
  const [uploadDate, setUploadDate] = useState("Oct 12, 2025");
  const [uploadSize, setUploadSize] = useState("1.2 MB");

  const handleUploadClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setUploadSuccess(true);
        setResumeName(file.name);
        setUploadDate("Just now");
        setUploadSize((file.size / (1024 * 1024)).toFixed(2) + " MB");
        setTimeout(() => setUploadSuccess(false), 3000);
      }, 1500);
    }
  };

  return (
    <InternDashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800 mb-1">Resume & Portfolio</h1>
          <p className="text-slate-500 font-medium text-sm">Manage your documents for 1-click applications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col - Current Resume */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-base font-black text-slate-800">Primary Resume</h2>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg flex items-center gap-1">
                <CheckCircle2 size={12} /> Active
              </span>
            </div>
            <div className="p-5 flex flex-col md:flex-row items-center gap-5">
              <div className="w-16 h-24 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
                <FileText size={24} className="text-slate-300" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-sm font-bold text-slate-800 mb-1 line-clamp-1" title={resumeName}>{resumeName}</h3>
                <p className="text-xs font-medium text-slate-500 mb-3">Uploaded on {uploadDate} • {uploadSize}</p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <button onClick={() => toast.success('Viewing ' + resumeName)} className="flex items-center gap-1.5 bg-[#1B2A6B] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#0d1635] transition-colors shadow-sm">
                    <Eye size={14} /> View
                  </button>
                  <label className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors shadow-sm cursor-pointer">
                    <RefreshCw size={14} /> Replace
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleUploadClick} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center border-dashed">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <UploadCloud size={20} className="text-blue-500" />
            </div>
            <h3 className="text-sm font-black text-slate-800 mb-1">Upload New Document</h3>
            <p className="text-xs font-medium text-slate-500 mb-4 max-w-xs mx-auto">Upload your cover letters, transcripts, or portfolio PDFs. Max size 5MB.</p>
            <label 
              className={`inline-block cursor-pointer bg-white border text-slate-700 px-5 py-2 rounded-xl text-xs font-bold transition-all mx-auto ${
                uploadSuccess ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-slate-200 shadow-sm hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {isUploading ? <><Loader2 size={14} className="animate-spin" /> Uploading...</> : 
                 uploadSuccess ? <><CheckCircle2 size={14} /> Uploaded!</> : 
                 'Browse Files'}
              </div>
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleUploadClick} disabled={isUploading} />
            </label>
          </div>
        </div>

        {/* Right Col - Score */}
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-gradient-to-br from-[#0d1635] to-[#1B2A6B] rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
            <h3 className="font-black text-base mb-4">Resume Score</h3>
            
            <div className="flex justify-center mb-5 relative">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="62.8" className="text-[#C9A227]" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-black">75</span>
                <span className="text-[9px] uppercase tracking-widest text-white/70 font-bold">Good</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2.5 text-white/90 font-medium">
                <CheckCircle2 size={14} className="text-emerald-400" /> Education verified
              </li>
              <li className="flex items-center gap-2.5 text-white/90 font-medium">
                <CheckCircle2 size={14} className="text-emerald-400" /> Skills match 80%
              </li>
              <li className="flex items-center gap-2.5 text-white/50 font-medium">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 shrink-0"></div> Missing GitHub link
              </li>
            </ul>
          </div>
        </div>
      </div>
    </InternDashboardLayout>
  );
}
