import { MainLayout } from "../../src/layout/MainLayout";
import { CourseCard, CourseProps } from "../../src/components/cards/CourseCard";
import { Button } from "../../src/components/ui/Button";
import { Search, Filter } from "lucide-react";
import { TestimonialSection } from "../../src/sections/TestimonialSection";
import { PartnersSection } from "../../src/sections/PartnersSection";

export default function CoursesPage() {
  const courses: CourseProps[] = [
    {
      id: 1,
      title: "Full Stack Web Development (MERN)",
      instructor: "Ankit Sharma",
      rating: 4.8,
      students: 85200,
      duration: "8h 20m",
      modules: 12,
      price: "₹3,499",
      rawPrice: 3499,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      category: "Development"
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Priya Desai",
      rating: 4.9,
      students: 42100,
      duration: "6h 45m",
      modules: 8,
      price: "₹2,999",
      rawPrice: 2999,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      category: "Design"
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      instructor: "Rahul Verma",
      rating: 4.7,
      students: 112000,
      duration: "15h 30m",
      modules: 24,
      price: "₹4,999",
      rawPrice: 4999,
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
      category: "Computer Science"
    },
    {
      id: 4,
      title: "Complete Python Bootcamp",
      instructor: "Sarah Jenkins",
      rating: 4.6,
      students: 95000,
      duration: "22h 15m",
      modules: 30,
      price: "₹1,999",
      rawPrice: 1999,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=800&q=80",
      category: "Programming"
    }
  ];

  return (
    <MainLayout>
      <div>
        <div className="bg-[#0d1635] pt-24 pb-16 relative overflow-hidden">
          {/* Premium Grid Background */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#1B2A6B]/50 blur-[120px] pointer-events-none" />
          
          {/* Header Section */}
          <div className="text-white relative z-10">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">Browse All Courses</h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                Learn from industry experts and take your career to the next level.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto flex gap-2">
                <div className="relative flex-1">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="What do you want to learn?" 
                    className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]/50 transition-all placeholder-slate-500"
                  />
                </div>
                <Button className="bg-[#C9A227] hover:bg-amber-400 text-[#0d1635] font-black h-14 rounded-xl px-8 shadow-[0_0_20px_rgba(201,162,39,0.3)] uppercase tracking-wider hidden md:flex hover:-translate-y-0.5 transition-all">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-slate-900">Trending Courses</h2>
              <Button variant="outline" className="border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm h-10 px-4 rounded-xl gap-2 font-extrabold text-xs uppercase tracking-wider">
                <Filter size={14} /> Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <TestimonialSection />
      <PartnersSection 
        titlePrefix="Instructors from " 
        highlightText="Top Companies" 
        subtitle="Learn from instructors at world's top tech and product companies" 
      />
    </MainLayout>
  );
}
