import { MainLayout } from "../../src/layout/MainLayout";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { 
  Building, MapPin, Clock, DollarSign, Briefcase, 
  CheckCircle2, ArrowRight, Share2, Bookmark, Calendar
} from "lucide-react";
import Link from "next/link";
import { Button } from "../../src/components/ui/Button";
import { Card, CardContent } from "../../src/components/ui/Card";
import { Badge } from "../../src/components/ui/Badge";

export default function InternshipDetailsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const roleTitle = String(slug || 'Loading...').replace(/-/g, ' ');

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div className="flex gap-5">
                <div className="w-20 h-20 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center text-3xl font-extrabold shrink-0 shadow-sm border border-indigo-200">
                  T
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 capitalize leading-tight">
                    {roleTitle}
                  </h1>
                  <div className="flex items-center gap-2 text-lg text-slate-600 font-medium">
                    <Building size={20} className="text-slate-400" /> TechNova Solutions
                  </div>
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl text-slate-500 border-slate-300">
                  <Bookmark size={20} />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl text-slate-500 border-slate-300">
                  <Share2 size={20} />
                </Button>
                <Link href={`/apply/internship/${slug}`}>
                  <Button variant="primary" size="lg" className="h-12 px-8 text-base shadow-lg shadow-[#1B2A6B]/20">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-slate-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</div>
                  <div className="font-semibold text-slate-800">Remote</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <DollarSign size={18} className="text-slate-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stipend</div>
                  <div className="font-semibold text-emerald-600">₹15,000 - ₹20,000 /mo</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-slate-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</div>
                  <div className="font-semibold text-slate-800">6 Months</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Briefcase size={18} className="text-slate-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mode</div>
                  <div className="font-semibold text-slate-800">Full-time</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col lg:flex-row gap-8">
          
          {/* Left Column */}
          <div className="w-full lg:w-2/3 space-y-10">
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">About the Company</h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                TechNova Solutions is a fast-growing tech startup focused on building scalable enterprise applications. 
                We believe in empowering young talent and providing them with hands-on experience in a fast-paced agile environment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">About the Role</h2>
              <p className="text-slate-600 leading-relaxed text-sm mb-6">
                As a {roleTitle}, you will work directly with our engineering team to build user-facing features for our core product. 
                You will be responsible for translating design wireframes into high-quality code and optimizing components for maximum performance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {[
                  "Develop new user-facing features using React.js and Tailwind CSS.",
                  "Build reusable code and libraries for future use.",
                  "Ensure the technical feasibility of UI/UX designs.",
                  "Optimize application for maximum speed and scalability.",
                  "Collaborate with other team members and stakeholders."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Requirements</h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-slate-600 text-sm">
                <li>Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model.</li>
                <li>Thorough understanding of React.js and its core principles.</li>
                <li>Experience with popular React.js workflows (such as Flux or Redux).</li>
                <li>Familiarity with RESTful APIs.</li>
                <li>Knowledge of modern authorization mechanisms, such as JSON Web Token.</li>
                <li>Familiarity with modern front-end build pipelines and tools.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {["React.js", "TypeScript", "Tailwind CSS", "Git", "Redux", "REST APIs"].map((skill, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1 text-sm font-medium text-slate-700 bg-white border border-slate-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3">
            <div className="space-y-6 sticky top-28">
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Perks & Benefits</h3>
                  <ul className="space-y-4">
                    {[
                      { icon: DollarSign, text: "Competitive Stipend" },
                      { icon: Clock, text: "Flexible Working Hours" },
                      { icon: Building, text: "Pre-placement Offer (PPO)" },
                      { icon: Briefcase, text: "Letter of Recommendation" },
                    ].map((perk, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                          <perk.icon size={14} className="text-indigo-600" />
                        </div>
                        <span className="text-slate-700 text-sm font-medium">{perk.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Recruitment Timeline</h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
                    {[
                      { step: "Application Review", date: "Within 2 days" },
                      { step: "Technical Assignment", date: "Day 3-5" },
                      { step: "Technical Interview", date: "Day 7" },
                      { step: "HR Round & Offer", date: "Day 10" },
                    ].map((timeline, i) => (
                      <div key={i} className="relative flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0 z-10">
                          {i + 1}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{timeline.step}</div>
                          <div className="text-xs text-slate-500">{timeline.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
