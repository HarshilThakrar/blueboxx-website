import { useState } from "react";
import { MainLayout } from "../src/layout/MainLayout";
import { Filter } from "lucide-react";
import { dummyInternships } from "../src/data/internships";
import { TopSearchBar } from "../src/components/ui/TopSearchBar";
import { SidebarFilter } from "../src/components/ui/SidebarFilter";
import { Pagination } from "../src/components/ui/Pagination";
import { Card, CardContent } from "../src/components/ui/Card";
import { Badge } from "../src/components/ui/Badge";
import { Button } from "../src/components/ui/Button";
import { Briefcase, Clock, ArrowRight, Building } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HowToEarnSection } from "../src/sections/HowToEarnSection";
import { TestimonialSection } from "../src/sections/TestimonialSection";
import { PartnersSection } from "../src/sections/PartnersSection";
import { useJobStore } from "../src/store/useJobStore";
import { SEO } from "../src/components/seo/SEO";

export default function InternshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const storeInternships = useJobStore((s) => s.getPublicInternships());

  // Convert store internships to dummyInternships shape and merge
  const storeMapped = storeInternships.map((j) => ({
    id: j.id,
    slug: j.id,
    title: j.title,
    company: j.company,
    location: j.locationType === "Remote" ? "Remote" : j.location,
    stipend: j.salary,
    duration: "3-6 Months",
    postedAt: j.postedAt,
    tags: j.skills,
    type: j.type,
  }));

  const allInternships = [...storeMapped, ...dummyInternships];

  const [activeFilters, setActiveFilters] = useState<any>({});

  const filteredInternships = allInternships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) || internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Live Sidebar Filters
    const matchesDomain = activeFilters.domain ? internship.title.toLowerCase().includes(activeFilters.domain.split(' ')[0].toLowerCase()) : true;
    const matchesMode = activeFilters.mode ? (activeFilters.mode === "Remote" ? internship.location === "Remote" : internship.location !== "Remote") : true;
    const matchesDuration = activeFilters.duration ? internship.duration === activeFilters.duration : true;

    return matchesSearch && matchesDomain && matchesMode && matchesDuration;
  });

  const sortedInternships = [...filteredInternships].sort((a, b) => {
    if (sortOption === "highest-stipend") {
      const aVal = parseInt(a.stipend.replace(/[^0-9]/g, '')) || 0;
      const bVal = parseInt(b.stipend.replace(/[^0-9]/g, '')) || 0;
      return bVal - aVal;
    }
    return 0;
  });

  return (
    <>
      <SEO 
        title="Guaranteed Paid Internships for Students | Blueboxx DA"
        description="Apply for premium internships with real clients. Build your portfolio, gain hands-on experience, and get paid while learning. 100% placement assistance."
        keywords="Blueboxx Internship, IT Internship, Summer Internship, Final Year Internship, Industrial Training, Live Projects, Career Guidance, Best Internship Program for Students, Internship in Vadodara"
      />
      <MainLayout>
        {/* Hero Section */}
      <div className="pt-24 pb-16 bg-[#0d1635] text-white relative overflow-hidden">
        {/* Premium Grid Background */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#1B2A6B]/50 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          >
            Guaranteed <span className="text-[#C9A227]">Internships</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Apply for live projects with real clients, build your portfolio, and get paid while learning.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f8faff 0%, #fafafa 40%, #fffdf5 100%)" }}>
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.55]" style={{ backgroundImage: "radial-gradient(#c7d2fe 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-[#1B2A6B]/8 to-transparent rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#C9A227]/8 to-transparent rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-50/60 to-transparent rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">

          <TopSearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search internships by title or company..." />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:hidden">
              <Button 
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} 
                variant="outline" 
                className="w-full border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm h-12 rounded-xl gap-2 font-extrabold text-sm uppercase tracking-wider"
              >
                <Filter size={16} /> Filters
              </Button>
            </div>

            <div className={`lg:col-span-1 ${isMobileFilterOpen ? 'block' : 'hidden'} lg:block`}>
              <SidebarFilter type="internships" onFilterChange={setActiveFilters} />
            </div>

            <main className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-slate-800 text-lg">Showing {sortedInternships.length} internships</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 font-semibold">Sort by:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 px-3 py-1.5 focus:ring-[#C9A227] focus:border-[#C9A227] cursor-pointer outline-none"
                  >
                    <option value="latest">Latest</option>
                    <option value="highest-stipend">Highest Stipend</option>
                  </select>
                </div>
              </div>

              {sortedInternships.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedInternships.slice((currentPage - 1) * 6, currentPage * 6).map((internship) => (
                      <Card key={internship.id} className="group relative overflow-hidden bg-white border border-slate-200 hover:border-[#1B2A6B]/30 hover:shadow-[0_8px_30px_rgba(27,42,107,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full rounded-[1.25rem]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#1B2A6B]/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"></div>
                        <CardContent className="p-4 flex-1 flex flex-col relative z-10">
                          <div className="flex justify-between items-start mb-3">
                            <div className="w-10 h-10 rounded-lg border border-slate-100 bg-slate-50 shadow-sm shrink-0 overflow-hidden">
                              <img src={`https://logo.clearbit.com/${internship.company.toLowerCase().replace(/\s+/g, '')}.com`} onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${internship.company}&background=random` }} alt={internship.company} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md text-xs font-bold shadow-sm">
                              <Clock size={10} className="text-[#1B2A6B]" /> {internship.duration}
                            </div>
                          </div>

                          <h3 className="text-base font-extrabold text-slate-900 mb-0.5 group-hover:text-[#1B2A6B] transition-colors leading-tight line-clamp-1">{internship.title}</h3>
                          <p className="text-[11px] font-bold text-slate-500 mb-3 flex items-center gap-1">
                            <Building size={12} /> {internship.company}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 mb-5">
                            {(internship.tags || []).slice(0, 3).map((skill: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none font-bold text-[9px] px-2 py-0.5 rounded-md shadow-sm">{skill}</Badge>
                            ))}
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                            <div>
                              <div className="text-xs font-extrabold text-emerald-600 mb-0.5">{internship.stipend}</div>
                              <div className="text-[9px] text-slate-400 font-bold uppercase flex items-center gap-1">
                                <Clock size={10} /> {internship.duration}
                              </div>
                            </div>
                            <Link href={`/apply/internship/${internship.slug}`}>
                              <Button variant="outline" className="h-7 text-xs font-bold border-slate-200 text-slate-700 bg-slate-50 group-hover:bg-[#1B2A6B] group-hover:text-white group-hover:border-[#1B2A6B] transition-colors shadow-sm rounded-lg px-3">
                                Apply
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {Math.ceil(sortedInternships.length / 6) > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(sortedInternships.length / 6)}
                      onPageChange={setCurrentPage}
                      className="mt-12"
                    />
                  )}
                </>
              ) : (
                <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">No internships found</h3>
                  <p className="text-slate-500">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <HowToEarnSection />
      <TestimonialSection 
        type="internship" 
        subtitle="Real success feedback from learners who joined our internship track and built real-world projects." 
      />
      <PartnersSection 
        titlePrefix="Experts from " 
        highlightText="Top Companies" 
        subtitle="Our experts have hands-on experience from top companies and organizations" 
      />
    </MainLayout>
    </>
  );
}
