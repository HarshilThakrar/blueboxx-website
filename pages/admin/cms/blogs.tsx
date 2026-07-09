import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Plus, Search, Filter, Edit3, Trash2, Eye, MessageCircle, Heart, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { Badge } from "../../../src/components/ui/Badge";
import { useState } from "react";
import { useRouter } from "next/router";

const INITIAL_BLOGS = [
  { id: 1, title: "The Future of AI in Web Development", author: "Admin Root", status: "Published", date: "Oct 28, 2026", views: 1245, likes: 342, comments: 28, thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80" },
  { id: 2, title: "Top 10 Figma Plugins for UI Designers", author: "Sarah Tech", status: "Published", date: "Oct 25, 2026", views: 890, likes: 215, comments: 12, thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80" },
  { id: 3, title: "Mastering React Server Components", author: "Ankit Sharma", status: "Draft", date: "Oct 29, 2026", views: 0, likes: 0, comments: 0, thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80" },
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const router = useRouter();

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Blog Management</h1>
            <p className="text-slate-500 text-sm">Write, publish, and manage content for your platform's blog.</p>
          </div>
          <Button variant="primary" className="shadow-md gap-2" onClick={() => router.push('/admin/cms/blog-editor/new')}>
            <Plus size={18}/> Write New Post
          </Button>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search posts by title or author..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none transition-all"
            />
          </div>
          <Button variant="outline" className="gap-2 shrink-0"><Filter size={16}/> Filters</Button>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.3} className="grid grid-cols-1 gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-md hover:border-[#1B2A6B]/30 transition-all group">
               <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                  <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               </div>
               
               <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <Badge variant={blog.status === 'Published' ? 'success' : 'secondary'}>{blog.status}</Badge>
                      <span className="text-xs font-semibold text-slate-400">{blog.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1B2A6B] transition-colors mb-1 cursor-pointer">
                      {blog.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mb-4">By <span className="text-slate-700 font-bold">{blog.author}</span></p>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4">
                     <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                       <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md"><Eye size={14}/> {blog.views}</span>
                       <span className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-2 py-1 rounded-md"><Heart size={14} fill="currentColor"/> {blog.likes}</span>
                       <span className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2 py-1 rounded-md"><MessageCircle size={14}/> {blog.comments}</span>
                     </div>
                     
                     <div className="flex items-center gap-2">
                        <Button variant="outline" className="h-8 text-xs font-bold gap-1.5 border-slate-200 bg-white" onClick={() => router.push(`/admin/cms/blog-editor/${blog.id}`)}><Edit3 size={14}/> Edit</Button>
                        <button onClick={() => setBlogs(prev => prev.filter(b => b.id !== blog.id))} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"><Trash2 size={14}/></button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-[#1B2A6B] hover:bg-slate-50 transition-colors"><MoreHorizontal size={14}/></button>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </AnimatedContent>
      </div>
    </AdminDashboardLayout>
  );
}
