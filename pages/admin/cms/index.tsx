import { AdminDashboardLayout } from "../../../src/layout/AdminDashboardLayout";
import { FileText, Image as ImageIcon, Search, Filter, Edit3, Eye, MoreVertical, Layout, Type, Globe, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Mock Data for pages
const PAGES_DATA = [
  { id: 'home', name: 'Homepage', path: '/', type: 'Landing', status: 'Published', lastEdited: '2 hours ago', views: '24.5K' },
  { id: 'about', name: 'About Us', path: '/about', type: 'Static', status: 'Published', lastEdited: '3 days ago', views: '5.2K' },
  { id: 'courses', name: 'Courses Hub', path: '/courses', type: 'Dynamic', status: 'Draft', lastEdited: '10 mins ago', views: '-' },
  { id: 'jobs', name: 'Job Portal', path: '/jobs', type: 'Dynamic', status: 'Published', lastEdited: '1 week ago', views: '12.1K' },
  { id: 'contact', name: 'Contact Us', path: '/contact', type: 'Static', status: 'Published', lastEdited: '1 month ago', views: '1.2K' },
  { id: 'privacy', name: 'Privacy Policy', path: '/privacy-policy', type: 'Legal', status: 'Published', lastEdited: '6 months ago', views: '800' },
];

export default function AdminCMSPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pages"); // 'pages' or 'templates'

  const filteredPages = PAGES_DATA.filter(page => 
    page.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    page.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Content Management</h1>
          <p className="text-slate-500 font-medium text-sm">Manage website pages, text content, and media assets.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/admin/cms/media"
            className="px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <ImageIcon size={16} className="text-blue-600" />
            Media Library
          </Link>
          <button className="px-5 py-2.5 rounded-xl text-sm font-bold shadow-md bg-[#1B2A6B] text-white hover:bg-[#0d1635] transition-all flex items-center gap-2">
            <Layout size={16} />
            Create New Page
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button 
          onClick={() => setActiveTab("pages")}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
            activeTab === "pages" ? "border-[#C9A227] text-[#1B2A6B]" : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          All Pages
        </button>
        <button 
          onClick={() => setActiveTab("templates")}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
            activeTab === "templates" ? "border-[#C9A227] text-[#1B2A6B]" : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          Page Templates
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search pages by name or type..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#1B2A6B] focus:border-transparent outline-none transition-all"
          />
        </div>
        <button className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
          <Filter size={16} /> Filter by Status
        </button>
      </div>

      {/* Pages List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider">Page Name</th>
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider">Path</th>
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider">Last Edited</th>
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1B2A6B]/5 flex items-center justify-center text-[#1B2A6B] shrink-0">
                        {page.type === 'Legal' ? <FileText size={18} /> : 
                         page.type === 'Landing' ? <Globe size={18} /> : <Type size={18} />}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-800">{page.name}</p>
                        <p className="text-xs font-semibold text-slate-400">{page.type} Template</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-mono rounded-md border border-slate-200">
                      {page.path}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      page.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                      'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {page.status === 'Published' && <CheckCircle2 size={12} />}
                      {page.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-semibold text-slate-600">{page.lastEdited}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        title="View Live"
                        className="p-2 text-slate-400 hover:text-[#1B2A6B] hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        title="Edit Page"
                        onClick={() => router.push(`/admin/cms/editor/${page.id}`)}
                        className="p-2 text-slate-400 hover:text-[#C9A227] hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        title="More Options"
                        className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPages.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">
                    No pages found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
