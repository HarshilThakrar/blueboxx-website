import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Mail, Plus, Settings2, Users, FileText, Send, Trash2, X, Save } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { Badge } from "../../../src/components/ui/Badge";
import { useState } from "react";

const INITIAL_CAMPAIGNS = [
  { id: 1, title: "November Tech Roundup", status: "Draft", recipients: "-", sentDate: "-", openRate: "-" },
  { id: 2, title: "New AI Courses Released!", status: "Sent", recipients: "14,500", sentDate: "Oct 25, 2026", openRate: "42.5%" },
  { id: 3, title: "Welcome to BlueBoxx Fall Semester", status: "Sent", recipients: "22,100", sentDate: "Sep 01, 2026", openRate: "58.2%" },
];

export default function AdminNewsletterPage() {
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isSMTPModalOpen, setIsSMTPModalOpen] = useState(false);
  const [newCampaignTitle, setNewCampaignTitle] = useState("");

  const handleDelete = (id: number) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignTitle.trim()) return;
    
    setCampaigns([
      { id: Date.now(), title: newCampaignTitle, status: "Draft", recipients: "-", sentDate: "-", openRate: "-" },
      ...campaigns
    ]);
    setNewCampaignTitle("");
    setIsCampaignModalOpen(false);
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Newsletter Campaigns</h1>
            <p className="text-slate-500 text-sm">Design emails and manage subscriber lists for marketing campaigns.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="gap-2 bg-white text-slate-700 border-slate-200" onClick={() => setIsSMTPModalOpen(true)}>
               <Settings2 size={16}/> SMTP Settings
             </Button>
             <Button variant="primary" className="shadow-md gap-2" onClick={() => setIsCampaignModalOpen(true)}>
               <Plus size={18}/> New Campaign
             </Button>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0"><Users size={24}/></div>
             <div>
               <p className="text-2xl font-black text-slate-800">42,850</p>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Total Subscribers</p>
             </div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0"><Send size={24}/></div>
             <div>
               <p className="text-2xl font-black text-slate-800">125K</p>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Emails Sent (YTD)</p>
             </div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0"><Mail size={24}/></div>
             <div>
               <p className="text-2xl font-black text-slate-800">48.5%</p>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Avg. Open Rate</p>
             </div>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <FileText size={18} className="text-[#1B2A6B]" /> Recent Campaigns
             </h2>
          </div>
          
          <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-white border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                 <tr>
                   <th className="px-6 py-4">Campaign Title</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4">Recipients</th>
                   <th className="px-6 py-4">Sent Date</th>
                   <th className="px-6 py-4">Open Rate</th>
                   <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 text-sm">
                 {campaigns.map((camp) => (
                   <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors">
                     <td className="px-6 py-4 font-bold text-slate-900">{camp.title}</td>
                     <td className="px-6 py-4">
                        <Badge variant={camp.status === 'Sent' ? 'success' : 'secondary'}>{camp.status}</Badge>
                     </td>
                     <td className="px-6 py-4 font-semibold text-slate-600">{camp.recipients}</td>
                     <td className="px-6 py-4 text-slate-500">{camp.sentDate}</td>
                     <td className="px-6 py-4 font-bold text-[#1B2A6B]">{camp.openRate}</td>
                     <td className="px-6 py-4 text-right">
                        <Button variant="outline" onClick={() => handleDelete(camp.id)} className="h-8 text-xs font-bold gap-1.5 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"><Trash2 size={14}/> Delete</Button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </AnimatedContent>
      </div>

      {isCampaignModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AnimatedContent direction="up" className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-blue-50/50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Plus size={20} className="text-[#1B2A6B]" /> Create Campaign</h2>
              <button onClick={() => setIsCampaignModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddCampaign} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campaign Title</label>
                <input 
                  required
                  type="text" 
                  value={newCampaignTitle}
                  onChange={(e) => setNewCampaignTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none" 
                  placeholder="e.g. End of Year Sale" 
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsCampaignModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" className="flex-1 shadow-md gap-2"><Send size={16}/> Draft Campaign</Button>
              </div>
            </form>
          </AnimatedContent>
        </div>
      )}

      {isSMTPModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AnimatedContent direction="up" className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Settings2 size={20} className="text-[#1B2A6B]" /> SMTP Settings</h2>
              <button onClick={() => setIsSMTPModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Host</label>
                  <input type="text" defaultValue="smtp.sendgrid.net" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Port</label>
                  <input type="text" defaultValue="587" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Username</label>
                <input type="text" defaultValue="apikey" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <input type="password" defaultValue="************************" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">From Email</label>
                <input type="email" defaultValue="hello@blueboxx.in" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none" />
              </div>

              <div className="pt-4 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsSMTPModalOpen(false)}>Cancel</Button>
                <Button variant="primary" className="flex-1 shadow-md gap-2" onClick={() => setIsSMTPModalOpen(false)}><Save size={16}/> Save Settings</Button>
              </div>
            </div>
          </AnimatedContent>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
