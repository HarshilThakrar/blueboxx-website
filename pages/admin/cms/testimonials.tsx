import React, { useState } from "react";
import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { ChevronRight, Search, Plus, Trash2, Check, Star } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect } from "react";

const INITIAL_TESTIMONIALS = [
  { id: 1, name: "Pratik Patel", role: "Software Engineer", message: "Amazing experience working as an intern through Blueboxx DA!", rating: 5 },
  { id: 2, name: "Mona Shah", role: "AI Student", message: "The expert classes helped me transition smoothly into machine learning roles.", rating: 5 },
];

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", role: "", message: "", rating: 5 });

  useEffect(() => {
    const stored = localStorage.getItem('bb_testimonials');
    if (stored) {
      setTestimonials(JSON.parse(stored));
    } else {
      setTestimonials(INITIAL_TESTIMONIALS);
      localStorage.setItem('bb_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    const updated = [...testimonials, { id: Date.now(), ...form }];
    setTestimonials(updated);
    localStorage.setItem('bb_testimonials', JSON.stringify(updated));
    setForm({ name: "", role: "", message: "", rating: 5 });
    toast.success("Testimonial saved!");
  };

  const handleDelete = (id: number) => {
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    localStorage.setItem('bb_testimonials', JSON.stringify(updated));
    toast.success("Testimonial removed.");
  };

  return (
    <AdminDashboardLayout>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-6">
        <Link href="/admin/dashboard" className="hover:text-[#1B2A6B]">Dashboard</Link>
        <ChevronRight size={12} />
        <span className="text-slate-500">Frontend CMS</span>
        <ChevronRight size={12} />
        <span className="text-slate-800 font-bold">Testimonial</span>
      </div>
      <h1 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-wide">Testimonials</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-black text-slate-800 mb-5">Add Testimonial</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">NAME <span className="text-rose-500">*</span></label>
                <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Student name"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#1B2A6B] focus:bg-white" />
              </div>
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5 block">ROLE / DESIGNATION</label>
                <input value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} placeholder="e.g. Intern"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#1B2A6B] focus:bg-white" />
              </div>
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5 block">MESSAGE</label>
                <textarea rows={3} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Review feedback..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#1B2A6B] focus:bg-white resize-none" />
              </div>
              <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-[#1B2A6B] hover:bg-[#1B2A6B]/90 text-white text-sm font-black rounded-xl shadow-sm transition-all">
                <Check size={14} /> SAVE TESTIMONIAL
              </button>
            </form>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="py-3 px-5 text-[11px] font-black text-slate-400 uppercase w-12">SL</th>
                  <th className="py-3 px-5 text-[11px] font-black text-slate-400 uppercase">USER</th>
                  <th className="py-3 px-5 text-[11px] font-black text-slate-400 uppercase">MESSAGE</th>
                  <th className="py-3 px-5 text-[11px] font-black text-slate-400 uppercase">RATING</th>
                  <th className="py-3 px-5 text-[11px] font-black text-slate-400 uppercase text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testimonials.map((t, idx) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-5 text-sm font-bold text-slate-500">{idx + 1}</td>
                    <td className="py-3 px-5">
                      <p className="text-sm font-bold text-slate-800">{t.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{t.role}</p>
                    </td>
                    <td className="py-3 px-5 text-xs font-semibold text-slate-600 max-w-xs truncate">{t.message}</td>
                    <td className="py-3 px-5">
                      <div className="flex gap-0.5 text-amber-500">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-5 text-center">
                      <button onClick={() => handleDelete(t.id)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
