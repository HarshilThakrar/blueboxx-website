import { CollegeDashboardLayout } from "../../../src/layout/CollegeDashboardLayout";
import { Users, Plus, Search, Filter, MoreVertical, Building, X, Loader2, CheckCircle2 } from "lucide-react";
import { AnimatedContent } from "../../../src/components/reactbits/AnimatedContent";
import useSWR from "swr";
import api from "../../../src/lib/axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function CompaniesPage() {
  const { data, isLoading, mutate } = useSWR("/college/companies", fetcher);
  const companies = data?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [addingId, setAddingId] = useState<number | null>(null);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await api.get(`/college/companies/search?q=${searchQuery}`);
        setSearchResults(res.data.data || []);
      } catch (e) {
        console.error("Search failed", e);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const addPartner = async (companyId: number) => {
    setAddingId(companyId);
    try {
      await api.post("/college/companies", { company_id: companyId });
      toast.success("Partner added successfully!");
      setSearchResults(prev => prev.filter(c => c.id !== companyId));
      mutate();
    } catch (e) {
      toast.error("Failed to add partner");
    } finally {
      setAddingId(null);
    }
  };

  const removePartner = async (companyId: number) => {
    if (!confirm("Are you sure you want to remove this partnership?")) return;
    try {
      await api.delete(`/college/companies/${companyId}`);
      toast.success("Partnership removed");
      mutate();
    } catch (e) {
      toast.error("Failed to remove partner");
    }
  };

  return (
    <CollegeDashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Partner Companies</h1>
          <p className="text-slate-500 font-medium text-sm">Manage recruiting partnerships and invitations.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 h-10 px-5 bg-[#1B2A6B] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0d1635] transition-colors">
          <Plus size={15} /> Add Partner
        </button>
      </div>

      <AnimatedContent direction="up" delay={0.1} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search partners..." className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none transition-all" />
          </div>
          <button className="flex items-center justify-center gap-2 h-10 px-4 bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors shrink-0">
            <Filter size={15} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="py-3 px-4">Company Name</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Drives Hosted</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr><td colSpan={4} className="py-8 text-center text-slate-400 text-xs">Loading companies...</td></tr>
              ) : companies.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building size={20} className="text-slate-300" />
                    </div>
                    <p className="text-sm font-bold text-slate-500">No partner companies yet</p>
                    <p className="text-xs text-slate-400 mt-1">Connect with companies to host placement drives.</p>
                  </td>
                </tr>
              ) : (
                companies.map((company: any) => (
                  <tr key={company.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="text-sm font-bold text-slate-800">{company.name}</p>
                      <p className="text-xs text-slate-500">{company.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                        {company.pivot?.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-bold text-[#1B2A6B]">0</td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => removePartner(company.id)} className="text-xs font-bold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AnimatedContent>

      {/* Add Partner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md z-10 relative overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-[#0d1635]">Add Partner Company</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
            </div>
            <div className="p-4 border-b border-slate-100 shrink-0">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by company name or email..." 
                  className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] outline-none transition-all"
                  autoFocus
                />
              </div>
            </div>
            <div className="p-4 overflow-y-auto flex-1 bg-slate-50/30">
              {searchQuery.length < 2 ? (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Type at least 2 characters to search...
                </div>
              ) : isSearching ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="animate-spin text-[#1B2A6B]" size={24} />
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm font-medium">
                  No companies found matching "{searchQuery}"
                </div>
              ) : (
                <div className="space-y-2">
                  {searchResults.map(company => (
                    <div key={company.id} className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between shadow-sm">
                      <div>
                        <p className="text-sm font-bold text-slate-800">{company.name}</p>
                        <p className="text-xs text-slate-500">{company.email}</p>
                      </div>
                      <button 
                        onClick={() => addPartner(company.id)}
                        disabled={addingId === company.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B2A6B] text-white text-xs font-bold rounded-lg hover:bg-[#0d1635] transition-colors disabled:opacity-50"
                      >
                        {addingId === company.id ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                        {addingId === company.id ? 'Adding...' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </CollegeDashboardLayout>
  );
}
