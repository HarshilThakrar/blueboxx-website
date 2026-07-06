import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Bell, Save, Mail, Smartphone, Globe, CheckCircle2 } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { useState } from "react";

export default function AdminNotificationSettingsPage() {
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
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Notification Rules</h1>
            <p className="text-slate-500 text-sm">Configure automated system notifications across Email, SMS, and Web for all users.</p>
          </div>
          <Button 
            variant={isSaved ? "outline" : "primary"} 
            className={`shadow-md gap-2 ${isSaved ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : ''}`}
            onClick={handleSave}
            disabled={isSaving || isSaved}
          >
            {isSaving ? (
              <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...</span>
            ) : isSaved ? (
              <span className="flex items-center gap-2"><CheckCircle2 size={18}/> Saved</span>
            ) : (
              <span className="flex items-center gap-2"><Save size={18}/> Save Preferences</span>
            )}
          </Button>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                 <Globe size={18} className="text-[#1B2A6B]" /> Student Notifications
              </h2>
           </div>
           
           <div className="p-6">
             <table className="w-full text-left">
                <thead className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                   <tr>
                      <th className="pb-4">Trigger Event</th>
                      <th className="pb-4 text-center w-24">Email</th>
                      <th className="pb-4 text-center w-24">SMS</th>
                      <th className="pb-4 text-center w-24">In-App</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm font-medium text-slate-700">
                   <tr>
                      <td className="py-4">Course Enrollment Confirmation</td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                   </tr>
                   <tr>
                      <td className="py-4">Live Class Reminder (15 mins before)</td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                   </tr>
                   <tr>
                      <td className="py-4">New Job/Internship Posted (matching tags)</td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                      <td className="py-4 text-center"><input type="checkbox" className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                   </tr>
                </tbody>
             </table>
           </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                 <Bell size={18} className="text-[#1B2A6B]" /> Admin Alerts
              </h2>
           </div>
           
           <div className="p-6">
             <table className="w-full text-left">
                <thead className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                   <tr>
                      <th className="pb-4">Trigger Event</th>
                      <th className="pb-4 text-center w-24">Email</th>
                      <th className="pb-4 text-center w-24">SMS</th>
                      <th className="pb-4 text-center w-24">In-App</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm font-medium text-slate-700">
                   <tr>
                      <td className="py-4">New College Enquiry Received</td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                      <td className="py-4 text-center"><input type="checkbox" className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                   </tr>
                   <tr>
                      <td className="py-4">System Backup Failed</td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                      <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-[#1B2A6B] rounded" /></td>
                   </tr>
                </tbody>
             </table>
           </div>
        </AnimatedContent>
      </div>
    </AdminDashboardLayout>
  );
}
