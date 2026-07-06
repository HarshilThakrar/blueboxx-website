import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, Briefcase, Settings, LogOut,
  Menu, X, Bell, Search, Building, Users, Clock,
  FileText, MessageSquare, Plus, Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompanyStore } from "../store/useCompanyStore";

const SIDEBAR_CATEGORIES = [
  {
    title: "Overview",
    links: [
      { name: "Dashboard", href: "/company/dashboard", icon: LayoutDashboard },
    ]
  },
  {
    title: "Recruitment",
    links: [
      { name: "My Jobs", href: "/company/jobs", icon: Briefcase },
      { name: "Post a Job", href: "/company/jobs/new", icon: Plus },
      { name: "Applicants", href: "/company/applicants", icon: Users },
      { name: "Interviews", href: "/company/interviews", icon: Clock },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "Company Profile", href: "/company/profile", icon: Building },
      { name: "Analytics", href: "/company/analytics", icon: Activity },
    ]
  },
  {
    title: "Account",
    links: [
      { name: "Settings", href: "/company/settings", icon: Settings },
      { name: "Support", href: "/company/support", icon: MessageSquare },
    ]
  }
];

export const CompanyDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { logout } = useAuth();
  const profile = useCompanyStore(s => s.profile);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New applicant for 'Frontend Developer' role.", time: "10 mins ago", read: false },
    { id: 2, text: "Jane Doe accepted the interview invitation.", time: "1 hour ago", read: false },
  ]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsNotifOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Company Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 w-72 bg-[#0d1635] text-slate-300 z-50 flex flex-col transform transition-transform duration-300 lg:translate-x-0 border-r border-white/5 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-20 flex items-center px-6 border-b border-white/10 justify-between lg:justify-start">
          <Link href="/company/dashboard" className="flex items-center gap-3">
            <img src="/logowhite.png" alt="BlueBoxx DA" className="h-8 w-auto object-contain" />
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 admin-scrollbar pb-24">
          {SIDEBAR_CATEGORIES.map((category, idx) => (
            <div key={idx}>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-3">
                {category.title}
              </p>
              <div className="space-y-1">
                {category.links.map((link) => {
                  const isActive = router.pathname === link.href || router.pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        isActive 
                          ? "bg-[#C9A227] text-[#0d1635] shadow-lg shadow-[#C9A227]/20" 
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <link.icon size={18} className={isActive ? "text-[#0d1635]" : "text-slate-500"} />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 bg-[#0d1635] shrink-0">
          <Link href="/company/profile" className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#0d1635] font-black shadow-inner overflow-hidden border-2 border-transparent group-hover:border-[#C9A227] transition-all shrink-0">
              {profile.logo ? (
                <img src={profile.logo} className="w-full h-full object-cover" alt="Company Logo" />
              ) : (
                <Building size={20} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white leading-none mb-1 truncate group-hover:text-[#C9A227] transition-colors">{profile.name || "Company"}</p>
              <p className="text-[10px] text-slate-400 font-semibold leading-none truncate">HR Team</p>
            </div>
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl font-bold transition-all text-xs"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72 min-h-screen">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-900 bg-slate-50 p-2 rounded-lg">
              <Menu size={24} />
            </button>
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex relative group cursor-pointer"
            >
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                readOnly
                placeholder="Search candidates, roles..." 
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none w-96 font-medium text-slate-400 cursor-pointer hover:bg-slate-100/50 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">⌘ K</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/company/jobs/new" className="hidden sm:flex items-center gap-2 bg-[#1B2A6B] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0d1635] transition-colors">
              <Plus size={16} /> Post Job
            </Link>

            {/* Notification Area */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2.5 text-slate-500 hover:text-[#1B2A6B] bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              <AnimatePresence>
                {isNotifOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsNotifOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-40 py-2 overflow-hidden text-left"
                    >
                      <div className="px-4 py-2.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <span className="text-xs font-black text-slate-600">Notifications</span>
                        {unreadCount > 0 && (
                          <button onClick={markAllRead} className="text-[10px] font-black text-[#3b82f6] hover:underline">
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                        {notifications.map(notif => (
                          <div key={notif.id} className={`p-4 hover:bg-slate-50 transition-colors flex gap-3 ${!notif.read ? 'bg-blue-50/50' : ''}`}>
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!notif.read ? 'bg-blue-500' : 'bg-slate-300'}`} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-semibold leading-normal ${!notif.read ? 'text-slate-800' : 'text-slate-600'}`}>{notif.text}</p>
                              <p className="text-[10px] text-slate-400 font-bold mt-1">{notif.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 bg-slate-50/50">
          {children}
        </main>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .admin-scrollbar::-webkit-scrollbar { width: 6px; }
        .admin-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .admin-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .admin-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
      `}} />
    </div>
  );
};
