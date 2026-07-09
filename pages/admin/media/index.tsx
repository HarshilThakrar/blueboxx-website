import React, { useState } from "react";
import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { Button } from "../../../src/components/ui/Button";
import { EmptyState } from "../../../src/components/ui/EmptyState";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { SkeletonCard } from "../../../src/components/ui/Skeleton";
import { useConfirm } from "../../../src/context/ConfirmContext";
import { 
  Upload, Search, Filter, FolderOpen, Image as ImageIcon, 
  FileText, Video, MoreVertical, Trash2, ExternalLink, Copy 
} from "lucide-react";
import toast from "react-hot-toast";

type MediaType = "image" | "document" | "video";

interface MediaFile {
  id: string;
  name: string;
  type: MediaType;
  size: string;
  url: string;
  uploadedAt: string;
}



export default function AdminMediaPage() {
  const [filter, setFilter] = useState<"all" | MediaType>("all");
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const confirm = useConfirm();

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      if (res.ok) {
        setFiles(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load media files.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fileInputRef.current) fileInputRef.current.value = "";

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result;
      if (typeof base64Data !== 'string') return;

      setIsUploading(true);
      const loadingToast = toast.loading("Uploading file...");

      try {
        const res = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: file.name,
            data: base64Data
          })
        });

        const result = await res.json();
        
        if (res.ok) {
          toast.success("File uploaded successfully", { id: loadingToast });
          fetchMedia();
        } else {
          toast.error(result.error || "Upload failed", { id: loadingToast });
        }
      } catch (err) {
        console.error(err);
        toast.error("Network error during upload", { id: loadingToast });
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const filteredFiles = files.filter(f => 
    (filter === "all" || f.type === filter) &&
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    const isConfirmed = await confirm({
      title: "Delete File?",
      description: `Are you sure you want to permanently delete "${name}"? This file will be removed from all associated resources.`,
      confirmText: "Delete File",
      isDestructive: true
    });
    
    if (isConfirmed) {
      try {
        const res = await fetch(`/api/media?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
        if (res.ok) {
          setFiles(prev => prev.filter(f => f.id !== id));
          toast.success("File deleted successfully");
        } else {
          toast.error("Failed to delete file.");
        }
      } catch (error) {
        toast.error("Error deleting file.");
      }
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const renderFileIcon = (type: MediaType) => {
    switch (type) {
      case "image": return <ImageIcon size={32} className="text-blue-500" />;
      case "document": return <FileText size={32} className="text-amber-500" />;
      case "video": return <Video size={32} className="text-purple-500" />;
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Media Manager</h1>
            <p className="text-slate-500 font-medium">Upload, organize, and manage global assets across the platform.</p>
          </div>
          <div className="flex gap-3">
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="h-11 px-5 bg-[#1B2A6B] hover:bg-[#0d1635] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#1B2A6B]/20 flex items-center gap-2 disabled:opacity-70"
            >
              <Upload size={18} /> {isUploading ? "Uploading..." : "Upload Files"}
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex w-full sm:w-auto p-1 bg-slate-50 rounded-xl border border-slate-100">
            {["all", "image", "document", "video"].map((f) => (
              <button 
                key={f} 
                onClick={() => setFilter(f as any)}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${filter === f ? "bg-white text-[#1B2A6B] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {f}
              </button>
            ))}
          </div>
          
          <div className="relative w-full sm:w-auto sm:ml-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 h-11 pl-10 pr-4 rounded-xl border-none bg-slate-50 focus:bg-slate-100 focus:ring-0 outline-none text-sm font-medium text-slate-700 transition-colors" 
            />
          </div>
        </div>

        {/* Grid Area */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             <SkeletonCard className="aspect-square flex-none h-[250px]" />
             <SkeletonCard className="aspect-square flex-none h-[250px]" />
             <SkeletonCard className="aspect-square flex-none h-[250px]" />
             <SkeletonCard className="aspect-square flex-none h-[250px]" />
          </div>
        ) : filteredFiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFiles.map((file, idx) => (
              <AnimatedContent key={file.id} direction="up" delay={idx * 0.05} className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all">
                {/* Preview Area */}
                <div className="aspect-square bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
                  {file.type === "image" ? (
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover rounded-lg shadow-sm" />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                      {renderFileIcon(file.type)}
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button onClick={() => handleCopyLink(file.url)} title="Copy Link" className="w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center hover:scale-110 transition-transform">
                      <Copy size={18} />
                    </button>
                    <a href={file.url} target="_blank" rel="noreferrer" title="Open File" className="w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center hover:scale-110 transition-transform">
                      <ExternalLink size={18} />
                    </a>
                    <button onClick={() => handleDelete(file.id, file.name)} title="Delete File" className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-rose-500/30">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 truncate mb-1" title={file.name}>{file.name}</h3>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                    <span className="uppercase">{file.size}</span>
                    <span>{file.uploadedAt}</span>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={FolderOpen}
            title="No media found"
            description={search ? `No files match your search "${search}"` : "Upload images, videos, and documents to use across your platform."}
            actionLabel="Upload First File"
            onAction={() => fileInputRef.current?.click()}
          />
        )}
      </div>
    </AdminDashboardLayout>
  );
}
