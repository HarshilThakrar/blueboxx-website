import React, { useState } from "react";
import { CompanyDashboardLayout } from "../../../src/layout/CompanyDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { MessageSquare, Phone, Mail, FileText, ChevronRight, HelpCircle, Send } from "lucide-react";
import toast from "react-hot-toast";

const SUPPORT_ITEMS = [
  { title: "Documentation", desc: "Guides and tutorials", icon: FileText },
  { title: "Chat with Support", desc: "Available 9AM-5PM EST", icon: MessageSquare },
  { title: "Schedule a Call", desc: "Speak with an account manager", icon: Phone },
  { title: "Email Support", desc: "Response within 24 hours", icon: Mail },
];

export default function CompanySupportPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <CompanyDashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 mb-1">Support & Help Center</h1>
        <p className="text-slate-500 font-medium text-sm">Get help with your account, billing, or recruitment process.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div className="lg:col-span-1 space-y-4">
          {SUPPORT_ITEMS.map((item, i) => (
            <AnimatedContent key={i} direction="up" delay={i * 0.1} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer" onClick={() => toast.success(`Opening ${item.title}...`)}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-slate-50 text-[#1B2A6B]`}>
                <item.icon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </AnimatedContent>
          ))}

          <AnimatedContent direction="up" delay={0.4} className="bg-gradient-to-br from-[#1B2A6B] to-[#2E45A3] rounded-2xl p-6 text-white text-center mt-6 shadow-lg shadow-[#1B2A6B]/20">
            <HelpCircle size={32} className="mx-auto mb-3 opacity-80" />
            <h3 className="text-sm font-black mb-1">Need Urgent Help?</h3>
            <p className="text-xs text-blue-100 mb-4">Call our dedicated enterprise support line.</p>
            <p className="font-black text-xl tracking-wider">+1 (800) 123-4567</p>
          </AnimatedContent>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-2">Submit a Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Subject</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none">
                    <option>Billing Issue</option>
                    <option>Technical Problem</option>
                    <option>Feature Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Priority</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none">
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Description</label>
                <textarea required rows={5} placeholder="Please describe your issue in detail..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none resize-none" />
              </div>

              <div className="pt-2 flex items-center justify-between">
                {submitted ? (
                  <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-lg">Support request sent successfully!</span>
                ) : (
                  <span />
                )}
                <button type="submit" disabled={submitting} className="flex items-center gap-2 px-6 py-2.5 bg-[#1B2A6B] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#1B2A6B]/20 hover:bg-[#0d1635] transition-all disabled:opacity-70">
                  {submitting ? "Sending..." : <><Send size={16} /> Submit Ticket</>}
                </button>
              </div>
            </form>
          </AnimatedContent>
        </div>
      </div>
    </CompanyDashboardLayout>
  );
}
