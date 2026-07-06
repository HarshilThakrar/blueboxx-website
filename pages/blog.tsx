import { useState } from "react";
import { MainLayout } from "../src/layout/MainLayout";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { Card, CardContent } from "../src/components/ui/Card";
import { Badge } from "../src/components/ui/Badge";
import { Button } from "../src/components/ui/Button";
import { Input } from "../src/components/ui/Input";
import { Pagination } from "../src/components/ui/Pagination";
import Link from "next/link";

const categories = ["All", "Engineering", "Design", "Career Advice", "Data Science", "Interviews"];

const blogs = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  slug: `blog-post-${i}`,
  title: [
    "How to Crack FAANG Interviews in 2026",
    "10 React Performance Optimization Techniques",
    "The Ultimate Guide to System Design",
    "Why UX Design is More Than Just UI",
    "Transitioning from Non-Tech to Data Science",
    "Understanding Kubernetes Architecture"
  ][i % 6],
  excerpt: "Discover the proven strategies and frameworks that have helped thousands of students land their dream roles at top tech companies.",
  category: ["Career Advice", "Engineering", "Engineering", "Design", "Data Science", "Infrastructure"][i % 6],
  author: ["Ankit Sharma", "Priya Desai", "Rohan Gupta", "Sneha Patel"][i % 4],
  date: "Oct 24, 2026",
  readTime: "5 min read",
  image: [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
  ][i % 4]
}));

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-[#0d1635] text-white relative overflow-hidden border-b border-white/10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[50%] h-[100%] rounded-full bg-[#1B2A6B]/50 blur-[120px] pointer-events-none" 
        />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
            <div className="max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
              >
                Insights & <span className="text-[#C9A227]">Resources</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="text-slate-300 text-lg"
              >
                Expert advice, technical tutorials, and career guidance from industry leaders.
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full lg:w-80">
              <Input icon={<Search size={18}/>} placeholder="Search articles..." className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus-visible:ring-[#C9A227]" />
            </motion.div>
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? "bg-[#1B2A6B] text-white shadow-md shadow-[#1B2A6B]/20" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 bg-transparent min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Featured Article */}
          {activeCategory === "All" && currentPage === 1 && (
            <div className="mb-16">
              <h2 className="text-xl font-extrabold text-slate-900 mb-6">Featured Article</h2>
              <Card className="overflow-hidden group hover:shadow-xl hover:border-[#1B2A6B]/30 transition-all duration-300">
                <div className="flex flex-col lg:flex-row h-full">
                  <div className="w-full lg:w-1/2 aspect-[16/9] lg:aspect-auto relative overflow-hidden bg-slate-200">
                    <img src={featuredBlog.image} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <CardContent className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-4">{featuredBlog.category}</Badge>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-[#1B2A6B] transition-colors leading-tight">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm font-semibold text-slate-500 mb-8">
                      <div className="flex items-center gap-2"><User size={16}/> {featuredBlog.author}</div>
                      <div className="flex items-center gap-2"><Calendar size={16}/> {featuredBlog.date}</div>
                    </div>
                    <Button variant="primary" className="w-fit gap-2">Read Full Article <ArrowRight size={16}/></Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          )}

          {/* Grid */}
          <div className="mb-12">
            <h2 className="text-xl font-extrabold text-slate-900 mb-6">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingBlogs.map(blog => (
                <Card key={blog.id} className="overflow-hidden group hover:shadow-lg hover:border-[#1B2A6B]/30 transition-all duration-300 flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <Badge variant="secondary" className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border-none text-slate-900 shadow-sm">{blog.category}</Badge>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#1B2A6B] transition-colors leading-tight line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-600 mb-6 text-sm line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-2"><Calendar size={14}/> {blog.date}</div>
                      <div className="flex items-center gap-2"><Clock size={14}/> {blog.readTime}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="mb-24">
            <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
          </div>

          {/* Newsletter CTA */}
          <div className="bg-[#0d1635] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B2A6B]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-extrabold mb-4">Never miss an update.</h2>
              <p className="text-slate-300 mb-8">Subscribe to our newsletter for the latest tech news, interview tips, and exclusive course discounts directly in your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input placeholder="Enter your email address" className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus-visible:ring-[#C9A227] py-3" />
                <Button variant="gold" className="py-3">Subscribe</Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
