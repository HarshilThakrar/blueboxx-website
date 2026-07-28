import React, { useState } from "react";
import { MainLayout } from "../../src/layout/MainLayout";
import { partnerCompanies, INDUSTRIES } from "../../src/data/companies";
import { TopSearchBar } from "../../src/components/ui/TopSearchBar";
import { FilterSidebar, FilterSection } from "../../src/components/ui/FilterSidebar";
import { Pagination } from "../../src/components/ui/Pagination";
import { Card, CardContent } from "../../src/components/ui/Card";
import { Button } from "../../src/components/ui/Button";
import {
  Building2, MapPin, Briefcase, ArrowRight,
  PlayCircle, ExternalLink, Star, Layers,
  Globe, Smartphone, Monitor, TrendingUp, Sparkles, Compass, Award
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import useSWR from "swr";
import api from "../../src/lib/axios";

const filterSections: FilterSection[] = [
  {
    id: "industry",
    title: "Industry",
    options: INDUSTRIES.slice(1, 8).map(ind => ({ label: ind, value: ind })),
  },
];

const mockProjects = [
  {
    id: 1,
    title: "Brand Identity & 3D Promo Film",
    client: "Anibrain Studios",
    category: "3D Animation",
    icon: "Monitor",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    description: "End-to-end brand film featuring photorealistic 3D product animation and motion graphics for theatrical release.",
    tags: ["3D Modeling", "VFX", "Motion Graphics"],
    duration: "8 weeks",
    deliverables: "Brand Film + 3 Teasers",
  },
  {
    id: 2,
    title: "Corporate E-Learning Platform",
    client: "AISECT",
    category: "Web Development",
    icon: "Globe",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    description: "Custom LMS web platform with live sessions, course tracking, certificate generation and payment integration.",
    tags: ["React", "Node.js", "MongoDB"],
    duration: "12 weeks",
    deliverables: "Full Platform + Admin Dashboard",
  },
  {
    id: 3,
    title: "Social Media Growth Campaign",
    client: "Lakshya Digital",
    category: "Digital Marketing",
    icon: "TrendingUp",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&q=80",
    description: "360 degree digital marketing campaign across Instagram, YouTube and Google Ads delivering 3x ROI in 90 days.",
    tags: ["SEO", "Paid Ads", "Content Strategy"],
    duration: "3 months",
    deliverables: "Campaign Report + Creative Assets",
  },
  {
    id: 4,
    title: "2D Explainer Series",
    client: "DQ Entertainment",
    category: "2D Animation",
    icon: "PlayCircle",
    color: "bg-orange-50 text-orange-600 border-orange-100",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    description: "Series of 10 animated explainer videos for a children's educational brand with custom characters and storyboards.",
    tags: ["2D Animation", "Storyboarding", "Voice-over"],
    duration: "6 weeks",
    deliverables: "10 Animated Videos",
  },
  {
    id: 5,
    title: "Product Packaging & Brand Design",
    client: "Vistaprint India",
    category: "Graphic Design",
    icon: "Layers",
    color: "bg-rose-50 text-rose-600 border-rose-100",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    description: "Complete brand identity redesign including logo, packaging, stationery, and brand guidelines for a product line.",
    tags: ["Logo Design", "Packaging", "Brand Identity"],
    duration: "4 weeks",
    deliverables: "Brand Kit + Style Guide",
  },
  {
    id: 6,
    title: "Mobile App UI/UX Design",
    client: "Hopmotion",
    category: "UI/UX Design",
    icon: "Smartphone",
    color: "bg-violet-50 text-violet-600 border-violet-100",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80",
    description: "Full mobile app UI/UX design with user research, wireframes, prototypes and a pixel-perfect Figma design system.",
    tags: ["Figma", "UX Research", "Prototyping"],
    duration: "5 weeks",
    deliverables: "Figma Prototype + Design System",
  },
];

const PROJECT_CATEGORIES = [
  "All", "3D Animation", "Web Development",
  "Digital Marketing", "2D Animation", "Graphic Design", "UI/UX Design",
];
import { SEO } from "../../src/components/seo/SEO";

export default function CompaniesPublicPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeProjectCategory, setActiveProjectCategory] = useState("All");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({ industry: [] });

  const iconMap: Record<string, React.ReactNode> = {
    Monitor: <Monitor size={14} />,
    Globe: <Globe size={14} />,
    TrendingUp: <TrendingUp size={14} />,
    PlayCircle: <PlayCircle size={14} />,
    Layers: <Layers size={14} />,
    Smartphone: <Smartphone size={14} />,
  };

  const filteredProjects =
    activeProjectCategory === "All"
      ? mockProjects
      : mockProjects.filter(p => p.category === activeProjectCategory);

  const handleFilterChange = (sectionId: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[sectionId] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [sectionId]: updated };
    });
  };

  const handleClearAll = () => setActiveFilters({ industry: [] });

  const { data: apiData } = useSWR("/public/companies", (url: string) => api.get(url).then(res => res.data));
  const companiesList = apiData?.data && apiData.data.length > 0 ? apiData.data : partnerCompanies;

  const filteredCompanies = companiesList.filter((company: any) => {
    const matchesIndustry =
      activeFilters.industry.length === 0 ||
      activeFilters.industry.includes(company.industry);
    return matchesIndustry;
  });

  return (
    <>
      <SEO 
        title="Top Hiring Partners & Placements | Blueboxx DA"
        description="We collaborate with industry leaders and innovative startups to ensure our learners land their dream roles and deliver high-impact live projects."
        keywords="Hire Developers, Hire Interns, Campus Hiring, Recruit Freshers, Recruit Software Engineers, Hire AI Developers"
      />
      <MainLayout>
        {/* Dark Blue Hero Section matching Placement Partners */}
      <div className="pt-24 pb-16 bg-[#0d1635] text-white relative overflow-hidden">
        {/* Premium Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#1B2A6B]/50 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white uppercase tracking-[0.2em] mb-6 animate-pulse"
          >
            Companies & Projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          >
            Collaborate with <br className="hidden md:block" />
            <span className="text-[#C9A227]">Industry Leaders.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We collaborate with industry leaders and innovative startups to ensure our learners land their dream roles and deliver high-impact live projects.
          </motion.p>
        </div>
      </div>

      {/* --- FEATURED PROJECTS SECTION (Transparent Background, White Cards, Animations) --- */}
      <div className="py-20 bg-transparent relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B2A6B]/10 text-[#1B2A6B] border border-[#1B2A6B]/20 text-xs font-bold tracking-wide mb-4">
              <Compass size={12} />
              <span>Project Portfolios</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Featured Deliverables
            </h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Real-world client work managed and executed across technical and creative domains.
            </p>
          </motion.div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-12">
            {PROJECT_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveProjectCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
                  activeProjectCategory === cat
                    ? "bg-[#1B2A6B] text-white border-[#1B2A6B] shadow-sm shadow-indigo-100"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Cards Grid with Scroll Reveal Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:border-[#C9A227]/45 hover:shadow-[0_12px_40px_rgba(201,162,39,0.1)] transition-all duration-300 flex flex-col h-full cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  
                  {/* Category badge */}
                  <div className={`absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide border shadow-sm ${project.color}`}>
                    {iconMap[project.icon]}
                    <span>{project.category}</span>
                  </div>

                  {/* Client badge */}
                  <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-extrabold shadow-sm border border-slate-200/40">
                    {project.client}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#1B2A6B] transition-colors leading-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-500 text-[10px] font-bold border border-slate-150">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider flex items-center gap-3">
                      <span>⏱ {project.duration}</span>
                      <span>•</span>
                      <span>📦 {project.deliverables}</span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-[#1B2A6B]/10 group-hover:text-[#1B2A6B] flex items-center justify-center transition-all duration-300 border border-slate-200/60">
                      <ExternalLink size={12} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-slate-500 text-xs font-semibold mb-4 uppercase tracking-wider">Interested in working with us?</p>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B2A6B] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#0d1635] transition-all shadow-md shadow-indigo-150 hover:-translate-y-0.5">
                Start a Project <ArrowRight size={14} />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Companies Listing (Transparent Background, White Cards, Animations) */}
      <div className="py-20 bg-transparent relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <TopSearchBar />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 hidden lg:block">
              <FilterSidebar
                sections={filterSections}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
              />
            </div>

            <main className="lg:col-span-3">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Hiring partners ({filteredCompanies.length})</h2>
              </div>

              {filteredCompanies.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredCompanies.slice((currentPage - 1) * 12, currentPage * 12).map((company, idx) => (
                      <motion.div
                        key={company.id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.04, ease: "easeOut" }}
                        whileHover={{ y: -6, scale: 1.01 }}
                      >
                        <Card
                          className="group relative overflow-hidden bg-white border border-slate-200/80 hover:border-[#C9A227]/45 hover:shadow-[0_12px_40px_rgba(201,162,39,0.1)] transition-all duration-300 flex flex-col h-full rounded-2xl cursor-pointer"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-amber-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                          
                          <CardContent className="p-5 flex-1 flex flex-col relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl border border-slate-150 bg-white shadow-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                                {company.logoUrl ? (
                                  <img
                                    src={company.logoUrl}
                                    alt={company.name}
                                    className="w-full h-full object-contain"
                                    onError={e => {
                                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff`;
                                    }}
                                  />
                                ) : (
                                  <Building2 size={20} className="text-slate-400" />
                                )}
                              </div>
                              <div>
                                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1B2A6B] transition-colors line-clamp-1">
                                  {company.name}
                                </h3>
                                <p className="text-[9px] font-extrabold text-[#C9A227] uppercase tracking-wider">{company.industry}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 mb-5 pt-3 border-t border-slate-100 mt-auto">
                              <div className="flex items-center gap-1"><MapPin size={12} className="text-slate-350" /> Remote / India</div>
                              <div className="flex items-center gap-1"><Briefcase size={12} className="text-slate-350" /> Hiring</div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-[10px] font-bold text-[#C9A227] w-full">
                              <Award size={12} /> Verified Partner
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                  {Math.ceil(filteredCompanies.length / 12) > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(filteredCompanies.length / 12)}
                      onPageChange={setCurrentPage}
                      className="mt-12"
                    />
                  )}
                </>
              ) : (
                <div className="py-20 text-center bg-white rounded-2xl border border-slate-200/80 shadow-sm">
                  <Building2 size={40} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-lg font-bold text-slate-800 mb-2">No companies found</h3>
                  <p className="text-slate-400 text-xs">There are no hiring partners matching your selection.</p>
                  <Button variant="outline" className="mt-4 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs font-bold" onClick={handleClearAll}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </MainLayout>
    </>
  );
}
