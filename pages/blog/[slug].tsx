import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MainLayout } from "../../src/layout/MainLayout";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Share2, Heart, MessageSquare, Loader2 } from "lucide-react";
import api from "../../src/lib/axios";
import { Button } from "../../src/components/ui/Button";
import { Badge } from "../../src/components/ui/Badge";
import Link from "next/link";
import { SEO } from "../../src/components/seo/SEO";

export default function BlogDetailsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchBlog = async () => {
        try {
          setIsLoading(true);
          const res = await api.get(`/public/blogs/${slug}`);
          if (res.data.success) {
            setBlog(res.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch blog", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBlog();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="pt-32 pb-16 min-h-[70vh] flex justify-center items-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#1B2A6B]" />
        </div>
      </MainLayout>
    );
  }

  if (!blog) {
    return (
      <MainLayout>
        <div className="pt-32 pb-16 min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Article Not Found</h1>
            <p className="text-[#64748B] max-w-2xl mx-auto mb-10 text-lg">We couldn't find the article you're looking for.</p>
            <Link href="/blog">
              <Button variant="primary" className="gap-2"><ArrowLeft size={16} /> Back to Blog</Button>
            </Link>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SEO 
        title={`${blog.meta_title || blog.title} | BlueBoxx`} 
        description={blog.meta_description || "Read this article on BlueBoxx."} 
        image={blog.og_image ? `http://localhost:8000/storage/${blog.og_image}` : (blog.thumbnail ? `http://localhost:8000/storage/${blog.thumbnail}` : '')}
      />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-[#0d1635] text-white relative overflow-hidden border-b border-white/10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[50%] h-[100%] rounded-full bg-[#1B2A6B]/50 blur-[120px] pointer-events-none" 
        />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {blog.categories && blog.categories.map((c: any) => (
                <Badge key={c.id} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none">{c.name}</Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight max-w-3xl mx-auto">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <img src={blog.author?.avatar || `https://ui-avatars.com/api/?name=${blog.author?.name || 'A'}`} alt={blog.author?.name} className="w-8 h-8 rounded-full border border-white/20" />
                <span className="text-white">{blog.author?.name}</span>
              </div>
              <div className="flex items-center gap-2"><Calendar size={16}/> {blog.published_at}</div>
              <div className="flex items-center gap-2"><Clock size={16}/> {blog.reading_time || 5} min read</div>
              <div className="flex items-center gap-2"><MessageSquare size={16}/> {blog.comments_count || 0}</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-12 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#1B2A6B] mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to all articles
          </Link>

          {/* Thumbnail */}
          {blog.thumbnail && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <img src={`http://localhost:8000/storage/${blog.thumbnail}`} alt={blog.title} className="w-full h-auto max-h-[500px] object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 prose prose-lg prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-a:text-[#1B2A6B] hover:prose-a:text-[#C9A227] prose-img:rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Tags & Actions */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {blog.tags && blog.tags.map((t: any) => (
                <span key={t.id} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">#{t.name}</span>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 border-slate-200 text-slate-600 hover:text-[#1B2A6B]">
                <Heart size={18} /> Like
              </Button>
              <Button variant="outline" className="gap-2 border-slate-200 text-slate-600 hover:text-[#1B2A6B]" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied!");
              }}>
                <Share2 size={18} /> Share
              </Button>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
