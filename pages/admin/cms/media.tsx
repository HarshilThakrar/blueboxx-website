import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { UploadCloud, Image as ImageIcon, Search, Filter, Trash2, CheckCircle2, Download, ExternalLink, X } from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Mock Media Data
const INITIAL_MEDIA = [
  { id: 1, name: 'hero-banner.jpg', size: '2.4 MB', dimensions: '1920x1080', date: '2026-07-01', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop', type: 'image/jpeg' },
  { id: 2, name: 'company-logo-google.png', size: '145 KB', dimensions: '400x150', date: '2026-07-02', url: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=400&auto=format&fit=crop', type: 'image/png' },
  { id: 3, name: 'student-avatar-1.jpg', size: '890 KB', dimensions: '800x800', date: '2026-07-03', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop', type: 'image/jpeg' },
  { id: 4, name: 'course-thumbnail-react.jpg', size: '1.1 MB', dimensions: '1280x720', date: '2026-07-04', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop', type: 'image/jpeg' },
  { id: 5, name: 'campus-tour-bg.jpg', size: '3.2 MB', dimensions: '2560x1440', date: '2026-06-28', url: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop', type: 'image/jpeg' },
  { id: 6, name: 'instructor-profile.jpg', size: '1.5 MB', dimensions: '1000x1000', date: '2026-06-25', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop', type: 'image/jpeg' },
];

export default function AdminMediaLibrary() {
  const [mediaItems, setMediaItems] = useState(INITIAL_MEDIA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = mediaItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelect = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleDeleteSelected = () => {
    if (confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
      setMediaItems(mediaItems.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
            // Add a mock new image
            const newImage = {
              id: Date.now(),
              name: `new-upload-${Date.now()}.jpg`,
              size: '1.8 MB',
              dimensions: '1920x1080',
              date: new Date().toISOString().split('T')[0],
              url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
              type: 'image/jpeg'
            };
            setMediaItems([newImage, ...mediaItems]);
          }, 500);
          return 100;
        }
        return prev + 15;
      });
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateUpload();
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2">
            <Link href="/admin/cms" className="hover:text-[#1B2A6B] transition-colors">CMS</Link>
            <span>/</span>
            <span className="text-[#1B2A6B]">Media Library</span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Media Library</h1>
          <p className="text-slate-500 font-medium text-sm">Upload and manage all images, videos, and documents.</p>
        </div>
        <div className="flex gap-3">
          <input 
            type="file" 
            multiple 
            className="hidden" 
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) simulateUpload();
            }}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2.5 rounded-xl text-sm font-bold shadow-md bg-[#1B2A6B] text-white hover:bg-[#0d1635] transition-all flex items-center gap-2"
          >
            <UploadCloud size={16} />
            Upload New File
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      <div 
        className="w-full bg-white border-2 border-dashed border-slate-300 rounded-2xl p-8 mb-8 text-center hover:bg-slate-50 hover:border-[#C9A227] transition-all cursor-pointer relative overflow-hidden group"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-full max-w-md bg-slate-100 rounded-full h-2.5 mb-4 overflow-hidden">
              <div className="bg-[#1B2A6B] h-2.5 rounded-full transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <p className="text-sm font-bold text-slate-700">Uploading... {uploadProgress}%</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud size={32} />
            </div>
            <p className="text-lg font-bold text-slate-800 mb-1">Click or drag & drop files here</p>
            <p className="text-sm font-medium text-slate-500">Supports JPG, PNG, GIF, SVG, and WEBP (Max 5MB)</p>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-t-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4 justify-between items-center border-b-0">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={handleSelectAll}
            className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center hover:border-[#1B2A6B] transition-colors"
          >
            {selectedItems.length > 0 && selectedItems.length === filteredItems.length && <CheckCircle2 size={14} className="text-[#1B2A6B]" />}
            {selectedItems.length > 0 && selectedItems.length !== filteredItems.length && <div className="w-2.5 h-2.5 bg-[#1B2A6B] rounded-sm" />}
          </button>
          <span className="text-sm font-bold text-slate-600">{selectedItems.length} selected</span>
          
          <AnimatePresence>
            {selectedItems.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleDeleteSelected}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors"
              >
                <Trash2 size={14} /> Delete
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] focus:border-transparent outline-none transition-all"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white rounded-b-2xl border border-slate-200 shadow-sm p-6 min-h-[400px]">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <ImageIcon size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-bold">No media files found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className={`relative group rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedItems.includes(item.id) ? 'border-[#1B2A6B] shadow-md scale-[0.98]' : 'border-slate-100 hover:border-slate-300'
                }`}
                onClick={() => handleSelect(item.id)}
              >
                {/* Selection Check */}
                <div className={`absolute top-3 left-3 z-10 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  selectedItems.includes(item.id) ? 'bg-[#1B2A6B] border-none text-white' : 'bg-white/50 border border-slate-400 opacity-0 group-hover:opacity-100'
                }`}>
                  {selectedItems.includes(item.id) && <CheckCircle2 size={14} />}
                </div>

                {/* Quick Actions (Preview) */}
                <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setPreviewImage(item); }}
                    className="w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#1B2A6B] transition-colors"
                  >
                    <ExternalLink size={14} />
                  </button>
                </div>

                <div className="aspect-square bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs font-bold text-slate-800 truncate mb-1" title={item.name}>{item.name}</p>
                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                    <span>{item.size}</span>
                    <span>{item.dimensions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
              onClick={() => setPreviewImage(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row w-full max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/10 hover:bg-black/20 text-white rounded-full flex items-center justify-center transition-colors md:text-slate-500 md:bg-slate-100 md:hover:bg-slate-200"
              >
                <X size={18} />
              </button>
              
              <div className="flex-1 bg-slate-100 flex items-center justify-center p-4 relative min-h-[300px] md:min-h-[500px]">
                <img src={previewImage.url} alt={previewImage.name} className="max-w-full max-h-full object-contain drop-shadow-xl" />
              </div>
              
              <div className="w-full md:w-80 bg-white p-6 border-l border-slate-200 overflow-y-auto">
                <h3 className="text-lg font-black text-slate-800 mb-6">File Details</h3>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">File Name</p>
                    <p className="text-sm font-semibold text-slate-800 break-all">{previewImage.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">File Type</p>
                    <p className="text-sm font-semibold text-slate-800">{previewImage.type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Uploaded On</p>
                    <p className="text-sm font-semibold text-slate-800">{previewImage.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">File Size</p>
                    <p className="text-sm font-semibold text-slate-800">{previewImage.size}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Dimensions</p>
                    <p className="text-sm font-semibold text-slate-800">{previewImage.dimensions}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                    <Download size={16} /> Download File
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(previewImage.url);
                      const btn = document.getElementById('copy-url-btn');
                      if(btn) {
                        const originalHtml = btn.innerHTML;
                        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> Copied!';
                        btn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
                        btn.classList.remove('bg-[#1B2A6B]', 'hover:bg-[#0d1635]');
                        setTimeout(() => {
                          btn.innerHTML = originalHtml;
                          btn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
                          btn.classList.add('bg-[#1B2A6B]', 'hover:bg-[#0d1635]');
                        }, 2000);
                      }
                    }}
                    id="copy-url-btn"
                    className="w-full py-2.5 bg-[#1B2A6B] text-white rounded-xl text-sm font-bold hover:bg-[#0d1635] transition-colors flex items-center justify-center gap-2"
                  >
                    Copy Public URL
                  </button>
                  <button 
                    onClick={() => {
                      setMediaItems(mediaItems.filter(item => item.id !== previewImage.id));
                      setPreviewImage(null);
                    }}
                    className="w-full py-2.5 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-100 transition-colors flex items-center justify-center gap-2 mt-4"
                  >
                    <Trash2 size={16} /> Delete Permanently
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </AdminDashboardLayout>
  );
}
