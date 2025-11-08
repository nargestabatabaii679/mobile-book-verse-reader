
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Json } from '@/integrations/supabase/types';

interface BookLog {
  id: string;
  operation_type: 'single' | 'bulk';
  books_count: number;
  book_ids: string[];
  operation_details?: Json;
  created_at: string;
  user_session?: string;
  status: 'success' | 'failed' | 'partial';
}

// Enhanced error handling utility
const handleSupabaseError = (error: unknown, context: string) => {
  console.error(`${context}:`, error);

  const err = error as { message?: string; code?: string; status?: number };

  if (err?.code === 'PGRST301' || err?.code === 'PGRST116') {
    toast.error('خطا در احراز هویت');
  } else if (err?.message?.includes('fetch')) {
    toast.error('خطا در اتصال به شبکه');
  } else if (err?.message?.includes('timeout')) {
    toast.error('زمان اتصال به پایان رسید');
  } else {
    toast.error('خطا در اتصال به سرور');
  }

  return err;
};

export const useLogBookOperation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (logData: {
      operation_type: 'single' | 'bulk';
      books_count: number;
      book_ids: string[];
      operation_details?: Json;
      user_session?: string;
      status?: 'success' | 'failed' | 'partial';
    }) => {
      try {
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
          throw handleSupabaseError(error, 'Error logging book operation');
        }

        console.log('Book operation logged successfully:', data);
        return data;
      } catch (error) {
        throw handleSupabaseError(error, 'Network error logging operation');
      }
    },
    onError: () => {
      // Error handling is done in the mutationFn
    },
    retry: (failureCount, error) => {
      const err = error as { code?: string; status?: number };
      if (err?.code === 'PGRST301' || err?.status === 401) {
        return false;
      }
      return failureCount < 1;
    },
    retryDelay: 1500,
  });
};

export const useBookLogs = () => {
  return useQuery({
    queryKey: ['book-logs'],
    queryFn: async () => {
      try {
        console.log('Fetching book logs from Supabase...');
        const { data, error } = await supabase
          .from('book_additions_log')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw handleSupabaseError(error, 'Error fetching book logs');
        }

        console.log('Book logs fetched successfully:', data?.length);
        return data as BookLog[];
      } catch (error) {
        throw handleSupabaseError(error, 'Network error fetching book logs');
      }
    },
    retry: (failureCount, error) => {
      const err = error as { code?: string; status?: number };
      if (err?.code === 'PGRST301' || err?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: 1500,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};
