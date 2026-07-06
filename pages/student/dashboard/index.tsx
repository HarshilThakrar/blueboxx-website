import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { StudentDashboardLayout } from "../../../src/layout/StudentDashboardLayout";
import { BookOpen, Calendar, Trophy, Briefcase, ChevronRight, CheckCircle2, PlayCircle, FileEdit, ArrowRight, Bell, Star, Upload, X } from "lucide-react";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { useAuth } from "../../../src/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { OnboardingTour } from "../../../src/components/OnboardingTour";

const ACTIVE_COURSES = [
  { id: "react", title: "Advanced React Patterns", module: "Module 4: Context API & State Machines", category: "Web Dev", progress: 65, lessons: 18, done: 12, thumb: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop" },
  { id: "design", title: "UI/UX Design Masterclass", module: "Module 2: Wireframing with Figma", category: "Design", progress: 30, lessons: 24, done: 7, thumb: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop" },
];

const APPLICATIONS = [
  { id: 1, role: "Frontend Developer Intern", company: "Google India", status: "interview", statusColor: "bg-purple-50 text-purple-700", appliedDate: "2 days ago" },
  { id: 2, role: "UI/UX Designer", company: "Microsoft", status: "In Review", statusColor: "bg-amber-50 text-amber-700", appliedDate: "1 week ago" },
  { id: 3, role: "Backend Developer Intern", company: "Razorpay", status: "Applied", statusColor: "bg-blue-50 text-blue-700", appliedDate: "Today" },
];

const UPCOMING_CLASSES = [
  { title: "React Context API Deep Dive", course: "Advanced React Patterns", date: "Today", time: "4:00 PM" },
  { title: "Wireframing with Figma", course: "UI/UX Design Masterclass", date: "Jul 7", time: "6:00 PM" },
];

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const firstName = user?.name?.split(" ")[0] ?? "Student";
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("bb_student_tour_done");
    if (!hasSeen) {
      setTimeout(() => setShowTour(true), 800);
    }
  }, []);

  const handleTourComplete = () => {
    localStorage.setItem("bb_student_tour_done", "1");
    setShowTour(false);
  };

  const TOUR_STEPS = [
    {
      target: "#stat-courses",
      title: "Your Courses 📚",
      description: "This shows your active courses. Click to jump into your learning library.",
      position: "bottom" as const,
    },
    {
      target: "#stat-applications",
      title: "Your Applications 💼",
      description: "Track all your internship and job applications here in real time.",
      position: "bottom" as const,
    },
    {
      target: "#stat-certificates",
      title: "Your Certificates 🏆",
      description: "Completed a course? Download and share your certificates from here.",
      position: "bottom" as const,
    },
    {
      target: "#resume-btn",
      title: "Build Your Resume ✨",
      description: "Use our AI-powered resume builder to create a job-ready resume in minutes.",
      position: "bottom" as const,
    },
  ];

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      toast.success(`Resume "${e.target.files[0].name}" uploaded successfully!`);
      setIsResumeModalOpen(false);
    }
  };

  return (
    <StudentDashboardLayout>
      {/* Welcome header */}
      <AnimatedContent direction="up" delay={0.05}>
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 mb-1">Welcome back, {firstName}! 👋</h1>
            <p className="text-slate-500 font-medium text-sm">Here's what's happening with your courses and applications today.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIsResumeModalOpen(true)} className="px-5 py-2.5 bg-white border border-slate-200 text-[#0d1635] rounded-xl text-sm font-black shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 shrink-0">
              <Upload size={16} /> Upload Resume
            </button>
            <Link
              id="resume-btn"
              href="/student/resume-builder"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A227] text-[#0d1635] font-black rounded-xl hover:bg-[#d8b02c] transition-all shadow-md text-sm shrink-0"
            >
              <FileEdit size={16} /> Build Resume
            </Link>
          </div>
        </div>
      </AnimatedContent>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { id: "stat-courses", label: "Courses in Progress", value: "2", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50", href: "/student/courses" },
          { id: "stat-completed", label: "Completed Courses", value: "2", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", href: "/student/courses" },
          { id: "stat-applications", label: "Active Applications", value: "3", icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50", href: "/student/applications" },
          { id: "stat-certificates", label: "Certificates Earned", value: "4", icon: Trophy, color: "text-amber-600", bg: "bg-amber-50", href: "/student/certificates" },
        ].map((stat, i) => (
          <AnimatedContent key={i} direction="up" delay={i * 0.08}>
            <Link
              id={stat.id}
              href={stat.href}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col items-center text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 block"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg} ${stat.color} mb-3`}>
                <stat.icon size={18} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-1">{stat.value}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </Link>
          </AnimatedContent>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Courses + Classes */}
        <div className="lg:col-span-2 space-y-6">

          {/* Continue Learning */}
          <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                <BookOpen size={17} className="text-[#1B2A6B]" /> Continue Learning
              </h2>
              <Link href="/student/courses" className="text-xs font-bold text-[#1B2A6B] hover:underline flex items-center gap-1">
                View All <ChevronRight size={13} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {ACTIVE_COURSES.map((course) => (
                <div key={course.id} className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-slate-50/30 transition-colors">
                  <div className="w-full sm:w-32 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src={course.thumb} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">{course.category}</span>
                    <h3 className="font-black text-slate-800 text-sm mt-1 mb-0.5">{course.title}</h3>
                    <p className="text-xs text-slate-400 font-semibold mb-2">{course.module}</p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1">
                      <div className="bg-[#1B2A6B] h-full rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400">{course.progress}% · {course.done}/{course.lessons} Lessons</p>
                  </div>
                  <Link
                    href={`/student/learn/${course.id}`}
                    className="flex items-center gap-2 px-5 py-2 bg-[#1B2A6B] text-white text-sm font-bold rounded-xl hover:bg-[#0d1635] transition-colors shrink-0"
                  >
                    <PlayCircle size={14} /> Resume
                  </Link>
                </div>
              ))}
            </div>
          </AnimatedContent>

          {/* Upcoming Live Classes */}
          <AnimatedContent direction="up" delay={0.4} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                <Calendar size={17} className="text-[#1B2A6B]" /> Upcoming Classes
              </h2>
              <Link href="/student/classes" className="text-xs font-bold text-[#1B2A6B] hover:underline flex items-center gap-1">
                View All <ChevronRight size={13} />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {UPCOMING_CLASSES.map((cls, i) => (
                <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#1B2A6B]/10 flex items-center justify-center shrink-0">
                    <Calendar size={17} className="text-[#1B2A6B]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-800 truncate">{cls.title}</p>
                    <p className="text-xs text-slate-400 font-semibold">{cls.course}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-slate-700">{cls.date}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{cls.time}</p>
                  </div>
                  <Link href="/student/classes" className="px-3 py-1.5 bg-[#1B2A6B] text-white text-[10px] font-black rounded-lg hover:bg-[#0d1635] transition-colors">
                    Join
                  </Link>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>

        {/* Right: Applications + Quick Links */}
        <div className="space-y-6">

          {/* Applications */}
          <AnimatedContent direction="up" delay={0.5} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-sm font-black text-slate-800 flex items-center gap-2">
                <Briefcase size={15} className="text-[#1B2A6B]" /> Applications
              </h2>
              <Link href="/student/applications" className="text-xs font-bold text-[#1B2A6B] hover:underline flex items-center gap-1">
                View All <ChevronRight size={13} />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {APPLICATIONS.map((app) => (
                <Link key={app.id} href="/student/applications" className="p-4 flex items-center gap-3 hover:bg-slate-50/50 transition-colors block">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1B2A6B] to-[#2E45A3] text-white font-black text-xs flex items-center justify-center shrink-0">
                    {app.company[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-slate-800 truncate">{app.role}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{app.company} · {app.appliedDate}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-black rounded-full shrink-0 ${app.statusColor}`}>{app.status}</span>
                </Link>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100">
              <Link
                href="/student/internships"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1B2A6B] text-white text-xs font-black rounded-xl hover:bg-[#0d1635] transition-colors"
              >
                Apply Now <ArrowRight size={13} />
              </Link>
            </div>
          </AnimatedContent>

          {/* Quick Actions */}
          <AnimatedContent direction="up" delay={0.6} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-black text-slate-800 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "View Certificates", desc: "Download your achievements", href: "/student/certificates", icon: Trophy, color: "text-amber-600 bg-amber-50" },
                { label: "Get Help", desc: "Contact support", href: "/student/support", icon: Bell, color: "text-emerald-600 bg-emerald-50" },
              ].map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${action.color}`}>
                    <action.icon size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800">{action.label}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{action.desc}</p>
                  </div>
                  <ChevronRight size={13} className="ml-auto text-slate-300" />
                </Link>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </div>

      {/* Resume Upload Modal */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsResumeModalOpen(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md z-10 relative overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-lg font-black text-[#0d1635] flex items-center gap-2"><Upload size={18} className="text-[#1B2A6B]"/> Upload Resume</h3>
                <button onClick={() => setIsResumeModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
              </div>
              <div className="p-6">
                <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-[#1B2A6B] transition-colors group">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-700 mb-1">Click to browse or drag file here</p>
                  <p className="text-xs text-slate-500 font-medium">Supports PDF, DOCX (Max 5MB)</p>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
                </label>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* First-Time Onboarding Tour */}
      {showTour && (
        <OnboardingTour
          steps={TOUR_STEPS}
          onComplete={handleTourComplete}
          onSkip={handleTourComplete}
        />
      )}
    </StudentDashboardLayout>
  );
}
