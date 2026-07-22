import React, { useState, useRef } from "react";
import { StudentDashboardLayout } from "../../../src/layout/StudentDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Download, Trash2, Plus, Loader2, Palette, Sparkles, Target, TrendingUp, CheckCircle, AlertCircle, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../../src/context/AuthContext";

// ── Types ──────────────────────────────────────────────────────
interface EduEntry {
  id: number;
  school: string;
  degree: string;
  duration: string;
  cgpa: string;
}

interface ExpEntry {
  id: number;
  company: string;
  role: string;
  duration: string;
  desc: string;
}

const inputCls =
  "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none";
const labelCls = "block text-xs font-bold text-slate-500 uppercase mb-1.5";

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResults, setAiResults] = useState<any>(null);

  const { user } = useAuth();
  
  // ── Personal ──────────────────────────────────────────────
  const [fullName, setFullName] = useState(user?.name || "John Doe");
  const [jobTitle, setJobTitle] = useState("Frontend Developer");
  const [phone, setPhone] = useState(user?.phone || "+91 9876543210");
  const [location, setLocation] = useState("Bangalore, India");
  const [summary, setSummary] = useState(
    "Passionate and detail‑oriented frontend developer with experience in React and Node.js. Strong focus on UI/UX and performance optimization."
  );

  // ── Education (array) ─────────────────────────────────────
  const [eduList, setEduList] = useState<EduEntry[]>([
    { id: 1, school: "NIT Trichy", degree: "B.Tech in Computer Science", duration: "2022 – 2026", cgpa: "8.5/10" },
  ]);

  const addEdu = () =>
    setEduList((p) => [...p, { id: Date.now(), school: "", degree: "", duration: "", cgpa: "" }]);

  const removeEdu = (id: number) => setEduList((p) => p.filter((e) => e.id !== id));

  const updateEdu = (id: number, field: keyof EduEntry, val: string) =>
    setEduList((p) => p.map((e) => (e.id === id ? { ...e, [field]: val } : e)));

  // ── Experience (array) ────────────────────────────────────
  const [expList, setExpList] = useState<ExpEntry[]>([
    {
      id: 1,
      company: "Tech Corp",
      role: "Frontend Developer Intern",
      duration: "Jan 2026 – Present",
      desc: "Developed responsive web applications using React and Next.js.\nCollaborated on design system integrations and bug fixes.",
    },
  ]);

  const addExp = () =>
    setExpList((p) => [...p, { id: Date.now(), company: "", role: "", duration: "", desc: "" }]);

  const removeExp = (id: number) => setExpList((p) => p.filter((e) => e.id !== id));

  const updateExp = (id: number, field: keyof ExpEntry, val: string) =>
    setExpList((p) => p.map((e) => (e.id === id ? { ...e, [field]: val } : e)));

  // ── Skills ────────────────────────────────────────────────
  const [skillsList, setSkillsList] = useState(["React.js", "Next.js", "TypeScript", "Tailwind CSS"]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setSkillsList((p) => [...p, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (idx: number) => setSkillsList((p) => p.filter((_, i) => i !== idx));

  // ── Accent & PDF ──────────────────────────────────────────
  const accentColors = ["#C9A227", "#1B2A6B", "#0d1635", "#ff6b6b"];
  const [accent, setAccent] = useState(accentColors[0]);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    setIsDownloading(true);
    window.print();
    setTimeout(() => setIsDownloading(false), 1500);
  };

  // ── Shared section card style ─────────────────────────────
  const sectionCard = "bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 relative";

  return (
    <StudentDashboardLayout>
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        {/* Header */}
        <AnimatedContent direction="up" delay={0.1}>
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-800 mb-2">Resume Builder</h1>
              <p className="text-sm font-medium text-slate-500">
                Create a professional resume for your job applications.
              </p>
            </div>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-6 py-2.5 bg-[#1B2A6B] text-white rounded-xl font-bold hover:bg-[#0d1635] transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {isDownloading ? (
                <><Loader2 size={18} className="animate-spin" /> Downloading...</>
              ) : (
                <><Download size={18} /> Download PDF</>
              )}
            </button>
          </div>
        </AnimatedContent>

        <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-[600px]">

          {/* ── Editor ── */}
          <AnimatedContent direction="up" delay={0.2} className="w-full lg:w-1/2 flex flex-col">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">

              {/* Tabs */}
              <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/50">
                {["personal", "education", "experience", "skills", "ai analysis"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 ${
                      activeTab === tab
                        ? tab === "ai analysis" ? "border-purple-600 text-purple-700" : "border-[#1B2A6B] text-[#1B2A6B]"
                        : tab === "ai analysis" ? "border-transparent text-purple-500 hover:text-purple-600" : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab === "ai analysis" && <Sparkles size={14} />}
                    {tab.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </button>
                ))}
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-4">

                {/* ── Personal ── */}
                {activeTab === "personal" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Full Name</label>
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Job Title</label>
                        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className={inputCls} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Phone</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Location</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Summary</label>
                      <textarea rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} className={`${inputCls} resize-none`} />
                    </div>
                  </div>
                )}

                {/* ── Education ── */}
                {activeTab === "education" && (
                  <div className="space-y-4">
                    {eduList.map((edu, idx) => (
                      <div key={edu.id} className={sectionCard}>
                        {/* Entry header */}
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#1B2A6B] uppercase tracking-wider">
                            Education {eduList.length > 1 ? `#${idx + 1}` : ""}
                          </span>
                          {eduList.length > 1 && (
                            <button
                              onClick={() => removeEdu(edu.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                              title="Remove"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>

                        <div>
                          <label className={labelCls}>School / University</label>
                          <input type="text" value={edu.school} onChange={(e) => updateEdu(edu.id, "school", e.target.value)} placeholder="e.g. NIT Trichy" className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Degree / Course</label>
                          <input type="text" value={edu.degree} onChange={(e) => updateEdu(edu.id, "degree", e.target.value)} placeholder="e.g. B.Tech in Computer Science" className={inputCls} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>Duration</label>
                            <input type="text" value={edu.duration} onChange={(e) => updateEdu(edu.id, "duration", e.target.value)} placeholder="e.g. 2022 – 2026" className={inputCls} />
                          </div>
                          <div>
                            <label className={labelCls}>CGPA / Grade</label>
                            <input type="text" value={edu.cgpa} onChange={(e) => updateEdu(edu.id, "cgpa", e.target.value)} placeholder="e.g. 8.5/10" className={inputCls} />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* + Add Education */}
                    <button
                      onClick={addEdu}
                      className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-[#1B2A6B]/30 rounded-xl text-sm font-bold text-[#1B2A6B] hover:border-[#1B2A6B] hover:bg-[#1B2A6B]/5 transition-all"
                    >
                      <Plus size={16} /> Add Education
                    </button>
                  </div>
                )}

                {/* ── Experience ── */}
                {activeTab === "experience" && (
                  <div className="space-y-4">
                    {expList.map((exp, idx) => (
                      <div key={exp.id} className={sectionCard}>
                        {/* Entry header */}
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#1B2A6B] uppercase tracking-wider">
                            Experience {expList.length > 1 ? `#${idx + 1}` : ""}
                          </span>
                          {expList.length > 1 && (
                            <button
                              onClick={() => removeExp(exp.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                              title="Remove"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>

                        <div>
                          <label className={labelCls}>Company Name</label>
                          <input type="text" value={exp.company} onChange={(e) => updateExp(exp.id, "company", e.target.value)} placeholder="e.g. Tech Corp" className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Job Role / Title</label>
                          <input type="text" value={exp.role} onChange={(e) => updateExp(exp.id, "role", e.target.value)} placeholder="e.g. Frontend Developer Intern" className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Duration</label>
                          <input type="text" value={exp.duration} onChange={(e) => updateExp(exp.id, "duration", e.target.value)} placeholder="e.g. Jan 2025 – Present" className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Key Responsibilities (one per line)</label>
                          <textarea
                            rows={3}
                            value={exp.desc}
                            onChange={(e) => updateExp(exp.id, "desc", e.target.value)}
                            placeholder={"Built a React dashboard.\nReduced API response time by 40%."}
                            className={`${inputCls} resize-none`}
                          />
                        </div>
                      </div>
                    ))}

                    {/* + Add Experience */}
                    <button
                      onClick={addExp}
                      className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-[#1B2A6B]/30 rounded-xl text-sm font-bold text-[#1B2A6B] hover:border-[#1B2A6B] hover:bg-[#1B2A6B]/5 transition-all"
                    >
                      <Plus size={16} /> Add Experience
                    </button>
                  </div>
                )}

                {/* ── Skills ── */}
                {activeTab === "skills" && (
                  <div className="space-y-4">
                    <form onSubmit={handleAddSkill} className="flex gap-2">
                      <input
                        list="skills-suggestions"
                        type="text"
                        placeholder="Add new skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                      />
                      <datalist id="skills-suggestions">
                        {["React.js","Next.js","TypeScript","JavaScript","HTML5","CSS3","Tailwind CSS","Node.js","Python","SQL","MongoDB","Figma","UI/UX Design","Digital Marketing","Data Analytics"].map((s) => (
                          <option key={s} value={s} />
                        ))}
                      </datalist>
                      <button type="submit" className="px-4 py-2.5 bg-[#1B2A6B] text-white font-bold rounded-xl hover:bg-[#0d1635] text-sm">
                        Add
                      </button>
                    </form>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {skillsList.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200">
                          {skill}
                          <button type="button" onClick={() => removeSkill(idx)} className="text-slate-400 hover:text-red-500">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── AI Analysis ── */}
                {activeTab === "ai analysis" && (
                  <div className="space-y-6 h-full flex flex-col">
                    {!aiResults && !isAnalyzing && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                          <Sparkles size={32} className="text-purple-600" />
                        </div>
                        <h2 className="text-xl font-black text-slate-800 mb-3">AI Resume Scorer</h2>
                        <p className="text-sm font-medium text-slate-500 mb-8 max-w-sm mx-auto">
                          Let our AI instantly analyze your resume against industry standards, identify gaps, and recommend steps to boost your hiring chances.
                        </p>
                        <button
                          onClick={() => {
                            setIsAnalyzing(true);
                            setTimeout(() => {
                              setAiResults({
                                score: 78,
                                strengths: ["Clear education timeline", "Good formatting", "Listed key technical skills"],
                                weaknesses: ["Experience descriptions lack quantifiable metrics (e.g. 'Increased efficiency by 20%')", "Missing soft skills (Communication, Leadership)"],
                                recommendations: [
                                  { title: "Advanced React Patterns", tag: "Highly Recommended", icon: BookOpen },
                                  { title: "Technical Interview Prep", tag: "Career Growth", icon: Target }
                                ]
                              });
                              setIsAnalyzing(false);
                            }, 2500);
                          }}
                          className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-black shadow-xl shadow-purple-500/30 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                        >
                          <Sparkles size={18} /> Run AI Scan Now
                        </button>
                      </div>
                    )}

                    {isAnalyzing && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <Loader2 size={40} className="text-purple-600 animate-spin mb-6" />
                        <h2 className="text-lg font-black text-slate-800 mb-2">Analyzing Profile...</h2>
                        <p className="text-sm font-medium text-slate-500">Cross-referencing skills with industry requirements.</p>
                      </div>
                    )}

                    {aiResults && (
                      <AnimatedContent direction="up" delay={0.1} className="space-y-6 pb-6">
                        {/* Score Card */}
                        <div className="bg-gradient-to-br from-purple-900 to-[#0d1635] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-purple-900/20">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                          
                          <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
                            <div className="relative w-32 h-32 shrink-0">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                                <motion.circle 
                                  initial={{ strokeDashoffset: 283 }}
                                  animate={{ strokeDashoffset: 283 - (283 * aiResults.score) / 100 }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                  cx="50" cy="50" r="45" fill="none" stroke="#C9A227" strokeWidth="8" strokeLinecap="round" 
                                  strokeDasharray="283"
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-white leading-none">{aiResults.score}</span>
                                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">/ 100</span>
                              </div>
                            </div>
                            
                            <div className="text-center sm:text-left">
                              <h3 className="text-2xl font-black mb-2 flex items-center justify-center sm:justify-start gap-2">
                                <Target size={24} className="text-[#C9A227]" /> Good Potential!
                              </h3>
                              <p className="text-sm font-medium text-white/70 leading-relaxed max-w-sm">
                                Your resume is well-structured but lacks measurable impact. Adding specific metrics will boost your score above 90.
                              </p>
                              <button onClick={() => setAiResults(null)} className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-colors">
                                Rescan Profile
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Feedback Split */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                            <h4 className="text-sm font-black text-emerald-800 mb-4 flex items-center gap-2">
                              <CheckCircle size={16} /> Key Strengths
                            </h4>
                            <ul className="space-y-3">
                              {aiResults.strengths.map((str: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-sm font-medium text-emerald-700">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> {str}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                            <h4 className="text-sm font-black text-amber-800 mb-4 flex items-center gap-2">
                              <AlertCircle size={16} /> Areas to Improve
                            </h4>
                            <ul className="space-y-3">
                              {aiResults.weaknesses.map((wk: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-sm font-medium text-amber-700">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" /> {wk}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Smart Recommendations */}
                        <div>
                          <h4 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-[#1B2A6B]" /> AI Course Recommendations
                          </h4>
                          <div className="space-y-3">
                            {aiResults.recommendations.map((rec: any, i: number) => (
                              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                                    <rec.icon size={20} />
                                  </div>
                                  <div>
                                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider mb-1 block">{rec.tag}</span>
                                    <p className="text-sm font-bold text-slate-800 group-hover:text-[#1B2A6B] transition-colors">{rec.title}</p>
                                  </div>
                                </div>
                                <ArrowRight size={18} className="text-slate-300 group-hover:text-[#1B2A6B] transition-colors shrink-0" />
                              </div>
                            ))}
                          </div>
                        </div>

                      </AnimatedContent>
                    )}
                  </div>
                )}
              </div>
            </div>
          </AnimatedContent>

          {/* ── Preview ── */}
          <div className="resume-preview-print w-full lg:w-1/2 flex flex-col">
            <AnimatedContent direction="left" delay={0.3} className="flex flex-col h-full">
              {/* Print header – hidden on screen */}
              <div className="resume-print-header" style={{ display: "none" }}>
                <img src="/blueboxx_logo.png" alt="Blueboxx DA" style={{ height: 48 }} />
              </div>

              <div
                className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 p-6 overflow-y-auto resume-print-area"
                ref={previewRef}
                style={{ "--accent": accent } as React.CSSProperties}
              >
                <div className="min-h-[800px] w-full p-6 bg-white" style={{ fontFamily: "Arial, sans-serif" }}>

                  {/* Name & contact */}
                  <h1 className="text-3xl font-bold text-slate-900 mb-0.5 uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    {fullName}
                  </h1>
                  <p className="text-xs text-slate-500 font-semibold mb-1">{jobTitle}</p>
                  <p className="text-slate-500 text-[11px] font-semibold mb-4 border-b border-slate-200 pb-3">
                    {user?.email || "john@example.com"} • {phone} • {location}
                  </p>

                  {/* Summary */}
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-200 pb-1">Summary</h2>
                  <p className="text-[11px] text-slate-600 mb-5 leading-relaxed">{summary}</p>

                  {/* Experience */}
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">Experience</h2>
                  {expList.map((exp) => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between items-start mb-0.5">
                        <h3 className="text-xs font-bold" style={{ color: "var(--accent)" }}>{exp.role || "—"}</h3>
                        <span className="text-[10px] text-slate-500 font-semibold">{exp.duration}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 font-semibold mb-1">{exp.company}</p>
                      {exp.desc && (
                        <ul className="list-disc pl-4 text-[10px] text-slate-600 space-y-0.5">
                          {exp.desc.split("\n").filter(Boolean).map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  {/* Education */}
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1 mt-2">Education</h2>
                  {eduList.map((edu) => (
                    <div key={edu.id} className="mb-3">
                      <div className="flex justify-between items-start mb-0.5">
                        <h3 className="text-xs font-bold" style={{ color: "var(--accent)" }}>{edu.degree || "—"}</h3>
                        <span className="text-[10px] text-slate-500 font-semibold">{edu.duration}</span>
                      </div>
                      <p className="text-[11px] text-slate-700">{edu.school}</p>
                      {edu.cgpa && <p className="text-[10px] text-slate-500 mt-0.5">CGPA/Grade: {edu.cgpa}</p>}
                    </div>
                  ))}

                  {/* Skills */}
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1 mt-2">Skills</h2>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skillsList.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Accent picker – hidden when printing */}
              <div className="mt-4 flex items-center gap-2 no-print">
                <Palette size={20} className="text-slate-500" />
                <span className="text-sm font-medium text-slate-700 mr-2">Accent:</span>
                {accentColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setAccent(c)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${accent === c ? "border-black scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}
