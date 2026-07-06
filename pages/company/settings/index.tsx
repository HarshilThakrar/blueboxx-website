import React, { useState } from "react";
import { CompanyDashboardLayout } from "../../../src/layout/CompanyDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Bell, Lock, Users, CreditCard, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function CompanySettingsPage() {
  const [saving, setSaving] = useState(false);
  
  const [notifs, setNotifs] = useState({
    newApps: true,
    interviews: true,
    weekly: false
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings updated successfully!");
    }, 1000);
  };

  return (
    <CompanyDashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 mb-1">Settings</h1>
        <p className="text-slate-500 font-medium text-sm">Manage your account preferences, team access, and billing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "security", label: "Security", icon: Lock },
            { id: "team", label: "Team Members", icon: Users },
            { id: "billing", label: "Billing", icon: CreditCard },
          ].map((tab, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${i === 0 ? "bg-[#1B2A6B] text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}>
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <AnimatedContent direction="up" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleSave} className="space-y-6">
              
              <h2 className="text-lg font-black text-slate-800 mb-4 border-b border-slate-100 pb-2">Email Notifications</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked={notifs.newApps} onChange={e => setNotifs({...notifs, newApps: e.target.checked})} className="mt-1 w-4 h-4 rounded text-[#1B2A6B] focus:ring-[#1B2A6B]" />
                  <div>
                    <label className="text-sm font-bold text-slate-800">New Applications</label>
                    <p className="text-xs text-slate-500">Get notified when someone applies to your postings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked={notifs.interviews} onChange={e => setNotifs({...notifs, interviews: e.target.checked})} className="mt-1 w-4 h-4 rounded text-[#1B2A6B] focus:ring-[#1B2A6B]" />
                  <div>
                    <label className="text-sm font-bold text-slate-800">Interview Updates</label>
                    <p className="text-xs text-slate-500">Get notified about rescheduled or cancelled interviews.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked={notifs.weekly} onChange={e => setNotifs({...notifs, weekly: e.target.checked})} className="mt-1 w-4 h-4 rounded text-[#1B2A6B] focus:ring-[#1B2A6B]" />
                  <div>
                    <label className="text-sm font-bold text-slate-800">Weekly Reports</label>
                    <p className="text-xs text-slate-500">Receive a weekly summary of your recruitment pipeline.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-[#1B2A6B] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#1B2A6B]/20 hover:bg-[#0d1635] transition-all disabled:opacity-70">
                  {saving ? "Saving..." : <><Save size={16} /> Save Preferences</>}
                </button>
              </div>

            </form>
          </AnimatedContent>
        </div>
      </div>
    </CompanyDashboardLayout>
  );
}
