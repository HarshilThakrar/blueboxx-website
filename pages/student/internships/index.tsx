import React, { useState } from "react";
import { StudentDashboardLayout } from "../../../src/layout/StudentDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Briefcase, MapPin, Clock, IndianRupee, Search, Filter, ExternalLink, Bookmark } from "lucide-react";
import toast from "react-hot-toast";

const INTERNSHIPS = [
  { id: 1, role: "Frontend Developer Intern", company: "Google India", location: "Bangalore (Remote)", duration: "3 months", stipend: "₹25,000/mo", tags: ["React", "TypeScript", "Next.js"], posted: "2 days ago", match: 95 },
  { id: 2, role: "UI/UX Design Intern", company: "Microsoft", location: "Hyderabad", duration: "6 months", stipend: "₹20,000/mo", tags: ["Figma", "Design Systems", "Research"], posted: "1 week ago", match: 88 },
  { id: 3, role: "Data Analyst Intern", company: "Swiggy", location: "Remote", duration: "3 months", stipend: "₹18,000/mo", tags: ["Python", "SQL", "Tableau"], posted: "3 days ago", match: 75 },
  { id: 4, role: "Digital Marketing Intern", company: "Flipkart", location: "Remote", duration: "2 months", stipend: "₹15,000/mo", tags: ["SEO", "Google Ads", "Analytics"], posted: "5 days ago", match: 70 },
  { id: 5, role: "Backend Developer Intern", company: "Razorpay", location: "Bangalore", duration: "6 months", stipend: "₹30,000/mo", tags: ["Node.js", "MongoDB", "AWS"], posted: "1 day ago", match: 82 },
  { id: 6, role: "Product Management Intern", company: "Zomato", location: "Delhi (Hybrid)", duration: "3 months", stipend: "₹22,000/mo", tags: ["Strategy", "Analytics", "Agile"], posted: "4 days ago", match: 68 },
];

export default function InternshipsPage() {
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [applied, setApplied] = useState<number[]>([]);

  const filtered = INTERNSHIPS.filter(i =>
    i.role.toLowerCase().includes(search.toLowerCase()) ||
    i.company.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSave = (id: number) =>
    setSaved(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handleApply = (id: number) => {
    if (!applied.includes(id)) setApplied(p => [...p, id]);
  };

  return (
    <StudentDashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 mb-1">Internships</h1>
        <p className="text-slate-500 text-sm font-medium">Discover internships matched to your profile and skills.</p>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search by role or company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none"
          />
        </div>
        <button onClick={() => toast.success("Opening filter options...")} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter size={15} /> Filter
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((item, i) => (
          <AnimatedContent key={item.id} direction="up" delay={i * 0.07}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B2A6B] to-[#2E45A3] flex items-center justify-center text-white font-black text-sm shrink-0">
                {item.company[0]}
              </div>
              <div className="flex items-center gap-1">
                <span className={`px-2 py-0.5 text-[10px] font-black rounded-full ${item.match >= 85 ? "bg-emerald-50 text-emerald-700" : item.match >= 70 ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                  {item.match}% match
                </span>
                <button onClick={() => toggleSave(item.id)} className={`p-1.5 rounded-lg transition-colors ${saved.includes(item.id) ? "text-[#C9A227]" : "text-slate-300 hover:text-slate-500"}`}>
                  <Bookmark size={15} fill={saved.includes(item.id) ? "#C9A227" : "none"} />
                </button>
              </div>
            </div>

            <h3 className="font-black text-slate-800 text-sm mb-0.5">{item.role}</h3>
            <p className="text-xs font-bold text-slate-500 mb-3">{item.company}</p>

            <div className="space-y-1.5 mb-4 text-xs text-slate-500 font-semibold">
              <div className="flex items-center gap-1.5"><MapPin size={11} /> {item.location}</div>
              <div className="flex items-center gap-1.5"><Clock size={11} /> {item.duration}</div>
              <div className="flex items-center gap-1.5"><IndianRupee size={11} /> {item.stipend}</div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {item.tags.map(t => (
                <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg">{t}</span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold">Posted {item.posted}</span>
              {applied.includes(item.id) ? (
                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-black rounded-xl">Applied ✓</span>
              ) : (
                <button
                  onClick={() => handleApply(item.id)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#1B2A6B] text-white text-xs font-bold rounded-xl hover:bg-[#0d1635] transition-colors"
                >
                  Apply Now <ExternalLink size={11} />
                </button>
              )}
            </div>
          </AnimatedContent>
        ))}
      </div>
    </StudentDashboardLayout>
  );
}
