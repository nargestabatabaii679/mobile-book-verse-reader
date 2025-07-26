import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, checkSupabaseConnection } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface InteractiveStory {
  id: string;
  title: string;
  description: string;
  cover_url: string;
  difficulty_level: string;
  estimated_time: number;
  category: string;
  age_range: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StoryNode {
  id: string;
  story_id: string;
  node_id: string;
  title: string;
  content: string;
  background_image?: string;
  background_gradient?: string;
  sound_effect?: string;
  is_ending: boolean;
  ending_type?: string;
  score_impact: number;
}

export interface StoryChoice {
  id: string;
  node_id: string;
  choice_text: string;
  next_node_id: string;
  score_impact: number;
  sound_effect?: string;
  required_item?: string;
  order_index: number;
}

// Enhanced error handling utility
const handleSupabaseError = (error: unknown, context: string) => {
  console.error(`${context}:`, error);

  // Type guard for error objects
  const err = error as { message?: string; code?: string; status?: number };

  if (err?.code === 'PGRST301' || err?.code === 'PGRST116') {
    toast.error('خطا در احراز هویت - لطفاً مجدداً وارد شوید');
  } else if (err?.message?.includes('fetch')) {
    toast.error('خطا در اتصال به شبکه - اتصال اینترنت خود را بررسی کنید');
  } else if (err?.message?.includes('timeout')) {
    toast.error('زمان اتصال به پایان رسید - لطفاً مجدداً تلاش کنید');
  } else {
    toast.error('خطا در اتصال به سرور - لطفاً مجدداً تلاش کنید');
  }

  return err;
};

// Fetch all interactive stories
export const useInteractiveStories = () => {
  return useQuery({
    queryKey: ['interactive-stories'],
    queryFn: async () => {
      try {
        // Check connection health first
        const isHealthy = await checkSupabaseConnection();
        if (!isHealthy) {
          throw new Error('Supabase connection unhealthy');
        }

        console.log('Fetching interactive stories...');
        const { data, error } = await supabase
          .from('interactive_stories')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) {
          throw handleSupabaseError(error, 'Error fetching interactive stories');
        }

        console.log('Interactive stories loaded:', data?.length || 0);
        return data as InteractiveStory[];
      } catch (error) {
        throw handleSupabaseError(error, 'Network error fetching stories');
      }
    },
    retry: (failureCount, error) => {
      // Don't retry for authentication errors
      const err = error as { code?: string; status?: number };
      if (err?.code === 'PGRST301' || err?.status === 401) {
        return false;
      }
      // Retry up to 3 times for network errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Fetch story nodes with choices
export const useStoryNodes = (storyId: string) => {
  return useQuery({
    queryKey: ['story-nodes', storyId],
    queryFn: async () => {
      try {
        const { data: nodes, error: nodesError } = await supabase
          .from('story_nodes')
          .select('*')
          .eq('story_id', storyId);

        if (nodesError) {
          throw handleSupabaseError(nodesError, 'Error fetching story nodes');
        }

        const { data: choices, error: choicesError } = await supabase
          .from('story_choices')
          .select('*')
          .in('node_id', nodes.map(n => n.id))
          .order('order_index');

        if (choicesError) {
          throw handleSupabaseError(choicesError, 'Error fetching story choices');
        }

        return {
          nodes: nodes as StoryNode[],
          choices: choices as StoryChoice[]
        };
      } catch (error) {
        throw handleSupabaseError(error, 'Network error fetching story data');
      }
    },
    enabled: !!storyId,
    retry: (failureCount, error) => {
      const err = error as { code?: string; status?: number };
      if (err?.code === 'PGRST301' || err?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: 1500,
  });
};

// Add new interactive story
export const useAddInteractiveStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (story: Omit<InteractiveStory, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        const { data, error } = await supabase
          .from('interactive_stories')
          .insert([story])
          .select()
          .single();

        if (error) {
          throw handleSupabaseError(error, 'Error adding interactive story');
        }

        return data;
      } catch (error) {
        throw handleSupabaseError(error, 'Network error adding story');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interactive-stories'] });
      toast.success('داستان تعاملی با موفقیت اضافه شد');
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
    retryDelay: 2000,
  });
};

// Update interactive story
export const useUpdateInteractiveStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<InteractiveStory> & { id: string }) => {
      try {
        const { data, error } = await supabase
          .from('interactive_stories')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (error) {
          throw handleSupabaseError(error, 'Error updating interactive story');
        }

        return data;
      } catch (error) {
        throw handleSupabaseError(error, 'Network error updating story');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interactive-stories'] });
      toast.success('داستان با موفقیت به‌روزرسانی شد');
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
    retryDelay: 2000,
  });
};

// Delete interactive story
export const useDeleteInteractiveStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from('interactive_stories')
          .delete()
          .eq('id', id);

        if (error) {
          throw handleSupabaseError(error, 'Error deleting interactive story');
        }
      } catch (error) {
        throw handleSupabaseError(error, 'Network error deleting story');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interactive-stories'] });
      toast.success('داستان با موفقیت حذف شد');
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
    retryDelay: 2000,
  });
};