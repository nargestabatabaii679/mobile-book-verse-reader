-- Create books table
CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  category TEXT,
  age_range TEXT,
  language TEXT DEFAULT 'fa',
  total_pages INTEGER DEFAULT 0,
  is_interactive BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create book_pages table
CREATE TABLE public.book_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL,
  content TEXT,
  image_url TEXT,
  audio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(book_id, page_number)
);

-- Create book_additions_log table
CREATE TABLE public.book_additions_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  operation_type TEXT NOT NULL CHECK (operation_type IN ('single', 'bulk')),
  books_count INTEGER NOT NULL DEFAULT 1,
  book_ids TEXT[] NOT NULL,
  operation_details JSONB,
  user_session TEXT,
  status TEXT NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'failed', 'partial')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interactive stories table
CREATE TABLE public.interactive_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  difficulty_level TEXT DEFAULT 'متوسط',
  estimated_time INTEGER DEFAULT 15,
  category TEXT DEFAULT 'ماجراجویی',
  age_range TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create story nodes table
CREATE TABLE public.story_nodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.interactive_stories(id) ON DELETE CASCADE,
  node_id TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  background_image TEXT,
  background_gradient TEXT,
  sound_effect TEXT,
  is_ending BOOLEAN DEFAULT false,
  ending_type TEXT,
  score_impact INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create story choices table
CREATE TABLE public.story_choices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  node_id UUID NOT NULL REFERENCES public.story_nodes(id) ON DELETE CASCADE,
  choice_text TEXT NOT NULL,
  next_node_id TEXT NOT NULL,
  score_impact INTEGER DEFAULT 0,
  sound_effect TEXT,
  required_item TEXT,
  order_index INTEGER DEFAULT 0
);

-- Create story interactions table
CREATE TABLE public.story_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  node_id UUID NOT NULL REFERENCES public.story_nodes(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  correct_answer TEXT,
  items JSONB,
  reward_score INTEGER DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_additions_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactive_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_choices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_interactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for books (public read, authenticated write)
CREATE POLICY "Books are viewable by everyone" 
ON public.books FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert books" 
ON public.books FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update books" 
ON public.books FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete books" 
ON public.books FOR DELETE TO authenticated USING (true);

-- RLS Policies for book_pages (public read, authenticated write)
CREATE POLICY "Book pages are viewable by everyone" 
ON public.book_pages FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert book pages" 
ON public.book_pages FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update book pages" 
ON public.book_pages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete book pages" 
ON public.book_pages FOR DELETE TO authenticated USING (true);

-- RLS Policies for book_additions_log
CREATE POLICY "Authenticated users can view all logs" 
ON public.book_additions_log FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert logs" 
ON public.book_additions_log FOR INSERT TO authenticated WITH CHECK (true);

-- RLS Policies for interactive stories (public read)
CREATE POLICY "Interactive stories are viewable by everyone" 
ON public.interactive_stories FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can manage stories" 
ON public.interactive_stories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for story nodes (public read)
CREATE POLICY "Story nodes are viewable by everyone" 
ON public.story_nodes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage story nodes" 
ON public.story_nodes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for story choices (public read)
CREATE POLICY "Story choices are viewable by everyone" 
ON public.story_choices FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage story choices" 
ON public.story_choices FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for story interactions (public read)
CREATE POLICY "Story interactions are viewable by everyone" 
ON public.story_interactions FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage story interactions" 
ON public.story_interactions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_books_updated_at
BEFORE UPDATE ON public.books
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_interactive_stories_updated_at
BEFORE UPDATE ON public.interactive_stories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_books_category ON public.books(category);
CREATE INDEX idx_books_language ON public.books(language);
CREATE INDEX idx_book_pages_book_id ON public.book_pages(book_id);
CREATE INDEX idx_story_nodes_story_id ON public.story_nodes(story_id);
CREATE INDEX idx_story_choices_node_id ON public.story_choices(node_id);