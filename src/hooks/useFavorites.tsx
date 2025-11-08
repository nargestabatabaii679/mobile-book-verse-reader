import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const useFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_favorites')
        .select(`
          *,
          books:book_id (
            id,
            title,
            author,
            cover_url,
            category,
            description
          )
        `)
        .eq('user_id', user.id)
        .order('added_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const addFavorite = useMutation({
    mutationFn: async ({ bookId, notes }: { bookId: string; notes?: string }) => {
      if (!user) throw new Error('کاربر وارد نشده است');
      
      const { data, error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          book_id: bookId,
          notes: notes || null,
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          throw new Error('این کتاب قبلاً به علاقه‌مندی‌ها اضافه شده است');
        }
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success('به علاقه‌مندی‌ها اضافه شد');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (bookId: string) => {
      if (!user) throw new Error('کاربر وارد نشده است');
      
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('book_id', bookId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success('از علاقه‌مندی‌ها حذف شد');
    },
    onError: (error: Error) => {
      toast.error(`خطا در حذف: ${error.message}`);
    },
  });

  const isFavorite = (bookId: string) => {
    return favorites?.some(fav => fav.book_id === bookId) || false;
  };

  return {
    favorites,
    isLoading,
    addFavorite: addFavorite.mutate,
    removeFavorite: removeFavorite.mutate,
    isFavorite,
    isAdding: addFavorite.isPending,
    isRemoving: removeFavorite.isPending,
  };
};
