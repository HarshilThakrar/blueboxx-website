import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { MainLayout } from "./MainLayout";
import { 
  LayoutDashboard, Users, GraduationCap, Building2, BookOpen, 
  DollarSign, CheckSquare, Settings, LogOut, ChevronRight, ShieldAlert
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const sidebarLinks = [
  { group: "Platform", items: [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Revenue", href: "/admin/revenue", icon: DollarSign },
  ]},
  { group: "Users", items: [
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Mentors", href: "/admin/mentors", icon: GraduationCap },
    { name: "Companies", href: "/admin/companies", icon: Building2 },
  ]},
  { group: "Content", items: [
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Approvals", href: "/admin/approvals", icon: CheckSquare },
  ]},
  { group: "System", items: [
    { name: "Security", href: "/admin/security", icon: ShieldAlert },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]}
];

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-50 pt-[72px] md:pt-[80px]">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
              <div className="bg-[#0d1635] text-white rounded-3xl shadow-[0_8px_30px_rgba(13,22,53,0.12)] overflow-hidden sticky top-28">
                {/* Admin Profile Summary */}
                <div className="p-5 border-b border-white/10 flex items-center gap-4 bg-[#1B2A6B]">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A227] to-amber-600 flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-[#C9A227]">
                      BB
                    </div>
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-sm leading-tight">Super Admin</div>
                    <div className="text-[10px] font-bold text-[#C9A227] uppercase tracking-wider mt-0.5">System Owner</div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar bg-[#0d1635]">
                  {sidebarLinks.map((group, gIdx) => (
                    <div key={gIdx} className="p-4 border-b border-white/5 last:border-0">
                      <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 px-2">
                        {group.group}
                      </div>
                      <nav className="space-y-1">
                        {group.items.map((link) => {
                          const isActive = router.pathname === link.href;
                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              className={cn(
                                "flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all group relative overflow-hidden",
                                isActive 
                                  ? "text-[#0d1635] bg-[#C9A227]" 
                                  : "text-slate-300 hover:bg-white/10 hover:text-white"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <link.icon size={16} className={cn("transition-colors relative z-10", isActive ? "text-[#0d1635]" : "text-slate-400 group-hover:text-white")} />
                                <span className="relative z-10">{link.name}</span>
                              </div>
                              {isActive && <ChevronRight size={14} className="text-[#0d1635] relative z-10" />}
                            </Link>
                          );
                        })}
                      </nav>
                    </div>
                  ))}
                </div>

                {/* Logout Button */}
                <div className="p-4 border-t border-white/10 bg-[#0d1635]">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all shadow-sm border border-transparent"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {children}
              </motion.div>
            </main>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};
