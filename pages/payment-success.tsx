import { MainLayout } from "../src/layout/MainLayout";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Download, ArrowRight, BookOpen } from "lucide-react";
import { AnimatedContent } from "../src/components/reactbits/AnimatedContent";

export default function PaymentSuccessPage() {
  return (
    <MainLayout>
      <div className="bg-transparent min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <AnimatedContent direction="up" delay={0.1}>
            <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 text-center shadow-xl shadow-slate-200/50">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-50" />
                <CheckCircle size={48} className="text-emerald-600 relative z-10" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Payment Successful!</h1>
              <p className="text-slate-600 mb-8 text-lg">
                Thank you for your purchase. You're now enrolled and ready to start learning.
              </p>

              <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left border border-slate-100">
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-500">Order ID</span>
                  <span className="text-sm font-bold text-slate-900">#BBX-9982-445</span>
                </div>
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-500">Date</span>
                  <span className="text-sm font-bold text-slate-900">June 27, 2026</span>
                </div>
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-500">Amount Paid</span>
                  <span className="text-sm font-bold text-slate-900">₹44,499</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">Payment Method</span>
                  <span className="text-sm font-bold text-slate-900">Credit Card ending in 4242</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                  <Download size={18} /> Download Invoice
                </button>
                <Link href="/student/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
                  <BookOpen size={18} /> Go to Dashboard <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </MainLayout>
  );
}
