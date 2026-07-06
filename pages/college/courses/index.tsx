import { CollegeDashboardLayout } from "../../../src/layout/CollegeDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { BookOpen, Star, Users, Clock, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const COURSES = [
  { id: 1, title: "Full Stack Web Development", duration: "6 months", enrolled: 450, rating: 4.8, category: "Tech", level: "Intermediate", instructor: "Ankit Sharma" },
  { id: 2, title: "Data Structures & Algorithms", duration: "4 months", enrolled: 320, rating: 4.7, category: "Tech", level: "Advanced", instructor: "Priya Verma" },
  { id: 3, title: "Digital Marketing Essentials", duration: "3 months", enrolled: 180, rating: 4.6, category: "Marketing", level: "Beginner", instructor: "Rahul Das" },
  { id: 4, title: "Accounting & Tally Prime", duration: "3 months", enrolled: 300, rating: 4.5, category: "Finance", level: "Beginner", instructor: "Meena Pillai" },
  { id: 5, title: "IoT & Embedded Systems", duration: "5 months", enrolled: 210, rating: 4.9, category: "Tech", level: "Advanced", instructor: "Dr. Reddy" },
  { id: 6, title: "Business Communication", duration: "2 months", enrolled: 500, rating: 4.4, category: "Soft Skills", level: "Beginner", instructor: "Kavya Nair" },
];

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700",
  Intermediate: "bg-blue-50 text-[#1B2A6B]",
  Advanced: "bg-[#C9A227]/10 text-[#b38c1e]",
};

export default function CollegeCoursesPage() {
  const [search, setSearch] = useState("");

  const filtered = COURSES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CollegeDashboardLayout>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Partner Courses</h1>
          <p className="text-slate-500 font-medium text-sm">Browse and manage BlueBoxx partner courses for your institution.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 text-sm focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none font-medium"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        {[
          { label: "Available Courses", value: COURSES.length, icon: BookOpen, color: "text-[#1B2A6B] bg-blue-50" },
          { label: "Total Enrolled", value: "1,960", icon: Users, color: "text-emerald-600 bg-emerald-50" },
          { label: "Avg. Rating", value: "4.7★", icon: Star, color: "text-[#C9A227] bg-[#C9A227]/10" },
        ].map((s, i) => (
          <AnimatedContent key={i} direction="up" delay={i * 0.07} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color} shrink-0`}>
              <s.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800">{s.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
            </div>
          </AnimatedContent>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((course, i) => (
          <AnimatedContent key={course.id} direction="up" delay={0.1 + i * 0.07} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group overflow-hidden">
            {/* Top accent */}
            <div className="h-1.5 bg-gradient-to-r from-[#1B2A6B] to-[#C9A227]" />
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${LEVEL_COLORS[course.level]}`}>{course.level}</span>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{course.category}</span>
              </div>
              <h3 className="text-base font-black text-slate-800 mb-1 group-hover:text-[#1B2A6B] transition-colors">{course.title}</h3>
              <p className="text-xs font-semibold text-slate-400 mb-4">by {course.instructor}</p>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Duration", val: course.duration, icon: Clock },
                  { label: "Enrolled", val: course.enrolled, icon: Users },
                  { label: "Rating", val: `${course.rating}★`, icon: Star },
                ].map((info, j) => (
                  <div key={j} className="text-center">
                    <p className="text-sm font-black text-slate-800">{info.val}</p>
                    <p className="text-[10px] font-bold text-slate-400">{info.label}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => toast(`Viewing details for ${course.title}`, { icon: "📘" })}
                className="w-full h-9 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-[#1B2A6B] hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                View Details <ChevronRight size={13} />
              </button>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </CollegeDashboardLayout>
  );
}
