import React, { useState } from 'react';
import Head from 'next/head';
import { AdminDashboardLayout } from '../../../src/layout/AdminDashboardLayout';
import { DataTable } from '../../../src/components/DataTable';
import { 
  Plus, Edit2, Trash2, Eye, Download, Upload, 
  Mail, Phone, Calendar, BookOpen, UserCheck, 
  CheckCircle, XCircle, Star, Video, EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';

import { InstructorService } from '../../../src/lib/api/admin/InstructorService';
import api from '../../../src/lib/axios';

interface Instructor {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  profile_photo?: string;
  specialization: string;
  average_rating?: number;
  activeCourses?: number;
  approval_status: 'Approved' | 'Pending' | 'Rejected' | 'Suspended';
  created_at?: string;
  designation?: string;
  experience?: string;
  skills?: any;
  highest_qualification?: string;
  bio?: string;
  assignedCourses?: string;
  role?: string;
  linkedin?: string;
  company?: string;
  experience_years?: string;
  is_verified?: boolean;
  password?: string;
}

export default function InstructorsManager() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState<'All' | 'Approved' | 'Pending' | 'Rejected' | 'Suspended'>('All');

  const params: Record<string, any> = { page: currentPage, per_page: perPage };
  if (activeTab !== 'All') params.approval_status = activeTab.toLowerCase();

  const { data: instructorsData, meta, mutate, isLoading } = InstructorService.useInstructors(params);
  const instructors = instructorsData || [];
  const totalPages = meta?.last_page || 1;
  const totalEntries = meta?.total || 0;
  const fromEntry = meta?.from || 0;
  const toEntry = meta?.to || 0;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'add' | 'edit'>('view');
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const filteredInstructors = instructors;

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this instructor?')) {
      try {
        await InstructorService.deleteInstructor(id);
        mutate();
        toast.success('Instructor deleted successfully');
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to delete instructor');
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await InstructorService.updateInstructorStatus(id, newStatus.toLowerCase());
      toast.success(`Instructor status changed to ${newStatus}`);
      mutate();
    } catch (error) {
      toast.error('Failed to change status');
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setSelectedInstructor({
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      avatar: 'https://i.pravatar.cc/150',
      specialization: '',
      average_rating: 0,
      activeCourses: 0,
      approval_status: 'Approved',
      designation: '',
      experience_years: '',
      highest_qualification: '',
      bio: '',
      password: '',
    } as any);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const openEditModal = (instructor: Instructor) => {
    setSelectedInstructor({ ...instructor });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const openViewModal = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        first_name: selectedInstructor?.first_name || selectedInstructor?.name?.split(' ')[0] || '',
        last_name: selectedInstructor?.last_name || selectedInstructor?.name?.split(' ').slice(1).join(' ') || '',
        email: selectedInstructor?.email,
        phone: selectedInstructor?.phone,
        designation: selectedInstructor?.designation,
        company: selectedInstructor?.company,
        bio: selectedInstructor?.bio,
        experience_years: selectedInstructor?.experience_years || selectedInstructor?.experience,
        highest_qualification: selectedInstructor?.highest_qualification || selectedInstructor?.qualification,
        password: selectedInstructor?.password || 'password123',
        avatar: selectedInstructor?.avatar,
      };
      
      if (modalMode === 'edit') {
        await InstructorService.updateInstructor(selectedInstructor!.id, payload);
        toast.success('Instructor updated successfully');
      } else {
        await InstructorService.createInstructor(payload);
        toast.success('Instructor created successfully');
      }
      mutate();
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save instructor. Email might already exist.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved': return <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Approved</span>;
      case 'Pending': return <span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">Pending Request</span>;
      case 'Rejected': return <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">Rejected</span>;
      case 'Suspended': return <span className="px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">Suspended</span>;
      default: return null;
    }
  }

  const columns = [
    { key: 'name', label: 'Instructor', render: (r: any) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
          {r.first_name?.charAt(0) || 'I'}
        </div>
        <div>
          <p className="font-bold text-[#1B2A6B]">{r.first_name} {r.last_name}</p>
          <p className="text-xs text-gray-500">{r.email}</p>
        </div>
      </div>
    )},
    { key: 'specialization', label: 'Specialization', render: (r: any) => (
      <span className="font-semibold text-gray-700">{r.specialization || r.designation || 'N/A'}</span>
    )},
    { key: 'rating', label: 'Performance', render: (r: any) => (
      <div>
        <div className="flex items-center gap-1 text-sm font-bold text-gray-800"><Star size={14} className="text-[#C9A227] fill-[#C9A227]"/> {r.average_rating > 0 ? r.average_rating : 'N/A'}</div>
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1"><Video size={12}/> {r.activeCourses || 0} Courses</div>
      </div>
    )},
    { key: 'status', label: 'Status', render: (r: any) => getStatusBadge(r.approval_status || 'Pending') },
    { key: 'actions', label: 'Actions', render: (r: any) => (
      <div className="flex gap-2">
        {r.approval_status === 'Pending' && (
          <>
            <button onClick={() => handleStatusChange(r.id, 'Approved')} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded" title="Approve Request"><CheckCircle size={16}/></button>
            <button onClick={() => handleStatusChange(r.id, 'Rejected')} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Reject Request"><XCircle size={16}/></button>
          </>
        )}
        <button onClick={() => openViewModal(r)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="View Profile"><Eye size={16}/></button>
        <button onClick={() => openEditModal(r)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded" title="Edit"><Edit2 size={16}/></button>
        <button onClick={() => handleDelete(r.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 size={16}/></button>
      </div>
    )}
  ];

  return (
    <AdminDashboardLayout>
      <Head>
        <title>Instructors | BlueBoxx DA</title>
      </Head>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0d1635] flex items-center gap-2">
            <UserCheck size={28} className="text-[#C9A227]"/> Instructors Manager
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage instructor accounts, course creators, and incoming requests.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={async () => {
            try {
              const response = await InstructorService.exportInstructors();
              // In InstructorService it returns the blob directly if we set responseType: 'blob'
              // Or we can just use the axios instance directly here for safety
              const api = (await import('../../../src/lib/axios')).default;
              const res = await api.get('/admin/instructors/export', { responseType: 'blob' });
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement('a');
              link.href = url;
              link.download = `instructors_export_${new Date().toISOString().split('T')[0]}.xlsx`;
              document.body.appendChild(link);
              link.click();
              link.remove();
              window.URL.revokeObjectURL(url);
            } catch (err) {
              toast.error('Failed to export data');
            }
          }} className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#1B2A6B] hover:text-[#1B2A6B] text-gray-600 px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors">
            <Download size={16} /> Export
          </button>
          <button onClick={openAddModal} className="flex items-center gap-2 bg-[#1B2A6B] hover:bg-[#121c47] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md transition-colors">
            <Plus size={18} /> Add Instructor
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="flex overflow-x-auto border-b border-gray-200 admin-scrollbar">
          {['All', 'Approved', 'Pending', 'Rejected', 'Suspended'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab as any); setCurrentPage(1); }}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab ? 'text-[#1B2A6B] border-b-2 border-[#1B2A6B]' : 'text-gray-500 hover:text-gray-800'}`}
            >
              {tab === 'Pending' ? 'Instructor Requests' : tab}
            </button>
          ))}
        </div>
      </div>

      <DataTable 
        data={filteredInstructors}
        columns={columns}
        isLoading={isLoading}
      />

      {isModalOpen && selectedInstructor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-[#0d1635]">
                {modalMode === 'add' ? 'Add New Instructor' : modalMode === 'edit' ? 'Edit Instructor' : 'Instructor Profile'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700"><span className="text-2xl leading-none">&times;</span></button>
            </div>
            
            <div className="p-6 overflow-y-auto admin-scrollbar">
              
              {modalMode === 'view' ? (
                // VIEW MODE
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                    <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center text-3xl font-black text-gray-500 shrink-0">
                      {selectedInstructor.first_name?.charAt(0) || 'I'}
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3">
                        <div>
                          <h3 className="text-2xl font-black text-[#1B2A6B]">{selectedInstructor.first_name} {selectedInstructor.last_name}</h3>
                          <p className="text-gray-500 font-semibold">{selectedInstructor.email}</p>
                        </div>
                        {getStatusBadge(selectedInstructor.approval_status || 'Pending')}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Specialization</p>
                          <p className="font-bold text-gray-800 text-sm">{selectedInstructor.specialization || selectedInstructor.designation || 'N/A'}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Courses</p>
                          <p className="font-bold text-gray-800 text-sm flex items-center gap-2"><Video size={14} className="text-blue-500"/> {selectedInstructor.activeCourses || 0} Courses</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Average Rating</p>
                          <p className="font-bold text-gray-800 text-sm flex items-center gap-2"><Star size={14} className="text-[#C9A227] fill-[#C9A227]"/> {selectedInstructor.average_rating || 'N/A'}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                          <p className="font-bold text-gray-800 text-sm flex items-center gap-2"><Phone size={14} className="text-emerald-500"/> {selectedInstructor.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedInstructor.approval_status === 'Pending' && (
                    <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row gap-3">
                      <button onClick={() => handleStatusChange(selectedInstructor.id, 'Approved')} className="flex items-center justify-center flex-1 gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors shadow-sm w-full">
                        <CheckCircle size={18}/> Approve Request
                      </button>
                      <button onClick={() => handleStatusChange(selectedInstructor.id, 'Rejected')} className="flex items-center justify-center flex-1 gap-2 bg-red-100 hover:bg-red-200 text-red-600 font-bold py-3 rounded-xl transition-colors w-full">
                        <XCircle size={18}/> Reject Request
                      </button>
                    </div>
                  )}
                  {selectedInstructor.approval_status === 'Approved' && (
                    <div className="border-t border-gray-100 pt-6 flex justify-end">
                       <button onClick={() => handleStatusChange(selectedInstructor.id, 'Suspended')} className="text-sm font-bold text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
                         Suspend Account
                       </button>
                    </div>
                  )}
                </div>
              ) : (
                // ADD / EDIT FORM
                <form id="instructor-form" onSubmit={handleSave} className="space-y-6">
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <img src={selectedInstructor.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm" />
                      <button type="button" className="absolute bottom-0 right-0 bg-[#1B2A6B] text-white p-1.5 rounded-full shadow-md hover:bg-[#121c47]">
                        <Edit2 size={14} />
                      </button>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-700 mb-1">Profile Image</p>
                      <p className="text-xs text-gray-500 mb-3">Upload a square image, max 2MB.</p>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setSelectedInstructor({...selectedInstructor, avatar: reader.result as string});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#1B2A6B]/10 file:text-[#1B2A6B] hover:file:bg-[#1B2A6B]/20" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                      <input required type="text" value={selectedInstructor.name} onChange={e => setSelectedInstructor({...selectedInstructor, name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                      <input required type="email" value={selectedInstructor.email} onChange={e => setSelectedInstructor({...selectedInstructor, email: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                      <input type="text" value={selectedInstructor.phone} onChange={e => setSelectedInstructor({...selectedInstructor, phone: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Designation</label>
                      <input type="text" value={selectedInstructor.designation} onChange={e => setSelectedInstructor({...selectedInstructor, designation: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Specialization</label>
                      <input type="text" value={selectedInstructor.specialization} onChange={e => setSelectedInstructor({...selectedInstructor, specialization: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Experience</label>
                      <input type="text" value={selectedInstructor.experience} onChange={e => setSelectedInstructor({...selectedInstructor, experience: e.target.value})} placeholder="e.g. 5 Years" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Skills</label>
                      <input type="text" value={selectedInstructor.skills} onChange={e => setSelectedInstructor({...selectedInstructor, skills: e.target.value})} placeholder="Comma separated" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Qualification</label>
                      <input type="text" value={selectedInstructor.qualification} onChange={e => setSelectedInstructor({...selectedInstructor, qualification: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B]" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">Bio</label>
                      <textarea rows={3} value={selectedInstructor.bio} onChange={e => setSelectedInstructor({...selectedInstructor, bio: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B] resize-none"></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Assigned Courses</label>
                      <input type="text" value={selectedInstructor.assignedCourses} onChange={e => setSelectedInstructor({...selectedInstructor, assignedCourses: e.target.value})} placeholder="e.g. Web Dev Bootcamp" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Role</label>
                      <select value={selectedInstructor.role} onChange={e => setSelectedInstructor({...selectedInstructor, role: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B]">
                        <option value="Instructor">Instructor</option>
                        <option value="Senior Instructor">Senior Instructor</option>
                        <option value="Guest Lecturer">Guest Lecturer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Resume Upload</label>
                      <input type="file" className="w-full px-4 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B] text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#1B2A6B]/10 file:text-[#1B2A6B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">LinkedIn URL</label>
                      <input type="url" value={selectedInstructor.linkedin} onChange={e => setSelectedInstructor({...selectedInstructor, linkedin: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                      <select value={selectedInstructor.status} onChange={e => setSelectedInstructor({...selectedInstructor, status: e.target.value as any})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B]">
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending Request</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {modalMode === 'add' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border border-gray-100 mt-6">
                      <div className="relative">
                        <label className="block text-xs font-bold text-gray-700 mb-1">Initial Password *</label>
                        <input required type={showPassword ? "text" : "password"} value={selectedInstructor.password || ''} onChange={e => setSelectedInstructor({...selectedInstructor, password: e.target.value})} placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B] focus:border-transparent" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[26px] text-gray-400 hover:text-gray-600">
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      <div className="relative">
                        <label className="block text-xs font-bold text-gray-700 mb-1">Confirm Password *</label>
                        <input required type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B2A6B] focus:border-transparent" />
                      </div>
                    </div>
                  )}

                </form>
              )}

            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">Close</button>
              {modalMode !== 'view' && (
                <button type="submit" form="instructor-form" className="px-6 py-2 text-sm font-bold bg-[#1B2A6B] hover:bg-[#121c47] text-white rounded-lg shadow-md transition-colors">
                  {modalMode === 'add' ? 'Create Instructor' : 'Save Changes'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </AdminDashboardLayout>
  );
}
