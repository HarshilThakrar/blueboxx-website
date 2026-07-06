import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, Users, BookOpen, Briefcase, Settings, LogOut,
  Menu, X, Bell, Search, ShieldCheck, BarChart4, GraduationCap, Building,
  CreditCard, FileText, Activity, TerminalSquare, MessageSquare,
  ChevronRight, Tags, ShieldAlert, Image as ImageIcon,
  Trophy, MonitorPlay, Award, Rss, HelpCircle,
  Gamepad2, MessageCircle, Mail, Smartphone, Archive, Sliders, List,
  Book, UserPlus, ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SIDEBAR_CATEGORIES = [
  {
    title: "Overview",
    links: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Media Manager", href: "/admin/media", icon: ImageIcon },
    ]
  },
  {
    title: "User Manager",
    links: [
      { name: "All Users", href: "/admin/users", icon: Users },
      { name: "Students", href: "/admin/users/students", icon: GraduationCap },
      { name: "Instructors", href: "/admin/users/instructors", icon: Book },
      { name: "Verifications", href: "/admin/verifications", icon: ShieldAlert },
      { name: "Roles & Permissions", href: "/admin/roles", icon: ShieldCheck },
    ]
  },
  {
    title: "Jobs & Internships",
    links: [
      { name: "All Internships", href: "/admin/internships", icon: Briefcase },
      { name: "Jobs Application", href: "/admin/jobs/applications", icon: ClipboardList },
      { name: "Contest", href: "/admin/jobs/contest", icon: Trophy },
      { name: "Add Internship", href: "/admin/internships/add", icon: Activity },
    ]
  },
  {
    title: "Education",
    links: [
      { name: "Courses", href: "/admin/courses", icon: BookOpen },
      { name: "Quiz", href: "/admin/education/quiz", icon: HelpCircle },
      { name: "Virtual Class", href: "/admin/education/virtual-class", icon: MonitorPlay },
      { name: "Zoom", href: "/admin/education/zoom", icon: MonitorPlay },
      { name: "Certificate", href: "/admin/education/certificate", icon: Award },
    ]
  },
  {
    title: "Reports & Analytics",
    links: [
      { name: "Report", href: "/admin/reports", icon: BarChart4 },
      { name: "Enrollment", href: "/admin/reports/enrollment", icon: UserPlus },
      { name: "MCQ Results", href: "/admin/reports/mcq", icon: List },
      { name: "College Enquiries", href: "/admin/reports/enquiries", icon: Building },
    ]
  },
  {
    title: "Content",
    links: [
      { name: "Frontend CMS", href: "/admin/cms", icon: FileText },
      { name: "Blogs", href: "/admin/cms/blogs", icon: Rss },
      { name: "Gamification", href: "/admin/cms/gamification", icon: Gamepad2 },
    ]
  },
  {
    title: "Communication",
    links: [
      { name: "Communications", href: "/admin/communication", icon: MessageCircle },
      { name: "Comments", href: "/admin/communication/comments", icon: MessageSquare },
      { name: "Q&A", href: "/admin/communication/qna", icon: MessageCircle },
    ]
  },
  {
    title: "Administration",
    links: [
      { name: "System Setting", href: "/admin/settings", icon: Settings },
      { name: "Sidebar Manager", href: "/admin/settings/sidebar", icon: Sliders },
      { name: "Appearance", href: "/admin/settings/appearance", icon: ImageIcon },
      { name: "Newsletter", href: "/admin/settings/newsletter", icon: Mail },
      { name: "Notification", href: "/admin/settings/notification", icon: Bell },
      { name: "Push Notification", href: "/admin/settings/push", icon: Smartphone },
      { name: "Utility", href: "/admin/settings/utility", icon: TerminalSquare },
      { name: "Backup", href: "/admin/settings/backup", icon: Archive },
    ]
  }
];

export const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Search Overlay State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Notification State
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "URGENT: Suspicious login attempt blocked from IP 192.168.1.1", time: "10 mins ago", read: false, type: 'critical' },
    { id: 2, text: "SECURITY: Core API keys were rotated by System Root", time: "2 hours ago", read: false, type: 'important' },
    { id: 3, text: "SYSTEM: Automated database backup failed. Manual intervention required.", time: "5 hours ago", read: true, type: 'critical' },
  ]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Keyboard shortcut for Search Command Palette
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

      {/* Admin Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 w-72 bg-[#0d1635] text-slate-300 z-50 flex flex-col transform transition-transform duration-300 lg:translate-x-0 border-r border-white/5 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-20 flex items-center px-6 border-b border-white/10 justify-between lg:justify-start">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all ${isActive
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
          <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-[#C9A227] flex items-center justify-center text-[#0d1635] font-black shadow-inner">
              <ShieldCheck size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white leading-none mb-1 truncate">Admin Profile</p>
              <p className="text-[10px] text-slate-400 font-semibold leading-none truncate">admin@blueboxx.in</p>
            </div>
          </div>
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
                placeholder="Global search (Users, Courses, Invoices)..."
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none w-96 font-medium text-slate-400 cursor-pointer hover:bg-slate-100/50 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">⌘ K</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 mr-4 text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              System Operational
            </div>

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
                        <span className="text-xs font-black text-rose-600 flex items-center gap-1.5"><ShieldAlert size={14} /> Important Alerts</span>
                        {unreadCount > 0 && (
                          <button onClick={markAllRead} className="text-[10px] font-black text-[#1B2A6B] hover:underline">
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                        {notifications.map(notif => (
                          <div key={notif.id} className={`p-4 hover:bg-slate-50 transition-colors flex gap-3 ${!notif.read ? 'bg-rose-50/50' : ''}`}>
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!notif.read ? 'bg-rose-500' : 'bg-slate-300'}`} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-semibold leading-normal ${!notif.read ? 'text-rose-700' : 'text-slate-600'}`}>{notif.text}</p>
                              <p className="text-[10px] text-slate-400 font-bold mt-1">{notif.time}</p>
                            </div>
                          </div>
                        ))}
                        {notifications.length === 0 && (
                          <div className="p-4 text-center text-xs font-bold text-slate-400">
                            No critical alerts at the moment.
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Logout Topbar */}
            <button
              onClick={handleLogout}
              className="relative p-2.5 text-slate-500 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 rounded-xl transition-colors border border-slate-200"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 bg-slate-50/50">
          {children}
        </main>
      </div>

      {/* Global Command Palette / Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden z-50 relative"
            >
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <Search size={20} className="text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type to search modules, users or tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-base font-medium text-slate-800 placeholder-slate-400 outline-none border-none focus:ring-0"
                />
                <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded-lg text-xs font-bold">ESC</button>
              </div>

              <div className="p-4 max-h-96 overflow-y-auto space-y-4">
                {searchQuery ? (
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Search Results</p>
                    <div className="space-y-1">
                      <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">Search for "{searchQuery}" in Users</span>
                        <ChevronRight size={16} className="text-slate-400" />
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">Search for "{searchQuery}" in Courses</span>
                        <ChevronRight size={16} className="text-slate-400" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Quick Navigation</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: "User Directory", href: "/admin/users" },
                          { name: "Payment Logs", href: "/admin/payments" },
                          { name: "Platform Settings", href: "/admin/settings" }
                        ].map(nav => (
                          <button
                            key={nav.name}
                            onClick={() => {
                              router.push(nav.href);
                              setIsSearchOpen(false);
                            }}
                            className="p-3 text-left bg-slate-50 hover:bg-[#1B2A6B]/5 hover:text-[#1B2A6B] rounded-xl text-xs font-bold transition-all"
                          >
                            {nav.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles for Sidebar */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .admin-scrollbar::-webkit-scrollbar { width: 6px; }
        .admin-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .admin-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .admin-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
      `}} />
    </div>
  );
};;
