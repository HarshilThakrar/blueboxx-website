import { useState, useEffect } from "react";
import { MainLayout } from "../src/layout/MainLayout";
import { Filter, Briefcase, Clock, ArrowRight, Building, Loader2 } from "lucide-react";
import { TopSearchBar } from "../src/components/ui/TopSearchBar";
import { SidebarFilter } from "../src/components/ui/SidebarFilter";
import { Pagination } from "../src/components/ui/Pagination";
import { Card, CardContent } from "../src/components/ui/Card";
import { Badge } from "../src/components/ui/Badge";
import { Button } from "../src/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { TestimonialSection } from "../src/sections/TestimonialSection";
import { PartnersSection } from "../src/sections/PartnersSection";
import { SEO } from "../src/components/seo/SEO";
import api from "../src/lib/axios";

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>({});
  
  const [jobs, setJobs] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const params: any = {
          page: currentPage,
          per_page: 6,
          sort: sortOption,
        };
        
        let searchTerms = [];
        if (searchQuery) searchTerms.push(searchQuery);
        if (activeFilters.role) searchTerms.push(activeFilters.role);
        if (searchTerms.length > 0) params.search = searchTerms.join(' ');
        
        if (activeFilters.mode) {
           if (activeFilters.mode === "Remote") {
               params.location = "Remote";
           }
        }
        if (activeFilters.experience) {
           params.experience_level = activeFilters.experience.split(' ')[0];
        }
        if (activeFilters.type) {
           params.job_type = activeFilters.type;
        }
        if (activeFilters.salary) {
           const match = activeFilters.salary.match(/(\d+)(?:-(\d+))?\s+LPA/);
           if (match) {
               params.min_salary = parseInt(match[1]) * 100000;
               if (match[2]) params.max_salary = parseInt(match[2]) * 100000;
           } else if (activeFilters.salary === "25+ LPA") {
               params.min_salary = 2500000;
           }
        }

        const res = await api.get("/public/jobs", { params });
        if (res.data.success) {
          setJobs(res.data.data);
          setTotalPages(res.data.pagination.last_page);
          setTotalJobs(res.data.pagination.total);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Add debounce for search query
    const delayDebounceFn = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, sortOption, searchQuery, activeFilters]);

  return (
    <>
      <SEO 
        title="Find Top IT Jobs & Placements | Blueboxx DA"
        description="Browse hundreds of curated job openings from top product companies and fast-growing startups. 100% placement assistance available."
        keywords="Blueboxx Placement, Blueboxx Jobs, IT Jobs Vadodara, Software Developer Jobs, Placement Assistance, Campus Placement, Job Portal, Hiring Platform, Career Opportunities, Job Ready Program"
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
            Find Your <span className="text-[#C9A227]">Next Big Opportunity</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Browse hundreds of curated job openings from top product companies and fast-growing startups.
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

          <TopSearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search jobs by role or company..." />

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
              <SidebarFilter type="jobs" onFilterChange={setActiveFilters} />
            </div>

            <main className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-slate-800 text-lg">Showing {totalJobs} jobs</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 font-semibold">Sort by:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 px-3 py-1.5 focus:ring-[#C9A227] focus:border-[#C9A227] cursor-pointer outline-none"
                  >
                    <option value="newest">Most Recent</option>
                    <option value="salary_high">Highest Salary</option>
                  </select>
                </div>
              </div>

              {isLoading ? (
                <div className="py-20 text-center flex justify-center">
                  <Loader2 className="animate-spin text-[#1B2A6B] w-10 h-10" />
                </div>
              ) : jobs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobs.map((job) => (
                      <Card key={job.id} className="group relative overflow-hidden bg-white border border-slate-200 hover:border-[#1B2A6B]/30 hover:shadow-[0_8px_30px_rgba(27,42,107,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full rounded-[1.25rem]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#1B2A6B]/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"></div>
                        <CardContent className="p-4 flex-1 flex flex-col relative z-10">
                          <div className="flex justify-between items-start mb-3">
                            <div className="w-10 h-10 rounded-lg border border-slate-100 bg-slate-50 shadow-sm shrink-0 overflow-hidden">
                              <img src={job.company_logo || `https://ui-avatars.com/api/?name=${job.company_name}&background=random`} alt={job.company_name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md text-xs font-bold shadow-sm">
                              <Briefcase size={10} className="text-[#1B2A6B]" /> {job.experience_level || job.job_type}
                            </div>
                          </div>

                          <h3 className="text-base font-extrabold text-slate-900 mb-0.5 group-hover:text-[#1B2A6B] transition-colors leading-tight line-clamp-1">{job.title}</h3>
                          <p className="text-[11px] font-bold text-slate-500 mb-3 flex items-center gap-1">
                            <Building size={12} /> {job.company_name} • {job.location}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 mb-5">
                            {job.is_featured && (
                              <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none font-bold text-[9px] px-2 py-0.5 rounded-md shadow-sm">Featured</Badge>
                            )}
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                            <div>
                              <div className="text-xs font-extrabold text-emerald-600 mb-0.5">
                                {job.hide_salary ? 'Undisclosed' : job.salary_min ? `₹${job.salary_min.toLocaleString()} - ₹${job.salary_max.toLocaleString()}` : 'Not Specified'}
                              </div>
                              <div className="text-[9px] text-slate-400 font-bold flex items-center gap-1">
                                <Clock size={10} /> POSTED {job.posted_at?.toUpperCase()}
                              </div>
                            </div>
                            <Link href={`/apply/job/${job.id}`}>
                              <Button variant="outline" className="h-7 text-xs font-bold border-slate-200 text-slate-700 bg-slate-50 group-hover:bg-[#1B2A6B] group-hover:text-white group-hover:border-[#1B2A6B] transition-colors shadow-sm rounded-lg px-3">
                                Apply
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      className="mt-12"
                    />
                  )}
                </>
              ) : (
                <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <Briefcase size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 mb-2">No jobs found</h3>
                  <p className="text-slate-500">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <TestimonialSection 
        type="job" 
        titleHighlight="Alumni"
        subtitle="Read success stories from our alumni who landed their dream jobs through our placement network."
      />
      <PartnersSection 
        titlePrefix="Top Hiring " 
        highlightText="Companies" 
        subtitle="Browse opportunities from 120+ hiring partners across industries" 
      />
    </MainLayout>
    </>
  );
}
