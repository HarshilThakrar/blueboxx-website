import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Video, Key, Link as LinkIcon, CheckCircle2, ShieldAlert, Save } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { useState } from "react";

export default function AdminZoomIntegrationPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Zoom Integration</h1>
            <p className="text-slate-500 text-sm">Manage your Zoom API credentials to automatically schedule and host live classes.</p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg shrink-0 mt-0.5"><CheckCircle2 size={24}/></div>
            <div>
              <h3 className="font-bold text-emerald-800 text-lg mb-1">Status: Connected</h3>
              <p className="text-sm text-emerald-700 font-medium">Your platform is successfully authenticated with Zoom. You can auto-generate meeting links.</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg shrink-0 mt-0.5"><ShieldAlert size={24}/></div>
            <div>
              <h3 className="font-bold text-amber-800 text-lg mb-1">API Limits</h3>
              <p className="text-sm text-amber-700 font-medium">You have used 85% of your daily Zoom API quota (85/100 requests).</p>
            </div>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Key size={18} className="text-[#1B2A6B]" /> API Credentials
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="space-y-4 max-w-2xl">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Zoom Account Email</label>
                <input 
                  type="email" 
                  defaultValue="admin@blueboxx.in"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Zoom API Key (Client ID)</label>
                <input 
                  type="password" 
                  defaultValue="************************"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Zoom API Secret (Client Secret)</label>
                <input 
                  type="password" 
                  defaultValue="************************"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                />
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <Button 
                  variant={isSaved ? "outline" : "primary"} 
                  className={`gap-2 shadow-md ${isSaved ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : ''}`}
                  onClick={handleSave}
                  disabled={isSaving || isSaved}
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...</span>
                  ) : isSaved ? (
                    <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Saved</span>
                  ) : (
                    <span className="flex items-center gap-2"><Save size={16}/> Save Configuration</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.4} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Video size={18} className="text-[#1B2A6B]" /> Global Meeting Settings
            </h2>
          </div>
          
          <div className="p-6 space-y-4">
             <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
               <input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded focus:ring-[#1B2A6B]" />
               <div>
                 <p className="font-bold text-sm text-slate-800">Auto-record to Cloud</p>
                 <p className="text-xs text-slate-500 font-medium mt-0.5">Automatically record all meetings to Zoom Cloud.</p>
               </div>
             </label>
             <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
               <input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded focus:ring-[#1B2A6B]" />
               <div>
                 <p className="font-bold text-sm text-slate-800">Mute participants upon entry</p>
                 <p className="text-xs text-slate-500 font-medium mt-0.5">Prevent background noise when students join.</p>
               </div>
             </label>
             <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
               <input type="checkbox" className="w-4 h-4 text-[#1B2A6B] rounded focus:ring-[#1B2A6B]" />
               <div>
                 <p className="font-bold text-sm text-slate-800">Require Authentication</p>
                 <p className="text-xs text-slate-500 font-medium mt-0.5">Only allow signed-in users to join the meetings.</p>
               </div>
             </label>
          </div>
        </AnimatedContent>

      </div>
    </AdminDashboardLayout>
  );
}
