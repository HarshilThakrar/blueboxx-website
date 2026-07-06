import { MainLayout } from "../src/layout/MainLayout";
import { motion } from "framer-motion";
import Link from "next/link";
import { XCircle, ArrowLeft, HeadphonesIcon, RefreshCw } from "lucide-react";
import { AnimatedContent } from "../src/components/reactbits/AnimatedContent";

export default function PaymentFailedPage() {
  return (
    <MainLayout>
      <div className="bg-transparent min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <AnimatedContent direction="up" delay={0.1}>
            <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 text-center shadow-xl shadow-slate-200/50">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <XCircle size={48} className="text-red-500 relative z-10" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Payment Failed</h1>
              <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
                We couldn't process your payment. Your card has not been charged. Please try again with a different payment method.
              </p>

              <div className="bg-red-50 text-red-800 text-sm font-medium rounded-xl p-4 mb-8 text-left border border-red-100 flex flex-col gap-1">
                <span><strong>Error Code:</strong> ERR_PAY_DECLINED</span>
                <span><strong>Reason:</strong> Insufficient funds or card declined by bank.</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/checkout" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                  <RefreshCw size={18} /> Retry Payment
                </Link>
                <Link href="/contact" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                  <HeadphonesIcon size={18} /> Contact Support
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  <ArrowLeft size={16} /> Return to Cart
                </Link>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </MainLayout>
  );
}
