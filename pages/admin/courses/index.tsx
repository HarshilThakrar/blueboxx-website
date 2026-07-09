import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Card, CardContent } from "../../../src/components/ui/Card";
import { Search, Plus, MoreVertical, Edit2, Trash2, Eye, X, BookOpen, Users, Star, Clock } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { MediaUploader } from "../../../src/components/ui/MediaUploader";
import { useState } from "react";
import { useRouter } from "next/router";

const INITIAL_COURSES = [
  { id: 1, title: "Full Stack Web Development", category: "Web Development", instructor: "Ankit Sharma", enrolled: 1240, price: 45000, status: "Published", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80", rating: 4.8 },
  { id: 2, title: "Advanced Data Science", category: "Data Science", instructor: "Dr. R. Mehta", enrolled: 850, price: 55000, status: "Published", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80", rating: 4.6 },
  { id: 3, title: "UI/UX Design Masterclass", category: "Design", instructor: "Priya Desai", enrolled: 2100, price: 35000, status: "Published", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80", rating: 4.9 },
  { id: 4, title: "System Design for Interviews", category: "Software Engineering", instructor: "Ankit Sharma", enrolled: 0, price: 15000, status: "Draft", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80", rating: 0 },
];

export default function AdminCoursesPage() {
  const [coursesList, setCoursesList] = useState(INITIAL_COURSES);
  const router = useRouter();
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "AI/ML Basic (Python)",
    subtitle: "",
    instructor: "Dr. Vikram Singh",
    price: "",
    image: "",
    learnings: "",
    requirements: "",
    modules: [{ title: "Module 1: Python Basics", topics: 5, duration: "3h 0m" }]
  });

  const handleInputChange = (field: string, value: any) => {
    setNewCourse(prev => ({ ...prev, [field]: value }));
  };

  const handleAddModule = () => {
    setNewCourse(prev => ({
      ...prev,
      modules: [...prev.modules, { title: `Module ${prev.modules.length + 1}: New Topic`, topics: 3, duration: "2h 0m" }]
    }));
  };

  const handleRemoveModule = (index: number) => {
    setNewCourse(prev => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateModule = (index: number, field: string, value: string) => {
    const updatedModules = [...newCourse.modules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    setNewCourse(prev => ({ ...prev, modules: updatedModules }));
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourse.title && newCourse.instructor && newCourse.price) {
      const addedCourse = {
        id: Date.now(),
        title: newCourse.title,
        category: newCourse.category,
        instructor: newCourse.instructor,
        enrolled: 0,
        price: parseInt(newCourse.price) || 0,
        status: "Draft",
        image: newCourse.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
        rating: 0,
      };
      setCoursesList(prev => [addedCourse, ...prev]);

      // Reset & close
      setNewCourse({
        title: "",
        category: "AI/ML Basic (Python)",
        subtitle: "",
        instructor: "Dr. Vikram Singh",
        price: "",
        image: "",
        learnings: "",
        requirements: "",
        modules: [{ title: "Module 1: Python Basics", topics: 5, duration: "3h 0m" }]
      });
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteCourse = (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCoursesList(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Course Catalog</h1>
            <p className="text-slate-500 text-sm">Manage existing courses or create detailed new ones.</p>
          </div>
          <Button variant="primary" className="shadow-md gap-2" onClick={() => setIsAddModalOpen(true)}><Plus size={18}/> Create Detailed Course</Button>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2}>
          <Card className="border border-slate-200 shadow-sm overflow-hidden bg-white w-full max-w-full">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] transition-shadow"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto w-full custom-scrollbar">
              <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
                <thead className="bg-white border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Course Details</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Instructor</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">Price</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">Enrolled</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Status</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {coursesList.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={course.image} alt={course.title} className="w-16 h-10 rounded-md object-cover border border-slate-200 shrink-0" />
                          <div>
                            <span className="font-bold text-slate-900 block truncate max-w-[200px] sm:max-w-xs">{course.title}</span>
                            <span className="text-xs text-slate-400 font-semibold">{course.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {course.instructor}
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-bold text-right">
                        ₹{course.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium text-right flex flex-col items-end">
                        <span>{course.enrolled.toLocaleString()}</span>
                        <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5 mt-0.5"><Star size={10} fill="currentColor"/> {course.rating}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${
                          course.status === 'Published' ? 'text-emerald-700 bg-emerald-100' : 'text-slate-600 bg-slate-100'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => router.push(`/courses/${course.id}`)} className="p-1.5 text-slate-400 hover:text-[#1B2A6B] hover:bg-[#1B2A6B]/10 rounded transition-colors" title="View Details">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => router.push(`/admin/courses/${course.id}`)} className="p-1.5 text-slate-400 hover:text-[#C9A227] hover:bg-[#C9A227]/10 rounded transition-colors" title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDeleteCourse(course.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </AnimatedContent>

      </div>

      {/* Comprehensive Create Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-4xl shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50 shrink-0">
              <div>
                <h2 className="text-xl font-black text-slate-800">Create Comprehensive Course</h2>
                <p className="text-xs font-semibold text-slate-500 mt-1">Fill in all details to build the course landing page structure.</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-800 bg-white shadow-sm border border-slate-200 p-2 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            {/* Scrollable Form Area */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50/30">
              <form id="create-course-form" onSubmit={handleCreateCourse} className="space-y-8">
                
                {/* Section 1: Basic Info */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                  <h3 className="text-sm font-black text-[#1B2A6B] uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center gap-2">
                    <BookOpen size={16}/> Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Title</label>
                      <input 
                        type="text" required placeholder="e.g. Master React in 30 Days"
                        value={newCourse.title} onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                      />
                    </div>
                    
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subtitle / Short Description</label>
                      <input 
                        type="text" placeholder="e.g. Start your AI journey with Python programming fundamentals."
                        value={newCourse.subtitle} onChange={(e) => handleInputChange('subtitle', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                      <input 
                        type="text" placeholder="e.g. AI/ML Basic (Python)"
                        value={newCourse.category} onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instructor</label>
                      <select 
                        value={newCourse.instructor} onChange={(e) => handleInputChange('instructor', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-[#1B2A6B]"
                      >
                        <option value="Dr. Vikram Singh">Dr. Vikram Singh</option>
                        <option value="Ankit Sharma">Ankit Sharma</option>
                        <option value="Priya Desai">Priya Desai</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Price (INR)</label>
                      <input 
                        type="number" required placeholder="e.g. 29000"
                        value={newCourse.price} onChange={(e) => handleInputChange('price', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                      />
                    </div>
                    
                    <MediaUploader
                      label="Course Thumbnail Image URL"
                      accept="image/*"
                      value={newCourse.image}
                      onUploadSuccess={(url) => handleInputChange('image', url)}
                    />
                    
                    <div className="md:col-span-2">
                      <MediaUploader
                        label="Preview Video URL"
                        accept="video/*"
                        value={(newCourse as any).videoUrl || ''}
                        onUploadSuccess={(url) => handleInputChange('videoUrl', url)}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Details & Learnings */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                  <h3 className="text-sm font-black text-[#1B2A6B] uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Star size={16}/> Details & Learnings
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5 md:col-span-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">What you'll learn (One per line)</label>
                      <textarea 
                        rows={5} placeholder="- Python programming fundamentals&#10;- Data structures and algorithms&#10;- Object-oriented programming"
                        value={newCourse.learnings} onChange={(e) => handleInputChange('learnings', e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Requirements (One per line)</label>
                      <textarea 
                        rows={5} placeholder="- Basic understanding of HTML and CSS.&#10;- A computer with internet access."
                        value={newCourse.requirements} onChange={(e) => handleInputChange('requirements', e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Course Modules Builder */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-[#1B2A6B] uppercase tracking-widest flex items-center gap-2">
                      <Clock size={16}/> Course Content / Modules
                    </h3>
                    <button type="button" onClick={handleAddModule} className="text-xs font-bold text-[#C9A227] hover:text-[#1B2A6B] flex items-center gap-1 transition-colors">
                      <Plus size={14}/> Add Module
                    </button>
                  </div>

                  <div className="space-y-4">
                    {newCourse.modules.map((mod, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl group relative">
                        <div className="w-full md:flex-1 space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Module Title</label>
                          <input 
                            type="text" value={mod.title} onChange={(e) => handleUpdateModule(idx, 'title', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold outline-none focus:ring-1 focus:ring-[#1B2A6B]"
                          />
                        </div>
                        <div className="w-full md:w-32 space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Topics Count</label>
                          <input 
                            type="number" value={mod.topics} onChange={(e) => handleUpdateModule(idx, 'topics', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold outline-none focus:ring-1 focus:ring-[#1B2A6B]"
                          />
                        </div>
                        <div className="w-full md:w-32 space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Duration</label>
                          <input 
                            type="text" placeholder="e.g. 3h 0m" value={mod.duration} onChange={(e) => handleUpdateModule(idx, 'duration', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold outline-none focus:ring-1 focus:ring-[#1B2A6B]"
                          />
                        </div>
                        <div className="w-full md:w-auto pt-5 md:pt-4 flex justify-end">
                          <button 
                            type="button" 
                            onClick={() => handleRemoveModule(idx)}
                            className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </form>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-white shrink-0 flex gap-4 justify-end">
              <button 
                type="button" onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-2.5 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" form="create-course-form"
                className="px-8 py-2.5 bg-[#1B2A6B] hover:bg-[#0d1635] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Plus size={16}/> Create & Publish Course
              </button>
            </div>

          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #94a3b8; }
      `}} />
    </AdminDashboardLayout>
  );
}export { Button }; // Keep button export context safe if any file expects it
