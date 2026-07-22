import { useState } from "react";
import { CollegeDashboardLayout } from "../../../src/layout/CollegeDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, X, Download, Info, Users } from "lucide-react";
import toast from "react-hot-toast";
import useSWR from "swr";
import api from "../../../src/lib/axios";

const fetcher = (url: string) => api.get(url).then(res => res.data);

const SAMPLE_ROWS = [
  { name: "Akash Tiwari", id: "STU-2027-001", course: "B.Tech CSE", cgpa: "8.5", email: "akash@college.edu", status: "valid" },
  { name: "Meena Nair", id: "STU-2027-002", course: "MCA", cgpa: "9.1", email: "meena@college.edu", status: "valid" },
  { name: "Ravi Patel", id: "STU-2027-003", course: "B.Tech IT", cgpa: "", email: "ravi@college.edu", status: "error" },
  { name: "Sonia Das", id: "STU-2027-004", course: "MBA", cgpa: "7.8", email: "sonia@college.edu", status: "valid" },
  { name: "Manish Rao", id: "", course: "B.Tech ECE", cgpa: "6.5", email: "manish@college.edu", status: "error" },
];

export default function CollegeEnrollmentPage() {
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [importing, setImporting] = useState(false);
  
  const { data, isLoading } = useSWR("/college/enrollment-stats", fetcher);
  const stats = data?.data || [];

  const validCount = SAMPLE_ROWS.filter(r => r.status === "valid").length;
  const errorCount = SAMPLE_ROWS.filter(r => r.status === "error").length;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    setUploaded(true);
    toast.success("File uploaded! Preview loaded below.");
  };

  const handleImport = async () => {
    setImporting(true);
    try {
      await api.post("/college/import");
      toast.success(`${validCount} students imported successfully!`);
      setUploaded(false);
    } catch (error) {
      toast.error("Failed to import students.");
    } finally {
      setImporting(false);
    }
  };

  return (
    <CollegeDashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 mb-1">Bulk Enrollment</h1>
        <p className="text-slate-500 font-medium text-sm">Upload a CSV or Excel file to enroll multiple students at once.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Upload Area */}
        <div className="lg:col-span-2 space-y-5">

          {/* How it works */}
          <AnimatedContent direction="up" delay={0.05} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-black text-slate-700 mb-4 flex items-center gap-2">
              <Info size={15} className="text-[#1B2A6B]" /> How It Works
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { step: "1", title: "Download Template", desc: "Get the required CSV format with correct column headers." },
                { step: "2", title: "Fill in Data", desc: "Add your student records — name, ID, course, CGPA, email." },
                { step: "3", title: "Upload & Import", desc: "Drop your file below. We validate and import valid rows." },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-9 h-9 rounded-xl bg-[#1B2A6B] text-white font-black text-base flex items-center justify-center mx-auto mb-2">{s.step}</div>
                  <p className="text-xs font-black text-slate-700 mb-1">{s.title}</p>
                  <p className="text-[11px] text-slate-400 font-medium leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => toast.success("Downloading template CSV...")}
                className="flex items-center gap-2 h-9 px-4 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                <Download size={14} /> Download Template CSV
              </button>
            </div>
          </AnimatedContent>

          {/* Drop Zone */}
          <AnimatedContent direction="up" delay={0.1} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-black text-slate-700 mb-4 flex items-center gap-2">
              <Upload size={15} className="text-[#1B2A6B]" /> Upload File
            </h2>
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${dragOver ? "border-[#1B2A6B] bg-blue-50" : uploaded ? "border-emerald-300 bg-emerald-50" : "border-slate-200 hover:border-[#1B2A6B]/40 hover:bg-slate-50"}`}
            >
              {uploaded ? (
                <div>
                  <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm font-black text-emerald-700">students_batch_2027.csv uploaded</p>
                  <p className="text-xs text-emerald-500 font-medium mt-1">5 rows detected — preview below</p>
                  <button onClick={() => setUploaded(false)} className="mt-3 text-xs font-bold text-slate-400 hover:text-slate-600 underline">Remove file</button>
                </div>
              ) : (
                <div>
                  <div className="w-14 h-14 bg-[#1B2A6B]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileSpreadsheet size={28} className="text-[#1B2A6B]" />
                  </div>
                  <p className="text-sm font-black text-slate-700 mb-1">Drag & drop your CSV or Excel file here</p>
                  <p className="text-xs text-slate-400 font-medium mb-4">or click to browse — max 10MB</p>
                  <label>
                    <input type="file" accept=".csv,.xlsx" className="hidden" onChange={() => { setUploaded(true); toast.success("File uploaded! Preview loaded."); }} />
                    <span className="inline-flex items-center gap-2 h-9 px-5 bg-[#1B2A6B] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#0d1635] transition-colors">
                      <Upload size={13} /> Browse File
                    </span>
                  </label>
                </div>
              )}
            </div>
          </AnimatedContent>

          {/* Preview Table */}
          {uploaded && (
            <AnimatedContent direction="up" delay={0.15} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-sm font-black text-slate-700">Preview — {SAMPLE_ROWS.length} rows detected</h2>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600"><CheckCircle2 size={13} /> {validCount} valid</span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-red-500"><AlertCircle size={13} /> {errorCount} errors</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      <th className="py-2.5 px-5">Name</th>
                      <th className="py-2.5 px-4">Student ID</th>
                      <th className="py-2.5 px-4">Course</th>
                      <th className="py-2.5 px-4 text-center">CGPA</th>
                      <th className="py-2.5 px-4">Email</th>
                      <th className="py-2.5 px-5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {SAMPLE_ROWS.map((row, i) => (
                      <tr key={i} className={row.status === "error" ? "bg-red-50/50" : "hover:bg-slate-50"}>
                        <td className="py-3 px-5 text-sm font-bold text-slate-800">{row.name}</td>
                        <td className="py-3 px-4 text-xs font-mono text-slate-500">{row.id || <span className="text-red-400 italic">missing</span>}</td>
                        <td className="py-3 px-4 text-xs font-semibold text-slate-500">{row.course}</td>
                        <td className="py-3 px-4 text-center text-sm font-bold text-slate-700">{row.cgpa || <span className="text-red-400 italic">missing</span>}</td>
                        <td className="py-3 px-4 text-xs text-slate-500">{row.email}</td>
                        <td className="py-3 px-5 text-center">
                          {row.status === "valid" ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                              <CheckCircle2 size={10} /> Valid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-black text-red-600 bg-red-50 px-2 py-1 rounded-lg border border-red-100">
                              <X size={10} /> Error
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <p className="text-xs font-semibold text-slate-400">{errorCount} rows will be skipped due to missing fields.</p>
                <button
                  onClick={handleImport}
                  disabled={importing}
                  className="flex items-center gap-2 h-9 px-5 bg-[#1B2A6B] text-white text-xs font-bold rounded-xl hover:bg-[#0d1635] disabled:opacity-50 transition-colors"
                >
                  {importing ? "Importing..." : `Import ${validCount} Students`}
                </button>
              </div>
            </AnimatedContent>
          )}
        </div>

        {/* Sidebar info */}
        <div className="space-y-5">
          {/* Stats */}
          <AnimatedContent direction="up" delay={0.2} className="bg-[#0d1635] rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C9A227] to-transparent" />
            <div className="w-10 h-10 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-xl flex items-center justify-center mb-3">
              <Users size={18} className="text-[#C9A227]" />
            </div>
            <h3 className="font-black text-base mb-3">Current Enrollment</h3>
            {isLoading ? (
              <div className="py-4 text-center text-white/50 text-sm">Loading stats...</div>
            ) : (
            <div className="space-y-3">
              {stats.map((c: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] font-bold mb-1">
                    <span className="text-white/70">{c.label}</span>
                    <span className="text-[#C9A227]">{c.count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C9A227] rounded-full" style={{ width: `${Math.min((c.count / 450) * 100, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            )}
          </AnimatedContent>

          {/* Requirements */}
          <AnimatedContent direction="up" delay={0.25} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-black text-slate-700 mb-3">Required Columns</h3>
            <div className="space-y-2">
              {[
                { col: "student_name", req: true },
                { col: "student_id", req: true },
                { col: "course", req: true },
                { col: "cgpa", req: true },
                { col: "email", req: true },
                { col: "phone", req: false },
                { col: "year", req: false },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <code className="text-[11px] text-[#1B2A6B] font-bold bg-blue-50 px-2 py-0.5 rounded">{c.col}</code>
                  {c.req ? (
                    <span className="text-[10px] font-bold text-red-500">Required</span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400">Optional</span>
                  )}
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </div>
    </CollegeDashboardLayout>
  );
}
