import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Briefcase, GraduationCap, Plus, ArrowLeft } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AddInternshipPage() {
  const router = useRouter();
  const [newInternship, setNewInternship] = useState({
    title: "",
    company: "BlueBoxx (Internal)",
    type: "Part-time",
    location: "",
    logo: "",
    tags: "",
    stipend: "",
    duration: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setNewInternship(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateInternship = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInternship.title && newInternship.location) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        router.push("/admin/internships");
      }, 1500);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        <AnimatedContent direction="up" delay={0.1} className="flex items-center gap-4">
          <Link href="/admin/internships" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-900">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Post New Internship</h1>
            <p className="text-slate-500 text-sm">Create a new internship opportunity for students.</p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2}>
          <form id="create-internship-form" onSubmit={handleCreateInternship} className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-[#1B2A6B] uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center gap-2">
                <Briefcase size={16}/> Primary Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title</label>
                  <input 
                    type="text" required placeholder="e.g. Frontend Developer Intern"
                    value={newInternship.title} onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
                  <input 
                    type="text" required placeholder="e.g. TechNova Solutions"
                    value={newInternship.company} onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Logo URL</label>
                  <input 
                    type="url" placeholder="https://..."
                    value={newInternship.logo} onChange={(e) => handleInputChange('logo', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-[#1B2A6B] uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center gap-2">
                <GraduationCap size={16}/> Details & Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Employment Type</label>
                  <select 
                    value={newInternship.type} onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-[#1B2A6B]"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                  <input 
                    type="text" required placeholder="e.g. Remote or Bangalore"
                    value={newInternship.location} onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tags / Tech Stack (Comma separated)</label>
                  <input 
                    type="text" placeholder="e.g. React, Node.js, MongoDB"
                    value={newInternship.tags} onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stipend</label>
                  <input 
                    type="text" placeholder="e.g. ₹15,000 - ₹20,000 /mo"
                    value={newInternship.stipend} onChange={(e) => handleInputChange('stipend', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</label>
                  <input 
                    type="text" placeholder="e.g. 6 Months"
                    value={newInternship.duration} onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                variant="primary" 
                className="px-8 py-3 text-base shadow-lg shadow-[#1B2A6B]/20 gap-2"
              >
                <Plus size={18} /> Post Internship
              </Button>
            </div>
          </form>
        </AnimatedContent>
      </div>
    </AdminDashboardLayout>
  );
}
