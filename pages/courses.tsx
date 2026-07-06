import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { MainLayout } from '../src/layout/MainLayout';
import { dummyCourses as courses } from '../src/data/courses';
import { Badge } from '../src/components/ui/Badge';
import { Card } from '../src/components/ui/Card';
import { Pagination } from '../src/components/ui/Pagination';
import { TopSearchBar } from '../src/components/ui/TopSearchBar';
import { SidebarFilter } from '../src/components/ui/SidebarFilter';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import { PartnersSection } from '../src/sections/PartnersSection';

export default function CoursesPage() {
  const router = useRouter();
  const [sortOption, setSortOption] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  let sortedCourses = [...courses];
  if (sortOption === "price-asc") sortedCourses.sort((a, b) => a.price - b.price);
  if (sortOption === "price-desc") sortedCourses.sort((a, b) => b.price - a.price);
  if (sortOption === "rating-desc") sortedCourses.sort((a, b) => b.rating - a.rating);

  return (
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
            Explore Premium <span className="text-[#C9A227]">Programs</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Industry-aligned curriculum built by experts from top product companies.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 min-h-screen relative overflow-hidden" style={{background: "linear-gradient(135deg, #f8faff 0%, #fafafa 40%, #fffdf5 100%)"}}>
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.55]" style={{backgroundImage: "radial-gradient(#c7d2fe 1px, transparent 1px)", backgroundSize: "28px 28px"}} />
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-[#1B2A6B]/8 to-transparent rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#C9A227]/8 to-transparent rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-50/60 to-transparent rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          
          <TopSearchBar />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 hidden lg:block">
              <SidebarFilter type="courses" />
            </div>

            <main className="lg:col-span-3">
              <div className="flex justify-end items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 font-semibold">Sort by:</span>
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-transparent text-sm font-bold text-slate-800 border-none focus:ring-0 cursor-pointer outline-none"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Highest Rated</option>
                  </select>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-[400px]">
                      <div className="w-full h-44 bg-slate-200"></div>
                      <div className="p-4 space-y-4">
                        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-200 rounded w-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                        <div className="pt-4 mt-6 border-t border-slate-100 flex justify-between">
                          <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : sortedCourses.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {sortedCourses.slice((currentPage - 1) * 6, currentPage * 6).map((course) => (
                      <Card 
                        key={course.id} 
                        className="overflow-hidden group flex flex-col hover:border-[#1B2A6B]/30 hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                        onClick={() => router.push(`/courses/${course.slug}`)}
                      >
                        <div className="relative aspect-[16/9] overflow-hidden bg-slate-200 shrink-0">
                          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
                            <Badge className="bg-white/90 text-slate-900 hover:bg-white border-none shadow-sm backdrop-blur-sm text-[10px] py-0">{course.category}</Badge>
                            {course.badges.map(b => (
                              <Badge key={b} variant="gold" className="shadow-sm text-[10px] py-0 px-2">{b}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="p-4 flex flex-col flex-1">
                          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#1B2A6B] transition-colors line-clamp-2 leading-tight mb-1.5">
                            {course.title}
                          </h3>
                          
                          <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{course.shortDesc}</p>
                          
                          {/* Trust Avatars */}
                          <div className="flex items-center gap-2 mb-4 mt-auto">
                            <div className="flex -space-x-1.5">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <img key={i} src={`https://i.pravatar.cc/100?u=${course.id}-${i}`} className="w-5 h-5 rounded-full border border-white shadow-sm relative" style={{ zIndex: 5 - i }} alt="Student" />
                              ))}
                            </div>
                            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">{course.students.toLocaleString()} Enrolled</span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600 mb-5">
                            <div className="flex items-center gap-1"><Clock size={12} className="text-[#1B2A6B]"/> {course.duration}</div>
                            <div className="flex items-center gap-1"><Star size={12} className="text-[#C9A227] fill-[#C9A227]"/> {course.rating}</div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <div>
                              <div className="text-[10px] text-slate-400 font-bold line-through mb-0.5">₹{course.originalPrice.toLocaleString()}</div>
                              <div className="text-lg font-black text-slate-900 leading-none">₹{course.price.toLocaleString()}</div>
                            </div>
                            <button className="h-8 flex items-center justify-center text-xs font-bold bg-[#1B2A6B] hover:bg-[#0d1635] text-white transition-all rounded-lg shadow-md px-4 gap-1.5 border-none cursor-pointer group-hover:bg-[#C9A227] group-hover:text-[#0d1635] group-hover:shadow-lg">
                              Enroll <ArrowRight size={14}/>
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  {Math.ceil(sortedCourses.length / 6) > 1 && (
                    <Pagination 
                      currentPage={currentPage} 
                      totalPages={Math.ceil(sortedCourses.length / 6)} 
                      onPageChange={setCurrentPage} 
                      className="mt-12"
                    />
                  )}
                </>
              ) : (
                <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">No courses found</h3>
                  <p className="text-slate-500">There are no courses available at the moment.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <PartnersSection 
        titlePrefix="Instructors from " 
        highlightText="Top Companies" 
        subtitle="Learn from instructors at world's top tech and product companies" 
      />
    </MainLayout>
  );
}
