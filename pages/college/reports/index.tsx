import { CollegeDashboardLayout } from "../../../src/layout/CollegeDashboardLayout";
import { BarChart4, Download } from "lucide-react";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";

export default function ReportsPage() {
  return (
    <CollegeDashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Reports & Analytics</h1>
          <p className="text-slate-500 font-medium text-sm">Download placement statistics and student performance reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedContent direction="up" delay={0.1} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <BarChart4 size={32} className="text-[#1B2A6B]" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Placement Summary Report</h2>
            <p className="text-sm text-slate-500 mt-2 mb-6 max-w-sm">Detailed overview of all placement drives, number of offers, and highest packages for the current academic year.</p>
            <button className="flex items-center justify-center gap-2 h-10 px-6 bg-[#1B2A6B] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0d1635] transition-colors">
                <Download size={16} /> Download PDF
            </button>
        </AnimatedContent>
        
        <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                <Download size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Student Export</h2>
            <p className="text-sm text-slate-500 mt-2 mb-6 max-w-sm">Export a complete list of unplaced and placed students in CSV format for internal records and university compliance.</p>
            <button className="flex items-center justify-center gap-2 h-10 px-6 bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-emerald-700 transition-colors">
                <Download size={16} /> Export CSV
            </button>
        </AnimatedContent>
      </div>
    </CollegeDashboardLayout>
  );
}
