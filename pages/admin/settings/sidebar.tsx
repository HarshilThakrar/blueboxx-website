import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Sliders, GripVertical, Plus, Save, Trash2, Edit3, X, CheckCircle2 } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SIDEBAR_MOCK_CATEGORIES = [
  { id: 1, title: "Overview", count: 2 },
  { id: 2, title: "User Manager", count: 5 },
  { id: 3, title: "Jobs & Internships", count: 4 },
  { id: 4, title: "Education", count: 5 },
  { id: 5, title: "Reports & Analytics", count: 4 },
  { id: 6, title: "Content", count: 3 },
  { id: 7, title: "Communication", count: 3 },
  { id: 8, title: "Administration", count: 8 },
];

function SortableCategoryItem({ cat, onDelete }: { cat: any, onDelete: (id: number) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: cat.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm hover:border-[#1B2A6B]/30 transition-all group ${isDragging ? 'shadow-md border-[#1B2A6B]' : ''}`}>
       <div className="flex items-center gap-4">
          <button {...attributes} {...listeners} className="text-slate-300 cursor-grab hover:text-[#1B2A6B] transition-colors active:cursor-grabbing outline-none"><GripVertical size={20}/></button>
          <div>
             <h4 className="font-bold text-slate-900 text-sm">{cat.title}</h4>
             <p className="text-xs text-slate-500 font-medium">{cat.count} menu items inside</p>
          </div>
       </div>
       
       <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="outline" className="h-8 text-xs font-bold gap-1.5 bg-slate-50 border-slate-200"><Edit3 size={14}/> Edit</Button>
          {cat.id !== 8 && ( /* Can't delete Administration */
            <button onClick={() => onDelete(cat.id)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors">
              <Trash2 size={14}/>
            </button>
          )}
       </div>
    </div>
  );
}

export default function AdminSidebarManagerPage() {
  const [categories, setCategories] = useState(SIDEBAR_MOCK_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      toast.success('Category reordered');
    }
  };

  const handleDelete = (id: number) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    toast.success('Category removed');
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setCategories([
      ...categories,
      { id: Date.now(), title: newCategoryName, count: 0 }
    ]);
    setNewCategoryName("");
    setIsModalOpen(false);
    toast.success('New category added');
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Layout saved successfully!');
    }, 1000);
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Sidebar Manager</h1>
            <p className="text-slate-500 text-sm">Rearrange categories, add new links, or hide sections in the admin navigation.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="gap-2 bg-white" onClick={() => setIsModalOpen(true)}><Plus size={16}/> New Category</Button>
             <Button 
               variant="primary" 
               className="shadow-md gap-2"
               onClick={handleSave}
               disabled={isSaving}
             >
               {isSaving ? (
                 <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...</span>
               ) : (
                 <span className="flex items-center gap-2"><Save size={18}/> Save Layout</span>
               )}
             </Button>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                 <Sliders size={18} className="text-[#1B2A6B]" /> Navigation Categories
              </h2>
           </div>
           
           <div className="p-6">
              <p className="text-sm text-slate-500 mb-6">Drag and drop categories to reorder them in the sidebar.</p>
              
              <div className="space-y-3">
                 <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={categories} strategy={verticalListSortingStrategy}>
                       {categories.map((cat) => (
                          <SortableCategoryItem key={cat.id} cat={cat} onDelete={handleDelete} />
                       ))}
                    </SortableContext>
                 </DndContext>
              </div>
           </div>
        </AnimatedContent>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AnimatedContent direction="up" className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Plus size={20} className="text-[#1B2A6B]" /> Add Category</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddCategory} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category Name</label>
                <input 
                  required
                  type="text" 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none" 
                  placeholder="e.g. Finance" 
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" className="flex-1 shadow-md gap-2">Create Category</Button>
              </div>
            </form>
          </AnimatedContent>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
