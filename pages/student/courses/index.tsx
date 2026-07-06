import React, { useState } from "react";
import { StudentDashboardLayout } from "../../../src/layout/StudentDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { BookOpen, PlayCircle, CheckCircle2, Clock, Filter, Search, ChevronRight } from "lucide-react";
import Link from "next/link";

const COURSES = [
  { id: "react", title: "Advanced React Patterns", category: "Web Dev", progress: 65, lessons: 18, done: 12, status: "active", thumb: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop", instructor: "Arjun Mehta" },
  { id: "design", title: "UI/UX Design Masterclass", category: "Design", progress: 30, lessons: 24, done: 7, status: "active", thumb: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&auto=format&fit=crop", instructor: "Meera Joshi" },
  { id: "python", title: "Python for Data Science", category: "Data", progress: 100, lessons: 20, done: 20, status: "completed", thumb: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=400&auto=format&fit=crop", instructor: "Ravi Shankar" },
  { id: "marketing", title: "Digital Marketing Pro", category: "Marketing", progress: 100, lessons: 16, done: 16, status: "completed", thumb: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=400&auto=format&fit=crop", instructor: "Priya Nair" },
  { id: "node", title: "Node.js & Backend APIs", category: "Web Dev", progress: 10, lessons: 22, done: 2, status: "active", thumb: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&auto=format&fit=crop", instructor: "Kiran Patel" },
];

const STATUS_TABS = ["all", "active", "completed"];

export default function MyCoursesPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = COURSES.filter(c =>
    (filter === "all" || c.status === filter) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <StudentDashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 mb-1">My Courses</h1>
        <p className="text-slate-500 text-sm font-medium">Track your learning journey and continue where you left off.</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "In Progress", value: COURSES.filter(c => c.status === "active").length, icon: PlayCircle, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Completed", value: COURSES.filter(c => c.status === "completed").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total Lessons", value: COURSES.reduce((a, c) => a + c.done, 0), icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((s, i) => (
          <AnimatedContent key={i} direction="up" delay={i * 0.1} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800">{s.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
            </div>
          </AnimatedContent>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1">
          {STATUS_TABS.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all capitalize ${filter === t ? "bg-[#1B2A6B] text-white shadow" : "text-slate-500 hover:text-slate-800"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B2A6B] outline-none"
          />
        </div>
      </div>

      {/* Course cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((course, i) => (
          <AnimatedContent key={course.id} direction="up" delay={i * 0.07} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="relative h-40 overflow-hidden">
              <img src={course.thumb} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-[10px] font-black text-[#1B2A6B] rounded-full uppercase tracking-wider">
                  {course.category}
                </span>
              </div>
              {course.status === "completed" && (
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-full flex items-center gap-1">
                    <CheckCircle2 size={10} /> Done
                  </span>
                </div>
              )}
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-black text-slate-800 mb-1 text-base leading-snug">{course.title}</h3>
              <p className="text-xs text-slate-400 font-semibold mb-3">By {course.instructor}</p>

              <div className="mt-auto">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1"><Clock size={10} /> {course.done}/{course.lessons} Lessons</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                  <div
                    className={`h-full rounded-full transition-all ${course.status === "completed" ? "bg-emerald-500" : "bg-[#1B2A6B]"}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <Link
                  href={`/student/learn/${course.id}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1B2A6B] text-white rounded-xl font-bold text-sm hover:bg-[#0d1635] transition-colors"
                >
                  {course.status === "completed" ? "Review" : "Continue"} <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </StudentDashboardLayout>
  );
}
