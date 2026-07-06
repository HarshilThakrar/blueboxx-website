import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Archive, Download, Clock, CheckCircle2, ShieldCheck, Database, X, AlertTriangle } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { useState } from "react";

const INITIAL_BACKUPS = [
  { id: 1, name: "Auto-Backup (Daily)", size: "452 MB", date: "Today, 02:00 AM", status: "Success" },
  { id: 2, name: "Auto-Backup (Daily)", size: "448 MB", date: "Yesterday, 02:00 AM", status: "Success" },
  { id: 3, name: "Manual Snapshot", size: "445 MB", date: "Oct 25, 2026", status: "Success" },
];

export default function AdminBackupPage() {
  const [backups, setBackups] = useState(INITIAL_BACKUPS);
  
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  
  const [restoreId, setRestoreId] = useState<number | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  const handleCreateSnapshot = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setBackups([
        { id: Date.now(), name: "Manual Snapshot", size: "453 MB", date: "Just now", status: "Success" },
        ...backups
      ]);
      setIsBackingUp(false);
      setIsBackupModalOpen(false);
    }, 2000);
  };

  const handleRestore = () => {
    setIsRestoring(true);
    setTimeout(() => {
      setIsRestoring(false);
      setRestoreId(null);
      // We don't actually reload the page, but we could show a success toast here
    }, 3000);
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">System Backups</h1>
            <p className="text-slate-500 text-sm">Manage automated database snapshots and restore points.</p>
          </div>
          <Button variant="primary" className="shadow-md gap-2" onClick={() => setIsBackupModalOpen(true)}>
            <Database size={18}/> Create Snapshot
          </Button>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                 <Archive size={18} className="text-[#1B2A6B]" /> Available Restore Points
              </h2>
           </div>
           
           <div className="p-6 space-y-4">
              {backups.map((bk) => (
                 <div key={bk.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors gap-4">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                          <CheckCircle2 size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-900">{bk.name}</h4>
                          <p className="text-xs font-medium text-slate-500 flex items-center gap-2 mt-0.5">
                             <Clock size={12} /> {bk.date} &bull; {bk.size}
                          </p>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                       <Button variant="outline" className="flex-1 sm:flex-none text-xs font-bold gap-1.5 bg-white h-8"><Download size={14}/> Download SQL</Button>
                       <Button variant="outline" className="flex-1 sm:flex-none text-xs font-bold gap-1.5 text-rose-600 border-rose-200 hover:bg-rose-50 h-8" onClick={() => setRestoreId(bk.id)}><ShieldCheck size={14}/> Restore</Button>
                    </div>
                 </div>
              ))}
           </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.3} className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-blue-900 shadow-sm flex items-start gap-4">
           <div className="mt-0.5 text-blue-600"><ShieldCheck size={24}/></div>
           <div>
              <h3 className="font-bold text-lg mb-1">Automated Backups Active</h3>
              <p className="text-sm font-medium text-blue-800/80">Your platform is configured to automatically backup the database every night at 2:00 AM UTC. Backups are retained for 30 days before being automatically pruned.</p>
           </div>
        </AnimatedContent>
      </div>

      {isBackupModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AnimatedContent direction="up" className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-blue-50/50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Database size={20} className="text-[#1B2A6B]" /> Create Manual Backup</h2>
              {!isBackingUp && (
                <button onClick={() => setIsBackupModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={24} />
                </button>
              )}
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 font-medium">This will create a full SQL snapshot of the current database. This process might take a few moments and may temporarily degrade platform performance.</p>

              <div className="pt-4 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsBackupModalOpen(false)} disabled={isBackingUp}>Cancel</Button>
                <Button variant="primary" className="flex-1 shadow-md gap-2" onClick={handleCreateSnapshot} disabled={isBackingUp}>
                   {isBackingUp ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Backing up...</span> : "Start Backup"}
                </Button>
              </div>
            </div>
          </AnimatedContent>
        </div>
      )}

      {restoreId !== null && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AnimatedContent direction="up" className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden relative border-2 border-rose-500">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-rose-50">
              <h2 className="text-xl font-bold text-rose-600 flex items-center gap-2"><AlertTriangle size={20} /> Critical Action Warning</h2>
              {!isRestoring && (
                <button onClick={() => setRestoreId(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={24} />
                </button>
              )}
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-sm font-bold text-slate-900">Are you sure you want to restore this database snapshot?</p>
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                 <p className="text-xs text-rose-700 font-medium">This will completely overwrite the current production database. Any data created after this snapshot was taken will be permanently lost.</p>
              </div>

              <div className="pt-4 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setRestoreId(null)} disabled={isRestoring}>Cancel Restore</Button>
                <Button variant="primary" className="flex-1 shadow-md gap-2 bg-rose-600 hover:bg-rose-700 border-rose-600" onClick={handleRestore} disabled={isRestoring}>
                   {isRestoring ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Restoring DB...</span> : "Confirm Restore"}
                </Button>
              </div>
            </div>
          </AnimatedContent>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
