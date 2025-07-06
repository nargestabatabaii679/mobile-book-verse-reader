-- Create interactive stories table
CREATE TABLE public.interactive_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  difficulty_level TEXT DEFAULT 'متوسط',
  estimated_time INTEGER DEFAULT 15, -- in minutes
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
  node_id TEXT NOT NULL, -- internal node identifier like "start", "forest_path", etc.
  title TEXT,
  content TEXT NOT NULL,
  background_image TEXT,
  background_gradient TEXT,
  sound_effect TEXT,
  is_ending BOOLEAN DEFAULT false,
  ending_type TEXT, -- 'happy', 'sad', 'neutral'
  score_impact INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create story choices table
CREATE TABLE public.story_choices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  node_id UUID NOT NULL REFERENCES public.story_nodes(id) ON DELETE CASCADE,
  choice_text TEXT NOT NULL,
  next_node_id TEXT NOT NULL, -- references story_nodes.node_id
  score_impact INTEGER DEFAULT 0,
  sound_effect TEXT,
  required_item TEXT, -- for drag-drop interactions
  order_index INTEGER DEFAULT 0
);

-- Create story interactions table (for special interactions like drag-drop, text input)
CREATE TABLE public.story_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  node_id UUID NOT NULL REFERENCES public.story_nodes(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL, -- 'text_input', 'drag_drop', 'puzzle'
  prompt TEXT NOT NULL,
  correct_answer TEXT,
  items JSONB, -- for drag-drop items
  reward_score INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.interactive_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_choices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (stories are public content)
CREATE POLICY "Interactive stories are viewable by everyone" 
ON public.interactive_stories FOR SELECT USING (true);

CREATE POLICY "Story nodes are viewable by everyone" 
ON public.story_nodes FOR SELECT USING (true);

CREATE POLICY "Story interactions are viewable by everyone" 
ON public.story_interactions FOR SELECT USING (true);

CREATE POLICY "Story choices are viewable by everyone" 
ON public.story_choices FOR SELECT USING (true);

-- Admin policies for management
CREATE POLICY "Admins can manage interactive stories" 
ON public.interactive_stories FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admins can manage story nodes" 
ON public.story_nodes FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admins can manage story choices" 
ON public.story_choices FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admins can manage story interactions" 
ON public.story_interactions FOR ALL USING (true) WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_interactive_stories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_interactive_stories_updated_at
    BEFORE UPDATE ON public.interactive_stories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_interactive_stories_updated_at();

-- Insert sample interactive stories
INSERT INTO public.interactive_stories (title, description, cover_url, difficulty_level, estimated_time, category, age_range) VALUES
('خانه تسخیر شده', 'ماجراجویی ترسناک در خانه‌ای مرموز پر از راز و رمز', '/placeholder.svg', 'متوسط', 20, 'ترسناک', '12+ سال'),
('ماجراجویی افسانه‌ای', 'سفری جادویی به سرزمین اژدهاها و جادوگران', '/placeholder.svg', 'سخت', 25, 'فانتزی', '10+ سال'),
('سفر فضایی', 'کاوش در کهکشان‌های دور و کشف حیات در فضا', '/placeholder.svg', 'آسان', 15, 'علمی-تخیلی', '8+ سال'),
('راز کارآگاه', 'حل یک پرونده مرموز در شهری پر از اسرار', '/placeholder.svg', 'سخت', 30, 'جنایی', '14+ سال');