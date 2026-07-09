import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { Settings, Shield, CreditCard, Mail, Globe, Database, CheckCircle2 } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { useState } from "react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
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
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
            <p className="text-sm text-slate-500 mt-1">Manage global configurations for BlueBoxx.</p>
          </div>
          <Button 
            variant={isSaved ? "outline" : "primary"} 
            className={isSaved ? "text-emerald-600 border-emerald-200 bg-emerald-50 gap-2" : ""}
            onClick={handleSave}
            disabled={isSaving || isSaved}
          >
            {isSaving ? (
              <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...</span>
            ) : isSaved ? (
              <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Saved</span>
            ) : "Save Configuration"}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 shrink-0">
            <nav className="flex flex-col gap-1">
              {[
                { id: 'general', label: 'General', icon: Settings },
                { id: 'security', label: 'Security & Auth', icon: Shield },
                { id: 'billing', label: 'Payment Gateways', icon: CreditCard },
                { id: 'email', label: 'Email Provider', icon: Mail },
                { id: 'seo', label: 'SEO & Metadata', icon: Globe },
                { id: 'backups', label: 'Backups', icon: Database },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all w-full text-left ${
                    activeTab === tab.id 
                      ? 'bg-blue-600/10 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content Area */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">General Configuration</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Platform Name</label>
                    <input type="text" defaultValue="BlueBoxx" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Support Phone Number</label>
                    <input type="tel" defaultValue="+91 90235 12853" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-slate-800" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Support Email</label>
                    <input type="email" defaultValue="support@blueboxx.in" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Default Timezone</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-slate-800">
                      <option value="IST">Asia/Kolkata (IST +5:30)</option>
                      <option value="UTC">Coordinated Universal Time (UTC)</option>
                      <option value="EST">Eastern Standard Time (EST -5:00)</option>
                      <option value="PST">Pacific Standard Time (PST -8:00)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Maintenance Mode</h4>
                    <p className="text-xs text-slate-500 mt-1">Disable access to the frontend for non-admins.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Security & Authentication</h2>
                
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Require 2FA for Admins</h4>
                    <p className="text-xs text-slate-500 mt-1">Force all dashboard administrators to use Two-Factor Authentication.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Session Timeout (Minutes)</label>
                  <input type="number" defaultValue="120" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Payment Gateways</h2>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Stripe Secret Key</label>
                  <input type="password" placeholder="••••••••••••••••••••••••" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Razorpay Key ID</label>
                  <input type="text" defaultValue="rzp_test_K29sDlKds9" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Enable Cash on Delivery (COD)</h4>
                    <p className="text-xs text-slate-500 mt-1">Allow students to purchase offline or select COD option.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Email Provider (SMTP)</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">SMTP Host</label>
                    <input type="text" defaultValue="smtp.gmail.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">SMTP Port</label>
                    <input type="number" defaultValue="587" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">SMTP Username</label>
                  <input type="text" defaultValue="notifications@blueboxx.in" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">SMTP Password</label>
                  <input type="password" placeholder="••••••••••••••••" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">SEO & Metadata</h2>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Default Meta Title</label>
                  <input type="text" defaultValue="BlueBoxx DA - Premium Training & Placements" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Default Meta Description</label>
                  <textarea rows={3} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none">Join the most premium tech program designed to build careers, with 1-on-1 mentorship, placement drives and active internships.</textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Google Analytics ID</label>
                  <input type="text" defaultValue="G-K3910FKS92" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>
            )}

            {activeTab === 'backups' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Backups & Recovery</h2>
                
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Automated Daily Backups</h4>
                    <p className="text-xs text-slate-500 mt-1">Schedule full database backups to run every day at midnight.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Backup Storage Location</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-slate-800">
                      <option value="s3">Amazon S3 Bucket</option>
                      <option value="gdrive">Google Drive Cloud</option>
                      <option value="local">Local Server Storage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Retention Count</label>
                    <input type="number" defaultValue="30" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">Last Backup: 5 hours ago (Size: 42.1 MB)</span>
                  <Button variant="outline" className="border-slate-200 font-bold bg-white text-[#1B2A6B]" onClick={() => alert("Starting database backup...")}>Run Backup Now</Button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
