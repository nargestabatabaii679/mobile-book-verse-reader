
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BookLog {
  id: string;
  operation_type: 'single' | 'bulk';
  books_count: number;
  book_ids: string[];
  operation_details?: any;
  created_at: string;
  user_session?: string;
  status: 'success' | 'failed' | 'partial';
}

export const useLogBookOperation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (logData: {
      operation_type: 'single' | 'bulk';
      books_count: number;
      book_ids: string[];
      operation_details?: any;
      user_session?: string;
      status?: 'success' | 'failed' | 'partial';
    }) => {
      console.log('Logging book operation:', logData);
      const { data, error } = await supabase
        .from('book_additions_log')
        .insert([{
          operation_type: logData.operation_type,
          books_count: logData.books_count,
          book_ids: logData.book_ids,
          operation_details: logData.operation_details || null,
          user_session: logData.user_session || null,
          status: logData.status || 'success'
        }])
        .select()
        .single();

      if (error) {
        console.error('Error logging book operation:', error);
        throw error;
      }

      console.log('Book operation logged successfully:', data);
      return data;
    },
    onError: (error) => {
      console.error('Failed to log book operation:', error);
    }
  });
};

export const useBookLogs = () => {
  return useQuery({
    queryKey: ['book-logs'],
    queryFn: async () => {
      console.log('Fetching book logs from Supabase...');
      const { data, error } = await supabase
        .from('book_additions_log')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching book logs:', error);
        throw error;
      }

      console.log('Book logs fetched successfully:', data?.length);
      return data as BookLog[];
    }
  });
};
