import { useRouter } from "next/router";
import { MainLayout } from "../../src/layout/MainLayout";
import { Button } from "../../src/components/ui/Button";
import { Card, CardContent } from "../../src/components/ui/Card";
import { Badge } from "../../src/components/ui/Badge";
import { 
  MapPin, Briefcase, DollarSign, Clock, Users, Building2, 
  CheckCircle2, ChevronRight, Share2, Bookmark, FileText
} from "lucide-react";

export default function JobDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // Mock data for the job
  const job = {
    title: "Frontend Developer (React.js)",
    company: "TechCorp Inc.",
    logo: "https://ui-avatars.com/api/?name=TechCorp&background=0d1635&color=fff",
    type: "Full-Time",
    location: "Mumbai, India (Hybrid)",
    salary: "₹12,00,000 - ₹18,00,000 / year",
    experience: "2-4 Years",
    postedAt: "2 days ago",
    applicants: 145,
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    aboutCompany: "TechCorp is a leading product company building the next generation of financial tools for small businesses. We are a team of 500+ passionate engineers, designers, and product managers.",
  };

  const responsibilities = [
    "Develop new user-facing features using React.js and Next.js.",
    "Build reusable components and front-end libraries for future use.",
    "Translate designs and wireframes into high-quality code.",
    "Optimize components for maximum performance across a vast array of web-capable devices and browsers.",
    "Collaborate with backend engineers to integrate RESTful APIs."
  ];

  const requirements = [
    "2+ years of professional experience with React.js.",
    "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model.",
    "Experience with TypeScript and modern React patterns (Hooks, Context).",
    "Familiarity with RESTful APIs and GraphQL.",
    "Experience with popular React workflows (such as Redux or Zustand).",
    "Familiarity with modern front-end build pipelines and tools (Webpack, Vite)."
  ];

  return (
    <MainLayout>
      {/* Header Section */}
      <div className="bg-slate-50 border-b border-slate-200 pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 justify-between items-start">
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 bg-white rounded-2xl p-2 shadow-md border border-slate-100 shrink-0">
                <img src={job.logo} alt={job.company} className="w-full h-full rounded-xl object-cover" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-800">{job.title}</h1>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none ml-2 shadow-sm font-extrabold uppercase tracking-wider text-[10px]">{job.type}</Badge>
                </div>
                <div className="text-lg font-bold text-[#1B2A6B] mb-4 flex items-center gap-2">
                  <Building2 size={20} /> {job.company}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"><MapPin size={16} className="text-slate-400"/> {job.location}</span>
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"><DollarSign size={16} className="text-emerald-500"/> {job.salary}</span>
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"><Briefcase size={16} className="text-amber-500"/> {job.experience}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full lg:w-auto">
              <Button variant="outline" className="w-12 h-12 p-0 rounded-xl border-slate-200 text-slate-400 hover:text-[#1B2A6B] hover:bg-slate-100 shrink-0">
                <Share2 size={20} />
              </Button>
              <Button variant="outline" className="w-12 h-12 p-0 rounded-xl border-slate-200 text-slate-400 hover:text-[#C9A227] hover:bg-amber-50 shrink-0">
                <Bookmark size={20} />
              </Button>
              <Button className="flex-1 lg:w-48 bg-[#1B2A6B] hover:bg-[#0d1635] text-white font-black h-12 rounded-xl text-sm shadow-[0_4px_15px_rgba(27,42,107,0.2)] transition-all gap-2 uppercase tracking-wider">
                Apply Now <ChevronRight size={16} />
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Column (Job Details) */}
          <div className="flex-1 lg:max-w-3xl space-y-12">
            
            {/* Required Skills */}
            <div>
              <h2 className="text-lg font-black text-slate-800 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-[#1B2A6B] transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            <div>
              <h2 className="text-xl font-black text-slate-800 mb-6">Key Responsibilities</h2>
              <ul className="space-y-4">
                {responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#1B2A6B]"></div>
                    </div>
                    <span className="text-sm font-semibold text-slate-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-xl font-black text-slate-800 mb-6">What We're Looking For</h2>
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm">
                <ul className="space-y-4">
                  {requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* About Company */}
            <div>
              <h2 className="text-xl font-black text-slate-800 mb-4">About {job.company}</h2>
              <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                {job.aboutCompany}
              </p>
              <Button variant="outline" className="border-[#1B2A6B]/20 text-[#1B2A6B] h-10 text-[11px] font-extrabold uppercase tracking-wider rounded-lg px-6 hover:bg-blue-50">
                View Company Profile
              </Button>
            </div>

          </div>

          {/* Right Column (Sticky Apply Card) */}
          <div className="w-full lg:w-[360px] shrink-0">
            <div className="sticky top-32 space-y-6">
              
              <Card className="bg-white border border-slate-100 shadow-[0_20px_40px_rgba(27,42,107,0.06)] rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-slate-500 flex items-center gap-2"><Clock size={16}/> Posted</span>
                      <span className="font-black text-slate-800">{job.postedAt}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-slate-500 flex items-center gap-2"><Users size={16}/> Applicants</span>
                      <span className="font-black text-slate-800">{job.applicants} applied</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-[#1B2A6B] hover:bg-[#0d1635] text-white font-black h-14 rounded-xl text-sm shadow-[0_8px_20px_rgba(27,42,107,0.2)] transition-all hover:-translate-y-1 gap-2 uppercase tracking-wider">
                      <FileText size={18} /> Apply with Profile
                    </Button>
                    <p className="text-center text-[11px] font-bold text-slate-400 mt-2">
                      Uses your BlueBoxx student profile & resume.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Jobs Promo */}
              <Card className="bg-gradient-to-br from-[#0d1635] to-[#1B2A6B] border-none shadow-lg rounded-3xl overflow-hidden text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A227]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <CardContent className="p-6 relative z-10">
                  <h3 className="font-black text-lg mb-2">Want to ace the interview?</h3>
                  <p className="text-xs text-slate-300 font-medium mb-5 leading-relaxed">Book a 1:1 session with an expert who works at TechCorp.</p>
                  <Button className="w-full h-10 text-[10px] font-black bg-[#C9A227] hover:bg-amber-400 text-[#0d1635] transition-all rounded-xl shadow-lg uppercase tracking-wider border-none">
                    Find a Mentor
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
