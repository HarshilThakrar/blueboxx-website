import { ExpertDashboardLayout } from "../../../src/layout/ExpertDashboardLayout";
import { User, Mail, Lock, Save, DollarSign, Briefcase, Upload, X } from "lucide-react";
import { useState, useRef } from "react";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ExpertSettings() {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?u=ankit");
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [profileData, setProfileData] = useState({ name: 'Ankit Sharma', title: 'Senior Frontend Engineer', bio: 'Passionate frontend engineer with 8+ years of experience building scalable web applications. Mentoring students and junior devs.' });
  const [securityData, setSecurityData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [ratesData, setRatesData] = useState({ hourlyRate: '50', expertise: 'React, Next.js, Node.js' });

  // Error states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!profileData.name || profileData.name.length < 3) newErrors.name = "Name must be at least 3 characters";
    if (!profileData.title) newErrors.title = "Professional title is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      toast.error("Please fix the errors in the profile form.");
      return;
    }
    
    setErrors({});
    toast.success("Profile settings saved successfully!");
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!securityData.currentPassword) newErrors.currentPassword = "Required";
    if (securityData.newPassword.length < 8) newErrors.newPassword = "Must be at least 8 characters";
    if (securityData.newPassword !== securityData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      toast.error("Please fix the errors in the security form.");
      return;
    }

    setErrors({});
    setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast.success("Password updated successfully!");
  };

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!ratesData.hourlyRate || parseInt(ratesData.hourlyRate) <= 0) newErrors.hourlyRate = "Must be a valid rate";
    if (!ratesData.expertise) newErrors.expertise = "Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      return;
    }

    setErrors({});
    toast.success("Rates and expertise updated!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
      toast.success("Avatar updated!");
    }
  };

  return (
    <ExpertDashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#0d1635] mb-1">Expert Settings</h1>
        <p className="text-slate-500 font-medium text-sm">Update your public profile, rates, and account security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <AnimatedContent direction="up" delay={0.1} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-black text-[#0d1635] flex items-center gap-2">
                <User size={18} className="text-[#1B2A6B]" /> Public Profile
              </h2>
            </div>
            <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
              <div className="flex items-center gap-6 mb-6">
                <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-slate-200 object-cover" />
                <div>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2">
                    <Upload size={14} /> Change Avatar
                  </button>
                  <p className="text-[10px] text-slate-400 font-semibold mt-2">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                  <input type="text" value={profileData.name} onChange={e => { setProfileData({...profileData, name: e.target.value}); setErrors({...errors, name: ''}); }} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]/20 transition-all ${errors.name ? 'border-rose-500 bg-rose-50 focus:border-rose-500' : 'border-slate-200 focus:border-[#1B2A6B]'}`} />
                  <AnimatePresence>
                    {errors.name && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[10px] font-bold text-rose-500 mt-1">{errors.name}</motion.p>}
                  </AnimatePresence>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Professional Title</label>
                  <input type="text" value={profileData.title} onChange={e => { setProfileData({...profileData, title: e.target.value}); setErrors({...errors, title: ''}); }} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]/20 transition-all ${errors.title ? 'border-rose-500 bg-rose-50 focus:border-rose-500' : 'border-slate-200 focus:border-[#1B2A6B]'}`} />
                  <AnimatePresence>
                    {errors.title && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[10px] font-bold text-rose-500 mt-1">{errors.title}</motion.p>}
                  </AnimatePresence>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Short Bio</label>
                  <textarea rows={3} value={profileData.bio} onChange={e => setProfileData({...profileData, bio: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B2A6B] focus:ring-2 focus:ring-[#1B2A6B]/20 resize-none transition-all"></textarea>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-[#1B2A6B] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0d1635] transition-colors flex items-center gap-2">
                  <Save size={16} /> Save Profile
                </button>
              </div>
            </form>
          </AnimatedContent>

          <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-black text-[#0d1635] flex items-center gap-2">
                <Lock size={18} className="text-[#1B2A6B]" /> Security
              </h2>
            </div>
            <form onSubmit={handleSaveSecurity} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Password</label>
                <input type="password" value={securityData.currentPassword} onChange={e => { setSecurityData({...securityData, currentPassword: e.target.value}); setErrors({...errors, currentPassword: ''}); }} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]/20 transition-all ${errors.currentPassword ? 'border-rose-500 bg-rose-50 focus:border-rose-500' : 'border-slate-200 focus:border-[#1B2A6B]'}`} />
                <AnimatePresence>
                  {errors.currentPassword && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[10px] font-bold text-rose-500 mt-1">{errors.currentPassword}</motion.p>}
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">New Password</label>
                  <input type="password" value={securityData.newPassword} onChange={e => { setSecurityData({...securityData, newPassword: e.target.value}); setErrors({...errors, newPassword: ''}); }} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]/20 transition-all ${errors.newPassword ? 'border-rose-500 bg-rose-50 focus:border-rose-500' : 'border-slate-200 focus:border-[#1B2A6B]'}`} />
                  <AnimatePresence>
                    {errors.newPassword && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[10px] font-bold text-rose-500 mt-1">{errors.newPassword}</motion.p>}
                  </AnimatePresence>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Confirm Password</label>
                  <input type="password" value={securityData.confirmPassword} onChange={e => { setSecurityData({...securityData, confirmPassword: e.target.value}); setErrors({...errors, confirmPassword: ''}); }} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]/20 transition-all ${errors.confirmPassword ? 'border-rose-500 bg-rose-50 focus:border-rose-500' : 'border-slate-200 focus:border-[#1B2A6B]'}`} />
                  <AnimatePresence>
                    {errors.confirmPassword && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[10px] font-bold text-rose-500 mt-1">{errors.confirmPassword}</motion.p>}
                  </AnimatePresence>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-[#C9A227] text-[#0d1635] text-sm font-bold rounded-xl shadow-sm hover:bg-[#b08d22] transition-colors">
                  Update Password
                </button>
              </div>
            </form>
          </AnimatedContent>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
              <DollarSign size={16} className="text-emerald-600" /> Rates & Expertise
            </h3>
            <form onSubmit={handleSaveRates} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Hourly Rate ($)</label>
                <input type="number" value={ratesData.hourlyRate} onChange={e => { setRatesData({...ratesData, hourlyRate: e.target.value}); setErrors({...errors, hourlyRate: ''}); }} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]/20 transition-all ${errors.hourlyRate ? 'border-rose-500 bg-rose-50 text-rose-700 focus:border-rose-500' : 'border-slate-200 text-[#1B2A6B] focus:border-[#1B2A6B]'}`} />
                <AnimatePresence>
                  {errors.hourlyRate && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[10px] font-bold text-rose-500 mt-1">{errors.hourlyRate}</motion.p>}
                </AnimatePresence>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Primary Expertise</label>
                <input type="text" value={ratesData.expertise} onChange={e => { setRatesData({...ratesData, expertise: e.target.value}); setErrors({...errors, expertise: ''}); }} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]/20 transition-all ${errors.expertise ? 'border-rose-500 bg-rose-50 text-rose-700 focus:border-rose-500' : 'border-slate-200 text-slate-700 focus:border-[#1B2A6B]'}`} />
                <AnimatePresence>
                  {errors.expertise && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[10px] font-bold text-rose-500 mt-1">{errors.expertise}</motion.p>}
                </AnimatePresence>
              </div>
              <button type="submit" className="w-full py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-sm">
                Save Preferences
              </button>
            </form>
          </AnimatedContent>

          <AnimatedContent direction="up" delay={0.4} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-500" /> Payout Info
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Connected Account</p>
                <p className="text-sm font-bold text-[#0d1635] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Stripe (•••• 4242)
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Phone</p>
                <p className="text-sm font-bold text-slate-700">+91 98765 43210</p>
              </div>
              <button onClick={() => setIsPayoutModalOpen(true)} className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-sm">
                Manage Payouts
              </button>
            </div>
          </AnimatedContent>
        </div>
      </div>

      <AnimatePresence>
        {isPayoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsPayoutModalOpen(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-xl w-full max-w-sm z-10 relative overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-lg font-black text-[#0d1635] flex items-center gap-2">Manage Payouts</h3>
                <button onClick={() => setIsPayoutModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
              </div>
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase size={28} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Connect Stripe Express</h4>
                <p className="text-sm text-slate-500 mb-6">You will be securely redirected to Stripe to manage your bank accounts and payout preferences.</p>
                <button onClick={() => { setIsPayoutModalOpen(false); toast.loading("Redirecting to Stripe...", {duration: 2000}); }} className="w-full py-2.5 bg-[#1B2A6B] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0d1635] transition-colors">
                  Continue to Stripe
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ExpertDashboardLayout>
  );
}
