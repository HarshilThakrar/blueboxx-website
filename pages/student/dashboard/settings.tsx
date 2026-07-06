import { DashboardLayout } from "../../../src/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../src/components/ui/Card";
import { Button } from "../../../src/components/ui/Button";
import { Input } from "../../../src/components/ui/Input";
import { User, Lock, Bell, Eye, Trash2, Mail, Phone, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Account Settings</h1>
          <p className="text-slate-500 text-sm">Manage your profile, security, and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Settings Tabs Sidebar */}
          <div className="w-full lg:w-64 shrink-0 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1B2A6B] text-white font-semibold text-sm shadow-md shadow-[#1B2A6B]/20">
              <User size={18} /> General
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-semibold text-sm transition-colors">
              <Lock size={18} /> Security
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-semibold text-sm transition-colors">
              <Bell size={18} /> Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-semibold text-sm transition-colors">
              <Eye size={18} /> Appearance
            </button>
            <div className="pt-4 mt-4 border-t border-slate-200">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-sm transition-colors">
                <Trash2 size={18} /> Delete Account
              </button>
            </div>
          </div>

          {/* Main Settings Form */}
          <div className="flex-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your photo and personal details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <img src="https://i.pravatar.cc/150" alt="Avatar" className="w-20 h-20 rounded-full border-4 border-white shadow-sm" />
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Change Photo</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Remove</Button>
                    </div>
                    <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">First Name</label>
                    <Input icon={<User size={16}/>} defaultValue="Student" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Last Name</label>
                    <Input icon={<User size={16}/>} defaultValue="User" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <Input icon={<Mail size={16}/>} defaultValue="student@blueboxx.in" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <Input icon={<Phone size={16}/>} defaultValue="+91 9876543210" />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t border-slate-100 mt-6">
                  <Button variant="primary">Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield size={20} className="text-emerald-500" /> Account Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <div>
                    <h4 className="font-bold text-slate-800">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
                  </div>
                  <Button variant="outline" size="sm">Enable 2FA</Button>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
