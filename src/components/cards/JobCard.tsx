import { useRouter } from "next/router";
import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { MapPin, DollarSign, Briefcase, Bookmark, ChevronRight } from "lucide-react";

export interface JobProps {
  id: string | number;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  tags: string[];
}

export function JobCard({ job }: { job: JobProps }) {
  const router = useRouter();

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/jobs/${job.id}`);
  };

  return (
    <Card 
      className="bg-white border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(27,42,107,0.06)] hover:-translate-y-1 transition-all duration-300 rounded-3xl overflow-hidden group cursor-pointer"
      onClick={() => router.push(`/jobs/${job.id}`)}
    >
      <CardContent className="p-6">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <div className="w-14 h-14 bg-white rounded-xl p-1.5 shadow-sm border border-slate-100 shrink-0">
              <img src={job.logo} alt={job.company} className="w-full h-full rounded-lg object-cover" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-800 mb-1 group-hover:text-[#1B2A6B] transition-colors">{job.title}</h3>
              <p className="text-sm font-bold text-slate-500">{job.company}</p>
            </div>
          </div>
          <button className="text-slate-300 hover:text-[#C9A227] transition-colors p-1" onClick={(e) => { e.stopPropagation(); }}>
            <Bookmark size={20} />
          </button>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <MapPin size={14} className="text-slate-400" /> {job.location}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <DollarSign size={14} className="text-emerald-500" /> {job.salary}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Briefcase size={14} className="text-amber-500" /> {job.experience}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Badge className="bg-blue-50 text-blue-700 border-none px-2 py-0 h-5 text-[9px] uppercase tracking-widest">{job.type}</Badge>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {job.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md text-[10px] font-extrabold text-slate-500">
              {tag}
            </span>
          ))}
          {job.tags.length > 3 && (
            <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md text-[10px] font-extrabold text-slate-500">
              +{job.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action */}
        <div className="pt-4 border-t border-slate-100">
          <Button 
            onClick={handleApply}
            className="w-full bg-slate-50 hover:bg-[#1B2A6B] text-slate-700 hover:text-white font-black h-11 rounded-xl text-xs shadow-none hover:shadow-[0_4px_15px_rgba(27,42,107,0.2)] transition-all group/btn uppercase tracking-wider flex items-center justify-center gap-2"
          >
            View Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
