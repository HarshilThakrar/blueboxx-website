import { JobseekerDashboardLayout } from "../../../src/layout/JobseekerDashboardLayout";
import { User, MapPin, Briefcase, GraduationCap, Github, Linkedin, Globe, Edit2, Plus, CheckCircle2, Download, X, Save } from "lucide-react";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

export default function JobseekerProfilePage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <JobseekerDashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#0d1635] mb-2">My Profile</h1>
        <p className="text-slate-500 font-medium text-sm">Manage your public profile to attract the best opportunities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatedContent direction="up" delay={0.1} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="h-32 bg-gradient-to-r from-[#1B2A6B] to-[#0d1635] relative">
              <button onClick={() => setActiveModal('edit-profile')} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors backdrop-blur-sm">
                <Edit2 size={16} />
              </button>
            </div>
            <div className="px-8 pb-8 relative">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-100 shadow-md absolute -top-12 left-8 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Arjun+Reddy&background=1B2A6B&color=fff&size=100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-black text-[#0d1635] flex items-center gap-2">
                    Arjun Reddy <CheckCircle2 size={18} className="text-emerald-500" />
                  </h2>
                  <p className="text-slate-600 font-bold mb-2">Frontend React Developer | UI/UX Enthusiast</p>
                  <p className="text-slate-500 text-sm font-medium flex items-center gap-1">
                    <MapPin size={14} /> Hyderabad, India • Ready to relocate
                  </p>
                </div>
                <button onClick={() => setActiveModal('download-resume')} className="px-5 py-2.5 bg-[#C9A227] hover:bg-[#b08d22] text-[#0d1635] font-bold rounded-xl shadow-md transition-colors text-sm flex items-center gap-2">
                  <Download size={16} /> Download Resume
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 className="font-black text-slate-800 mb-3 flex items-center gap-2"><User size={16} /> About Me</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Passionate frontend developer with 2+ years of experience building scalable web applications. 
                  Strong focus on React, Next.js, and modern CSS frameworks like Tailwind. Always eager to learn new technologies and contribute to open-source projects.
                </p>
              </div>
            </div>
          </AnimatedContent>

          <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><Briefcase size={20} className="text-[#1B2A6B]"/> Experience</h3>
              <button onClick={() => setActiveModal('add-experience')} className="text-[#1B2A6B] hover:bg-slate-100 p-2 rounded-lg transition-colors"><Plus size={18}/></button>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">SDE Intern</h4>
                  <p className="text-sm font-semibold text-slate-600 mb-1">TechFlow Innovations</p>
                  <p className="text-xs text-slate-400 font-medium mb-2">Jan 2024 - Present • Remote</p>
                  <p className="text-sm text-slate-600 font-medium">Developed and maintained responsive user interfaces using React and Tailwind CSS. Improved page load times by 25%.</p>
                </div>
              </div>
            </div>
          </AnimatedContent>

          <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><GraduationCap size={20} className="text-[#1B2A6B]"/> Education</h3>
              <button onClick={() => setActiveModal('add-education')} className="text-[#1B2A6B] hover:bg-slate-100 p-2 rounded-lg transition-colors"><Plus size={18}/></button>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">B.Tech in Computer Science</h4>
                  <p className="text-sm font-semibold text-slate-600 mb-1">Indian Institute of Technology (IIT), Hyderabad</p>
                  <p className="text-xs text-slate-400 font-medium mb-2">2021 - 2025 • CGPA: 8.9</p>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>

        {/* Right Col - Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <AnimatedContent direction="up" delay={0.4} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-slate-800">Skills</h3>
              <button onClick={() => setActiveModal('edit-skills')} className="text-[#1B2A6B] hover:bg-slate-100 p-1.5 rounded-lg transition-colors"><Edit2 size={14}/></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Figma', 'Git'].map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </AnimatedContent>

          <AnimatedContent direction="up" delay={0.5} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-black text-slate-800 mb-4">Social Links</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-[#1B2A6B] hover:bg-slate-50 transition-colors group">
                <Github size={20} className="text-slate-600 group-hover:text-[#1B2A6B]" />
                <div>
                  <p className="text-xs font-bold text-slate-800">GitHub</p>
                  <p className="text-[10px] font-medium text-slate-500">github.com/arjunreddy</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-[#1B2A6B] hover:bg-slate-50 transition-colors group">
                <Linkedin size={20} className="text-slate-600 group-hover:text-[#1B2A6B]" />
                <div>
                  <p className="text-xs font-bold text-slate-800">LinkedIn</p>
                  <p className="text-[10px] font-medium text-slate-500">linkedin.com/in/arjunreddy</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-[#1B2A6B] hover:bg-slate-50 transition-colors group">
                <Globe size={20} className="text-slate-600 group-hover:text-[#1B2A6B]" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Portfolio</p>
                  <p className="text-[10px] font-medium text-slate-500">arjunreddy.dev</p>
                </div>
              </a>
            </div>
          </AnimatedContent>
        </div>
      </div>

      {/* Unified Modal Rendering */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={closeModal} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-md z-10 relative overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-lg font-black text-[#0d1635]">
                  {activeModal === 'download-resume' ? 'Download Resume' :
                   activeModal === 'add-experience' ? 'Add Experience' :
                   activeModal === 'add-education' ? 'Add Education' :
                   activeModal === 'edit-skills' ? 'Edit Skills' :
                   'Edit Profile'}
                </h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
              </div>
              <div className="p-6 space-y-4">
                
                {activeModal === 'download-resume' && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download size={28} />
                    </div>
                    <p className="text-sm font-medium text-slate-600 mb-6">Choose a format to download your resume.</p>
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => { toast.success('Downloading PDF...'); closeModal(); }} className="px-6 py-2.5 bg-[#1B2A6B] text-white font-bold rounded-xl hover:bg-[#0d1635] transition-colors">PDF Format</button>
                      <button onClick={() => { toast.success('Downloading DOCX...'); closeModal(); }} className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">DOCX Format</button>
                    </div>
                  </div>
                )}

                {(activeModal === 'add-experience' || activeModal === 'add-education') && (
                  <form onSubmit={(e) => { e.preventDefault(); toast.success('Saved successfully!'); closeModal(); }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">{activeModal === 'add-experience' ? 'Job Title' : 'Degree/Course'}</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B2A6B]" placeholder={activeModal === 'add-experience' ? 'e.g. Software Engineer' : 'e.g. B.Tech in CS'} required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">{activeModal === 'add-experience' ? 'Company' : 'Institution'}</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B2A6B]" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Start Date</label>
                        <input type="month" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B2A6B]" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">End Date</label>
                        <input type="month" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B2A6B]" />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-3 mt-2 bg-[#1B2A6B] hover:bg-[#0d1635] text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                      <Save size={16} /> Save Details
                    </button>
                  </form>
                )}

                {activeModal === 'edit-skills' && (
                  <form onSubmit={(e) => { e.preventDefault(); toast.success('Skills updated!'); closeModal(); }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Add Skills (comma separated)</label>
                      <textarea className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B2A6B] min-h-[100px]" defaultValue="React, Next.js, TypeScript, Tailwind CSS, Node.js, Figma, Git" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#1B2A6B] hover:bg-[#0d1635] text-white text-sm font-bold rounded-xl transition-colors">
                      Update Skills
                    </button>
                  </form>
                )}

                {activeModal === 'edit-profile' && (
                  <form onSubmit={(e) => { e.preventDefault(); toast.success('Profile updated!'); closeModal(); }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B2A6B]" defaultValue="Arjun Reddy" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Headline</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B2A6B]" defaultValue="Frontend React Developer | UI/UX Enthusiast" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">About Me</label>
                      <textarea className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B2A6B] min-h-[100px]" defaultValue="Passionate frontend developer with 2+ years of experience..." />
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#1B2A6B] hover:bg-[#0d1635] text-white text-sm font-bold rounded-xl transition-colors">
                      Save Changes
                    </button>
                  </form>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </JobseekerDashboardLayout>
  );
}
