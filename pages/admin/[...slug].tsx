import React from "react";
import { useRouter } from "next/router";
import { AdminDashboardLayout } from "../../src/layout/AdminDashboardLayout";
import { Construction, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminPlaceholderPage() {
  const router = useRouter();
  const { slug } = router.query;

  // Format the path nicely
  const path = Array.isArray(slug) ? slug.join(" / ") : slug;

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="w-24 h-24 bg-[#1B2A6B]/5 text-[#1B2A6B] rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-[#1B2A6B]/10">
          <Construction size={48} />
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">
          Module Under Construction
        </h1>
        
        <p className="text-slate-500 text-lg max-w-lg mb-8 font-medium">
          The <strong className="text-slate-800 capitalize">{path}</strong> panel is currently being built. This module will be available in an upcoming update.
        </p>

        <Link 
          href="/admin/dashboard"
          className="flex items-center gap-2 px-6 py-3 bg-[#1B2A6B] hover:bg-[#1B2A6B]/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-[#1B2A6B]/20"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </div>
    </AdminDashboardLayout>
  );
}
