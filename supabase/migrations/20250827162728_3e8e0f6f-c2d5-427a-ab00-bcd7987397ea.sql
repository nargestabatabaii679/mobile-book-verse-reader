-- Fix critical security vulnerability: Restrict books and book_pages write operations to authenticated users only

-- Drop existing overly permissive policies for books table
DROP POLICY IF EXISTS "Anyone can delete books" ON public.books;
DROP POLICY IF EXISTS "Anyone can insert books" ON public.books; 
DROP POLICY IF EXISTS "Anyone can update books" ON public.books;

-- Drop existing overly permissive policies for book_pages table
DROP POLICY IF EXISTS "Anyone can delete book pages" ON public.book_pages;
DROP POLICY IF EXISTS "Anyone can insert book pages" ON public.book_pages;
DROP POLICY IF EXISTS "Anyone can update book pages" ON public.book_pages;

-- Create secure policies for books table
-- Keep books viewable by everyone (public library)
CREATE POLICY "Books are viewable by everyone" 
ON public.books 
FOR SELECT 
USING (true);

-- Restrict write operations to authenticated users only
CREATE POLICY "Authenticated users can insert books" 
ON public.books 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update books" 
ON public.books 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete books" 
ON public.books 
FOR DELETE 
TO authenticated
USING (true);

-- Create secure policies for book_pages table
-- Keep book pages viewable by everyone (public library)
CREATE POLICY "Book pages are viewable by everyone" 
ON public.book_pages 
FOR SELECT 
USING (true);

-- Restrict write operations to authenticated users only
CREATE POLICY "Authenticated users can insert book pages" 
ON public.book_pages 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update book pages" 
ON public.book_pages 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete book pages" 
ON public.book_pages 
FOR DELETE 
TO authenticated
USING (true);