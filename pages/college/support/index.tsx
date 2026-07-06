import { CollegeDashboardLayout } from "../../../src/layout/CollegeDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { MessageSquare, Mail, Phone, ExternalLink, Send, ChevronDown } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const FAQS = [
  { q: "How do I bulk import students?", a: "Go to the Bulk Enrollment page under Student Management. Download our CSV template, fill in your student data, then upload the file. We'll validate each row and show a preview before importing." },
  { q: "How does the placement tracking work?", a: "Once you mark a student as placed and add company and package details, the placement rate on your dashboard updates automatically. You can also export placement reports as CSV." },
  { q: "Can I add multiple admin users for our college?", a: "Currently each college has one placement cell admin. Multi-user support is on our roadmap. Contact support to discuss your requirements." },
  { q: "How do I connect with BlueBoxx partner companies?", a: "Visit the Partner Courses section. From there you can browse companies that recruit via BlueBoxx and initiate contact through your dedicated relationship manager." },
];

export default function CollegeSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ subject: "", message: "" });

  const handleSubmit = () => {
    if (!form.subject || !form.message) { toast.error("Please fill in all fields."); return; }
    toast.success("Support ticket raised! We'll reply within 24 hours.");
    setForm({ subject: "", message: "" });
  };

  return (
    <CollegeDashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 mb-1">Support</h1>
        <p className="text-slate-500 font-medium text-sm">Get help from our team or browse our FAQ.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Contact Form + FAQ */}
        <div className="lg:col-span-2 space-y-5">
          {/* Raise a Ticket */}
          <AnimatedContent direction="up" delay={0.05} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-black text-slate-800 mb-5 flex items-center gap-2">
              <Send size={15} className="text-[#1B2A6B]" /> Raise a Support Ticket
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Subject</label>
                <select
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:border-[#1B2A6B] outline-none appearance-none"
                >
                  <option value="">Select a topic...</option>
                  <option>Student import issue</option>
                  <option>Placement data discrepancy</option>
                  <option>Login / access problem</option>
                  <option>Course or cohort issue</option>
                  <option>Billing enquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={5}
                  placeholder="Describe your issue in detail..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 h-10 px-6 bg-[#1B2A6B] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0d1635] transition-colors"
              >
                <Send size={14} /> Submit Ticket
              </button>
            </div>
          </AnimatedContent>

          {/* FAQ */}
          <AnimatedContent direction="up" delay={0.1} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-sm font-black text-slate-800">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {FAQS.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-800 pr-4">{faq.q}</span>
                    <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm font-medium text-slate-500 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>

        {/* Right Sidebar — Contact Info */}
        <div className="space-y-5">
          <AnimatedContent direction="up" delay={0.15} className="bg-[#0d1635] rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C9A227] to-transparent" />
            <div className="w-10 h-10 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-xl flex items-center justify-center mb-3">
              <MessageSquare size={18} className="text-[#C9A227]" />
            </div>
            <h3 className="font-black text-base mb-1">Dedicated Support</h3>
            <p className="text-white/50 text-xs font-medium mb-5">You have a dedicated relationship manager at BlueBoxx DA.</p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <Mail size={15} className="text-[#C9A227] shrink-0" />
                <div>
                  <p className="text-[10px] text-white/50 font-bold">Email</p>
                  <p className="text-xs font-bold text-white">college-support@blueboxxda.in</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <Phone size={15} className="text-[#C9A227] shrink-0" />
                <div>
                  <p className="text-[10px] text-white/50 font-bold">Phone</p>
                  <p className="text-xs font-bold text-white">+91 80 4567 1234</p>
                </div>
              </div>
            </div>

            <p className="text-white/30 text-[10px] font-semibold mt-4">Response time: Within 24 business hours.</p>
          </AnimatedContent>

          <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-black text-slate-700 mb-3">Helpful Links</h3>
            <div className="space-y-2">
              {[
                { label: "Documentation & User Guide", href: "#" },
                { label: "Video Tutorials", href: "#" },
                { label: "Bulk Import Guide", href: "/college/enrollment" },
                { label: "Contact Relationship Manager", href: "#" },
              ].map((link, i) => (
                <a key={i} href={link.href} className="flex items-center gap-2 text-sm font-bold text-[#1B2A6B] hover:text-[#0d1635] transition-colors py-1">
                  <ExternalLink size={12} className="shrink-0" /> {link.label}
                </a>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </div>
    </CollegeDashboardLayout>
  );
}
