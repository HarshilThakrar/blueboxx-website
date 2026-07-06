import { MainLayout } from "../src/layout/MainLayout";
import { Card, CardContent } from "../src/components/ui/Card";
import { Building2, Award } from "lucide-react";
import { motion } from "framer-motion";

const partners = [
  { name: "Vistaprint", logoUrl: "https://logo.clearbit.com/vistaprint.com" },
  { name: "Framestore", logoUrl: "https://logo.clearbit.com/framestore.com" },
  { name: "Anibrain", logoUrl: "https://logo.clearbit.com/anibrain.com" },
  { name: "Weta Digital", logoUrl: "https://logo.clearbit.com/wetafx.co.nz" },
  { name: "Method Studios", logoUrl: "https://logo.clearbit.com/methodstudios.com" },
  { name: "Basilic Fly Studio", logoUrl: "https://logo.clearbit.com/basilicfly.com" },
  { name: "Lakshya Digital", logoUrl: "https://logo.clearbit.com/lakshyadigital.com" },
  { name: "Tau Films", logoUrl: "https://logo.clearbit.com/taufilms.com" },
  { name: "Office Beacon", logoUrl: "https://logo.clearbit.com/officebeacon.com" },
  { name: "DQ Entertainment", logoUrl: "https://logo.clearbit.com/dqentertainment.com" },
  { name: "Hopmotion", logoUrl: "https://logo.clearbit.com/hopmotion.com" },
  { name: "AISECT", logoUrl: "https://logo.clearbit.com/aisect.org" },
  { name: "ADF Aroma De France", logoUrl: "https://logo.clearbit.com/aromadefrance.com" },
  { name: "Contiloe Pictures", logoUrl: "https://logo.clearbit.com/contiloe.in" },
  { name: "Golden Robot", logoUrl: "https://logo.clearbit.com/goldenrobot.com" },
  { name: "After Studios", logoUrl: "https://logo.clearbit.com/after.studio" }
];

export default function PlacementPartnersPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-[#0d1635] text-white relative overflow-hidden">
        {/* Premium Grid Background */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#1B2A6B]/50 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white uppercase tracking-[0.2em] mb-6"
          >
            Placement Partners
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          >
            Our Elite <br className="hidden md:block"/>
            <span className="text-[#C9A227]">Hiring Network.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We collaborate with industry leaders and innovative startups to ensure our learners land their dream roles.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 bg-transparent min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="group relative overflow-hidden bg-white hover:border-[#C9A227]/45 hover:shadow-[0_12px_40px_rgba(201,162,39,0.1)] hover:-translate-y-2.5 transition-all duration-300 h-full cursor-pointer rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <CardContent className="p-8 text-center relative z-10 flex flex-col items-center h-full">
                    <div className="w-24 h-16 rounded-xl bg-slate-50 flex items-center justify-center p-2 mb-6 group-hover:bg-slate-100 transition-all duration-500 shadow-sm border border-slate-100">
                      <img 
                        src={partner.logoUrl} 
                        alt={partner.name} 
                        className="h-full w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=random&color=fff`;
                        }}
                      />
                    </div>
                    
                    <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-[#1B2A6B] transition-colors leading-tight">
                      {partner.name}
                    </h3>
                    
                    <div className="mt-auto pt-4 w-full border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-xs font-bold text-[#C9A227]">
                      <Award size={14} /> Verified Partner
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
