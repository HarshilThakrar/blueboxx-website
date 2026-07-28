import api from '../../axios';
import { getActiveToken } from '../../authUtils';
import useSWR from 'swr';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const InternshipService = {

  // ─── Dashboard Stats ────────────────────────────────────────────────────────
  useStats: () => {
    const { data, error, mutate, isLoading } = useSWR('/admin/internships/stats', fetcher);
    return { data: data?.data || null, isLoading, isError: !!error, mutate };
  },

  // ─── Internship CRUD ─────────────────────────────────────────────────────────
  useInternships: (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null))
    ).toString();
    const url = `/admin/internships${query ? '?' + query : ''}`;
    const { data, error, mutate, isLoading } = useSWR(url, fetcher, { keepPreviousData: true });
    return {
      // Enterprise controller: { success: true, data: { current_page, data: [...], total, ... } }
      data: Array.isArray(data?.data) ? data.data : (data?.data?.data || []),
      meta: data?.data || {},
      isLoading,
      isError: !!error,
      mutate,
    };
  },

  getInternship: async (id: number | string) => {
    const res = await api.get(`/admin/internships/${id}`);
    return res.data;
  },

  createInternship: async (data: Record<string, any>) => {
    const res = await api.post('/admin/internships', data);
    return res.data;
  },

  updateInternship: async (id: number | string, data: Record<string, any>) => {
    const res = await api.put(`/admin/internships/${id}`, data);
    return res.data;
  },

  deleteInternship: async (id: number | string) => {
    const res = await api.delete(`/admin/internships/${id}`);
    return res.data;
  },

  duplicateInternship: async (id: number | string) => {
    const res = await api.post(`/admin/internships/${id}/duplicate`);
    return res.data;
  },

  bulkUpdateStatus: async (ids: (number | string)[], status: string) => {
    const res = await api.post('/admin/internships/bulk-update-status', { ids, status });
    return res.data;
  },

  bulkDelete: async (ids: (number | string)[]) => {
    const res = await api.post('/admin/internships/bulk-delete', { ids });
    return res.data;
  },

  exportCSV: (params: Record<string, any> = {}) => {
    const token = typeof window !== 'undefined' ? getActiveToken() : '';
    const queryParams = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null))
    ).toString();
    const url = `http://localhost:8000/api/admin/internships/export${queryParams ? '?' + queryParams : ''}`;
    // Use fetch with auth header for file download
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.blob())
      .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'internships_export.csv';
        a.click();
      });
  },

  // ─── Applications ────────────────────────────────────────────────────────────
  useAllApplications: (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null))
    ).toString();
    const url = `/admin/internships/all-applications${query ? '?' + query : ''}`;
    const { data, error, mutate, isLoading } = useSWR(url, fetcher, { keepPreviousData: true });
    return {
      data: Array.isArray(data?.data) ? data.data : (data?.data?.data || []),
      meta: data?.data || {},
      isLoading,
      isError: !!error,
      mutate,
    };
  },

  useInternshipApplications: (internshipId: number | string, params: Record<string, any> = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null))
    ).toString();
    const url = internshipId
      ? `/admin/internships/${internshipId}/applications${query ? '?' + query : ''}`
      : null;
    const { data, error, mutate, isLoading } = useSWR(url, fetcher, { keepPreviousData: true });
    return {
      data: Array.isArray(data?.data) ? data.data : (data?.data?.data || []),
      meta: data?.data || {},
      isLoading,
      isError: !!error,
      mutate,
    };
  },

  updateApplicationStatus: async (id: number | string, status: string, internalNotes?: string) => {
    const res = await api.put(`/admin/internships/applications/${id}/status`, {
      status,
      internal_notes: internalNotes,
    });
    return res.data;
  },

  // ─── Tasks ───────────────────────────────────────────────────────────────────
  useInternshipTasks: (internshipId: number | string) => {
    const url = internshipId ? `/admin/internships/${internshipId}/tasks` : null;
    const { data, error, mutate, isLoading } = useSWR(url, fetcher);
    return {
      data: data?.data || [],
      isLoading,
      isError: !!error,
      mutate,
    };
  },

  createTask: async (data: Record<string, any>) => {
    const res = await api.post('/admin/internships/tasks', data);
    return res.data;
  },

  updateTask: async (id: number | string, data: Record<string, any>) => {
    const res = await api.put(`/admin/internships/tasks/${id}`, data);
    return res.data;
  },

  deleteTask: async (id: number | string) => {
    const res = await api.delete(`/admin/internships/tasks/${id}`);
    return res.data;
  },

  // ─── Submissions ─────────────────────────────────────────────────────────────
  useAllSubmissions: (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null))
    ).toString();
    const url = `/admin/internships/all-submissions${query ? '?' + query : ''}`;
    const { data, error, mutate, isLoading } = useSWR(url, fetcher, { keepPreviousData: true });
    return {
      data: Array.isArray(data?.data) ? data.data : (data?.data?.data || []),
      meta: data?.data || {},
      isLoading,
      isError: !!error,
      mutate,
    };
  },

  gradeSubmission: async (
    submissionId: number | string,
    payload: { status: string; marks_obtained?: number; feedback?: string }
  ) => {
    const res = await api.put(`/admin/internships/submissions/${submissionId}/grade`, payload);
    return res.data;
  },
};
