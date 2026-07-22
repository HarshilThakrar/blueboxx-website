import useSWR from 'swr';
import api from '../../axios';
import toast from 'react-hot-toast';

export const NotificationService = {
  useNotifications: (isAuthenticated: boolean = false) => {
    const { data, error, mutate } = useSWR(
      // Only fetch if the user is authenticated — prevents 401s on public pages
      isAuthenticated ? '/notifications' : null,
      async (url) => {
        const res = await api.get(url);
        return res.data;
      },
      {
        refreshInterval: isAuthenticated ? 30000 : 0, // only poll when logged in
        revalidateOnFocus: false,
      }
    );

    const notifications = data?.data || [];
    const unreadCount = notifications.filter((n: any) => !n.read_at).length;

    const markAllRead = async () => {
      try {
        // Fixed: was '/notifications/read', correct route is '/notifications/read-all'
        await api.put('/notifications/read-all');
        // Optimistically update local state
        mutate(
          { ...data, data: notifications.map((n: any) => ({ ...n, read_at: new Date().toISOString() })) },
          false
        );
        toast.success('All notifications marked as read');
        // Revalidate from server
        mutate();
      } catch (err) {
        toast.error('Failed to mark notifications as read');
      }
    };

    return {
      notifications,
      unreadCount,
      isLoading: isAuthenticated && !error && !data,
      isError: error,
      markAllRead,
      mutate
    };
  }
};
