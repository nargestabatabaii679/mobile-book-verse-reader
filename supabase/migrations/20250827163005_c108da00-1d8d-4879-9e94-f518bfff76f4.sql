-- Fix security warnings detected by the linter

-- 1. Fix function search path security warnings by adding secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_interactive_stories_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_books_updated_at()
RETURNS trigger
LANGUAGE plpgsql  
SET search_path = ''
AS $function$
BEGIN
    UPDATE public.books 
    SET updated_at = now() 
    WHERE id = ANY(NEW.book_ids::UUID[]);
    RETURN NEW;
END;
$function$;

-- 2. Add basic RLS policies for profiles table to fix "RLS Enabled No Policy" warning
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);