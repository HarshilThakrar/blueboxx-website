import { MainLayout } from "../src/layout/MainLayout";
import { Card, CardContent } from "../src/components/ui/Card";
import { GraduationCap, MapPin, ExternalLink, Award } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import useSWR from "swr";
import api from "../src/lib/axios";

const fetcher = (url: string) => api.get(url).then(res => res.data);

const mockColleges = [
  { 
    name: "Sigma University", 
    location: "Vadodara, Gujarat", 
    type: "Private University",
    logoUrl: "https://logo.clearbit.com/sigmauniversity.ac.in",
    url: "https://sigmauniversity.ac.in/"
  },
  { 
    name: "Parul University", 
    location: "Vadodara, Gujarat", 
    type: "Private University",
    logoUrl: "https://logo.clearbit.com/paruluniversity.ac.in",
    url: "https://paruluniversity.ac.in/"
  },
  { 
    name: "ITM Vocational University", 
    location: "Vadodara, Gujarat", 
    type: "Private University",
    logoUrl: "https://logo.clearbit.com/itm.edu",
    url: "https://www.itm.edu/"
  },
  { 
    name: "RMS Polytechnic", 
    location: "Vadodara, Gujarat", 
    type: "Polytechnic Institute",
    logoUrl: "https://logo.clearbit.com/rms.edu.in",
    url: "http://rms.edu.in/"
  },
];

export default function CollegesPage() {
  const { data, isLoading } = useSWR("/public/colleges", fetcher);
  const colleges = data?.data && data.data.length > 0 ? data.data : mockColleges;

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-[#0d1635] text-white relative overflow-hidden">
        {/* Premium Grid Background */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#1B2A6B]/50 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white uppercase tracking-[0.2em] mb-6"
          >
            Academic Partners
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          >
            Empowering Students Through <br className="hidden md:block"/>
            <span className="text-[#C9A227]">Institutional Tie-Ups.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We partner with top universities and colleges to bring industry-ready practical training directly to campuses.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 bg-transparent min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {colleges.map((college, i) => (
              <motion.div
                key={college.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={college.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <Card className="group relative overflow-hidden bg-white hover:border-[#1B2A6B]/40 hover:shadow-[0_12px_40px_rgba(27,42,107,0.1)] hover:-translate-y-2.5 transition-all duration-300 h-full cursor-pointer rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <CardContent className="p-6 text-center relative z-10 flex flex-col items-center h-full">
                      <div className="w-20 h-20 rounded-xl bg-slate-50 flex items-center justify-center p-3 mb-5 group-hover:bg-slate-100 transition-all duration-500 shadow-sm border border-slate-100">
                        {college.logoUrl ? (
                          <img 
                            src={college.logoUrl} 
                            alt={college.name} 
                            className="h-full w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(college.name)}&background=random&color=fff`;
                            }}
                          />
                        ) : (
                          <GraduationCap size={32} className="text-slate-400 group-hover:text-[#1B2A6B] transition-colors" />
                        )}
                      </div>
                      
                      <h3 className="text-sm font-extrabold text-slate-900 mb-1.5 group-hover:text-[#1B2A6B] transition-colors line-clamp-2">
                        {college.name}
                      </h3>
                      
                      <p className="text-[10px] font-bold text-slate-500 flex items-center justify-center gap-1 mb-2">
                        <MapPin size={10} /> {college.location}
                      </p>

                      <span className="inline-block px-2.5 py-0.5 bg-slate-50 border border-slate-100 text-slate-500 text-[9px] font-extrabold uppercase tracking-wider rounded-md mt-1 group-hover:bg-[#1B2A6B]/5 group-hover:text-[#1B2A6B] group-hover:border-[#1B2A6B]/10 transition-colors">
                        {college.type}
                      </span>
                      
                      <div className="mt-auto pt-4 w-full border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#C9A227] uppercase tracking-wider flex items-center gap-1.5">
                          <Award size={12} /> Tie-Up
                        </span>
                        <div className="w-6 h-6 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-[#1B2A6B] group-hover:text-white transition-all duration-300">
                          <ExternalLink size={10} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
