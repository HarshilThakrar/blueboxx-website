import { ExpertDashboardLayout } from "../../../src/layout/ExpertDashboardLayout";
import { Clock, Calendar, CheckCircle2, ChevronRight, Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ExpertAvailabilityPage() {
  const [activeDay, setActiveDay] = useState("Monday");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <ExpertDashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">My Availability</h1>
          <p className="text-slate-500 font-medium text-sm">Manage your working hours and session slots.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 ${
            saveSuccess ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-[#1B2A6B] text-white hover:bg-[#0d1635]'
          }`}
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : 
           saveSuccess ? <CheckCircle2 size={16} /> : 
           <CheckCircle2 size={16} />}
          {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Days Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-700 text-sm flex items-center gap-2">
              <Calendar size={16} className="text-[#C9A227]" /> Working Days
            </h3>
          </div>
          <div className="p-2">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all mb-1 ${
                  activeDay === day 
                    ? "bg-[#1B2A6B] text-white shadow-md" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {day}
                {activeDay === day && <ChevronRight size={16} />}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots Area */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h2 className="text-lg font-black text-slate-800">
              Configure slots for {activeDay}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Enable Day</span>
              <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer shadow-inner" onClick={() => toast.success("Simulated: Day toggled")}>
                <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Slot 1 */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 group hover:border-[#1B2A6B]/20 transition-colors">
              <div className="flex-1 flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                  <Clock size={16} className="text-slate-400" />
                  <select className="bg-transparent text-sm font-bold text-slate-700 outline-none border-none focus:ring-0">
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                  </select>
                </div>
                <span className="text-slate-400 font-bold">-</span>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                  <Clock size={16} className="text-slate-400" />
                  <select className="bg-transparent text-sm font-bold text-slate-700 outline-none border-none focus:ring-0">
                    <option>12:00 PM</option>
                    <option>01:00 PM</option>
                  </select>
                </div>
              </div>
              <button onClick={() => toast.success("Simulated: Slot Removed")} className="text-slate-400 hover:text-red-500 font-bold text-sm px-3 opacity-0 group-hover:opacity-100 transition-opacity">
                Remove
              </button>
            </div>
            
            {/* Slot 2 */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 group hover:border-[#1B2A6B]/20 transition-colors">
              <div className="flex-1 flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                  <Clock size={16} className="text-slate-400" />
                  <select className="bg-transparent text-sm font-bold text-slate-700 outline-none border-none focus:ring-0">
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                  </select>
                </div>
                <span className="text-slate-400 font-bold">-</span>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                  <Clock size={16} className="text-slate-400" />
                  <select className="bg-transparent text-sm font-bold text-slate-700 outline-none border-none focus:ring-0">
                    <option>06:00 PM</option>
                    <option>07:00 PM</option>
                  </select>
                </div>
              </div>
              <button onClick={() => toast.success("Simulated: Slot Removed")} className="text-slate-400 hover:text-red-500 font-bold text-sm px-3 opacity-0 group-hover:opacity-100 transition-opacity">
                Remove
              </button>
            </div>

            <button onClick={() => toast.success("Simulated: Slot Added")} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 font-bold text-sm hover:border-[#1B2A6B] hover:text-[#1B2A6B] hover:bg-[#1B2A6B]/5 transition-all flex items-center justify-center gap-2 mt-4">
              <Plus size={18} /> Add another slot
            </button>
          </div>
        </div>
      </div>
    </ExpertDashboardLayout>
  );
}
