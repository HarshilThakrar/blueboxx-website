import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { Building, Search, Plus, ShieldCheck, X, Check, ShieldAlert, Trash2, MonitorPlay, ExternalLink, Image as ImageIcon } from "lucide-react";
import { Badge } from "../../../src/components/ui/Badge";
import { useState } from "react";

const MOCK_COMPANIES = [
  { id: 1, name: "Google India", email: "careers@google.in", jobs: 12, status: "Verified", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" },
  { id: 2, name: "Microsoft", email: "recruit@microsoft.com", jobs: 8, status: "Verified", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { id: 3, name: "Amazon", email: "jobs@amazon.com", jobs: 15, status: "Verified", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
];

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Brand Identity & 3D Promo Film",
    studio: "Anibrain Studios",
    category: "3D ANIMATION",
    description: "End-to-end brand film featuring photorealistic 3D product animation and motion graphics for theatrical release.",
    tags: ["3D Modeling", "VFX", "Motion Graphics"],
    duration: "8 WEEKS",
    deliverables: "BRAND FILM + 3 TEASERS",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    link: "#"
  }
];

export default function AdminCompaniesPage() {
  const [activeTab, setActiveTab] = useState<"companies" | "projects">("companies");
  const [companies, setCompanies] = useState(MOCK_COMPANIES);
  const [projects, setProjects] = useState(MOCK_PROJECTS);

  // Modal states for Company
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyEmail, setNewCompanyEmail] = useState("");
  const [newCompanyJobs, setNewCompanyJobs] = useState("");
  const [newCompanyLogo, setNewCompanyLogo] = useState("");

  // Modal states for Project
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    studio: "",
    category: "",
    description: "",
    tags: "",
    duration: "",
    deliverables: "",
    image: "",
    link: ""
  });

  const handleDeleteCompany = (id: number) => {
    if (confirm("Are you sure you want to delete this company?")) {
      setCompanies(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleOnboardCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCompanyName && newCompanyEmail && newCompanyJobs) {
      const newCompany = {
        id: Date.now(),
        name: newCompanyName,
        email: newCompanyEmail,
        jobs: parseInt(newCompanyJobs) || 0,
        status: "Verified",
        logo: newCompanyLogo || `https://upload.wikimedia.org/wikipedia/commons/b/b8/Logo_de_la_Rep%C3%BAblica.svg`
      };
      setCompanies(prev => [...prev, newCompany]);
      
      // Reset & close
      setNewCompanyName("");
      setNewCompanyEmail("");
      setNewCompanyJobs("");
      setNewCompanyLogo("");
      setIsAddModalOpen(false);
    }
  };

  const handleUploadProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.title && newProject.studio) {
      const addedProject = {
        id: Date.now(),
        ...newProject,
        tags: newProject.tags ? newProject.tags.split(",").map(t => t.trim()) : [],
        image: newProject.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
      };
      setProjects(prev => [addedProject, ...prev]);
      
      setNewProject({
        title: "", studio: "", category: "", description: "", tags: "", duration: "", deliverables: "", image: "", link: ""
      });
      setIsAddProjectModalOpen(false);
    }
  };

  const handleDeleteProject = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified": return <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold gap-1"><ShieldCheck size={12}/> Verified</Badge>;
      case "Suspended": return <Badge className="bg-rose-50 text-rose-700 border-none font-bold gap-1"><ShieldAlert size={12}/> Suspended</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Company & Projects Hub</h1>
          <p className="text-slate-500 font-medium text-sm">Manage hiring entities and their uploaded showcase projects.</p>
        </div>
        <div className="flex gap-3">
          {activeTab === "companies" ? (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#1B2A6B] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[#0d1635] transition-colors flex items-center gap-2"
            >
              <Plus size={16} /> Onboard Company
            </button>
          ) : (
            <button 
              onClick={() => setIsAddProjectModalOpen(true)}
              className="bg-[#1B2A6B] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[#0d1635] transition-colors flex items-center gap-2"
            >
              <Plus size={16} /> Upload Project
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 mb-6">
        <button 
          onClick={() => setActiveTab("companies")}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "companies" ? "border-[#1B2A6B] text-[#1B2A6B]" : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Partner Companies
        </button>
        <button 
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "projects" ? "border-[#1B2A6B] text-[#1B2A6B]" : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Company Projects
        </button>
      </div>

      {activeTab === "companies" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible flex flex-col min-h-[400px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search companies..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]"
              />
            </div>
          </div>

          <div className="overflow-visible">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Company Info</th>
                  <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Active Jobs</th>
                  <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companies.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1.5 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                          <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-[#1B2A6B] transition-colors">{company.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{company.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-slate-600">{company.jobs} Jobs Posted</td>
                    <td className="py-4 px-6">
                      {getStatusBadge(company.status)}
                    </td>
                    <td className="py-4 px-6 text-right relative overflow-visible">
                      <button 
                        onClick={() => handleDeleteCompany(company.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center justify-center"
                        title="Delete Company"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "projects" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative group flex flex-col">
              <button 
                onClick={() => handleDeleteProject(project.id)}
                className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-red-600 text-white rounded-lg transition-colors z-10 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                title="Delete Project"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="relative h-48 w-full bg-slate-100 shrink-0">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-black text-purple-700 shadow-sm">
                  <MonitorPlay size={14}/> {project.category}
                </div>
                
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-black text-slate-800 shadow-sm">
                  {project.studio}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-black text-[#1B2A6B] mb-2 leading-tight">{project.title}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-600">{tag}</span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      ⏱ {project.duration}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1">
                      📦 {project.deliverables}
                    </span>
                  </div>
                  <a href={project.link} target="_blank" rel="noreferrer" className="p-2 bg-slate-50 text-slate-600 hover:text-[#1B2A6B] hover:bg-blue-50 rounded-lg transition-colors border border-slate-200">
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full text-center text-slate-400 font-medium py-12 bg-white rounded-2xl border border-slate-200">
              No projects uploaded yet.
            </div>
          )}
        </div>
      )}

      {/* Onboard Company Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md shadow-2xl p-6 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black text-slate-800">Onboard Company Partner</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 p-1.5 rounded-xl"><X size={18} /></button>
            </div>
            <form onSubmit={handleOnboardCompany} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
                <input 
                  type="text" required placeholder="e.g. Netflix India"
                  value={newCompanyName} onChange={(e) => setNewCompanyName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Email</label>
                <input 
                  type="email" required placeholder="e.g. recruit@netflix.com"
                  value={newCompanyEmail} onChange={(e) => setNewCompanyEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Logo URL</label>
                <input 
                  type="url" placeholder="https://..."
                  value={newCompanyLogo} onChange={(e) => setNewCompanyLogo(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Jobs count</label>
                <input 
                  type="number" required placeholder="e.g. 5"
                  value={newCompanyJobs} onChange={(e) => setNewCompanyJobs(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B]"
                />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1B2A6B] hover:bg-[#0d1635] text-white text-sm font-bold rounded-xl shadow-md transition-all"
                >
                  Onboard Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Project Modal */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddProjectModalOpen(false)} />
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-2xl shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50 shrink-0">
              <div>
                 <h2 className="text-xl font-black text-slate-800">Upload Project</h2>
                 <p className="text-xs font-semibold text-slate-500 mt-1">Add a new company project portfolio to the showcase.</p>
              </div>
              <button onClick={() => setIsAddProjectModalOpen(false)} className="text-slate-400 hover:text-slate-800 bg-white shadow-sm border border-slate-200 p-2 rounded-xl transition-colors"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
               <form id="create-project-form" onSubmit={handleUploadProject} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1.5 md:col-span-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Title</label>
                       <input 
                         type="text" required placeholder="e.g. Brand Identity & 3D Promo Film"
                         value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                         className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                       />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Studio / Company Name</label>
                       <input 
                         type="text" required placeholder="e.g. Anibrain Studios"
                         value={newProject.studio} onChange={(e) => setNewProject({ ...newProject, studio: e.target.value })}
                         className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                       />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                       <input 
                         type="text" required placeholder="e.g. 3D ANIMATION"
                         value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                         className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                       />
                     </div>
                     <div className="space-y-1.5 md:col-span-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
                       <textarea 
                         rows={2} placeholder="Brief description of the project..."
                         value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                         className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none resize-none"
                       />
                     </div>
                     <div className="space-y-1.5 md:col-span-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tags (Comma separated)</label>
                       <input 
                         type="text" placeholder="e.g. 3D Modeling, VFX, Motion Graphics"
                         value={newProject.tags} onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                         className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                       />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</label>
                       <input 
                         type="text" placeholder="e.g. 8 WEEKS"
                         value={newProject.duration} onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
                         className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                       />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Deliverables</label>
                       <input 
                         type="text" placeholder="e.g. BRAND FILM + 3 TEASERS"
                         value={newProject.deliverables} onChange={(e) => setNewProject({ ...newProject, deliverables: e.target.value })}
                         className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                       />
                     </div>
                     <div className="space-y-1.5 md:col-span-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cover Image URL</label>
                       <input 
                         type="url" placeholder="https://..."
                         value={newProject.image} onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                         className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] outline-none"
                       />
                     </div>
                  </div>
               </form>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white shrink-0 flex gap-4 justify-end">
              <button 
                type="button" onClick={() => setIsAddProjectModalOpen(false)}
                className="px-6 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" form="create-project-form"
                className="px-8 py-2.5 bg-[#1B2A6B] hover:bg-[#0d1635] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Plus size={16} /> Upload Project
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
