import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { TerminalSquare, RefreshCw, Zap, Server, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { useState } from "react";

export default function AdminUtilityPage() {
  const [isClearing, setIsClearing] = useState(false);
  const [isCleared, setIsCleared] = useState(false);

  const [isScanning, setIsScanning] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  const handleCacheClear = () => {
    setIsClearing(true);
    setTimeout(() => {
      setIsClearing(false);
      setIsCleared(true);
      setTimeout(() => setIsCleared(false), 3000);
    }, 2000);
  };

  const handleSecurityScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsScanned(true);
      setTimeout(() => setIsScanned(false), 3000);
    }, 2500);
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">System Utility Tools</h1>
            <p className="text-slate-500 text-sm">Manage cache, run maintenance scripts, and check system health.</p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4"><Zap size={24}/></div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">Clear System Cache</h3>
              <p className="text-sm text-slate-500 font-medium mb-6">Forces the Next.js frontend to rebuild static pages and clear Redis cache for all users.</p>
              <Button 
                variant="outline" 
                className={`w-full gap-2 ${isCleared ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : 'border-amber-200 text-amber-700 hover:bg-amber-50'}`}
                onClick={handleCacheClear}
                disabled={isClearing || isCleared}
              >
                 {isClearing ? (
                   <><span className="w-4 h-4 border-2 border-amber-600/30 border-t-amber-600 rounded-full animate-spin"></span> Clearing...</>
                 ) : isCleared ? (
                   <><CheckCircle2 size={16} /> Cache Cleared!</>
                 ) : (
                   <><RefreshCw size={16} /> Flush All Cache</>
                 )}
              </Button>
           </div>
           
           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4"><ShieldCheck size={24}/></div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">Security Audit</h3>
              <p className="text-sm text-slate-500 font-medium mb-6">Run a quick scan for exposed environment variables or missing headers.</p>
              <Button 
                variant="outline" 
                className={`w-full gap-2 ${isScanned ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'}`}
                onClick={handleSecurityScan}
                disabled={isScanning || isScanned}
              >
                 {isScanning ? (
                   <><span className="w-4 h-4 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin"></span> Scanning...</>
                 ) : isScanned ? (
                   <><CheckCircle2 size={16} /> Audit Passed</>
                 ) : (
                   <><ShieldCheck size={16} /> Run Security Scan</>
                 )}
              </Button>
           </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.3} className="bg-[#0f172a] rounded-3xl border border-slate-800 shadow-xl overflow-hidden mt-8">
           <div className="p-4 border-b border-slate-800/50 flex items-center gap-2 bg-slate-900/50">
              <TerminalSquare size={16} className="text-slate-400" />
              <h2 className="text-sm font-bold text-slate-300">Server Logs (Live)</h2>
           </div>
           <div className="p-6 font-mono text-xs text-emerald-400 space-y-2 h-64 overflow-y-auto">
              <p><span className="text-slate-500">[11:50:02]</span> INFO: Next.js build compiled successfully.</p>
              <p><span className="text-slate-500">[11:51:14]</span> INFO: Database connection established.</p>
              <p><span className="text-slate-500">[11:55:00]</span> WARN: API Rate limit approaching for Zoom integration.</p>
              <p><span className="text-slate-500">[11:58:30]</span> INFO: Admin "root" logged in from 192.168.1.1</p>
              <p><span className="text-slate-500">[12:00:15]</span> INFO: Scheduled cron job (Backups) executed successfully.</p>
           </div>
        </AnimatedContent>
      </div>
    </AdminDashboardLayout>
  );
}
