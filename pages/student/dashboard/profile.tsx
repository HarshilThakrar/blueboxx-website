import { DashboardLayout } from "../../../src/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../../src/components/ui/Card";
import { Button } from "../../../src/components/ui/Button";
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Link as LinkIcon, FileText, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../../src/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800">My Profile</h1>
            <p className="text-sm font-semibold text-slate-500">Manage your personal information and resume.</p>
          </div>
          <Button className="bg-[#1B2A6B] hover:bg-[#0d1635] text-white font-bold rounded-xl px-6 h-11">
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Basic Info */}
          <div className="space-y-6">
            <Card className="bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden relative group">
              <div className="h-24 bg-gradient-to-r from-[#0d1635] to-[#1B2A6B]"></div>
              <CardContent className="px-6 pb-6 pt-0 relative">
                <div className="w-20 h-20 bg-white rounded-full p-1 -mt-10 mb-4 border-2 border-slate-100 shadow-sm relative">
                  <img src={user?.avatar || "https://i.pravatar.cc/150"} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                
                <h2 className="text-xl font-black text-slate-800">{user?.name || "Student User"}</h2>
                <p className="text-xs font-semibold text-slate-500 mb-4">Frontend Developer | UI/UX Enthusiast</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail size={16} className="text-slate-400" /> student@example.com
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone size={16} className="text-slate-400" /> +91 98765 43210
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin size={16} className="text-slate-400" /> Mumbai, India
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-extrabold text-slate-800">Portfolio Links</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {[
                  { label: "LinkedIn", url: "linkedin.com/in/student", icon: LinkIcon, color: "text-blue-600 bg-blue-50" },
                  { label: "GitHub", url: "github.com/student", icon: LinkIcon, color: "text-slate-800 bg-slate-100" },
                  { label: "Portfolio", url: "student.dev", icon: LinkIcon, color: "text-purple-600 bg-purple-50" },
                ].map((link, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${link.color}`}>
                      <link.icon size={14} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">{link.label}</p>
                      <p className="text-sm font-semibold text-[#1B2A6B] truncate hover:underline">{link.url}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            
            <Card className="bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-extrabold text-slate-800">Resume & Skills</CardTitle>
                <Button variant="outline" className="border-[#1B2A6B]/20 text-[#1B2A6B] h-8 text-[11px] font-extrabold uppercase tracking-wider rounded-lg px-4 gap-1.5 hover:bg-blue-50">
                  <FileText size={14} /> Upload Resume
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-8">
                  <h3 className="text-sm font-extrabold text-slate-800 mb-3 flex items-center gap-2">
                    <Briefcase size={16} className="text-[#C9A227]" /> Top Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "UI/UX Design", "Figma"].map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:border-[#1B2A6B] hover:text-[#1B2A6B] transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                    <GraduationCap size={16} className="text-blue-600" /> Education
                  </h3>
                  <div className="relative pl-6 border-l-2 border-slate-100 space-y-6">
                    <div className="relative">
                      <span className="absolute -left-[31px] w-4 h-4 bg-white border-2 border-blue-500 rounded-full"></span>
                      <h4 className="font-extrabold text-sm text-slate-800">B.Tech in Computer Science</h4>
                      <p className="text-xs font-semibold text-slate-500">University of Technology • 2022 - 2026</p>
                      <p className="text-xs text-slate-600 mt-2">Currently in 3rd year. Specialized in Web Technologies and Data Structures.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Certifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50">
                      <h4 className="font-bold text-sm text-slate-800 mb-1">Frontend Developer Certificate</h4>
                      <p className="text-xs text-slate-500 mb-3">BlueBoxx • Issued Oct 2026</p>
                      <a href="#" className="text-[11px] font-extrabold text-[#1B2A6B] uppercase tracking-wider hover:underline">View Credential</a>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
