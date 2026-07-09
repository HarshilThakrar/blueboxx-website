import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import { Palette, Image as ImageIcon, Save, Monitor, Moon, Sun, CheckCircle2 } from "lucide-react";
import { Button } from "../../../src/components/ui/Button";
import { useState } from "react";

export default function AdminAppearanceSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const [logo, setLogo] = useState<string | null>(null);
  const [favicon, setFavicon] = useState<string | null>(null);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('light');
  const [primaryColor, setPrimaryColor] = useState('#1B2A6B');
  const [accentColor, setAccentColor] = useState('#F59E0B');

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  const handleLogoUpload = () => {
    setLogo("uploaded");
    alert("Main Logo uploaded successfully (mock)!");
  };

  const handleFaviconUpload = () => {
    setFavicon("uploaded");
    alert("Favicon uploaded successfully (mock)!");
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <AnimatedContent direction="up" delay={0.1} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Appearance Settings</h1>
            <p className="text-slate-500 text-sm">Customize the branding, colors, and theme of your platform.</p>
          </div>
          <Button 
            variant={isSaved ? "outline" : "primary"} 
            className={`shadow-md gap-2 ${isSaved ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : ''}`}
            onClick={handleSave}
            disabled={isSaving || isSaved}
          >
            {isSaving ? (
              <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...</span>
            ) : isSaved ? (
              <span className="flex items-center gap-2"><CheckCircle2 size={18}/> Saved</span>
            ) : (
              <span className="flex items-center gap-2"><Save size={18}/> Save Changes</span>
            )}
          </Button>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.2} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                 <ImageIcon size={18} className="text-[#1B2A6B]" /> Platform Branding
              </h2>
           </div>
           
           <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Main Logo</label>
                    <div onClick={handleLogoUpload} className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-all cursor-pointer">
                       <ImageIcon size={32} className={logo ? "text-emerald-500 mb-2" : "text-slate-400 mb-2"} />
                       <p className="text-sm font-bold text-slate-700">{logo ? "Logo Uploaded Successfully!" : "Click to upload logo"}</p>
                       <p className="text-xs font-medium text-slate-400 mt-1">SVG, PNG, or JPG (max 2MB)</p>
                    </div>
                 </div>
              </div>
              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Favicon</label>
                    <div onClick={handleFaviconUpload} className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-all cursor-pointer">
                       <div className={`w-8 h-8 rounded mb-2 flex items-center justify-center ${favicon ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}><ImageIcon size={16}/></div>
                       <p className="text-sm font-bold text-slate-700">{favicon ? "Favicon Uploaded!" : "Upload Favicon"}</p>
                       <p className="text-xs font-medium text-slate-400 mt-1">32x32px ICO or PNG</p>
                    </div>
                 </div>
              </div>
           </div>
        </AnimatedContent>

        <AnimatedContent direction="up" delay={0.3} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                 <Palette size={18} className="text-[#1B2A6B]" /> Theme & Colors
              </h2>
           </div>
           
           <div className="p-6 space-y-8">
              <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Default Color Scheme</label>
                 <div className="flex gap-4">
                    <button 
                      onClick={() => setThemeMode('light')} 
                      className={`flex-1 flex flex-col items-center justify-center p-4 border-2 rounded-xl gap-2 transition-all ${
                        themeMode === 'light' ? 'border-[#1B2A6B] bg-blue-50/30' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                       <Sun size={24} className="text-[#1B2A6B]" />
                       <span className="text-sm font-bold text-slate-800">Light Mode</span>
                    </button>
                    <button 
                      onClick={() => setThemeMode('dark')} 
                      className={`flex-1 flex flex-col items-center justify-center p-4 border-2 rounded-xl gap-2 transition-all ${
                        themeMode === 'dark' ? 'border-[#1B2A6B] bg-blue-50/30' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                       <Moon size={24} className="text-slate-400" />
                       <span className="text-sm font-bold text-slate-500">Dark Mode</span>
                    </button>
                    <button 
                      onClick={() => setThemeMode('system')} 
                      className={`flex-1 flex flex-col items-center justify-center p-4 border-2 rounded-xl gap-2 transition-all ${
                        themeMode === 'system' ? 'border-[#1B2A6B] bg-blue-50/30' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                       <Monitor size={24} className="text-slate-400" />
                       <span className="text-sm font-bold text-slate-500">System Sync</span>
                    </button>
                 </div>
              </div>

              <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Brand Colors (Hex)</label>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                       <input 
                         type="color" 
                         value={primaryColor} 
                         onChange={(e) => setPrimaryColor(e.target.value)} 
                         className="w-10 h-10 rounded-lg shadow-sm border border-slate-200 cursor-pointer p-0 bg-transparent overflow-hidden" 
                       />
                       <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-500 mb-1">Primary Color</p>
                          <input 
                            type="text" 
                            value={primaryColor} 
                            onChange={(e) => setPrimaryColor(e.target.value)} 
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono font-bold outline-none focus:ring-2 focus:ring-[#1B2A6B]" 
                          />
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <input 
                         type="color" 
                         value={accentColor} 
                         onChange={(e) => setAccentColor(e.target.value)} 
                         className="w-10 h-10 rounded-lg shadow-sm border border-slate-200 cursor-pointer p-0 bg-transparent overflow-hidden" 
                       />
                       <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-500 mb-1">Accent Color</p>
                          <input 
                            type="text" 
                            value={accentColor} 
                            onChange={(e) => setAccentColor(e.target.value)} 
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono font-bold outline-none focus:ring-2 focus:ring-[#1B2A6B]" 
                          />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </AnimatedContent>
      </div>
    </AdminDashboardLayout>
  );
}
