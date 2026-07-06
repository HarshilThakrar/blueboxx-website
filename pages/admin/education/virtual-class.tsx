import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { MonitorPlay, Plus, Video, Calendar as CalendarIcon, Clock, Users, Link as LinkIcon, MoreVertical, X } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { Badge } from "../../../src/components/ui/Badge";
import { Card, CardContent } from "../../../src/components/ui/Card";
import { useState } from "react";
import toast from "react-hot-toast";

const INITIAL_CLASSES = [
  { id: 1, title: "Introduction to React Hooks", course: "Frontend Web Development", instructor: "Ankit Sharma", date: "Nov 10, 2026", time: "10:00 AM", duration: "1.5 Hrs", platform: "Zoom", status: "Scheduled", link: "https://zoom.us/j/123456789" },
  { id: 2, title: "Neural Networks Deep Dive", course: "AI/ML Basic (Python)", instructor: "Dr. Vikram Singh", date: "Nov 12, 2026", time: "02:00 PM", duration: "2 Hrs", platform: "Google Meet", status: "Scheduled", link: "https://meet.google.com/abc-defg-hij" },
  { id: 3, title: "Figma Prototyping Workshop", course: "Advanced Figma Pro", instructor: "Sarah Tech", date: "Nov 05, 2026", time: "11:00 AM", duration: "1 Hr", platform: "Zoom", status: "Completed", link: "#" },
];

export default function AdminVirtualClassPage() {
  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClassData, setNewClassData] = useState({ title: "", platform: "Zoom" });
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassData.title.trim()) return;

    setClasses([
      { id: Date.now(), title: newClassData.title, course: "General Discussion", instructor: "Admin", date: "TBD", time: "TBD", duration: "1 Hr", platform: newClassData.platform, status: "Scheduled", link: "https://zoom.us/j/12345" },
      ...classes
    ]);
    setIsModalOpen(false);
    setNewClassData({ title: "", platform: "Zoom" });
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Virtual Classes</h1>
            <p className="text-slate-500 text-sm">Schedule and manage live video sessions for your courses.</p>
          </div>
          <Button variant="primary" className="shadow-md gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus size={18}/> Schedule Live Class
          </Button>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0"><CalendarIcon size={24}/></div>
             <div>
               <p className="text-2xl font-black text-slate-800">24</p>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Classes This Month</p>
             </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0"><Users size={24}/></div>
             <div>
               <p className="text-2xl font-black text-slate-800">1,250</p>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Total Attendees</p>
             </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shrink-0"><Video size={24}/></div>
             <div>
               <p className="text-2xl font-black text-slate-800">2</p>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Live Right Now</p>
             </div>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.3} className="space-y-4">
          {classes.map((cls) => (
            <Card key={cls.id} className="border border-slate-200 shadow-sm overflow-hidden bg-white hover:border-[#1B2A6B]/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${cls.status === 'Completed' ? 'bg-slate-100 text-slate-400' : 'bg-rose-50 text-rose-600 animate-pulse'}`}>
                        <MonitorPlay size={18}/>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{cls.title}</h3>
                      <Badge variant={cls.status === 'Scheduled' ? 'warning' : 'secondary'}>{cls.status}</Badge>
                    </div>
                    <p className="text-sm text-slate-500 font-medium mb-4 pl-12">
                      Course: <strong className="text-slate-800 mr-4">{cls.course}</strong> 
                      Instructor: <strong className="text-slate-800">{cls.instructor}</strong>
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 ml-12">
                      <span className="flex items-center gap-2 text-slate-700"><CalendarIcon size={16} className="text-[#1B2A6B]"/> {cls.date}</span>
                      <span className="flex items-center gap-2 text-slate-700"><Clock size={16} className="text-[#1B2A6B]"/> {cls.time} ({cls.duration})</span>
                      <span className="flex items-center gap-2"><Video size={16} className="text-slate-400"/> Platform: {cls.platform}</span>
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col gap-2 shrink-0 justify-center min-w-[140px]">
                    {cls.status === 'Scheduled' ? (
                      <>
                        <Button variant="primary" className="flex-1 shadow-md gap-2" onClick={() => window.open(cls.link, "_blank")}>
                          <Video size={16}/> Join Class
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 text-slate-600 gap-2 hover:bg-slate-50"
                          onClick={() => {
                            navigator.clipboard.writeText(cls.link);
                            toast.success('Meeting link copied!');
                          }}
                        >
                          <LinkIcon size={16}/> Copy Link
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" className="flex-1 text-slate-600 gap-2 hover:bg-slate-50">
                        View Recording
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </AnimatedContent>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AnimatedContent direction="up" className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Plus size={20} className="text-[#1B2A6B]" /> Schedule Class</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddClass} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Class Title</label>
                <input 
                  required
                  type="text" 
                  value={newClassData.title}
                  onChange={(e) => setNewClassData(prev => ({...prev, title: e.target.value}))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none" 
                  placeholder="e.g. Intro to Node.js" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Platform</label>
                <select
                  value={newClassData.platform}
                  onChange={(e) => setNewClassData(prev => ({...prev, platform: e.target.value}))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                >
                  <option value="Zoom">Zoom</option>
                  <option value="Google Meet">Google Meet</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" className="flex-1 shadow-md gap-2">Schedule</Button>
              </div>
            </form>
          </AnimatedContent>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
