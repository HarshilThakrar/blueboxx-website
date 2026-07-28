import api from '../../axios';
import { getActiveToken } from '../../authUtils';
import useSWR from 'swr';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const JobService = {

  useJobs: (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null))
    ).toString();
    const url = `/admin/jobs${query ? '?' + query : ''}`;
    const { data, error, mutate, isLoading } = useSWR(url, fetcher, { 
      keepPreviousData: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    });
    return {
      // paginated Laravel response: { current_page, data: [...], total, ... }
      data: data?.data || [],
      meta: data || {},
      isLoading,
      isError: !!error,
      mutate,
    };
  },

  getJobDetails: async (id: string | number) => {
    const response = await api.get(`/admin/jobs/${id}`);
    return response.data;
  },

  createJob: async (data: any) => {
    const response = await api.post('/admin/jobs', data);
    return response.data;
  },

  updateJob: async (id: string | number, data: any) => {
    const response = await api.put(`/admin/jobs/${id}`, data);
    return response.data;
  },

  deleteJob: async (id: string | number) => {
    const response = await api.delete(`/admin/jobs/${id}`);
    return response.data;
  },

  useDashboardMetrics: () => {
    const { data, error, isLoading, mutate } = useSWR('/admin/jobs/dashboard-metrics', fetcher, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    });
    return { data, error, isLoading, mutate };
  },

  exportCSV: () => {
    const token = typeof window !== 'undefined' ? getActiveToken() : '';
    const url = `http://localhost:8000/api/admin/jobs/export`;
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.blob())
      .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'jobs-export.csv';
        a.click();
      });
  },
};
