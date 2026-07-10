import React, { useState } from 'react';
import { MainLayout } from '../../src/layout/MainLayout';
import { motion } from 'framer-motion';
import { Trophy, Code, Palette, Brain, Calendar, ArrowRight, CheckCircle2, MapPin, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ScholarshipsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '1st Year',
    domain: 'Software Engineering',
    skills: '',
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Save to local storage for Admin Dashboard
      const existing = JSON.parse(localStorage.getItem('bb_scholarship_applications') || '[]');
      const application = {
        ...formData,
        id: `SCH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        status: 'Pending Review',
        appliedAt: new Date().toISOString()
      };
      localStorage.setItem('bb_scholarship_applications', JSON.stringify([...existing, application]));
      
      toast.success('Application submitted successfully! We will contact you soon.');
      setIsSubmitting(false);
      setFormData({
        name: '', email: '', phone: '', college: '', year: '1st Year', domain: 'Software Engineering', skills: '', motivation: ''
      });
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <MainLayout>
      <div className="bg-transparent min-h-screen font-sans">
        
        {/* Hero Section */}
        <section className="bg-[#0d1635] relative pt-10 pb-8 overflow-hidden">
          {/* Premium Grid Background */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
          <motion.div 
            animate={{ 
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-[#C9A227] blur-[150px] pointer-events-none will-change-opacity transform-gpu" 
          />
          
          <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#C9A227] text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-default"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Trophy size={14} />
              </motion.div>
              2026 Talent Drive Active
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-md"
            >
              Scholarships & <br className="hidden md:block" /> <span className="text-[#C9A227] inline-block">Talent Challenges</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-8"
            >
              We are on a mission to discover the next generation of tech leaders and creative visionaries. Compete in our skill-based challenges to win massive scholarships, cash prizes, and guaranteed placements.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <button 
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#C9A227] hover:bg-amber-500 text-[#0d1635] font-bold text-base py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(201,162,39,0.2)] flex items-center gap-2 hover:scale-105"
              >
                Apply for Scholarship <ArrowRight size={18} />
              </button>
            </motion.div>

            {/* Countdown */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="mt-12 flex justify-center gap-4 text-center perspective-1000"
            >
              {[
                { label: 'Days', value: '14' },
                { label: 'Hours', value: '08' },
                { label: 'Mins', value: '45' }
              ].map((time, idx, arr) => (
                <React.Fragment key={time.label}>
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: idx * 0.2, ease: "easeInOut" }}
                    whileHover={{ scale: 1.1, rotateY: 10, borderColor: "rgba(201,162,39,0.5)" }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 min-w-[110px] shadow-lg backdrop-blur-sm cursor-default transition-colors duration-300 hover:bg-white/10"
                  >
                    <div className="text-4xl font-black text-white mb-1 drop-shadow-md">{time.value}</div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">{time.label}</div>
                  </motion.div>
                  {idx < arr.length - 1 && (
                    <div className="text-3xl font-black text-white/20 self-center animate-pulse">:</div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-20 bg-transparent">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Active Challenges</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">Participate in one of our specialized tracks to prove your skills.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Code, title: 'CodeMasters Hackathon', desc: 'Build a full-stack SaaS MVP in 48 hours. React, Node.js, and Postgres preferred.', prize: '₹50,000 + Internship', tag: 'Software Engineering' },
                { icon: Brain, title: 'AI Innovators Sprint', desc: 'Develop a unique AI workflow or agent using open-source LLMs to solve a real-world problem.', prize: '₹75,000 + Pro Membership', tag: 'Artificial Intelligence' },
                { icon: Palette, title: 'UI/UX Design Challenge', desc: 'Redesign a clunky government portal into a modern, accessible, high-converting masterpiece.', prize: '₹40,000 + Mentorship', tag: 'Design' }
              ].map((challenge, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -8 }}
                  className="bg-white border border-slate-200 rounded-3xl p-6 relative overflow-hidden shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A227] blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#1B2A6B] mb-5">
                    <challenge.icon size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1B2A6B] bg-indigo-50 px-3 py-1 rounded-full mb-3 inline-block">{challenge.tag}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{challenge.title}</h3>
                  <p className="text-slate-600 text-xs mb-5 leading-relaxed">{challenge.desc}</p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider">Reward</p>
                    <p className="text-slate-900 text-sm font-extrabold">{challenge.prize}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply-form" className="py-20 relative bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1B2A6B] via-[#C9A227] to-[#1B2A6B]" />
              
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Submit Your Application</h2>
                <p className="text-slate-500">Join the elite 1% of talent. We review applications daily.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none transition-all" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none transition-all" placeholder="+91 9876543210" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">College / University</label>
                    <input required type="text" name="college" value={formData.college} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none transition-all" placeholder="e.g. Parul University" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Year of Study</label>
                    <select name="year" value={formData.year} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none">
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>Graduated</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Target Domain</label>
                    <select name="domain" value={formData.domain} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none">
                      <option>Software Engineering</option>
                      <option>Artificial Intelligence</option>
                      <option>UI/UX Design</option>
                      <option>Digital Marketing</option>
                      <option>Game Development</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Top Skills (Comma separated)</label>
                  <input required type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none" placeholder="React, Node.js, Python, Figma..." />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Why do you deserve this scholarship? (Motivation)</label>
                  <textarea required name="motivation" value={formData.motivation} onChange={handleChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none resize-none" placeholder="Tell us about your passion, projects, and goals..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#1B2A6B] hover:bg-indigo-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-lg py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>
    </MainLayout>
  );
}
