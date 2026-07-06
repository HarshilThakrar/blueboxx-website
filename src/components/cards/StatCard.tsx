import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  colorClass?: string;
  bgClass?: string;
}

export function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  change, 
  trend = 'up',
  colorClass = "text-[#1B2A6B]", 
  bgClass = "bg-blue-50" 
}: StatCardProps) {
  
  const getTrendColor = () => {
    if (trend === 'up') return "bg-emerald-50 text-emerald-700";
    if (trend === 'down') return "bg-red-50 text-red-700";
    return "bg-slate-50 text-slate-700";
  };

  const TrendIcon = trend === 'down' ? TrendingDown : TrendingUp;

  return (
    <Card className="bg-white border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(13,22,53,0.08)] hover:-translate-y-1 transition-all duration-300 rounded-2xl group overflow-hidden">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgClass} ${colorClass} group-hover:scale-110 transition-transform`}>
            <Icon size={20} />
          </div>
          {change && (
            <Badge className={`${getTrendColor()} border-none flex items-center gap-1 shadow-sm`}>
              <TrendIcon size={12} /> {change}
            </Badge>
          )}
        </div>
        <div>
          <div className="text-2xl font-black text-slate-800 leading-none mb-1 group-hover:text-[#0d1635] transition-colors">
            {value}
          </div>
          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            {label}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
