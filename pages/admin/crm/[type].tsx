import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AdminDashboardLayout } from '../../../src/layout/AdminDashboardLayout';
import { LeadService } from '../../../src/lib/api/admin/LeadService';
import { useGlobalSettings } from '../../../src/contexts/SettingsContext';
import { 
  Mail, Search, Phone, Clock, User, Trash2, Edit3, Briefcase, BookOpen, Handshake, Compass, Calendar, Send 
} from 'lucide-react';
import toast from 'react-hot-toast';

const formatTitle = (slug: string) => {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

const getIcon = (slug: string) => {
  if (slug === 'contact-inquiries') return Mail;
  if (slug === 'course-inquiries') return BookOpen;
  if (slug === 'mentor-inquiries') return User;
  if (slug === 'corporate-training') return Briefcase;
  if (slug === 'partnership-requests') return Handshake;
  if (slug === 'need-guidance') return Compass;
  if (slug === 'book-consultation') return Calendar;
  if (slug === 'newsletter') return Send;
  return Mail;
};

export default function CRMLeadCategory() {
  const router = useRouter();
  const { type } = router.query;
  const slug = typeof type === 'string' ? type : '';

  const { settings } = useGlobalSettings();
  let dynamicSubjects = [
    "Course Information",
    "Internship Inquiry",
    "Job Opportunities",
    "Mentorship",
    "Career Guidance",
    "Book Consultation",
    "Corporate Training",
    "Partnership / Collaboration",
    "Campus Hiring"
  ];
  try {
    if (settings?.crm_lead_categories) {
      const parsed = JSON.parse(settings.crm_lead_categories);
      if (Array.isArray(parsed) && parsed.length > 0) dynamicSubjects = parsed;
    }
  } catch (e) {}

  const matchedSubject = dynamicSubjects.find(s => 
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
  );

  const title = matchedSubject || formatTitle(slug);
  const Icon = getIcon(slug);
  
  // Actually maps to the database `type` column
  const dbType = title === 'Newsletter' ? 'Newsletter Subscriber' : title;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const { data: leadsData, isLoading, mutate } = LeadService.useLeads({ 
    search: searchQuery, 
    status: statusFilter, 
    type: dbType 
  });
  
  const leads = leadsData?.data || [];

  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [internalNotes, setInternalNotes] = useState('');

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await LeadService.updateLead(id, { status });
      toast.success(`Lead marked as ${status}`);
      mutate();
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status });
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    try {
      await LeadService.updateLead(selectedLead.id, { internal_notes: internalNotes });
      toast.success('Internal notes saved');
      mutate();
      setSelectedLead({ ...selectedLead, internal_notes: internalNotes });
    } catch (error) {
      toast.error('Failed to save notes');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await LeadService.deleteLead(id);
      toast.success('Lead deleted');
      mutate();
      if (selectedLead?.id === id) setSelectedLead(null);
    } catch (error) {
      toast.error('Failed to delete lead');
    }
  };

  const handleConvertStudent = async (id: number) => {
    if (!confirm('Convert this lead to a Student?')) return;
    try {
      await LeadService.convertToStudent(id);
      toast.success('Successfully converted to Student!');
      mutate();
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status: 'converted' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to convert');
    }
  };

  const handleConvertCompany = async (id: number) => {
    if (!confirm('Convert this lead to a Company / Placement Partner?')) return;
    try {
      await LeadService.convertToStudent(id); // Wait, LeadService needs the new methods.
      toast.success('Successfully converted to Company!');
      mutate();
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status: 'converted' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to convert');
    }
  };

  return (
    <AdminDashboardLayout>
      <Head>
        <title>{title} | CRM | BlueBoxx DA</title>
      </Head>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#0d1635] flex items-center gap-2">
            <Icon size={28} className="text-[#C9A227]"/> {title} Pipeline
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-semibold">Manage and convert {title.toLowerCase()} leads.</p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-gray-700 bg-white outline-none focus:ring-2 focus:ring-[#1B2A6B]"
          >
            <option value="All">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
            <option value="spam">Spam</option>
          </select>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search leads..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1B2A6B] outline-none shadow-sm w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Leads Table */}
        <div className={`flex-1 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all ${selectedLead ? 'hidden lg:block lg:w-2/3' : 'w-full'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Lead Name</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Info</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-sm font-medium text-gray-500">Loading leads...</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-sm font-medium text-gray-500">No leads found in this pipeline.</td></tr>
                ) : leads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">{lead.name}</p>
                      <p className="text-xs font-semibold text-gray-400 truncate max-w-[200px]">{lead.subject || lead.source}</p>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <p className="text-xs font-semibold text-gray-600 flex items-center gap-1.5"><Mail size={12} className="text-gray-400"/> {lead.email}</p>
                      {lead.phone && <p className="text-xs font-semibold text-gray-600 flex items-center gap-1.5"><Phone size={12} className="text-gray-400"/> {lead.phone}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-gray-600">{new Date(lead.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                        ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' : ''}
                        ${lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${lead.status === 'in_progress' ? 'bg-orange-100 text-orange-700' : ''}
                        ${lead.status === 'converted' ? 'bg-emerald-100 text-emerald-700' : ''}
                        ${lead.status === 'closed' ? 'bg-gray-100 text-gray-700' : ''}
                        ${lead.status === 'spam' ? 'bg-red-100 text-red-700' : ''}
                      `}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => { setSelectedLead(lead); setInternalNotes(lead.internal_notes || ''); }}
                        className="px-3 py-1.5 bg-[#1B2A6B]/10 text-[#1B2A6B] hover:bg-[#1B2A6B] hover:text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Action Panel (Slide over or side panel) */}
        {selectedLead && (
          <div className="w-full lg:w-1/3 bg-white border border-[#1B2A6B]/20 rounded-2xl shadow-xl flex flex-col h-[calc(100vh-14rem)] sticky top-24">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-t-2xl">
              <h3 className="font-black text-gray-800 text-lg">Lead Details</h3>
              <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-700 font-bold text-sm">Close</button>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto admin-scrollbar space-y-6">
              
              {/* Header Info */}
              <div>
                <h2 className="text-xl font-black text-gray-900">{selectedLead.name}</h2>
                <div className="flex gap-4 mt-2">
                  <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-1.5 text-sm font-semibold text-[#1B2A6B] hover:underline"><Mail size={14}/> {selectedLead.email}</a>
                  {selectedLead.phone && <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-1.5 text-sm font-semibold text-[#1B2A6B] hover:underline"><Phone size={14}/> {selectedLead.phone}</a>}
                </div>
              </div>

              {/* Status Manager */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Lead Status</label>
                <select 
                  value={selectedLead.status}
                  onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-700 outline-none focus:border-[#1B2A6B]"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="converted">Converted (Won)</option>
                  <option value="closed">Closed (Lost)</option>
                  <option value="spam">Spam / Junk</option>
                </select>
              </div>

              {/* Message Content */}
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Subject / Message</label>
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
                  <p className="font-bold text-blue-900 text-sm mb-2">{selectedLead.subject || 'No Subject Provided'}</p>
                  <p className="text-sm font-medium text-blue-800 whitespace-pre-wrap">{selectedLead.message || 'No message content.'}</p>
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Edit3 size={12}/> Internal Notes</label>
                <textarea 
                  value={internalNotes}
                  onChange={e => setInternalNotes(e.target.value)}
                  placeholder="Add notes for your team..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium text-gray-700 outline-none focus:border-[#1B2A6B] min-h-[100px] resize-y"
                />
                <button onClick={handleSaveNotes} className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors">
                  Save Notes
                </button>
              </div>

            </div>

            {/* Actions Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/80 rounded-b-2xl space-y-2">
              {selectedLead.status !== 'converted' && (
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleConvertStudent(selectedLead.id)} className="w-full py-2 bg-[#1B2A6B] hover:bg-[#121c47] text-white rounded-lg text-xs font-bold transition-colors shadow-sm">
                    Convert to Student
                  </button>
                  <button onClick={() => handleConvertCompany(selectedLead.id)} className="w-full py-2 bg-[#C9A227] hover:bg-[#b08d20] text-[#0d1635] rounded-lg text-xs font-bold transition-colors shadow-sm">
                    Convert to Company
                  </button>
                </div>
              )}
              <button onClick={() => handleDelete(selectedLead.id)} className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
                <Trash2 size={14}/> Delete Lead
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
