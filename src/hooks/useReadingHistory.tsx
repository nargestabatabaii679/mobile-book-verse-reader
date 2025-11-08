import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface ReadingHistoryUpdate {
  book_id: string;
  current_page: number;
  total_pages: number;
  progress_percentage: number;
  reading_time_minutes?: number;
}

export const useReadingHistory = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: history, isLoading } = useQuery({
    queryKey: ['reading-history', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('reading_history')
        .select(`
          *,
          books:book_id (
            id,
            title,
            author,
            cover_url,
            category
          )
        `)
        .eq('user_id', user.id)
        .order('last_read_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const updateProgress = useMutation({
    mutationFn: async ({ book_id, current_page, total_pages, progress_percentage, reading_time_minutes }: ReadingHistoryUpdate) => {
      if (!user) throw new Error('کاربر وارد نشده است');
      
      const completed_at = progress_percentage >= 100 ? new Date().toISOString() : null;

      const { data, error } = await supabase
        .from('reading_history')
        .upsert({
          user_id: user.id,
          book_id,
          current_page,
          total_pages,
          progress_percentage,
          reading_time_minutes: reading_time_minutes || 0,
          last_read_at: new Date().toISOString(),
          completed_at,
        }, {
          onConflict: 'user_id,book_id',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reading-history'] });
    },
    onError: (error: Error) => {
      toast.error(`خطا در ذخیره پیشرفت: ${error.message}`);
    },
  });

  const deleteHistory = useMutation({
    mutationFn: async (bookId: string) => {
      if (!user) throw new Error('کاربر وارد نشده است');
      
      const { error } = await supabase
        .from('reading_history')
        .delete()
        .eq('user_id', user.id)
        .eq('book_id', bookId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reading-history'] });
      toast.success('تاریخچه حذف شد');
    },
    onError: (error: Error) => {
      toast.error(`خطا در حذف تاریخچه: ${error.message}`);
    },
  });

  return {
    history,
    isLoading,
    updateProgress: updateProgress.mutate,
    deleteHistory: deleteHistory.mutate,
    isUpdating: updateProgress.isPending,
  };
};
