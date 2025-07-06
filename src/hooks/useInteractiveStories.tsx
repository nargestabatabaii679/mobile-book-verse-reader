import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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

// Fetch all interactive stories
export const useInteractiveStories = () => {
  return useQuery({
    queryKey: ['interactive-stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('interactive_stories')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching interactive stories:', error);
        throw error;
      }

      return data as InteractiveStory[];
    },
  });
};

// Fetch story nodes with choices
export const useStoryNodes = (storyId: string) => {
  return useQuery({
    queryKey: ['story-nodes', storyId],
    queryFn: async () => {
      const { data: nodes, error: nodesError } = await supabase
        .from('story_nodes')
        .select('*')
        .eq('story_id', storyId);

      if (nodesError) throw nodesError;

      const { data: choices, error: choicesError } = await supabase
        .from('story_choices')
        .select('*')
        .in('node_id', nodes.map(n => n.id))
        .order('order_index');

      if (choicesError) throw choicesError;

      return {
        nodes: nodes as StoryNode[],
        choices: choices as StoryChoice[]
      };
    },
    enabled: !!storyId,
  });
};

// Add new interactive story
export const useAddInteractiveStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (story: Omit<InteractiveStory, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('interactive_stories')
        .insert([story])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interactive-stories'] });
      toast.success('داستان تعاملی با موفقیت اضافه شد');
    },
    onError: (error) => {
      console.error('Error adding story:', error);
      toast.error('خطا در افزودن داستان');
    },
  });
};

// Update interactive story
export const useUpdateInteractiveStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<InteractiveStory> & { id: string }) => {
      const { data, error } = await supabase
        .from('interactive_stories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interactive-stories'] });
      toast.success('داستان با موفقیت به‌روزرسانی شد');
    },
    onError: (error) => {
      console.error('Error updating story:', error);
      toast.error('خطا در به‌روزرسانی داستان');
    },
  });
};

// Delete interactive story
export const useDeleteInteractiveStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('interactive_stories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interactive-stories'] });
      toast.success('داستان با موفقیت حذف شد');
    },
    onError: (error) => {
      console.error('Error deleting story:', error);
      toast.error('خطا در حذف داستان');
    },
  });
};