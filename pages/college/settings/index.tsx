import { CollegeDashboardLayout } from "../../../src/layout/CollegeDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Settings, Building, Phone, Mail, Globe, Save, Camera } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CollegeSettingsPage() {
  const [form, setForm] = useState({
    collegeName: "NIT Trichy",
    contactName: "Dr. Rajesh Kumar",
    email: "placements@nittrichy.ac.in",
    phone: "+91 431-250-0000",
    website: "https://www.nitt.edu",
    address: "National Highway 67, Tanjore Main Road, Tiruchirappalli, Tamil Nadu 620015",
    placementDrive: "2026 Batch",
    targetPlacement: "90",
  });

  const handleSave = () => toast.success("Settings saved successfully!");

  return (
    <CollegeDashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 mb-1">Settings</h1>
        <p className="text-slate-500 font-medium text-sm">Manage your institution profile and placement preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <AnimatedContent direction="up" delay={0.05} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 rounded-2xl bg-[#0d1635] flex items-center justify-center mx-auto text-white font-black text-2xl shadow-lg">
              N
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#C9A227] rounded-full flex items-center justify-center shadow-md hover:bg-[#d8b02c] transition-colors">
              <Camera size={13} className="text-[#0d1635]" />
            </button>
          </div>
          <h3 className="text-lg font-black text-slate-800 mb-0.5">{form.collegeName}</h3>
          <p className="text-xs font-semibold text-slate-400 mb-1">Placement Cell</p>
          <span className="inline-flex items-center text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
            ✓ Verified Partner
          </span>

          <div className="mt-5 pt-5 border-t border-slate-100 space-y-3 text-left">
            {[
              { icon: Mail, val: form.email },
              { icon: Phone, val: form.phone },
              { icon: Globe, val: form.website },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-slate-500">
                <item.icon size={13} className="text-slate-400 shrink-0" />
                <span className="truncate">{item.val}</span>
              </div>
            ))}
          </div>
        </AnimatedContent>

        {/* Form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Institution Info */}
          <AnimatedContent direction="up" delay={0.1} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-black text-slate-800 mb-5 flex items-center gap-2">
              <Building size={15} className="text-[#1B2A6B]" /> Institution Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "College Name", key: "collegeName" },
                { label: "Contact Person", key: "contactName" },
                { label: "Official Email", key: "email", type: "email" },
                { label: "Phone Number", key: "phone", type: "tel" },
                { label: "Website", key: "website", type: "url" },
              ].map((field) => (
                <div key={field.key} className={field.key === "collegeName" ? "sm:col-span-2" : ""}>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    value={(form as any)[field.key]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Address</label>
                <textarea
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none resize-none"
                />
              </div>
            </div>
          </AnimatedContent>

          {/* Placement Settings */}
          <AnimatedContent direction="up" delay={0.15} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-black text-slate-800 mb-5 flex items-center gap-2">
              <Settings size={15} className="text-[#1B2A6B]" /> Placement Preferences
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Current Batch / Drive", key: "placementDrive" },
                { label: "Target Placement %", key: "targetPlacement" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">{field.label}</label>
                  <input
                    value={(form as any)[field.key]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Notifications Toggle */}
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Notifications</p>
              {[
                { label: "Email alerts for new placements", on: true },
                { label: "Weekly performance digest", on: true },
                { label: "Placement drive reminders", on: false },
              ].map((n, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600">{n.label}</span>
                  <button className={`w-10 h-5 rounded-full transition-colors ${n.on ? "bg-[#1B2A6B]" : "bg-slate-200"} relative`}>
                    <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all ${n.on ? "right-0.5" : "left-0.5"} shadow-sm`} />
                  </button>
                </div>
              ))}
            </div>
          </AnimatedContent>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 h-10 px-6 bg-[#1B2A6B] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0d1635] transition-colors"
            >
              <Save size={15} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </CollegeDashboardLayout>
  );
}
