import { MainLayout } from "../src/layout/MainLayout";
import { motion } from "framer-motion";
import { Briefcase, Heart, Zap, Globe, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../src/components/ui/Card";
import { Button } from "../src/components/ui/Button";

export default function CareersPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="pt-24 pb-20 bg-[#0d1635] text-white relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[50%] h-[100%] rounded-full bg-[#1B2A6B]/50 blur-[120px] pointer-events-none" 
        />
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight"
          >
            Build the future of <span className="text-[#C9A227]">Education</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Join a passionate team of educators, engineers, and designers on a mission to democratize premium tech education globally.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Button variant="gold" size="lg" className="px-8 font-bold">View Open Roles</Button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 bg-transparent min-h-screen">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Why join BlueBoxx?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We offer competitive salaries, equity, remote work flexibility, and a chance to make a real impact on students' lives.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Heart, title: "Healthcare", desc: "Comprehensive health, dental, and vision coverage." },
              { icon: Globe, title: "Work Anywhere", desc: "Remote-first culture with co-working allowances." },
              { icon: Zap, title: "Fast Growth", desc: "Rapid career progression in a hyper-growth startup." },
              { icon: Briefcase, title: "Equity", desc: "Stock options for all full-time employees." }
            ].map((perk, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <perk.icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{perk.title}</h3>
                  <p className="text-sm text-slate-600">{perk.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Open Positions</h2>
            <div className="space-y-4">
              {[
                { role: "Senior Frontend Engineer", team: "Engineering", location: "Remote (India)", type: "Full-time" },
                { role: "Product Manager", team: "Product", location: "Bangalore", type: "Full-time" },
                { role: "Technical Instructor (DSA)", team: "Education", location: "Remote", type: "Contract" },
                { role: "Growth Marketer", team: "Marketing", location: "Remote", type: "Full-time" }
              ].map((job, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#1B2A6B]/30 hover:shadow-md transition-all group">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1B2A6B] transition-colors">{job.role}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm font-semibold text-slate-500">
                      <span className="bg-slate-100 px-2 py-1 rounded-md">{job.team}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2 shrink-0 group-hover:bg-[#1B2A6B] group-hover:text-white group-hover:border-[#1B2A6B]">
                    Apply Now <ArrowRight size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </MainLayout>
  );
}
