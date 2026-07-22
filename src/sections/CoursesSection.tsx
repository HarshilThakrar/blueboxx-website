import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../animations/variants";
import { Star, Clock, Users, ArrowRight, Code, PenTool, BarChart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TiltCard } from "../components/ui/TiltCard";

const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    duration: "6 Months",
    rating: 4.9,
    students: "1,200+",
    price: "₹24,999",
    origPrice: "₹39,999",
    badge: "Best Seller",
    icon: Code,
    badgeColor: "text-amber-700 bg-amber-50 border border-amber-200",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=240&fit=crop&auto=format",
    accentFrom: "#1B2A6B",
    accentTo: "#2E45A3",
    slug: "full-stack-web-development"
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    duration: "4 Months",
    rating: 4.8,
    students: "850+",
    price: "₹18,999",
    origPrice: "₹29,999",
    badge: "Trending",
    icon: PenTool,
    badgeColor: "text-violet-700 bg-violet-50 border border-violet-200",
    tags: ["Figma", "Prototyping", "Research"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=640&h=240&fit=crop&auto=format",
    accentFrom: "#3b1f6b",
    accentTo: "#6d28d9",
    slug: "ui-ux-design-masterclass"
  },
  {
    id: 3,
    title: "Data Analytics & Visualization",
    duration: "3 Months",
    rating: 4.9,
    students: "640+",
    price: "₹15,999",
    origPrice: "₹24,999",
    badge: "New",
    icon: BarChart,
    badgeColor: "text-emerald-700 bg-emerald-50 border border-emerald-200",
    tags: ["Python", "Tableau", "SQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=240&fit=crop&auto=format",
    accentFrom: "#065f46",
    accentTo: "#059669",
    slug: "data-analytics-visualization"
  },
];

export const CoursesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#f0f4ff 0%,#eef2ff 60%,#f4f6ff 100%)" }}>
      {/* Fine grid lines */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(27,42,107,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(27,42,107,0.06) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
      {/* Top-left navy glow */}
      <div aria-hidden className="absolute -top-20 -left-20 w-[500px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at top left,rgba(27,42,107,0.10),transparent 65%)" }} />
      {/* Bottom-right gold glow */}
      <div aria-hidden className="absolute -bottom-20 -right-20 w-[500px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at bottom right,rgba(201,162,39,0.10),transparent 65%)" }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div className="max-w-xl">
            <motion.p variants={staggerItem} className="text-xs font-bold tracking-widest uppercase text-[#C9A227] mb-3">
              Programs
            </motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold text-[#0d1635] mb-3">
              Industry-Aligned Courses
            </motion.h2>
            <motion.p variants={staggerItem} className="text-base text-[#4a5568]">
              Curriculum built with top companies. Learn. Build. Get Hired.
            </motion.p>
          </div>
          <motion.div variants={staggerItem} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shrink-0 border-2 border-[#1B2A6B] text-[#1B2A6B] hover:bg-[#1B2A6B] hover:text-white transition-all duration-200"
            >
              View All Programs <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto style-preserve-3d perspective-1000"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={staggerItem}
            >
              <TiltCard>
                <div className="group card-premium overflow-hidden flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200">
                  {/* Course Image Banner */}
                  <Link href={`/courses/${course.slug}`} className="relative h-44 overflow-hidden block">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 opacity-75"
                      style={{
                        background: `linear-gradient(135deg, ${course.accentFrom}cc, ${course.accentTo}88)`,
                      }}
                    />
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm bg-white/90 ${course.badgeColor}`}>
                        {course.badge}
                      </span>
                    </div>
                    {/* Rating */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[#0d1635]">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                    </div>
                    {/* Icon floating */}
                    <div className="absolute bottom-3 left-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/30 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
                        <course.icon size={18} />
                      </div>
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <Link href={`/courses/${course.slug}`}>
                      <h3 className="text-base font-bold text-[#0d1635] mb-3 group-hover:text-[#1B2A6B] transition-colors duration-200 leading-snug">
                        {course.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-4 text-xs text-[#4a5568] mb-4">
                      <span className="flex items-center gap-1.5"><Clock size={13} /> {course.duration}</span>
                      <span className="flex items-center gap-1.5"><Users size={13} /> {course.students}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {course.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-[#1B2A6B]/6 text-[#1B2A6B] border border-[#1B2A6B]/12">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#0d1635]">{course.price}</span>
                        <span className="text-sm text-[#94a3b8] line-through">{course.origPrice}</span>
                      </div>
                      <motion.div
                        whileHover={{ x: 3 }}
                      >
                        <Link href="/checkout" className="flex items-center gap-1.5 text-sm font-semibold text-[#1B2A6B] hover:text-[#C9A227] transition-colors duration-200">
                          Enroll <ArrowRight size={14} />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
