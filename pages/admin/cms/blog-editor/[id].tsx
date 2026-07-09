import { AdminDashboardLayout } from "../../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../../src/components/reactbits/AnimatedContent";
import { RichTextEditor } from "../../../../src/components/ui/RichTextEditor";
import { Button } from "../../../../src/components/ui/Button";
import { ArrowLeft, Save, Eye, Image as ImageIcon, Send } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export default function BlogEditorPage() {
  const router = useRouter();
  const { id } = router.query;
  const isNew = id === 'new';

  const [title, setTitle] = useState(isNew ? "" : "The Future of AI in Web Development");
  const [content, setContent] = useState(isNew ? "" : "<h2>Introduction</h2><p>AI is completely reshaping the way we build web applications...</p>");
  
  const handleSave = (publish: boolean) => {
    if (!title.trim()) {
      toast.error("Please add a title before saving.");
      return;
    }
    toast.loading(publish ? "Publishing post..." : "Saving draft...", { id: 'save' });
    setTimeout(() => {
      toast.success(publish ? "Post published successfully!" : "Draft saved successfully!", { id: 'save' });
      if (publish) router.push('/admin/cms/blogs');
    }, 1200);
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/admin/cms/blogs')}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">{isNew ? "Write New Post" : "Edit Post"}</h1>
              <p className="text-slate-500 text-sm">Create beautiful content for your audience.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 bg-white" onClick={() => handleSave(false)}>
              <Save size={16}/> Save Draft
            </Button>
            <Button variant="primary" className="gap-2 shadow-md" onClick={() => handleSave(true)}>
              <Send size={16}/> Publish Now
            </Button>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <input 
                type="text" 
                placeholder="Post Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-6 py-5 text-3xl font-black text-slate-900 placeholder-slate-300 border-none outline-none focus:ring-0 bg-transparent"
              />
              <div className="border-t border-slate-100 bg-slate-50 px-6 py-2">
                <p className="text-xs font-semibold text-slate-400">Permalink: /blog/{title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '') || 'new-post'}</p>
              </div>
            </div>

            <RichTextEditor 
              initialContent={content} 
              onChange={setContent} 
              placeholder="Write your amazing story here..."
            />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-3">Post Settings</h3>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-[#1B2A6B] outline-none">
                  <option>Technology</option>
                  <option>Career Advice</option>
                  <option>Platform Updates</option>
                  <option>Success Stories</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Tags</label>
                <input 
                  type="text" 
                  placeholder="e.g. React, Nextjs, AI..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                />
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-500 uppercase">Featured Image</label>
                <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-[#1B2A6B] hover:bg-[#1B2A6B]/5 hover:border-[#1B2A6B]/30 transition-colors cursor-pointer">
                  <ImageIcon size={24} className="mb-2" />
                  <span className="text-xs font-bold">Upload Image</span>
                </div>
              </div>
            </div>
            
            <button className="w-full py-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 font-bold text-sm flex justify-center items-center gap-2 hover:bg-indigo-100 transition-colors">
              <Eye size={16} /> Preview Post
            </button>
          </div>
        </AnimatedContent>
      </div>
    </AdminDashboardLayout>
  );
}
