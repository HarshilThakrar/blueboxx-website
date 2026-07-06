import React, { useState, useRef, useEffect } from "react";
import { 
  Filter, X, Search, ChevronDown, Check, TrendingUp, Star, ShieldCheck, 
  Zap, Diamond, Rocket, Briefcase, GraduationCap, Clock, Award, Target, 
  BookOpen, MonitorPlay, MapPin, IndianRupee, SlidersHorizontal 
} from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- Custom Select Component ---
interface CustomSelectProps {
  label: string;
  icon: React.ElementType;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const CustomSelect = ({ label, icon: Icon, options, value, onChange, placeholder = "Select..." }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 min-w-[200px]" ref={ref}>
      <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Icon size={12} className="text-[#1B2A6B]" /> {label}
      </label>
      <div 
        className={cn(
          "h-12 w-full bg-white/60 hover:bg-white/90 backdrop-blur-md border rounded-xl flex items-center justify-between px-4 cursor-pointer transition-all duration-300",
          isOpen ? "border-[#C9A227] shadow-[0_0_0_4px_rgba(201,162,39,0.1)]" : "border-slate-200/60 shadow-sm"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={cn("text-sm font-bold truncate", !value ? "text-slate-400" : "text-slate-800")}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={cn("text-slate-400 transition-transform duration-300", isOpen && "rotate-180 text-[#C9A227]")} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-[calc(100%+8px)] left-0 w-full bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-xl shadow-2xl p-2 z-50 max-h-60 overflow-y-auto overflow-x-hidden"
          >
            {options.map((opt) => (
              <div 
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={cn(
                  "px-3 py-2.5 rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-between transition-colors",
                  value === opt ? "bg-[#1B2A6B]/5 text-[#1B2A6B]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {opt}
                {value === opt && <Check size={14} className="text-[#C9A227]" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main AdvancedFilter Component ---
interface AdvancedFilterProps {
  type?: "jobs" | "internships" | "experts" | "courses";
}

export function AdvancedFilter({ type = "jobs" }: AdvancedFilterProps) {
  const [activeDomain, setActiveDomain] = useState("Product");
  const [showAllFilters, setShowAllFilters] = useState(false);
  
  // States for filters
  const [experience, setExperience] = useState("");
  const [learningMode, setLearningMode] = useState("");
  const [duration, setDuration] = useState("");
  const [guarantee, setGuarantee] = useState("");
  const [salary, setSalary] = useState("5 - 10 LPA");
  
  const [activePill, setActivePill] = useState("Trending");
  const [activeFilters, setActiveFilters] = useState<string[]>(['Remote', 'Product', '3-5 Years']);

  const quickPills = [
    { label: "Trending", icon: TrendingUp },
    { label: "Top Rated", icon: Star },
    { label: "Placement Guaranteed", icon: ShieldCheck },
    { label: "Beginner Friendly", icon: Zap },
    { label: "Premium", icon: Diamond },
    { label: "New Launch", icon: Rocket }
  ];

  const domains = [
    { label: 'Engineering', icon: MonitorPlay },
    { label: 'Design', icon: Target },
    { label: 'Data', icon: TrendingUp },
    { label: 'Product', icon: Briefcase },
    { label: 'Marketing', icon: Award },
    { label: 'General', icon: BookOpen }
  ];

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="relative mb-12 z-20">
      {/* Decorative Floating Shadows */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#C9A227] rounded-full blur-[100px] opacity-[0.08] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#1B2A6B] rounded-full blur-[100px] opacity-[0.08] pointer-events-none" />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-2xl border border-slate-200/50 rounded-[28px] p-6 md:p-8 shadow-[0_20px_60px_-15px_rgba(27,42,107,0.1)] relative overflow-visible"
      >
        {/* Quick Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {quickPills.map((pill) => {
            const Icon = pill.icon;
            const isActive = activePill === pill.label;
            return (
              <motion.button
                key={pill.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActivePill(pill.label)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-black flex items-center gap-1.5 transition-all duration-300 border",
                  isActive 
                    ? "bg-gradient-to-r from-[#1B2A6B] to-[#2a40a0] text-white border-transparent shadow-md shadow-[#1B2A6B]/20" 
                    : "bg-white text-slate-500 border-slate-200/60 hover:border-[#1B2A6B]/20 hover:text-[#1B2A6B] hover:bg-slate-50"
                )}
              >
                <Icon size={12} className={isActive ? "text-[#C9A227]" : "text-slate-400"} />
                {pill.label}
              </motion.button>
            );
          })}
        </div>

        {/* Primary Search Area */}
        <div className="flex flex-col lg:flex-row gap-4 items-end mb-8">
          <div className="flex-1 w-full relative">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Search size={12} className="text-[#1B2A6B]" /> Keywords
            </label>
            <input 
              type="text" 
              placeholder="What do you want to learn? e.g. Fullstack, UI/UX..." 
              className="w-full h-14 pl-5 pr-4 rounded-xl border border-slate-200/60 text-base focus:border-[#C9A227] focus:ring-4 focus:ring-[#C9A227]/10 outline-none transition-all placeholder-slate-400 font-bold bg-white/60 hover:bg-white/90" 
            />
          </div>
          <div className="flex-1 w-full relative">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin size={12} className="text-[#1B2A6B]" /> Location
            </label>
            <input 
              type="text" 
              placeholder="e.g. Remote, Mumbai, Bangalore" 
              className="w-full h-14 pl-5 pr-4 rounded-xl border border-slate-200/60 text-base focus:border-[#C9A227] focus:ring-4 focus:ring-[#C9A227]/10 outline-none transition-all placeholder-slate-400 font-bold bg-white/60 hover:bg-white/90" 
            />
          </div>
          
          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full lg:w-auto h-14 px-8 rounded-xl bg-gradient-to-r from-[#1B2A6B] to-[#121c47] text-white font-black text-sm hover:shadow-[0_10px_40px_rgba(27,42,107,0.3)] transition-all flex items-center justify-center gap-2 overflow-hidden relative group"
          >
            {/* Magnetic highlight effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <Search size={16} className="text-[#C9A227]" /> Search Programs
          </motion.button>
        </div>

        {/* Domain Chips */}
        <div className="mb-6">
          <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Briefcase size={12} className="text-[#1B2A6B]" /> Explore Domains
          </label>
          <div className="flex flex-wrap gap-3">
            {domains.map((d) => {
              const Icon = d.icon;
              const isActive = activeDomain === d.label;
              return (
                <motion.button 
                  key={d.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveDomain(d.label)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-bold rounded-xl border transition-all flex items-center gap-2 relative overflow-hidden",
                    isActive 
                      ? "border-[#1B2A6B]/30 text-[#1B2A6B] bg-[#1B2A6B]/5 shadow-sm" 
                      : "border-slate-200/60 text-slate-600 hover:border-[#1B2A6B]/30 hover:bg-slate-50 bg-white/50"
                  )}
                >
                  <Icon size={14} className={isActive ? "text-[#C9A227]" : "text-slate-400"} />
                  {d.label}
                  {isActive && <motion.div layoutId="domain-glow" className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A227]/10 to-transparent" />}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="border-t border-slate-100 pt-6">
          <button 
            onClick={() => setShowAllFilters(!showAllFilters)}
            className="flex items-center gap-2 text-sm font-bold text-[#1B2A6B] hover:text-[#C9A227] transition-colors"
          >
            <SlidersHorizontal size={14} /> 
            {showAllFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
          </button>
          
          <AnimatePresence>
            {showAllFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <CustomSelect label="Experience" icon={GraduationCap} options={['Fresher', '1-3 Years', '3-5 Years', '5+ Years']} value={experience} onChange={setExperience} />
                  <CustomSelect label="Learning Mode" icon={MonitorPlay} options={['100% Online', 'Hybrid', 'Offline', 'Self-paced']} value={learningMode} onChange={setLearningMode} />
                  <CustomSelect label="Duration" icon={Clock} options={['1-3 Months', '3-6 Months', '6-12 Months', '1 Year+']} value={duration} onChange={setDuration} />
                  <CustomSelect label="Placement" icon={ShieldCheck} options={['100% Guarantee', 'Assistance Provided', 'Not Required']} value={guarantee} onChange={setGuarantee} />
                  
                  {/* Custom Salary Pill Slider representation */}
                  <div className="col-span-1 md:col-span-2 relative">
                    <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <IndianRupee size={12} className="text-[#1B2A6B]" /> Salary Expectation
                    </label>
                    <div className="flex bg-slate-100/50 p-1.5 rounded-xl border border-slate-200/50">
                      {['3-5 LPA', '5-10 LPA', '10-15 LPA', '15+ LPA'].map(range => (
                        <button 
                          key={range}
                          onClick={() => setSalary(range)}
                          className={cn(
                            "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                            salary === range ? "bg-white text-[#1B2A6B] shadow-sm" : "text-slate-500 hover:text-slate-700"
                          )}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active Filters Row */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-6 mt-6 border-t border-slate-100">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mr-2">Active:</span>
            <AnimatePresence>
              {activeFilters.map(filter => (
                <motion.div 
                  key={filter}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-[#1B2A6B]/5 border border-[#1B2A6B]/10 text-[#1B2A6B] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 group"
                >
                  {filter}
                  <button onClick={() => removeFilter(filter)} className="p-0.5 rounded-full hover:bg-[#1B2A6B]/10 hover:text-red-500 transition-colors">
                    <X size={12} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <button 
              onClick={() => setActiveFilters([])}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 ml-2 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
